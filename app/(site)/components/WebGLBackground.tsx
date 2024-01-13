/* eslint-disable react-hooks/exhaustive-deps */
'use client';
// components/WebGLBackground.tsx
import { useEffect, useRef } from 'react';

const WebGLBackground = () => {
	const canvasRef = useRef(null);
	let program: WebGLProgram;
	let uTimeLocation: WebGLUniformLocation;
	let uResolutionLocation: WebGLUniformLocation;

	useEffect(() => {
		const canvas = canvasRef.current as unknown as HTMLCanvasElement;
		const gl = canvas.getContext('webgl');

		if (!gl) {
			console.error(
				'Unable to initialize WebGL. Your browser may not support it.'
			);
			return;
		}

		// Functions for shader creation, program setup, etc.
		const createShader = (
			gl: WebGLRenderingContext,
			type: number,
			source: string
		) => {
			const shader = gl.createShader(type) as WebGLShader;
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				alert(
					'An error occurred compiling the shaders: ' +
						gl.getShaderInfoLog(shader)
				);
				gl.deleteShader(shader);
				return null;
			}
			return shader;
		};

		const createProgram = (
			gl: WebGLRenderingContext,
			vertexShader: any,
			fragmentShader: any
		) => {
			const program = gl.createProgram() as WebGLProgram;
			gl.attachShader(program, vertexShader);
			gl.attachShader(program, fragmentShader);
			gl.linkProgram(program);
			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
				alert(
					'Unable to initialize the shader program: ' +
						gl.getProgramInfoLog(program)
				);
				return null;
			}
			return program;
		};

		// Vertex shader source
		const vertexShaderSource = `
      // Vertex shader code
      attribute vec4 position;
      void main() {
        gl_Position = position;
      }
    `;

		// Fragment shader source (Replace with your GLSL code)
		const fragmentShaderSource = `/*
        * Original shader from: https://www.shadertoy.com/view/DsVSRy
        */
       
       #ifdef GL_ES
       precision highp float;
       #endif
       
       // glslsandbox uniforms
       uniform float uTime;
       uniform vec2 uResolution;
       
       // shadertoy emulation
       #define iTime uTime
       #define iResolution uResolution
       
       // --------[ Original ShaderToy begins here ]---------- //
       #define t iTime 
#define SAMPLES 5
#define FOCAL_DISTANCE 2.0
#define FOCAL_RANGE 10.0
mat2 m(float a){float c=cos(a), s=sin(a);return mat2(c,-s,s,c);}

float map(vec3 p){
    p.xz *= m(t * 0.8);
    p.xy *= m(t * 0.6);
    vec3 q = p * 2.0 + t;
    return length(p + vec3(sin(t * 0.7))) * log(length(p) + 1.0) + sin(q.x + sin(q.z + sin(q.y))) * 0.5 - 3.0;
}

vec3 hslToRgb(vec3 hsl) {
    vec3 rgb = clamp(abs(mod(hsl.x * 6.0 + vec3(5.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return hsl.z + hsl.y * (rgb - 0.5) * (1.0 - abs(2.0 * hsl.z - 1.0));
}

vec3 getColor(in vec2 fragCoord, in float depth) {
    vec2 p = fragCoord.xy / iResolution.y - vec2(.9, .5);
    vec3 cl = vec3(0.);
    float d = depth;

    for (int i = 0; i <= 5; i++) {
        vec3 p = vec3(0, 0, 5.0) + normalize(vec3(p, -1.0)) * d;
        float rz = map(p);
        float f = clamp((rz - map(p + .1)) * 0.5, -1.1, 1.0);

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

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec3 color = vec3(0.0);
    float depthSum = 0.2;

    for (int i = 0; i < SAMPLES; i++) {
        float depth = FOCAL_DISTANCE + (float(i) / float(SAMPLES - 1)) * FOCAL_RANGE;
        vec3 sampleColor = getColor(fragCoord, depth);
        float weight = 1.0 / (1.0 + abs(depth - FOCAL_DISTANCE));

        color += sampleColor * weight;
        depthSum += weight;
    }

    color /= depthSum;

    fragColor = vec4(color, 1.0);
}
       // --------[ Original ShaderToy ends here ]---------- //
       
       void main(void)
       {
           mainImage(gl_FragColor, gl_FragCoord.xy);
       }
       
    `;

		// Create shaders
		const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = createShader(
			gl,
			gl.FRAGMENT_SHADER,
			fragmentShaderSource
		);

		// Create program
		program = createProgram(gl, vertexShader, fragmentShader) as WebGLProgram;

		// Set up buffers and attributes
		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		const positions = [-2.0, 2.0, 2.0, 2.0, -2.0, -2.0, 2.0, -2.0];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		const positionAttributeLocation = gl.getAttribLocation(program, 'position');
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

		// Set up uniforms
		uTimeLocation = gl.getUniformLocation(
			program,
			'uTime'
		) as WebGLUniformLocation;
		uResolutionLocation = gl.getUniformLocation(
			program,
			'uResolution'
		) as WebGLUniformLocation;

		// Animation loop
		let startTime = Date.now();
		const render = () => {
			const currentTime = Date.now();
			const elapsedTime = (currentTime - startTime) / 1000; // time in seconds

			gl.clearColor(0, 0, 0, 1);
			gl.clear(gl.COLOR_BUFFER_BIT);

			gl.useProgram(program);
			gl.uniform1f(uTimeLocation, elapsedTime);
			gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

			requestAnimationFrame(render);
		};
		render();

		const resizeCanvas = () => {
			const canvas = canvasRef.current as unknown as HTMLCanvasElement;
			if (canvas) {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
				gl.viewport(0, 0, canvas.width, canvas.height);

				// Update the resolution uniform
				if (program && uResolutionLocation) {
					gl.useProgram(program);
					gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
				}
			}
		};

		window.addEventListener('resize', resizeCanvas);
		resizeCanvas(); // Call once to set initial size
		// Cleanup
		return () => {
			window.removeEventListener('resize', resizeCanvas);
			gl.deleteProgram(program);
			gl.deleteShader(fragmentShader);
			gl.deleteShader(vertexShader);
			gl.deleteBuffer(positionBuffer);
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
