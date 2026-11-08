#!/usr/bin/env python3
"""
Record the app's Dutch audio with Piper (free, offline neural TTS) and append it to the audio packs.

Clips are stored in "packs": big MP3 files made of many clips back to back, with an index
(src/data/audio-index.json) that says where each clip lives: {"packs": [...], "clips": {id: [pack, offset, length]}}.
A pack is never changed once published, so each run only adds ONE new pack with the clips that are still missing.
(The hosting allows a limited number of files, so one file per clip would not scale.)

Setup:   bash scripts/setup-audio.sh        (creates .venv-audio and downloads the voice into .voice/)
Usage:   npm run audio:texts
         .venv-audio/bin/python scripts/make-audio.py --model .voice/nl_NL-ronnie-medium.onnx

--rebuild records everything again into a single fresh pack (replaces all old packs).
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


def encode_mp3(x: np.ndarray, rate: int) -> bytes:
    with tempfile.TemporaryDirectory() as td:
        wav, mp3 = Path(td) / "clip.wav", Path(td) / "clip.mp3"
        with wave.open(str(wav), "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate)
            w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav), "-ac", "1", "-ar", "22050", "-b:a", "48k", str(mp3)], check=True)
        return mp3.read_bytes()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", required=True)
    ap.add_argument("--texts", default=str(ROOT / "scripts/audio/texts.json"))
    ap.add_argument("--out", default=str(ROOT / "public/audio"))
    ap.add_argument("--index", default=str(ROOT / "src/data/audio-index.json"))
    ap.add_argument("--rebuild", action="store_true")
    args = ap.parse_args()

    texts: dict[str, str] = json.loads(Path(args.texts).read_text())
    out, index_path = Path(args.out), Path(args.index)
    out.mkdir(parents=True, exist_ok=True)
    index = {"packs": [], "clips": {}} if args.rebuild or not index_path.exists() else json.loads(index_path.read_text())
    if args.rebuild:
        for old in out.glob("pack-*.mp3"):
            old.unlink()

    todo = {cid: t for cid, t in texts.items() if cid not in index["clips"]}
    if not todo:
        print(f"nothing to record: all {len(texts)} clips are already in {len(index['packs'])} pack(s)")
        return 0

    voice = PiperVoice.load(args.model)
    cfg = SynthesisConfig(length_scale=1.0)
    pack_no = len(index["packs"])
    name = f"pack-{pack_no:03d}.mp3"
    blob, entries = bytearray(), {}
    for i, (cid, text) in enumerate(todo.items(), 1):
        mp3 = encode_mp3(*render(voice, text, cfg))
        entries[cid] = [pack_no, len(blob), len(mp3)]
        blob += mp3
        if i % 25 == 0:
            print(f"  {i}/{len(todo)} …", flush=True)
    (out / name).write_bytes(blob)
    index["packs"].append(name)
    index["clips"].update(entries)
    # drop clips that are no longer used by any text (their bytes stay in old packs; harmless)
    index_path.write_text(json.dumps(index, separators=(",", ":")) + "\n")
    print(f"recorded {len(todo)} new clips into {name} ({len(blob)/1e3:.0f} KB); index now has {len(index['clips'])} clips in {len(index['packs'])} pack(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
