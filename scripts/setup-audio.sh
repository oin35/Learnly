#!/usr/bin/env bash
# One-time setup for recording audio in a fresh machine: Piper engine + the Dutch voice (nl_NL-ronnie-medium, CC0).
# Needs network access to pypi.org, huggingface.co and us.aws.cdn.hf.co, and ffmpeg on the PATH.
set -euo pipefail
cd "$(dirname "$0")/.."
command -v ffmpeg >/dev/null || { echo "ffmpeg is required" >&2; exit 1; }
if [ ! -x .venv-audio/bin/python ]; then
  python3 -m venv .venv-audio
  .venv-audio/bin/pip install -q piper-tts numpy
fi
mkdir -p .voice
BASE="https://huggingface.co/rhasspy/piper-voices/resolve/main/nl/nl_NL/ronnie/medium"
for f in nl_NL-ronnie-medium.onnx nl_NL-ronnie-medium.onnx.json; do
  [ -s ".voice/$f" ] || curl -sS -L --fail -o ".voice/$f" "$BASE/$f"
done
echo "audio setup ready: .venv-audio and .voice/nl_NL-ronnie-medium.onnx"
