'use client';
import '@/app/(site)/styles/cursor.css'
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Types
interface CursorPosition {
	x: number;
	y: number;
}

interface CursorProps {
	enableCustomCursor?: boolean;
}

// Custom hooks
const useDeviceDetect = () => {
	const [device, setDevice] = useState<'loading' | 'computer' | 'tablet' | 'smartphone'>('loading');

	useEffect(() => {
		const detectDevice = () => {
			const hasTouchScreen = (
				'ontouchstart' in window ||
				navigator.maxTouchPoints > 0
			);

			const width = window.innerWidth;
			const isMobileUA = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);

			if ((!hasTouchScreen && width >= 1024) || (width >= 1280 && !isMobileUA)) {
				setDevice('computer');
			} else if (width >= 640 || (hasTouchScreen && width >= 768)) {
				setDevice('tablet');
			} else {
				setDevice('smartphone');
			}
		};

		detectDevice();

		// Throttle resize event
		let resizeTimeout: ReturnType<typeof setTimeout>;
		const handleResize = () => {
			if (resizeTimeout) clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(detectDevice, 100);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return device;
};

const NewCursor: React.FC<CursorProps> = ({ enableCustomCursor = true }) => {
	const [position, setPosition] = useState<CursorPosition>({ x: -100, y: -100 });
	const [isPointer, setIsPointer] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isOverIframe, setIsOverIframe] = useState(false);
	const device = useDeviceDetect();

	const isComputerDevice = device === 'computer';
	const shouldRender = enableCustomCursor && isComputerDevice;

	// Check if mouse is over an iframe
	const checkIfOverIframe = useCallback((x: number, y: number): boolean => {
		try {
			const elementsAtPoint = document.elementsFromPoint(x, y);
			return elementsAtPoint.some(el => el.tagName.toLowerCase() === 'iframe');
		} catch (error) {
			console.error('Error checking iframe:', error);
			return false;
		}
	}, []);

	// Detect if element is interactive
	const detectPointerElement = useCallback((element: Element | null): boolean => {
		if (!element) return false;

		try {
			// Check for iframes
			if (element.tagName.toLowerCase() === 'iframe') {
				return true;
			}

			// Get computed style
			const style = window.getComputedStyle(element);
			const interactiveCursors = ['pointer', 'grab', 'grabbing', 'text', 'cell', 'move'];

			return (
				interactiveCursors.includes(style.cursor) ||
				element.hasAttribute('onclick') ||
				element.getAttribute('role') === 'button' ||
				(element.parentElement ? detectPointerElement(element.parentElement) : false)
			);
		} catch (error) {
			console.error('Error in pointer detection:', error);
			return false;
		}
	}, []);

	// Handle mouse movement
	const handleMouseMove = useCallback((e: MouseEvent) => {
		requestAnimationFrame(() => {
			try {
				// Validate position
				if (
					typeof e.clientX === 'number' &&
					typeof e.clientY === 'number' &&
					!isNaN(e.clientX) &&
					!isNaN(e.clientY) &&
					e.clientX >= 0 &&
					e.clientX <= window.innerWidth &&
					e.clientY >= 0 &&
					e.clientY <= window.innerHeight
				) {
					// Check for iframes - this triggers transition instead of abrupt disappearance
					const iframeCheck = checkIfOverIframe(e.clientX, e.clientY);
					setIsOverIframe(iframeCheck);
					setIsVisible(!iframeCheck);

					// Update position
					setPosition({ x: e.clientX, y: e.clientY });

					// Check for interactive elements
					if (!iframeCheck) {
						const target = document.elementFromPoint(e.clientX, e.clientY);
						if (target) {
							const isInteractive = detectPointerElement(target);
							setIsPointer(isInteractive);
						}
					}
				} else {
					setIsVisible(false);
				}
			} catch (error) {
				console.error('Mouse move error:', error);
				setIsVisible(false);
			}
		});
	}, [checkIfOverIframe, detectPointerElement]);

	// Setup iframe listeners via MutationObserver - keeping only this as requested
	useEffect(() => {
		if (!isComputerDevice) return;

		// Function to add listeners to iframes
		const setupIframeListeners = () => {
			const iframes = document.querySelectorAll('iframe');
			iframes.forEach(iframe => {
				// Clean up possible duplicate listeners by using named functions
				const mouseEnterHandler = () => {
					setIsOverIframe(true);
					setIsVisible(false);
				};

				// Add listeners directly to iframes
				iframe.addEventListener('mouseenter', mouseEnterHandler);
			});
		};

		// Setup observer for dynamically added iframes
		const observer = new MutationObserver((mutations) => {
			let hasNewIframes = false;

			for (const mutation of mutations) {
				if (mutation.type === 'childList') {
					const addedIframes = Array.from(mutation.addedNodes)
						.filter((node: any) => node.nodeName && node.nodeName.toLowerCase() === 'iframe');

					if (addedIframes.length > 0) {
						hasNewIframes = true;
						break;
					}
				}
			}

			if (hasNewIframes) {
				setupIframeListeners();
			}
		});

		// Start observing
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		// Initial setup for existing iframes
		setupIframeListeners();

		return () => observer.disconnect();
	}, [isComputerDevice]);

	// Add basic mouse event listeners
	useEffect(() => {
		if (!isComputerDevice) return;

		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseleave', () => setIsVisible(false));

		// Handle visibility changes
		const handleVisibilityChange = () => {
			if (document.hidden) {
				setIsVisible(false);
			}
		};
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseleave', () => setIsVisible(false));
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [isComputerDevice, handleMouseMove]);

	// Don't render if not on computer
	if (!shouldRender) {
		return null;
	}

	// Classes for smooth transitions
	const cursorClasses = [
		'flare',
		isPointer ? 'pointer' : '',
		!isVisible ? 'hidden' : '',
		isOverIframe ? 'transitioning over-iframe' : ''
	].filter(Boolean).join(' ');

	return (
		<div
			className={cursorClasses}
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
				width: isPointer ? '30px' : '100px',
				height: isPointer ? '30px' : '100px',
				transform: 'translate(-50%, -50%) translateZ(0)',
				willChange: 'transform, width, height',
			}}
			aria-hidden="true"
		/>
	);
};

export default React.memo(NewCursor);