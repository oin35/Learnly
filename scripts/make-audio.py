#!/usr/bin/env python3
"""
Render the app's Dutch audio clips with Piper (free, offline neural TTS) and encode them as small MP3s.

Setup (once):
    python3 -m venv .venv-audio && .venv-audio/bin/pip install piper-tts numpy
    # voice: nl_NL-ronnie-medium (CC0) from https://huggingface.co/rhasspy/piper-voices (the .onnx and .onnx.json)
    # also needs ffmpeg on the PATH

Usage:
    npm run audio:texts
    .venv-audio/bin/python scripts/make-audio.py --model path/to/nl_NL-ronnie-medium.onnx

Only missing clips are rendered (use --force to redo all). Writes public/audio/<id>.mp3 and src/data/audio-index.json.
"""
import argparse, json, subprocess, sys, tempfile, wave
from pathlib import Path

import numpy as np
from piper import PiperVoice, SynthesisConfig

ROOT = Path(__file__).resolve().parent.parent
TARGET_RMS_DB = -20.0   # speech loudness target
PEAK_LIMIT = 0.89       # about -1 dBFS
SILENCE_FLOOR = 0.012   # amplitude below which the start/end counts as silence
PAD_START, PAD_END, SENTENCE_GAP = 0.04, 0.12, 0.28  # seconds


def trim(x: np.ndarray, rate: int) -> np.ndarray:
    loud = np.where(np.abs(x) > SILENCE_FLOOR)[0]
    if len(loud) == 0:
        return x
    a = max(0, loud[0] - int(0.02 * rate))
    b = min(len(x), loud[-1] + int(0.04 * rate))
    return x[a:b]


def render(voice: PiperVoice, text: str, cfg: SynthesisConfig) -> tuple[np.ndarray, int]:
    parts, rate = [], voice.config.sample_rate
    for chunk in voice.synthesize(text, cfg):
        a = chunk.audio_float_array if hasattr(chunk, "audio_float_array") else chunk.audio_int16_array.astype(np.float32) / 32768
        rate = chunk.sample_rate
        parts.append(trim(a.astype(np.float32), rate))
        parts.append(np.zeros(int(SENTENCE_GAP * rate), dtype=np.float32))
    if not parts:
        raise RuntimeError(f"nothing synthesised for {text!r}")
    x = np.concatenate(parts[:-1])  # drop the trailing sentence gap
    rms = float(np.sqrt(np.mean(x**2))) or 1e-6
    gain = 10 ** ((TARGET_RMS_DB - 20 * np.log10(rms)) / 20)
    gain = min(gain, PEAK_LIMIT / (float(np.max(np.abs(x))) or 1.0))
    x = x * gain
    x = np.concatenate([np.zeros(int(PAD_START * rate), dtype=np.float32), x, np.zeros(int(PAD_END * rate), dtype=np.float32)])
    return x, rate


def write_mp3(x: np.ndarray, rate: int, out: Path) -> None:
    with tempfile.TemporaryDirectory() as td:
        wav = Path(td) / "clip.wav"
        with wave.open(str(wav), "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate)
            w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav), "-ac", "1", "-ar", "22050", "-b:a", "48k", str(out)], check=True)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", required=True)
    ap.add_argument("--texts", default=str(ROOT / "scripts/audio/texts.json"))
    ap.add_argument("--out", default=str(ROOT / "public/audio"))
    ap.add_argument("--index", default=str(ROOT / "src/data/audio-index.json"))
    ap.add_argument("--force", action="store_true")
    args = ap.parse_args()

    texts: dict[str, str] = json.loads(Path(args.texts).read_text())
    out = Path(args.out); out.mkdir(parents=True, exist_ok=True)
    voice = PiperVoice.load(args.model)
    cfg = SynthesisConfig(length_scale=1.0)

    done = skipped = 0
    for i, (cid, text) in enumerate(texts.items(), 1):
        target = out / f"{cid}.mp3"
        if target.exists() and not args.force:
            skipped += 1
            continue
        x, rate = render(voice, text, cfg)
        write_mp3(x, rate, target)
        done += 1
        if done % 25 == 0:
            print(f"  {i}/{len(texts)} …", flush=True)

    ids = sorted(p.stem for p in out.glob("*.mp3") if p.stem in texts)
    Path(args.index).write_text(json.dumps(ids) + "\n")
    total = sum((out / f"{i}.mp3").stat().st_size for i in ids)
    print(f"rendered {done}, kept {skipped}; index has {len(ids)} clips, {total/1e6:.1f} MB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
