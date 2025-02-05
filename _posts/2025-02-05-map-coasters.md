---
layout: post
author: Helena
tags:
- dev
title: Producing nice(r) maps for 3d printing
blurb: Maps with maperative
---

I wanted to make maps that were visually/physically attractive, specifically for coasters. We had seen some star forts recently and those are very visually attractive from an Cessna's perspective.


Maperitive was one of the few options I found that provided what I wanted easily:

- scriptable access to maps
- customisable styles

We'll be customising the styles for essentially turning them into a heightmap. The netherlands is famously flat, however, the buildings can be high and the water can be low which is sufficient for my use case.


Here we pull in a larger bound than we end up printing, in order to get large features that go 'off map' from the final print:

```
use-ruleset Rules/Coaster.mrules
// use-ruleset Rules/Default.mrules
apply-ruleset

set-geo-bounds 5.0457,52.2773,5.2816,52.3152

download-osm-overpass
save-source "naarden.osm"

set-setting name=map.decoration.grid value=false
set-setting name=map.decoration.scale value=false
set-setting name=map.decoration.attribution value=false

set-geo-bounds 5.1457,52.2873,5.1816,52.3052

set-print-bounds-geo
zoom-bounds

export-svg file=naarden.svg
```

The [Coaster.mrules]({% link assets/Coaster.mrules %}) file hides a lot of things and flatten many things out to similar flat colours. We don't want labels, we just want e.g. waterways.

And then we can plot this with Maperitive:

```
mono ./Maperitive.Console.exe Scripts/Naarden.mscript
```

![an image of a star fort, the grass is in green, the water is black, and buildings come up to a light grey colour]({% link assets/naarden.png %})

Personally I found the Maperitive GUI to be the best way to identify the correct boundaries, but ymmv.
