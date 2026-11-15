"""Rename a subset Source Sans 3 file to WCS Sans, as the OFL requires of Modified Versions."""
import sys
from fontTools.ttLib import TTFont

path, weight = sys.argv[1], sys.argv[2]
style = {'regular': 'Regular', 'semibold': 'Semibold'}[weight]
font = TTFont(path)
names = font['name']
for record in list(names.names):
    # Drop names that carry the Reserved Font Name or describe the original release.
    if record.nameID in (1, 2, 3, 4, 6, 16, 17, 21, 22, 25):
        names.removeNames(nameID=record.nameID)
family = 'WCS Sans'
full = f'{family} {style}'
for name_id, value in {
    1: family if style == 'Regular' else full, 2: 'Regular', 3: f'WCSSans-{style};subset of Source Sans 3',
    4: full, 6: f'WCSSans-{style}', 16: family, 17: style,
}.items():
    names.setName(value, name_id, 3, 1, 0x409)
    names.setName(value, name_id, 1, 0, 0)
font.save(path)
