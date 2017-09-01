---
layout: post
Tags:
- dev
- mapgen
date: 2017-01-22T01:29:05Z
title: Bitesofcode's Terrain Generation

---

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.4.1/d3.min.js" integrity="sha256-4mL8TQfOJSbg0f42dQw5cKLl2ngQXUSXqfQnvK11M44=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>

Found [this](https://bitesofcode.wordpress.com/2016/12/23/landscape-generation-using-midpoint-displacement/) blog post and enjoyed the graphics. Re-implementing in JS for a learning exercise.

I started this post with the idea of doing fancy controls but... meh. No time for this, so you just get pretty pictures.

<div id="plots-static">
	<noscript>These will be replaced by dynamic versions if you have JS enabled.</noscript>
	<img src="/assets/img/bites/a.png" style="max-width: 100%">
	<img src="/assets/img/bites/b.png" style="max-width: 100%">
	<img src="/assets/img/bites/c.png" style="max-width: 100%">
</div>

<div id="plots">
</div>

<script src="/js/bitesofcode.js"></script>
See [/js/bitesofcode.js](/js/bitesofcode.js) for the source.
