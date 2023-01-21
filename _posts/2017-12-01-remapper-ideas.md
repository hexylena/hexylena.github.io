---
layout: post
tags:
- gamedev
- mapgen
date: 2017-12-03 22:33:49+00:00
title: REmapper Ideas / Planning
repo: hexylena/remapper
page_requires:
- d3v4.12
- jquery
blurb: Ideas for future research and work. Classic procgen blogpost where she wants to reinvent the world from first principles and wants everyone to think that was a good idea.
---

* TOC
{:toc}

## Evolving Villages

Ok, so if we're building up villages on flat ground now (particularly egyptian ones, can we evolve them?)

Probably not.

We could simulate population, place houses, develop rules for population sizes at which you need an X class of building (e.g. a church / a market / government buildings) but that gets awful close to <project>have apple</project> and is (as evidenced by my progress there, a huge amount of work.)

Ok, let's restrict it to just simulating an egyptian village, maybe we lay it out randomly and not worry too much. Apply some symmetry, some general rules for layout, it'll be OK.

Thought: Could we use BSP here? layout some "rooms" which are actually the big buildings, then the walkways between the big ones are streets, and then layout houses off of the streets? Doubtful we could get good verticality.

It'd be nice to have a river running through...


### Research

- [https://is.mendelu.cz/eknihovna/opory/zobraz_cast.pl?cast=71671](https://is.mendelu.cz/eknihovna/opory/zobraz_cast.pl?cast=71671)
- [Castra - Wikipedia](https://en.wikipedia.org/wiki/Castra)
- [History of urban planning - Wikipedia](https://en.wikipedia.org/wiki/History_of_urban_planning)
- [Urban planning in China - Wikipedia](https://en.wikipedia.org/wiki/Urban_planning_in_China)
- [Ancient Chinese urban planning - Wikipedia](https://en.wikipedia.org/wiki/Ancient_Chinese_urban_planning)
- [File:Elburg after cadastral plan 1830.jpg - Wikipedia](https://en.wikipedia.org/wiki/File:Elburg_after_cadastral_plan_1830.jpg)

### Thoughts

- Roman fortresses are small and probably a tractable thing to implement, however incredibly dull (completely flat terrain, mostly single story buildings, etc.)
- The city layout is awesome and impressive, but it is large. Especially things like Elburg, this would be great to implement but is far, far too large for the preferred game size. Let's start by implementing a simple city block, that's a reachable target. Maybe we can squash some city blocks together? It would be overly regular, but ... maybe this isn't so bad.
- Historical urban planning is not a popular topic.

### City Block Layout Test

- Buildings should be placed around the edges
- A courtyard should be built (space permitting)
- (if there is a courtyard) One of the buildings should be replaced with a gateway
	- does placement matter? Should we be concerned with placing the entrance on a less-busy street?
- Buildings need a walkway runing from outside wall to courtyard
- Place corner buildings first? Those might be tricky otherwise.
- BSP? BSP per-edge could work.

<script src="/js/city_lib.js"></script>

<div id="cityblock">
</div>

<script src="/js/cityblock.js"></script>
See [/js/cityblock.js](/js/cityblock.js) for the source.

Well heck, that worked pretty OK! Let's add a some entrances and a courtyard where we can place various ... stuff.

<div id="cityblock2">
</div>
<script src="/js/cityblock2.js"></script>
See [/js/cityblock2.js](/js/cityblock2.js) for the source.

### Courtyard Layout Test

but what about that empty space? could have a garden thing. or a small green space with trees. maybe walkways. maze?

<div id="courtyard1">
</div>
<script src="/js/courtyard1.js"></script>
<script src="/js/courtyard2.js"></script>
<script src="/js/courtyard3.js"></script>
<script src="/js/courtyard4.js"></script>
<script src="/js/courtyard5.js"></script>
<script src="/js/courtyard6.js"></script>
See [/js/courtyard1.js](/js/courtyard1.js), [/js/courtyard2.js](/js/courtyard2.js), [/js/courtyard3.js](/js/courtyard3.js), [/js/courtyard4.js](/js/courtyard4.js), [/js/courtyard5.js](/js/courtyard5.js), [/js/courtyard6.js](/js/courtyard6.js) for sources.

Those look... alright? the asymmetry of the penultimate one really bothers me. It's a nice overall design and I like the transition from grid on 90° to on 45° offset. That's kinda cool. The last one is probably the most plausible.

Should add other features that are more interesting than just an orchard. And orchards are just especially boring even if with fun patterns.

- raised flowerbeds (offering some cover)
- park benches (flavor)
- ponds (irregular shapes?)
- ponds (regular shapes, raised border?)
- empty areas?
- tiny soccer pitch

### Interiors

Nice houses around the edge but no interiors developed yet. As always, would be nice if the houses were themeable somehow. Most house design seems to revolve around a "backbone" and then rooms of various sizes sprouting from there.

I've done some reading in the past here to develop accurate interiors but that is a complex and ongoing area of research. And this is a game, one that's rendered in relatively low detail, and usually without models if it is coming from the remapper project. We can get away with really incredibly basic interiors.

We could use more or less the same building blocks that are in use with the prefabs. Or at least use them for reference sizes.

- Should try to have more variables for better variety, otherwise they'll be incredibly boring.
- Consider punching doorways in multiple buildings?

<div id="apartment">
</div>

<script src="/js/apartment.js"></script>
See [/js/apartment.js](/js/apartment.js) for the source.


## Fortresses / Battlements

Would be nice to build fortresses. The ones in AC:O are really quite nice. Notable features:

- boundary wall
- stuff inside?
- sometimes boundary wall is wide enough to walk around
- if border wall connects to buildings then the top level should be used, put some tables or stuff on top
- gates?
- what shape, regular, not?
- Can this be evolved? from a tiny temporary foritifaction to something larger?
- Time setting? Are they historical camps? European? Middle eastern? HESCOs everywhere?

### Research

- [Base Camp Facilites Standards for Contingency Operations](http://www.eur.army.mil/pdf/Red_Book.pdf)
	- "Initial" (0-6 months) -> "Temporary" (6-24) -> "Semi Permanent" (2-25 years)
	- Categorisations: Main Base (500 people), FOB (company, 80-150), Outposts
- [Army Logistician (Building a FOB From the Ground Up)](http://www.alu.army.mil/alog/issues/SepOct07/FOB_groundup.html)
- [STANDARD FORWARD OPERATING BASE DESIGNS INCORPORATING DoD AND ARMY EXPLOSIVES SAFETY REQUIREMENTS](http://www.dtic.mil/get-tr-doc/pdf?AD=ADA532176)
- [SUSTAINABLE DESIGN OF FORWARD OPERATING BASES](http://www.bristol.ac.uk/media-library/sites/eng-systems-centre/migrated/documents/theoslides.pdf)
- [Mathematical Model of Sub-System Interactions for Forward Operating Bases](http://www.iise.org/uploadedFiles/IIE/Community/Technical_Societies_and_Divisions/SEMS/Student_3rd%20Place_PoreddyDanielsISERC2012.pdf)
- [http://adminpubs.tradoc.army.mil/pamphlets/TP525-7-7.pdf](http://adminpubs.tradoc.army.mil/pamphlets/TP525-7-7.pdf)
- [http://www.pnnl.gov/main/publications/external/technical_reports/PNNL-23133.pdf](http://www.pnnl.gov/main/publications/external/technical_reports/PNNL-23133.pdf)

### Testing

Ok, enough reading, can we build a simple outpost. Just as proof o concept. Bare minimum would be:

- tents
- watch tower
- barrier wall.

## Rivers

Well at least we can simulate a river, right?

### Research

- [doi:10.1016/j.geomorph.2012.09.006](http://dx.doi.org/10.1016/j.geomorph.2012.09.006)
- [Procedure for rivers and lakes (and snow) — Entropic Particles](http://www.entropicparticles.com/procedure-for-rivers-and-lakes/)
- [BBC - Standard Grade Bitesize Geography - Processes forming river landscapes : Revision](http://www.bbc.co.uk/bitesize/standard/geography/rivers/river_forming/revision/1/)
- [BBC - Standard Grade Bitesize Geography - Processes forming river landscapes : Revision, Page 2](http://www.bbc.co.uk/bitesize/standard/geography/rivers/river_forming/revision/2/)
- [BBC - Standard Grade Bitesize Geography - Processes forming river landscapes : Revision, Page 3](http://www.bbc.co.uk/bitesize/standard/geography/rivers/river_forming/revision/3/)
- [Why Do Rivers Have Deltas? - YouTube](https://youtube.com/watch?v=A47ythEcz74)
- [Why Do Rivers Curve? - YouTube](https://youtube.com/watch?v=8a3r-cG8Wic)

Hahahah no.

Well let's settle for something that looks enough like a river that no one bats an eye.

- [Good method for adding rivers to a heightmap? : proceduralgeneration](https://www.reddit.com/r/proceduralgeneration/comments/47xucj/good_method_for_adding_rivers_to_a_heightmap/)
- [Realistic drainage in heightmaps. : proceduralgeneration](https://www.reddit.com/r/proceduralgeneration/comments/3bh5v0/realistic_drainage_in_heightmaps/)
- [Procedural Rivers And Hills Using Worley Noise : proceduralgeneration](https://www.reddit.com/r/proceduralgeneration/comments/3le5fg/procedural_rivers_and_hills_using_worley_noise/)
- [hydraulic erosion algorithm on heightfields : proceduralgeneration](https://www.reddit.com/r/proceduralgeneration/comments/45w2jg/hydraulic_erosion_algorithm_on_heightfields/)
- [Voronoi Rivers - An Update : proceduralgeneration](https://www.reddit.com/r/proceduralgeneration/comments/58nc86/voronoi_rivers_an_update/)
- [IshOfTheWoods comments on [Monthly Challenge #17 - April, 2017] - Procedural Town/City](https://www.reddit.com/r/proceduralgeneration/comments/63dsbn/monthly_challenge_17_april_2017_procedural/dgzvcy9/)
- [I took a swing at erosion and it's fighting back. : proceduralgeneration](https://www.reddit.com/r/proceduralgeneration/comments/6fj09s/i_took_a_swing_at_erosion_and_its_fighting_back/)
- [Is water simulation &quot;procedurally generated content&quot;? : proceduralgeneration](https://www.reddit.com/r/proceduralgeneration/comments/7a0oii/is_water_simulation_procedurally_generated_content/)
- [Water erosion on heightmap terrain](http://ranmantaru.com/blog/2011/10/08/water-erosion-on-heightmap-terrain/)
- [Time lapse of a river changing course : gifs](https://www.reddit.com/r/gifs/comments/1ztfh5/time_lapse_of_a_river_changing_course/)

### Erosion

Did not even attempt.

### Random Walks

The random walk approach seemed easy enough to implement and doesn't look horrible?

{% include figure.html file="remapper/rivers.png" alt="Random walks from (0,0) to (10, 10)" %}

The algorithm was *supposed* to avoid overlapping with itself but that apparently seriously decreases the amount of random walks we discover. So we limited serious overlaps and it works well enough.

{% include figure.html file="remapper/river_larger_orig.png" alt="Four example outputs from the random walk algorithm" %}

I applied some (poorly implemented) dilation to the resulting river which turned out pretty well. The results look pretty decent, they'll probably even look OK inside a redeclipse map as well.

{% include figure.html file="remapper/river_larger.png" alt="The same four example outputs after the dilation has been applied." %}

I originally coded it with the intention of having *no* overlaps since those seemed implausible but it seems to have created a nice delta effect when occuring near the goal.

### TODO

This implementation sucks for a whole host of reasons:

- No branching
- No heightmap included so doesn't make any sense
- Curves are horrifically un-smooth in places
- No width change that would come with heavy flow

But is such a thing necessary for the scale of RE maps? No possibility to see such global changes as erosion or rivers delta unless the entire map is set atop a river delta. Maybe this belongs in a different project.
