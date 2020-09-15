---
layout: post
author: Helena
tags:
- puzzles
- gigglepig
title: Number Station
page_requires:
- jquery
---


<audio id="sample" src="/assets/audio/2620_ger.wav" controls preload></audio>

I found [this article](https://blog.ardy.io/2020/8/geraet-32620/) to be fascinating and it included some audio samples! So I made a small keyboard out of them.

<a href="javascript:playChar(0);">0</a>
<a href="javascript:playChar(1);">1</a>
<a href="javascript:playChar(2);">2</a>
<a href="javascript:playChar(3);">3</a>
<a href="javascript:playChar(4);">4</a>
<a href="javascript:playChar(5);">5</a>
<a href="javascript:playChar(6);">6</a>
<a href="javascript:playChar(7);">7</a>
<a href="javascript:playChar(8);">8</a>
<a href="javascript:playChar(9);">9</a>
<a href="javascript:playChar('!');">Achtung</a>
<a href="javascript:playChar('T');">Trennung</a>
<a href="javascript:playChar('E');">Ende</a>
<a href="javascript:playChar(' ');">Short Silence</a>

<script>
var audio = document.getElementById('sample');
var segmentEnd;

audio.addEventListener('timeupdate', function (){
    if (segmentEnd && audio.currentTime >= segmentEnd) {
        audio.pause();
    }
    console.log(audio.currentTime);
}, false);

function playSegment(startTime, endTime){
    segmentEnd = endTime;
    audio.currentTime = startTime;
    audio.play();
}

var mapping = {
    0: [0.0, 0.20],
    1: [0.34, 0.80],
    2: [0.80, 1.1],
    3: [1.3, 1.7],
    4: [1.7, 2.0],
    5: [2.2, 2.45],
    6: [2.6, 3],
    7: [3, 3.5],
    8: [3.6, 4],
    9: [4, 4.5],
    '!': [4.5, 5],
    'T': [5.1, 5.6],
    'E': [5.6, 6.1],
    ' ': [0.6, 0.8],

}

function playChar(c) {
	[left, right] = mapping[c];
	playSegment(left, right);
}

function delay(c) {
	[left, right] = mapping[c];
	return right - left;
}

function playStation(){
	var a = document.getElementById("contents").value.split('')
	var i = 0, howManyTimes = a.length;

	function f() {
		console.log(i, a[i]);
		playChar(a[i])
		i++;
		if (i < howManyTimes) {
			setTimeout(f, 1000);
		}
	}
	f();
}
</script>

# Your Own Numbers Station

Or given a textbox, maybe we can build your own number station:

<input id="contents" type="text" value="!! 0123 T 45 T 6789 E" />
<button id="playStation" onclick="playStation()">Play Series</button>

# For Saskia

<audio id="sasje"  controls preload></audio>

<script type="text/javascript">
d = new Date();
if(d.getDate() == 13){
	document.getElementById("sasje").src = "/assets/audio/13.wav"
} else {
	document.getElementById("sasje").src = "/assets/audio/0.wav"
}
</script>


The audio is noticeably better because I manually split the fragments and combined them with sox, rather than the awful javascript API for working with sound/time.
