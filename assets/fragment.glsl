#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.382,732.4234))) * 437.854);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}


float pattern(in vec2 p){
    vec2 q = vec2(fbm(p + vec2(1.1,2.3)),
                  fbm(p + vec2(5.2,1.3)));

    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7,3.5)),
                  fbm(p + 4.0 * q + vec2(9.2,1.3)));

    vec2 s = vec2(fbm(p + 8.0 * q + vec2(9.7,u_time/13.3)),
                  fbm(p + 8.0 * q + vec2(u_time/-11.1,sin(u_time / 100.))));


    return fbm(p + 8.0 * s);
}

float pattern2(in vec2 p){
    vec2 q = vec2(fbm(p + vec2(3.0,4.2)),
                  fbm(p + vec2(5.2,1.3)));

    vec2 r = vec2(fbm(p + 2.0 * q + vec2(1.7,u_time/10.0)),
                  fbm(p + 2.0 * q + vec2(9.2,u_time/10.0)));


    return fbm(p + 7.3 * r);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    //st.y += u_time / 20.0;

    vec3 color = vec3(0.0);
    //color.r = 4.0 * pow(pattern(st * 0.3), 3.0);
    //color.b = 3.14 * pattern2(st * 3.0);
    //color.g = 2.0 * pattern(st * 1.2) * pattern(st * 1.2);

    //color.r = 31.0 * pow(pattern((st + vec2(50., 51.)) * 1.3), 7.0);
    //color.g = 10.0 * pow(pattern((st + vec2(50., 50.)) * 1.3), 5.0);
    //color.b = 03.0 * pow(pattern((st + vec2(50., 50.)) * 1.3), 3.0);

    color.r = 3.0 * pow(pattern((st + vec2(50.00, 50.05)) * 1.3), 2.0);
    color.g = 3.0 * pow(pattern((st + vec2(50.05, 50.05)) * 1.3), 2.0);
    color.b = 3.0 * pow(pattern((st + vec2(50.05, 50.00)) * 1.3), 2.0);

    gl_FragColor = vec4(color,1.0);
}
