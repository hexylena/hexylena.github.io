---
layout: post
author: Helena
tags:
- dev
title: "Project Name Generator 2: Actually Reverse Soundex"
page_requires:
- jquery
- dat
blurb: Implements a silly idea, generating a random soundex and then generating a word based on that.
see_also:
- href: /js/project-name-soundex.js
  text: /js/project-name-soundex.js (source)
---

"[Reverse Soundex](https://en.wikipedia.org/wiki/Soundex#Variants)" is a confusingly named thing whereby you use the last letter
of the name rather than the first letter, as the code's prefix and it's otherwise standard [Soundex](https://en.wikipedia.org/wiki/Soundex#Variants)

This implements *actually* reverse soundex, generating values that (*coughs*) roughly match the soundex code provided.
It's not a perfect implementation, but, eh, I don't really care that much for this use case.

## Input


<label for="pattern">pattern</label>
<input type="text" name="pattern" id="pattern"  value="H420" />

<label for="count">count</label>
<input type="number" name="count" id="count" min="1" max="1000" value="20" />

<label for="dupe">duplicate chance (/1000)</label>
<input type="number" name="dupe" id="dupe" min="0" max="1000" value="50" />

<label for="seed">seed</label>
<input type="text" name="seed" id="seed" value="changeme" />

<button onclick="randomizeSoundex()">Randomize Soundex</button>

## Output

<ul id="results">
</ul>

<script src="/js/lib.js"></script>
<script src="/js/project-name-soundex.js"></script>




