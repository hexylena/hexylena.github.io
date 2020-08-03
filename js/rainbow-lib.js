function cloud(ctx, blobs, spread, pR, k, j){

	for(var i = 0; i < blobs; i++){
		xoff = 2 * (random() - 0.5);
		ymax = 1 - Math.abs(xoff)
		yoff = random() * ymax;
		radius = random() * pR

		cx = 100 + (xoff * spread) + k
		cy = 100 - (yoff * spread) + j

		//meh
		q = random() * 2;
		if(q > 1) { q = 1; }

		ctx.globalAlpha = q;
		circle = new Path2D();
		circle.moveTo(125, 35);
		circle.arc(cx, cy, radius, 0, 2 * Math.PI);
		ctx.fill(circle);
	}
}

function trees(ctx, controls, k, j){
	ctx.fillStyle = controls.bark;
	ctx.fillRect(k, j, 20, 100);

	ctx.lineCap = 'round'
	l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

	for(var z = 0; z < 10; z++){
		for(var i = 0; i < controls.branches; i++){
			rr = [0, 1].random();
			r = l.random();
			gg = [6, 7, 8].random();
			g = l.random();
			bb = [0, 1].random();
			b = l.random();
			ctx.strokeStyle = `#${rr}${r}${gg}${g}${bb}${b}`;

			ctx.lineWidth = 15 * random();
			// Draw lines
			x = k;
			xo =  random() * 80 / i
			y = j;
			yo = i * 3;
			ym = i * 2;

			line(ctx,
				x, y - yo,
				x + xo, y - ym);
			line(ctx,
				x, y - yo,
				x - xo, y - ym);
		}
	}
}


function line(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
