'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { defaultTransition, DURATION } from '@/app/(site)/utilities/animations';
import WebGLBackground, { GlassRect } from './WebGLBackground';

const GLASS_RADIUS = 24;
const MAX_TILT_DEG = 10;
const TILT_LERP = 0.12;
const INFLUENCE = 0.85;
const PERSPECTIVE = 900;

const clamp = (n: number, lo: number, hi: number) =>
	Math.max(lo, Math.min(hi, n));

/**
 * Inverse of the local→screen homography produced by
 * `perspective(p) rotateX(rxRad) rotateY(ryRad)` applied around the card center.
 * Result written column-major into `out` (9 floats) for WebGL's mat3 layout.
 */
function computeHInv(rxRad: number, ryRad: number, out: Float32Array) {
	const ca = Math.cos(rxRad);
	const sa = Math.sin(rxRad);
	const cb = Math.cos(ryRad);
	const sb = Math.sin(ryRad);

	// H (row-major): maps (u, v, 1) → homogeneous screen (X, Y, W)
	// Derived from M = P · Rx · Ry applied to (u, v, 0, 1).
	// row 0: X = cb·u
	// row 1: Y = sb·sa·u + ca·v
	// row 2: W = (sb·ca/p)·u + (-sa/p)·v + 1
	const m00 = cb,
		m01 = 0,
		m02 = 0;
	const m10 = sb * sa,
		m11 = ca,
		m12 = 0;
	const m20 = (sb * ca) / PERSPECTIVE,
		m21 = -sa / PERSPECTIVE,
		m22 = 1;

	const det =
		m00 * (m11 * m22 - m12 * m21) -
		m01 * (m10 * m22 - m12 * m20) +
		m02 * (m10 * m21 - m11 * m20);
	const invDet = 1 / det;

	// Inverse (row-major) via cofactors transposed.
	const inv00 = (m11 * m22 - m12 * m21) * invDet;
	const inv01 = (m02 * m21 - m01 * m22) * invDet;
	const inv02 = (m01 * m12 - m02 * m11) * invDet;
	const inv10 = (m12 * m20 - m10 * m22) * invDet;
	const inv11 = (m00 * m22 - m02 * m20) * invDet;
	const inv12 = (m02 * m10 - m00 * m12) * invDet;
	const inv20 = (m10 * m21 - m11 * m20) * invDet;
	const inv21 = (m01 * m20 - m00 * m21) * invDet;
	const inv22 = (m00 * m11 - m01 * m10) * invDet;

	// Pack column-major for WebGL.
	out[0] = inv00;
	out[1] = inv10;
	out[2] = inv20;
	out[3] = inv01;
	out[4] = inv11;
	out[5] = inv21;
	out[6] = inv02;
	out[7] = inv12;
	out[8] = inv22;
}

export default function UnderConstruction() {
	const cardRef = useRef<HTMLDivElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);
	const glassRectRef = useRef<GlassRect | null>(null);

	useEffect(() => {
		const card = cardRef.current;
		const content = contentRef.current;
		if (!card || !content) return;

		const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
		const hInv = new Float32Array(9);

		const updateGlass = (rotXDeg: number, rotYDeg: number) => {
			const r = card.getBoundingClientRect();
			const halfW = card.offsetWidth / 2;
			const halfH = card.offsetHeight / 2;
			computeHInv(
				(rotXDeg * Math.PI) / 180,
				(rotYDeg * Math.PI) / 180,
				hInv
			);
			glassRectRef.current = {
				centerX: r.left + r.width / 2,
				centerY: r.top + r.height / 2,
				halfWidth: halfW,
				halfHeight: halfH,
				radius: GLASS_RADIUS,
				// Shader uses these to position the specular highlight/parallax.
				// (tilt.y → rotateX axis, tilt.x → rotateY axis)
				tiltX: tilt.y,
				tiltY: tilt.x,
				hInv,
			};
		};

		const setTarget = (clientX: number, clientY: number) => {
			const r = card.getBoundingClientRect();
			const cx = r.left + r.width / 2;
			const cy = r.top + r.height / 2;
			tilt.tx = clamp((clientX - cx) / (r.width * INFLUENCE), -1, 1);
			tilt.ty = clamp((clientY - cy) / (r.height * INFLUENCE), -1, 1);
		};

		const onPointerMove = (e: PointerEvent) => {
			setTarget(e.clientX, e.clientY);
		};

		const resetTarget = () => {
			tilt.tx = 0;
			tilt.ty = 0;
		};

		const onPointerEnd = (e: PointerEvent) => {
			if (e.pointerType !== 'mouse') resetTarget();
		};

		let raf = 0;
		const animate = () => {
			tilt.x += (tilt.tx - tilt.x) * TILT_LERP;
			tilt.y += (tilt.ty - tilt.y) * TILT_LERP;

			const rotX = -tilt.y * MAX_TILT_DEG;
			const rotY = tilt.x * MAX_TILT_DEG;
			card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotX.toFixed(
				3
			)}deg) rotateY(${rotY.toFixed(3)}deg)`;

			const drift = 4;
			const tx = tilt.x * drift;
			const ty = -tilt.y * drift;
			content.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(
				2
			)}px, 0)`;

			updateGlass(rotX, rotY);
			raf = requestAnimationFrame(animate);
		};
		animate();

		const ro = new ResizeObserver(() => updateGlass(0, 0));
		ro.observe(card);

		window.addEventListener('pointermove', onPointerMove, { passive: true });
		window.addEventListener('pointerup', onPointerEnd);
		window.addEventListener('pointercancel', onPointerEnd);
		window.addEventListener('scroll', () => updateGlass(0, 0), {
			passive: true,
		});
		document.addEventListener('mouseleave', resetTarget);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('pointerup', onPointerEnd);
			window.removeEventListener('pointercancel', onPointerEnd);
			document.removeEventListener('mouseleave', resetTarget);
		};
	}, []);

	return (
		<>
			<WebGLBackground glassRectRef={glassRectRef} />
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ ...defaultTransition, duration: DURATION.slow }}
				className="select-none fixed inset-0 z-10 flex items-center justify-center px-6"
				style={{ perspective: PERSPECTIVE }}
			>
				<div
					ref={cardRef}
					style={{
						borderRadius: GLASS_RADIUS,
						transformStyle: 'preserve-3d',
						willChange: 'transform',
						boxShadow:
							'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 0 0 1px rgba(255,255,255,0.10)',
					}}
					className="relative w-full max-w-xl px-8 py-9 md:px-12 md:py-12 text-center text-white"
				>
					<div
						ref={contentRef}
						style={{
							transformStyle: 'preserve-3d',
							willChange: 'transform',
						}}
					>
						<h1
							className="font-extrabold tracking-tight text-5xl md:text-7xl leading-[0.95]"
							style={{
								backgroundImage:
									'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 100%)',
								WebkitBackgroundClip: 'text',
								backgroundClip: 'text',
								color: 'transparent',
								textShadow:
									'0 1px 0 rgba(0,0,0,0.22), 0 0 28px rgba(255,255,255,0.08)',
							}}
						>
							Hi there :D
						</h1>

						<div
							aria-hidden
							className="mx-auto mt-7 h-px w-16"
							style={{
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)',
							}}
						/>

						<p className="mt-5 font-mono text-xs md:text-sm uppercase tracking-[0.28em] opacity-90">
							Currently under construction
						</p>
						<p className="mt-2 font-mono text-xs md:text-sm opacity-65">
							Updating the site — check back soon.
						</p>
					</div>
				</div>
			</motion.main>
		</>
	);
}
