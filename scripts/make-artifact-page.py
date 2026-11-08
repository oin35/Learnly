#!/usr/bin/env python3
"""
Turn the single-file build (dist-single/index.html) into the page fragment the Artifact tool publishes
(<title> + <style> + root element + inline script) and write it to dist-artifact/page.html.

Run via:  npm run build:artifact
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
src = (ROOT / "dist-single/index.html").read_text(encoding="utf-8")
css = re.search(r"<style[^>]*>(.*?)</style>", src, re.S).group(1)
js = max(re.findall(r"<script[^>]*>(.*?)</script>", src, re.S), key=len)
assert "</script" not in js.lower(), "inline script contains a closing script tag"
title = re.search(r"<title>(.*?)</title>", (ROOT / "index.html").read_text(encoding="utf-8")).group(1)

out = f"""<title>{title}</title>
<style>
{css}
/* Artifact frame: size to the padded root instead of the dynamic viewport */
html, body {{ height: 100%; }}
.app {{ height: 100%; }}
</style>
<div id="root"></div>
<script type="module">{js}</script>
"""
dest = ROOT / "dist-artifact"
dest.mkdir(exist_ok=True)
(dest / "page.html").write_text(out, encoding="utf-8")
print(f"dist-artifact/page.html written ({len(out) / 1000:.0f} KB), title: {title}")
