'use client';

import { useEffect } from 'react';
import { useIsClient } from '../utilities/is-client-ctx';

export default function HydraCanvas() {
	const isClient = useIsClient();
	let hydra: any;
	{
		isClient &&
			(() => {
				hydra = new Hydra({
					canvas: document.getElementById('hydra-canvas'),
					detectAudio: false,
					absolute: true,
					autoLoop: true,
					makeGlobal: false,
					numSources: 4,
					numOutputs: 4,
				}).synth;

				hydra
					.osc(58.306, -0.019, 0.244)
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
					.contrast(2.665)
					.add(hydra.src(hydra.o0).modulate(hydra.o0, 0.036), 0.911)
					.invert()
					.brightness(0.128)
					.contrast(1.483)
					.modulateScale(hydra.osc(0.479), -0.009)
					.out();
				hydra.render();
			})();
	}

	return (
		<div className={`absolute `}>
			<canvas
				id="hydra-canvas"
				className={`z-[-201] w-[${window.innerWidth}px] h-[${window.innerHeight}px]`}
			></canvas>
		</div>
	);
}
