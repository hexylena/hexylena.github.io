---
layout: post
author: Helena
tags:
- dev
title: Codenames Duet Card Generator
page_requires:
- jquery
blurb: Generate random but functional Codenames Duet cards that you and a partner can use remotely, based on a shared seed.
see_also:
- href: /js/codenames.js
---

<style type="text/css">
.post-content td {
	border: 1px solid black;
}
#controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
	padding: 0.3em;
}
.player {
	text-align: center;
	font-size: 200%;
	color: #888;
}
</style>
<div id="controls">
	<label>
		Key:
		<input type="text" id="seed" value="Change Me :)"/>
	</label>
	<a id="p2" href="">Share this link to Player 2</a>
</div>
<div class="player">
	Your Duet Partner
</div>
<table id="card" style="width: 100%">
    <tr>
        <td id="0.0"></td>
        <td id="0.1"></td>
        <td id="0.2"></td>
        <td id="0.3"></td>
        <td id="0.4"></td>
    </tr>
    <tr>
        <td id="1.0"></td>
        <td id="1.1"></td>
        <td id="1.2"></td>
        <td id="1.3"></td>
        <td id="1.4"></td>
    </tr>
    <tr>
        <td id="2.0"></td>
        <td id="2.1"></td>
        <td id="2.2"></td>
        <td id="2.3"></td>
        <td id="2.4"></td>
    </tr>
    <tr>
        <td id="3.0"></td>
        <td id="3.1"></td>
        <td id="3.2"></td>
        <td id="3.3"></td>
        <td id="3.4"></td>
    </tr>
    <tr>
        <td id="4.0"></td>
        <td id="4.1"></td>
        <td id="4.2"></td>
        <td id="4.3"></td>
        <td id="4.4"></td>
    </tr>
</table>
<div class="player">
	You
</div>

<script src="/js/lib.js"></script>
<script src="/js/codenames.js"></script>

# About

I love codenames! But I don't always carry the codenames cards around and sometimes I just have some paper/a pen, and a phone, and I still want to play with friends. Or I have the word cards from another codenames deck, but not duet, and I just want to play duet. This will generate random codenames cards for play.
