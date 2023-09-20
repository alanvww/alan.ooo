'use client';

import Script from 'next/script';

const HydraCanvas = () => {
	let width = window.innerWidth;
	let height = window.innerHeight;
	let hydra;
	return (
		<>
			<canvas
				id="hydra-canvas"
				width={width * 2}
				height={height * 2}
				className={`fixed transition-all ease-out left-0 top-0 z-[-200]`}
			/>

			<Script
				src="https://unpkg.com/hydra-synth"
				strategy="afterInteractive"
				onReady={() => {
					width = window.innerWidth;
					height = window.innerHeight;

					// create a new hydra-synth instance
					hydra = new Hydra({
						canvas: document.getElementById('hydra-canvas'),
						detectAudio: false,
						makeGlobal: true,
						width: width,
						height: height,
					});

					osc(58.306, -0.019, 0.244)
						.diff(osc(57.326, 0.152).rotate(Math.PI / 0.032))
						.modulateScale(
							noise(9.822, 0.121).modulateScale(
								osc(17.294).rotate(() => Math.sin(time / 2.274))
							),
							0.741
						)
						.color(1.31, 13.155, 0.522)
						.contrast(2.665)
						.add(src(o0).modulate(o0, 0.036), 0.911)
						.invert()
						.brightness(0.128)
						.contrast(1.483)
						.modulateScale(osc(0.479), -0.009)
						.out();
					render();
				}}
			/>
		</>
	);
};

export default HydraCanvas;
