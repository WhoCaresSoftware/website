#!/bin/sh
# Regenerates delivery assets from their masters. Requires cwebp and uv.
# Masters stay out of the deployment: masters/ is neither public/ nor static/.
set -eu
cd "$(dirname "$0")/.."
images=public/assets/images

# Founder cutouts: lossy colour, lossless alpha, at 1x and 2x of their largest
# display width (250 CSS px).
for name in xrs mike; do
  for width in 400 800; do
    cwebp -quiet -q 85 -alpha_q 100 -m 6 -sharp_yuv -metadata none -resize "$width" 0 \
      "masters/images/$name-cutout.webp" -o "$images/founders/$name-cutout-$width.webp"
  done
done

# Homepage work covers: a half-width companion beside each full master.
for master in "$images"/work-editorial/aigistos-portrait.webp "$images"/work-stories/*.webp; do
  case "$master" in *-[0-9][0-9][0-9].webp|*-[0-9][0-9][0-9][0-9].webp) continue ;; esac
  width=$(webpinfo "$master" | awk '/Width:/{print int(($2 / 2 + 7) / 8) * 8; exit}')
  cwebp -quiet -q 80 -m 6 -sharp_yuv -metadata none -resize "$width" 0 "$master" -o "${master%.webp}-$width.webp"
done

# Hex Mythica gallery: a 1200px step between the 800px and 1600px sources.
for name in cards environment characters props; do
  cwebp -quiet -q 80 -m 6 -sharp_yuv -metadata none -resize 1200 0 \
    "$images/project-showcase/hex-$name.webp" -o "$images/project-showcase/hex-$name-1200.webp"
done

# Fonts: Latin, Latin Extended-A, Greek and punctuation, every OpenType feature
# kept. Subsetting makes an OFL Modified Version, so the Reserved Font Name
# "Source" is replaced by "WCS Sans" (see static/licenses/WCS-SANS-FONTLOG.txt).
unicodes='U+0000-017F,U+0192,U+0218-021B,U+02BB-02BC,U+02C6-02DD,U+0300-0308,U+0370-03FF,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD'
for weight in regular semibold; do
  uvx --quiet --with brotli --from fonttools pyftsubset "masters/fonts/source-sans-3-$weight.woff2" \
    --unicodes="$unicodes" --layout-features='*' --name-IDs='*' --name-languages='*' \
    --flavor=woff2 --output-file="public/assets/fonts/wcs-sans-$weight.woff2"
  uvx --quiet --with brotli --from fonttools python scripts/rename-font.py \
    "public/assets/fonts/wcs-sans-$weight.woff2" "$weight"
done
