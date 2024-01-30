---
layout: post
author: Helena
tags:
- dev
title: Project Name Generator
page_requires:
- jquery
- dat
blurb: Implements the consonant-vowel based name generation
see_also:
- href: /js/project-name.js
  text: /js/project-name.js (source)
---

## Input

<label for="consonants">Consonants</label>
<input type="text" name="consonants" id="consonants"  value="bcçdfghjklmnpqrsşßtvwxyz" />

<label for="vowels">vowels</label>
<input type="text" name="vowels" id="vowels"  value="aeiouäëïöü" />

<label for="pattern">pattern</label>
<input type="text" name="pattern" id="pattern"  value="cvvcvc" />

<label for="count">count</label>
<input type="number" name="count" id="count" min="1" max="1000" value="10" />

<label for="seed">seed</label>
<input type="text" name="seed" id="seed" value="changeme" />

## Output

<ul id="results">
</ul>

<script src="/js/lib.js"></script>
<script src="/js/project-name.js"></script>
