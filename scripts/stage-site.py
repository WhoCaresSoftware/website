"""Stage only explicitly approved public files for GitHub Pages and local preview."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent
DEST = ROOT / "_site"
PUBLIC_FILES = (
    "index.html",
    "CNAME",
    "assets/styles.css",
    "assets/preferences.js",
    "assets/composer.js",
    "assets/composer.css",
    "assets/work.js",
    "assets/services.css",
    "assets/services.js",
    "assets/vendor/use-gesture/vanilla-10.3.1.mjs",
    "assets/vendor/use-gesture/LICENSE",
    "assets/work.css",
    "assets/people.js",
    "assets/back-top.js",
    "assets/wordmark.js",
    "assets/hero.css",
    "assets/hero.js",
    "assets/people.css",
    "assets/approach.css",
    "assets/approach.js",
    "assets/images/mike-cutout.webp",
    "assets/images/xrs-cutout.webp",
    "assets/whocares.css",
    "assets/brand/whocares-wordmark-paper.svg",
    "assets/brand/whocares-wordmark-ink.svg",
    "assets/brand/whocares-symbol-ink.svg",
    "assets/brand/whocares-symbol-orchid.svg",
    "assets/brand/favicon.svg",
    "assets/brand/FONT-LICENSE.txt",
    "assets/fonts/source-sans-3-regular.woff2",
    "assets/fonts/source-sans-3-semibold.woff2",
    "assets/fonts/SOURCE-SANS-OFL.txt",
    "assets/images/hex-mythica-artwork.webp",
    "assets/images/hex-mythica-environment.webp",
)

if DEST.exists():
    shutil.rmtree(DEST)
for relative in PUBLIC_FILES:
    target = DEST / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(ROOT / relative, target)
(DEST / ".nojekyll").touch()
print(f"Staged {len(PUBLIC_FILES)} public files in {DEST}")
