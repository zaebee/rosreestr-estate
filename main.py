import json
from rosreestr2coord import Area

PREFIX = '23:43:104007'
RANGE = [2250, 2341]

def get_polygons(start, end, prefix=None):
    """Returns polygons for given areas."""
    prefix = prefix or PREFIX
    areas = [f'{prefix}:{index}' for index in range(start, end + 1)]
    for area in areas:
        a = Area(area, with_proxy=True)
        if a.get_center_xy():
            yield json.loads(a.to_geojson_poly())
