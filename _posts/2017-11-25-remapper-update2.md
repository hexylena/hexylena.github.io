---
layout: post
Tags:
- gamedev
- mapgen
date: 2017-12-03 15:20:56+00:00
title: REmapper Update 2
repo: hexylena/remapper
commit: "c87e6a3c853e3ca58dcd40a84894c19494b9cd66"
---

- CTF mode implemented, flags / bases.
- "World Flavours" for specialised per-map game modes / features.
- [WIP] Egypt themed components

* TOC
{:toc}


## CTF

Interesting feature added was the ability to run CTFs on the maps. After [the success of N-way mirroring](/2017/10/15/remapper-update1.html#n-way-mirroring) it was clear that CTF features should be added. This was implemented as "bases" that changed their team affiliation based upon their orientation. Due to the fact that mirroring rotates things 4 ways, we're somewhat ensured of having one of each base. In (future) maps we'll have to worry about ensuring that all directions are covered and with reasonable spatial displacement.

A cut-away view of the space station flag room. Decided to provide some cover down the hallways while the flag is being stolen. The space version is quite large and provides a nice small area for CQB.

{% include figure.html file="remapper/flag-a-side.png" alt="'Spacestation' flag room" %}

The castle version is much smaller. Not very exciting. Again using walls for protection down (possibly) long straight hallways.

{% include figure.html file="remapper/flag-b-side.png" alt="'Castle' flag room" %}

In both cases the flag is placed via some rather ugly code. Should refactor this at some point.

```python
# Calculate the appropriate offset for where the flag
# should be placed. Here it is placed in the center of
# the current position and slightly above.
offset = self.pos + TILE_CENTER + ABOVE_FINE

# Change team color based on orientation
if self.orientation == NORTH:
    flag = TeamFlag(xyz=offset, team=1)
elif self.orientation == SOUTH:
    flag = TeamFlag(xyz=offset, team=2)
elif self.orientation == EAST:
    flag = TeamFlag(xyz=offset, team=3)
elif self.orientation == WEST:
    flag = TeamFlag(xyz=offset, team=4)
xmap.ents.append(flag)
```

The voxel files encode the "team" affiliation and will be replaced with the appropriate color.

```python
# A small hook that, given a color from a voxel
# in the input file, returns the appropriate texture.
def colour_to_texture(self, r, g, b):
    # If it is bright red, then we do something special
    # and override the r/g/b values.
    if (r, g, b) == (1, 0, 0):
        if self.orientation == NORTH:
            r = 0
            g = 0
            b = 1
        # ...
    return TEXMAN.get_colour(r, g, b)
```

Not perfect but functional.

## World Flavors

Trying to implement some sort of "themeing" on the maps. Unfortunately everything is awful. Some variables are stored in the map itself (yay!) however these seem to be completely ignored. The rest of the variables are stored for every map in server-level variables. This makes everything awful since we can't have differences per-map. TODO: explore use of `.cfg` file to append variables. This works when it is just me, but may not be functional in multi-user environments.

Some work-in-progress flavors that can be mixed and matched depending on the map theme

Flavor          | Description
--------------- | -----------
`crushed_blacks` | Shadows are black instead of dark grey/blue.
`maliwan`       | Maliwan-like weapons. Shotguns which cause bleed damage, snipers with electrical damage, that sort of insanity.
`space_station` | A space like environment. Unlimited impulse, impulse can be used mid-air, and gravity is set to 0.

## Egypt

After watching some [Assassins Creed: Origins](https://youtu.be/XNpzLjf2BWA?t=457) it was clear that the city shown was highly regular, on a rectangular grid (more or less) and with rectangular buildings (mostly.)

{% include figure.html file="remapper/assassins-creed-origins-memphis-canal-1421-979x551.jpg" alt="Wallpaper of AC:O, source unknown" %}

This should surely be easy to re-create... but there is a complication, all units should be "grounded", something currently not done in any maps. So the algorithm has be re-implemented from scratch.

Made some basic assets ahead of time since I was feeling a bit creative.

{% include figure.html file="remapper/egype_cat.png" alt="Small sphinx statue" caption="A small sphinx statue" %}
{% include figure.html file="remapper/egypt_statue.png" alt="A large-ish 'human' statue" %}
{% include figure.html file="remapper/egypt_gate.png" alt="A gate asset" %}
{% include figure.html file="remapper/egypt_bridge.png" alt="A bridge segment, meant to be combined with other bridge segments" %}
