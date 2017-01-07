---
Description: Converted the thread tone repo to work with circos.
Tags:
- dev
- personal
- art
- circos
date: 2017-01-07T11:25:17Z
title: Circos ThreadTone
repo: erasche/CircosThreadTone
---

# Background

Found
[ThreadTone](https://github.com/theveloped/ThreadTone)
a while back. Converting it work
output circos-compatible
configuration was pretty trivial

Only notable difficulty was that `bezier_radius` was set, and it was not clear how that was propagated. So direct experimentation was used to identify reasonable values.

{{< highlight apache "style=friendly"  >}}
<colors>
<<include etc/colors.conf>>
</colors>
<fonts>
<<include etc/fonts.conf>>
</fonts>
<<include etc/housekeeping.conf>>
<<include ideogram.conf>>
<<include ticks.conf>>

# Use a human karyotype for fun
karyotype = data/human.txt
<image>
	dir          = /input/
	file         = circos.png
	radius       = 1500p
	background   = white
	angle_offset = 0
</image>

# Reduce this to 10 for nicer tick spacing
chromosomes_units = 10
# We just use chr1 in the plot
chromosomes       = hs1

# A custom link colour is defined in order to take advantage of opacity
<colors>
	customcolor = 60,60,60,0.6
</colors>

<links>
	# For some reason, 1r was not a desierable value.
	radius        = 0.99r
	# Increasing this to 1 will change when the bend happens, and as a
	# result make the image smaller.
	crest         = 0

	<link segdup>
		show         = yes
		color        = customcolor
		thickness    = 3p
		file         = data/links.txt
	</link>
</links>
{{< /highlight >}}

# Running

{{< highlight console "style=friendly"  >}}
$ make light
$ xdg-open circos/circos.png
{{< /highlight >}}

<div class="pure-g well">
	<div class="pure-u-1">
		<div class="l-box well-title">
			Light Plot
		</div>
	</div>
	<div class="pure-u-1">
		<img src="/assets/img/circos-thread/circos.png" width="45%" />
		<img src="/assets/img/circos-thread/circos-dark.png" width="45%" />
		<img src="/assets/img/circos-thread/root.png" width="45%" />
		<img src="/assets/img/circos-thread/author.png" width="45%" />
	</div>
</div>

