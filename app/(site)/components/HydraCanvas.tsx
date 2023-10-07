'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

const HydraCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	let nWidth = window.innerWidth;
	let nWeight = window.innerHeight;
	let hydra: any;

	useEffect(() => {
		// Cleanup
		return () => {
			nWidth = window.innerWidth;
			nWeight = window.innerHeight;
			//hydra.hush();
			//hydra = null;
		};
	}, []);

	return (
		<>
			<canvas
				ref={canvasRef}
				id="hydra-canvas"
				width={nWidth * 2}
				height={nWeight * 2}
				className={`fixed transition-all ease-out left-0 top-0 z-[-200]`}
			/>

			<Script
				src="https://unpkg.com/hydra-synth"
				strategy="afterInteractive"
				onReady={() => {
					nWidth = window.innerWidth;
					nWeight = window.innerHeight;

					// create a new hydra-synth instance
					hydra = new Hydra({
						canvas: document.getElementById('hydra-canvas'),
						detectAudio: false,
						autoLoop: true,
						makeGlobal: false,
						width: nWidth,
						height: nWeight,
					}).synth;

					window.addEventListener('resize', () => {
						console.log('resize');
						canvasRef.current
							?.getContext('2d')
							?.clearRect(0, 0, nWidth, nWeight);
						if (hydra) {
							hydra.hush();
							hydra = null;
							nWidth = window.innerWidth;
							nWeight = window.innerHeight;

							hydra = new Hydra({
								canvas: document.getElementById('hydra-canvas'),
								detectAudio: false,
								autoLoop: true,
								makeGlobal: false,
								width: nWidth,
								height: nWeight,
							}).synth;

							hydra
								.osc(58.306, -0.101, 0.244)
								.diff(hydra.osc(57.326, 0.152).rotate(Math.PI / 0.032))
								.modulateScale(
									hydra
										.noise(9.822, 0.121)
										.modulateScale(
											hydra
												.osc(17.294)
												.rotate(() => Math.sin(hydra.time / 2.274))
										),
									0.741
								)
								.color(1.31, 13.155, 0.522)
								.invert()
								.brightness(-0.25)
								.contrast(1.483)
								.modulateScale(hydra.osc(0.002), -0.009)
								.out();
							hydra.render();
						}
					});

					hydra
						.osc(58.306, -0.101, 0.244)
						.diff(hydra.osc(57.326, 0.152).rotate(Math.PI / 0.032))
						.modulateScale(
							hydra
								.noise(9.822, 0.121)
								.modulateScale(
									hydra.osc(17.294).rotate(() => Math.sin(hydra.time / 2.274))
								),
							0.741
						)
						.color(1.31, 13.155, 0.522)
						.invert()
						.brightness(-0.25)
						.contrast(1.483)
						.modulateScale(hydra.osc(0.002), -0.009)
						.out();
					hydra.render();
				}}
			/>
		</>
	);
};

export default HydraCanvas;
