/* eslint-disable react-hooks/exhaustive-deps */
'use client';
// components/WebGLBackground.tsx
import { RefObject, useEffect, useRef } from 'react';

export interface GlassRect {
	/** Screen pixel center of the (unrotated) card in DOM coords (y-down). */
	centerX: number;
	centerY: number;
	/** Unrotated card half-dimensions, pixels. */
	halfWidth: number;
	halfHeight: number;
	radius?: number;
	/** Pointer-driven tilt magnitudes used by shader lighting. */
	tiltX?: number;
	tiltY?: number;
	/**
	 * Inverse of the local→screen homography, 9 floats column-major.
	 * Lets the shader convert each screen pixel into the card's local
	 * coordinate frame so the glass region rotates with the CSS card.
	 * Pass the 3x3 identity (or omit) for the unrotated case.
	 */
	hInv?: Float32Array;
}

interface WebGLBackgroundProps {
	glassRectRef?: RefObject<GlassRect | null>;
}

const VERTEX_SHADER = `
attribute vec4 position;
void main() {
    gl_Position = position;
}
`;

const SCENE_FRAGMENT_SHADER = `
#ifdef GL_ES
precision highp float;
#endif

uniform float uTime;
uniform vec2 uResolution;

#define iTime uTime
#define iResolution uResolution
#define t iTime
#define SAMPLES 5
#define FOCAL_DISTANCE 2.0
#define FOCAL_RANGE 10.0

mat2 m(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float map(vec3 p) {
    p.xz *= m(t * 0.8);
    p.xy *= m(t * 0.6);
    vec3 q = p * 2.0 + t;
    return length(p + vec3(sin(t * 0.7))) * log(length(p) + 1.0)
         + sin(q.x + sin(q.z + sin(q.y))) * 0.5 - 3.0;
}

vec3 hslToRgb(vec3 hsl) {
    vec3 rgb = clamp(abs(mod(hsl.x * 6.0 + vec3(5.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return hsl.z + hsl.y * (rgb - 0.5) * (1.0 - abs(2.0 * hsl.z - 1.0));
}

vec3 getColor(in vec2 fragCoord, in float depth) {
    vec2 p = fragCoord.xy / iResolution.y - vec2(0.9, 0.5);
    vec3 cl = vec3(0.0);
    float d = depth;
    for (int i = 0; i <= 5; i++) {
        vec3 pp = vec3(0.0, 0.0, 5.0) + normalize(vec3(p, -1.0)) * d;
        float rz = map(pp);
        float f = clamp((rz - map(pp + 0.1)) * 0.5, -1.1, 1.0);
        float hue = mod(t * 1.0 + float(i) / 5.0, 1.0);
        float hueRange = 0.5;
        float hueShift = 0.3;
        hue = mix(0.0, 1.0, smoothstep(0.0, hueRange, hue)) + hueShift;
        vec3 color = hslToRgb(vec3(hue, 0.0, 0.8));
        vec3 l = color + vec3(1.0, 5.5, 0.5) * f;
        cl = cl * l + smoothstep(1.5, 0.0, rz) * 0.3 * l;
        d += min(rz, 1.0);
    }
    return cl;
}

void main(void) {
    vec3 color = vec3(0.0);
    float depthSum = 0.2;
    for (int i = 0; i < SAMPLES; i++) {
        float depth = FOCAL_DISTANCE + (float(i) / float(SAMPLES - 1)) * FOCAL_RANGE;
        vec3 c = getColor(gl_FragCoord.xy, depth);
        float w = 1.0 / (1.0 + abs(depth - FOCAL_DISTANCE));
        color += c * w;
        depthSum += w;
    }
    gl_FragColor = vec4(color / depthSum, 1.0);
}
`;

const COMPOSITE_FRAGMENT_SHADER = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uScene;
uniform vec2 uResolution;
uniform vec2 uGlassCenter;        // gl_FragCoord space (y-up from bottom)
uniform vec2 uGlassHalfSize;      // unrotated local half-dimensions
uniform mat3 uGlassHinv;          // screen → local homography inverse
uniform float uGlassEnabled;
uniform float uGlassRadius;
uniform vec2 uGlassTilt;
uniform vec2 uPoisson[24];

float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + vec2(r);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

vec3 sampleScene(vec2 fc) {
    vec2 uv = clamp(fc / uResolution, vec2(0.0), vec2(1.0));
    return texture2D(uScene, uv).rgb;
}

void main() {
    vec2 fc = gl_FragCoord.xy;

    if (uGlassEnabled < 0.5) {
        gl_FragColor = vec4(sampleScene(fc), 1.0);
        return;
    }

    // Convert screen pixel to local card coords via inverse homography.
    // Flip Y because gl_FragCoord is y-up while CSS coords are y-down.
    vec2 relGL = fc - uGlassCenter;
    vec2 relDOM = vec2(relGL.x, -relGL.y);
    vec3 homo = uGlassHinv * vec3(relDOM, 1.0);
    vec2 local = homo.xy / homo.z;

    float sd = sdRoundedBox(local, uGlassHalfSize, uGlassRadius);
    float mask = 1.0 - smoothstep(-0.5, 0.5, sd);

    vec3 base = sampleScene(fc);

    if (mask <= 0.001) {
        gl_FragColor = vec4(base, 1.0);
        return;
    }

    // Refraction warp: outward push in local space + parallax offset from tilt.
    vec2 norm = local / max(uGlassHalfSize, vec2(1.0));
    vec2 tiltOffset = vec2(uGlassTilt.y, -uGlassTilt.x) * 42.0;
    vec2 warp = norm * 9.0 + tiltOffset;
    vec2 warpedFc = fc + warp;

    // Polished frost blur: 24-tap Poisson disc with gaussian falloff.
    float blurRadius = 22.0;
    vec3 blur = vec3(0.0);
    float wSum = 0.0;
    for (int i = 0; i < 24; i++) {
        vec2 s = uPoisson[i];
        float d2 = dot(s, s);
        float w = exp(-1.1 * d2);
        blur += sampleScene(warpedFc + s * blurRadius) * w;
        wSum += w;
    }
    blur /= wSum;

    // Subtle white frost tint.
    vec3 glass = mix(blur, vec3(1.0), 0.12);

    // Specular highlight: bright spot positioned in local space, driven by tilt.
    vec2 highlightOffset = vec2(-uGlassTilt.y, uGlassTilt.x) * uGlassHalfSize * 0.55;
    vec2 toHighlight = (local - highlightOffset) / max(min(uGlassHalfSize.x, uGlassHalfSize.y), 1.0);
    float h2 = dot(toHighlight, toHighlight);
    float highlight = exp(-h2 * 4.0);
    glass += vec3(1.0) * highlight * 0.22;

    // The CSS card draws the rim; shader contributes the surface only.
    vec3 result = mix(base, glass, mask);
    gl_FragColor = vec4(result, 1.0);
}
`;

// 24-tap Poisson disc samples in the unit disc.
const POISSON_24 = new Float32Array([
	-0.613392, 0.617481, 0.170019, -0.040254, -0.299417, 0.791925, 0.64568,
	0.49321, -0.651784, 0.717887, 0.421003, 0.02707, -0.817194, -0.271096,
	-0.705374, -0.668203, 0.97705, -0.108615, 0.063326, 0.142369, 0.203528,
	0.214331, -0.667531, 0.32609, -0.098422, -0.295755, -0.885922, 0.215369,
	0.566637, 0.605213, 0.039766, -0.3961, 0.751946, 0.453352, 0.078707,
	-0.715323, -0.075838, -0.529344, 0.724479, -0.580798, 0.222999, -0.215125,
	-0.467574, -0.405438, -0.248268, -0.814753, 0.354411, -0.88757,
]);

const IDENTITY_HINV = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);

const WebGLBackground = ({ glassRectRef }: WebGLBackgroundProps = {}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const gl = canvas.getContext('webgl', {
			antialias: false,
			alpha: false,
			premultipliedAlpha: false,
		}) as WebGLRenderingContext | null;
		if (!gl) {
			console.error('Unable to initialize WebGL.');
			return;
		}

		const compile = (type: number, source: string) => {
			const sh = gl.createShader(type)!;
			gl.shaderSource(sh, source);
			gl.compileShader(sh);
			if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
				console.error('Shader compile error:', gl.getShaderInfoLog(sh));
				gl.deleteShader(sh);
				return null;
			}
			return sh;
		};

		const link = (vs: WebGLShader, fs: WebGLShader) => {
			const prog = gl.createProgram()!;
			gl.attachShader(prog, vs);
			gl.attachShader(prog, fs);
			gl.linkProgram(prog);
			if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
				console.error('Program link error:', gl.getProgramInfoLog(prog));
				return null;
			}
			return prog;
		};

		const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
		const sceneFs = compile(gl.FRAGMENT_SHADER, SCENE_FRAGMENT_SHADER);
		const compFs = compile(gl.FRAGMENT_SHADER, COMPOSITE_FRAGMENT_SHADER);
		if (!vs || !sceneFs || !compFs) return;
		const sceneProg = link(vs, sceneFs);
		const compProg = link(vs, compFs);
		if (!sceneProg || !compProg) return;

		const quad = gl.createBuffer()!;
		gl.bindBuffer(gl.ARRAY_BUFFER, quad);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]),
			gl.STATIC_DRAW
		);

		const bindQuad = (prog: WebGLProgram) => {
			const loc = gl.getAttribLocation(prog, 'position');
			gl.bindBuffer(gl.ARRAY_BUFFER, quad);
			gl.enableVertexAttribArray(loc);
			gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
		};

		const sceneUTime = gl.getUniformLocation(sceneProg, 'uTime');
		const sceneURes = gl.getUniformLocation(sceneProg, 'uResolution');

		const compUScene = gl.getUniformLocation(compProg, 'uScene');
		const compURes = gl.getUniformLocation(compProg, 'uResolution');
		const compGlassCenter = gl.getUniformLocation(compProg, 'uGlassCenter');
		const compGlassHalfSize = gl.getUniformLocation(
			compProg,
			'uGlassHalfSize'
		);
		const compGlassHinv = gl.getUniformLocation(compProg, 'uGlassHinv');
		const compGlassEnabled = gl.getUniformLocation(compProg, 'uGlassEnabled');
		const compGlassRadius = gl.getUniformLocation(compProg, 'uGlassRadius');
		const compGlassTilt = gl.getUniformLocation(compProg, 'uGlassTilt');
		const compPoisson = gl.getUniformLocation(compProg, 'uPoisson[0]');

		gl.useProgram(compProg);
		gl.uniform2fv(compPoisson, POISSON_24);

		const sceneTex = gl.createTexture()!;
		const fbo = gl.createFramebuffer()!;
		gl.bindTexture(gl.TEXTURE_2D, sceneTex);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		let texW = 0;
		let texH = 0;
		const allocTexture = (w: number, h: number) => {
			if (w === texW && h === texH) return;
			gl.bindTexture(gl.TEXTURE_2D, sceneTex);
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				w,
				h,
				0,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				null
			);
			gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
			gl.framebufferTexture2D(
				gl.FRAMEBUFFER,
				gl.COLOR_ATTACHMENT0,
				gl.TEXTURE_2D,
				sceneTex,
				0
			);
			const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
			if (status !== gl.FRAMEBUFFER_COMPLETE) {
				console.error('Framebuffer incomplete:', status);
			}
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			texW = w;
			texH = h;
		};

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			allocTexture(canvas.width, canvas.height);
		};
		resize();
		window.addEventListener('resize', resize);

		const startTime = Date.now();
		let raf = 0;
		const render = () => {
			const time = (Date.now() - startTime) / 1000;

			gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.useProgram(sceneProg);
			bindQuad(sceneProg);
			gl.uniform1f(sceneUTime, time);
			gl.uniform2f(sceneURes, canvas.width, canvas.height);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.useProgram(compProg);
			bindQuad(compProg);
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, sceneTex);
			gl.uniform1i(compUScene, 0);
			gl.uniform2f(compURes, canvas.width, canvas.height);

			const rect = glassRectRef?.current;
			if (rect) {
				gl.uniform2f(
					compGlassCenter,
					rect.centerX,
					canvas.height - rect.centerY
				);
				gl.uniform2f(compGlassHalfSize, rect.halfWidth, rect.halfHeight);
				gl.uniformMatrix3fv(
					compGlassHinv,
					false,
					rect.hInv ?? IDENTITY_HINV
				);
				gl.uniform1f(compGlassEnabled, 1);
				gl.uniform1f(compGlassRadius, rect.radius ?? 0);
				gl.uniform2f(compGlassTilt, rect.tiltX ?? 0, rect.tiltY ?? 0);
			} else {
				gl.uniform1f(compGlassEnabled, 0);
			}

			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

			raf = requestAnimationFrame(render);
		};
		render();

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', resize);
			gl.deleteProgram(sceneProg);
			gl.deleteProgram(compProg);
			gl.deleteShader(vs);
			gl.deleteShader(sceneFs);
			gl.deleteShader(compFs);
			gl.deleteBuffer(quad);
			gl.deleteTexture(sceneTex);
			gl.deleteFramebuffer(fbo);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="absolute overflow-x-hidden top-0 left-0 w-full h-full z-[-1]"
		/>
	);
};

export default WebGLBackground;
