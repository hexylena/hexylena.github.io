---
layout: default
---

<div class="home">
	<a id="x" href="/assets/audio/0.wav">
		<div>
			<span class="post-meta">TODAY</span>
			<span id="y">
			0.wav
			</span>
		</div>
	</a>
</div>

<script type="text/javascript">
d = new Date();
$(".post-meta").html(d);
if(d.getDate() == 13){
	$("#x").attr("href", "/assets/audio/13.wav");
	$("#y").text('13.wav')
}
</script>
