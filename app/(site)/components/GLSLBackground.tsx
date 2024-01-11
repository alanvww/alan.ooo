/* eslint-disable react-hooks/exhaustive-deps */

'use client'; // components/GLSLBackground.tsx
// components/GLSLBackground.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GLSLBackground: React.FC = () => {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!mountRef.current) return;

		// Scene, Camera, and Renderer setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 1;
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		mountRef.current.appendChild(renderer.domElement);

		// Simplified Shader Material
		const material = new THREE.ShaderMaterial({
			uniforms: {
				time: { value: 0 },
				resolution: {
					value: new THREE.Vector2(window.innerWidth, window.innerHeight),
				},
			},
			vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
			fragmentShader: `
        precision highp float;

        uniform float time;
        uniform vec2 resolution;

        void main() {
            vec2 uv = gl_FragCoord.xy / resolution;
            vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
            gl_FragColor = vec4(color, 1.0);
        }
      `,
		});

		// Plane Geometry for the shader
		const geometry = new THREE.PlaneGeometry(2, 2);
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);
			material.uniforms.time.value += 0.01;
			renderer.render(scene, camera);
		};
		animate();

		// Clean up on unmount
		return () => {
			mountRef.current?.removeChild(renderer.domElement);
			scene.clear();
			geometry.dispose();
			material.dispose();
		};
	}, []);

	return (
		<div
			ref={mountRef}
			className="absolute top-0 left-0 w-full h-full z-[-1]"
		/>
	);
};

export default GLSLBackground;
