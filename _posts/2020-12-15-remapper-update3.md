---
layout: post
tags:
- gamedev
- mapgen
date: di 15 dec 2020 15:32:51 CET
title: REmapper Update 3
repo: hexylena/remapper
blurb: Snippets from discussions with a colleague over remapper planning
---

No actual update, just
some assorted discussion. Not that anyone is seriously reading this blog^W random crap dumping zone, much less for a 3 year old free time project.

>
> Honestly some of the most terrifying maps
>
> Hahaha yeah. Definitely harder to get a good circuit or line going
>
> When it's all CHAOS

>
> A: I think a bit more cover would be useful
>
> A: But it's been so long it's hard to tell lol
>
> H: Maybe future ones will tone that down and produce more normal stuff.
>
> H: E.g. big central buildings and streets kinda things rather than just messes
>
> A: Eh. Messes have merits. I think map design is just hard

>
> And the things you want to optimise for are so hard to simulate and score
>
> I wonder if there could be a line of sight test when attempting to place a room?
>
> LoS is harder but. Yeah,? Whatcha thinking
>
> Like max line of sight distance to make sure there are hiding places?
>
> ...
>
> So in my thing most rooms in my thing have roughly a transparency, either they're empty or they're solid or partially solid. So you could calculate that for every position - every 15 degrees around in a circle.
>
> You could score it. Yeah
>
> But integrating at runtime and having it make sense would be harder
>
> Easier to post evaluate

and a counter point

>
> H: The one with the tubes would pass with flying colors there
>
> H: But it wasn't fun because you couldn't see anyone until you were on top of of them
>
> A: True. That one was crazy
>
> H: So maybe needs a min and max distance
>
> A: Tubes aren't bad but maybe a max length

on placing pieces, should definitely have a 'preview' step in the pipeline, each room type gets a single voxel, and run our tests on that or throw it out. constraints maybe useful here?

>
> H: And was always tough for me that the big sexy pieces were hard to fit in there without manually placing them
>
> H: If i added a 2 unit wide tunnel for instance, I'd make it 2 units by 2 units, and maybe a plaza on the end. But then it never gets placed because it's huge and unless you start generating / growing from the edges you can place fun stuff easily.
>
> H: But that's def a problem that has other solutions. Like generating more ... Like map previews and tossing out boring ones before generating the real ones?

If we have another path method

>
> A: I wonder if you could randomly place 2-5 big sexy pieces and then generate paths around them to ensure patching then randomly generate rooms in those paths
>
> A: And fill in around that
>
> H: Yeah, so that's another strat but I don't actually have a reachability checker. Ieverything was reachable just by nature of "pick an end and extend."
>
> H: We'd have to add a validator step to ensure everything can be reached. Which would be useful to have

on CTFs:

>
> H: And never buult good CTF maps and i want more of those. There's fun stuff you could do... If there's multiple paths between each flag room. But that requires v diff algos to ensure multiple psths
>
> H: More of a "design a path and then find rooms which fit" rather than the current "just make random paths"
>
> A: CTF is a whole nother ball game from DM
>
> A: Yeah it's like make 4 paths between two poits
>
> H: DM is more fun if everyone is forced into a small number of arenas too. Which isn't a thing currently
>
> H: Also currently it mandates that things are walkable, we ignore parkouring. But CTF could be fun if you're forced to take a diff path back or so
