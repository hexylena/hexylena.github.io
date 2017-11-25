---
layout: post
Tags:
- gamedev
- mapgen
date: 2017-12-01 00:00:00+00:00
title: REmapper Ideas / Planning
repo: erasche/remapper
---

* TOC
{:toc}

## Egypt

After watching some [Assassins Creed: Origins](https://youtu.be/XNpzLjf2BWA?t=457) it was clear that the city shown was highly regular, on a rectangular grid (more or less) and with rectangular buildings (mostly.)

![Wallpaper of AC:O, source unknown](/assets/img/remapper/assassins-creed-origins-memphis-canal-1421-979x551.jpg)

This should surely be easy to re-create... but there is a complication, all units should be "grounded", something currently not done in any maps. So the algorithm has be re-implemented from scratch.

### Evolving Villages

Ok, so if we're building up villages on flat ground now (particularly egyptian ones, can we evolve them?)

Probably not.

We could simulate population, place houses, develop rules for population sizes at which you need an X class of building (e.g. a church / a market / government buildings) but that gets awful close to <project>have apple</project> and is (as evidenced by my progress there, a huge amount of work.)

Ok, let's restrict it to just simulating an egyptian village, maybe we lay it out randomly and not worry too much. Apply some symmetry, some general rules for layout, it'll be OK.

Thought: Could we use BSP here? layout some "rooms" which are actually the big buildings, then the walkways between the big ones are streets, and then layout houses off of the streets? Doubtful we could get good verticality.

It'd be nice to have a river running through...

### Rivers

Well at least we can simulate a river, right?

#### Research

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

#### Erosion

Did not even attempt.

#### Random Walks

The random walk approach seemed easy enough to implement and doesn't look horrible?

![Random walks from (0,0) to (10, 10)](/assets/img/remapper/rivers.png)

The algorithm was *supposed* to avoid overlapping with itself but that apparently seriously decreases the amount of random walks we discover. So we limited serious overlaps and it works well enough.

![An example output](/assets/img/remapper/river_larger_orig_0.png)
![An example output](/assets/img/remapper/river_larger_orig_1.png)
![An example output](/assets/img/remapper/river_larger_orig_2.png)
![An example output](/assets/img/remapper/river_larger_orig_3.png)

I applied some (poorly implemented) dilation to the resulting river which turned out pretty well. The results look pretty decent, they'll probably even look OK inside a redeclipse map as well.

![An example output](/assets/img/remapper/river_larger_0.png)
![An example output](/assets/img/remapper/river_larger_1.png)
![An example output](/assets/img/remapper/river_larger_2.png)
![An example output](/assets/img/remapper/river_larger_3.png)

I originally coded it with the intention of having *no* overlaps since those seemed implausible but it seems to have created a nice delta effect when occuring near the goal.

#### TODO

This implementation sucks for a whole host of reasons:

- No branching
- No heightmap included so doesn't make any sense
- Curves are horrifically un-smooth in places
- No width change that would come with heavy flow

But is such a thing necessary for the scale of RE maps? No possibility to see such global changes as erosion or rivers delta unless the entire map is set atop a river delta. Maybe this belongs in a different project.
