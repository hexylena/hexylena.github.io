function Model(init) {
    this.get = init.get;
    this.set = init.set;
    this.cx = function(){
        return this.get()[0]
    };
    this.cy = function(){
        return this.get()[1]
    };
}

function ref(obj, prop) {
    return {
        get: function() { return obj[prop]; },
        set: function(v) { obj[prop] = v; }
    };
};

function cartesian(x, y) {
    return new Model({
        get: function() { return [x.get(), y.get()]; },
        set: function(p) { x.set(p[0]); y.set(p[1]); },
    });
};

Model.ref = /* static */ function(obj, prop) {
    return new Model({
        get: function() { return obj[prop]; },
        set: function(v) { obj[prop] = v; }
    });
};

Model.constant = /* static */ function(v) {
    return new Model({
        get: function() { return v; },
        set: function(_) { }
    });
};

Model.prototype.clamped = function(lo, hi) {
    var m = this;
    return new Model({
        get: function() { return m.get(); },
        set: function(v) { m.set(Math.min(hi, Math.max(lo, v))); }
    });
}

Model.prototype.add = function(a) {
    var m = this;
    return new Model({
        get: function() { return m.get() + a; },
        set: function(v) { m.set(v - a); }
    });
}

Model.prototype.rounded = function() {
    var m = this;
    return new Model({
        get: function() { return m.get(); },
        set: function(v) { m.set(Math.round(v)); }
    });
}

Model.prototype.multiply = function(k) {
    var m = this;
    return new Model({
        get: function() { return m.get() * k; },
        set: function(v) { m.set(v / k); }
    });
}

function polar(r, a) {
    return new Model({
        get: function() { return [r.get() * Math.cos(a.get()), r.get() * Math.sin(a.get())]; },
        set: function(p) {
            r.set(Math.sqrt(p[0]*p[0] + p[1]*p[1]));
            if (p[0] != 0.0 || p[1] != 0.0){
                a.set(Math.atan2(p[1], p[0]));
            }
        },
    });
}

Model.prototype.offset = function(p) {
    var m = this;
    return new Model({
        get: function() { return [m.get()[0] + p[0], m.get()[1] + p[1]]; },
        set: function(r) { m.set([r[0] - p[0], r[1] - p[1]]); },
    });
}


function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
}

function dragged(d) {
    d.set([d3.event.x, d3.event.y]);
    d3.select(this)
        .attr("cx", d.cx())
        .attr("cy", d.cy());
}

function dragended(d) {
  d3.select(this).classed("active", false);
}
