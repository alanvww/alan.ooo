'use client';
import '@/app/(site)/styles/cursor.css'
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Types
interface CursorPosition {
	x: number;
	y: number;
}

interface CursorState {
	position: CursorPosition;
	isPointer: boolean;
	isVisible: boolean;
	isOverIframe: boolean;
}

interface CursorProps {
	enableCustomCursor: boolean;
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

		// Throttle resize event for better performance
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

const useCursorState = (isComputerDevice: boolean): CursorState => {
	// All cursor state in one place
	const [cursorState, setCursorState] = useState<CursorState>({
		position: { x: -100, y: -100 },
		isPointer: false,
		isVisible: false,
		isOverIframe: false
	});

	// Setter functions for individual state properties
	const setPosition = useCallback((pos: CursorPosition) => {
		setCursorState(prev => ({ ...prev, position: pos }));
	}, []);

	const setIsPointer = useCallback((value: boolean) => {
		setCursorState(prev => ({ ...prev, isPointer: value }));
	}, []);

	const setIsVisible = useCallback((value: boolean) => {
		setCursorState(prev => ({ ...prev, isVisible: value }));
	}, []);

	const setIsOverIframe = useCallback((value: boolean) => {
		setCursorState(prev => ({ ...prev, isOverIframe: value }));
	}, []);

	// Check if the mouse is over an iframe - keep original implementation
	const checkIfOverIframe = useCallback((x: number, y: number): boolean => {
		if (!isComputerDevice) return false;

		try {
			const elementsAtPoint = document.elementsFromPoint(x, y);
			return elementsAtPoint.some(el => el.tagName.toLowerCase() === 'iframe');
		} catch (error) {
			console.error('Error checking iframe:', error);
			return false;
		}
	}, [isComputerDevice]);

	// Detect pointer elements - preserve original logic
	const detectPointerElement = useCallback((element: Element | null): boolean => {
		if (!element || !isComputerDevice) return false;

		try {
			// Check for iframe first - highest priority
			if (element.tagName.toLowerCase() === 'iframe') {
				setIsOverIframe(true);
				return true;
			}

			// Get computed style of the element
			const style = window.getComputedStyle(element);

			// Check for special cases first
			const tagName = element.tagName.toLowerCase();
			const id = element.id.toLowerCase();
			const isMediaElement = tagName === 'video' || tagName === 'iframe' || id === 'player';

			// List of cursor values that indicate interactive elements
			const interactiveCursors = ['pointer', 'grab', 'grabbing', 'text', 'cell', 'move'];

			// Special handling for media elements - important for detecting borders
			if (isMediaElement) {
				// Check if we're near the border of the media element
				const rect = element.getBoundingClientRect();
				const mouseX = cursorState.position.x;
				const mouseY = cursorState.position.y;

				// Define border threshold (in pixels)
				const borderThreshold = 10;

				const isNearBorder =
					Math.abs(mouseX - rect.left) < borderThreshold ||
					Math.abs(mouseX - rect.right) < borderThreshold ||
					Math.abs(mouseY - rect.top) < borderThreshold ||
					Math.abs(mouseY - rect.bottom) < borderThreshold;

				return isNearBorder;
			}

			// Check if element or its parent has an interactive cursor
			return (
				interactiveCursors.includes(style.cursor) ||
				element.hasAttribute('onclick') ||
				element.getAttribute('role') === 'button' ||
				!!(element.parentElement && detectPointerElement(element.parentElement))
			);
		} catch (error) {
			console.error('Error in pointer detection:', error);
			return false;
		}
	}, [cursorState.position, isComputerDevice, setIsOverIframe]);

	// Keep original mouse move handler with iframe checks
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
					// First, check if over iframe
					const iframeCheck = checkIfOverIframe(e.clientX, e.clientY);

					if (iframeCheck) {
						setIsOverIframe(true);
						setIsVisible(false);
						return; // Exit early if over iframe
					} else {
						setIsOverIframe(false);
					}

					// Update position
					setPosition({ x: e.clientX, y: e.clientY });
					setIsVisible(true);

					// Get the actual target element
					const target = document.elementFromPoint(e.clientX, e.clientY);

					// Use our enhanced pointer detection
					if (target) {
						const isInteractive = detectPointerElement(target);
						setIsPointer(isInteractive);
					}
				} else {
					setIsVisible(false);
				}
			} catch (error) {
				console.error('Mouse move error:', error);
				setIsVisible(false);
			}
		});
	}, [checkIfOverIframe, detectPointerElement, setIsOverIframe, setIsVisible, setPosition, setIsPointer]);

	// Handle iframe interactions - preserve original
	const handleIframeInteraction = useCallback((event: MouseEvent) => {
		// Check if we're over an iframe
		if (checkIfOverIframe(event.clientX, event.clientY)) {
			setIsOverIframe(true);
			setIsVisible(false);
		}
	}, [checkIfOverIframe, setIsOverIframe, setIsVisible]);

	// Handle mouse leaving iframe area - restore original behavior
	const handleMouseLeaveIframe = useCallback(() => {
		// Add a small delay to prevent flickering
		setTimeout(() => {
			if (!checkIfOverIframe(cursorState.position.x, cursorState.position.y)) {
				setIsOverIframe(false);
			}
		}, 50);
	}, [checkIfOverIframe, cursorState.position, setIsOverIframe]);

	// Setup event listeners for iframes - keep original implementation
	const setupIframeListeners = useCallback(() => {
		const iframes = document.querySelectorAll('iframe');

		iframes.forEach(iframe => {
			// Clean up old listeners first to prevent duplicates
			const cleanHandler = () => {
				setIsOverIframe(true);
				setIsVisible(false);
			};

			iframe.addEventListener('mouseover', cleanHandler);
			iframe.addEventListener('mouseenter', cleanHandler);
		});
	}, [setIsOverIframe, setIsVisible]);

	// Restore MutationObserver for dynamically added iframes
	useEffect(() => {
		if (!isComputerDevice) return;

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === 'childList') {
					const addedIframes = Array.from(mutation.addedNodes)
						.filter((node: any) => node.nodeName && node.nodeName.toLowerCase() === 'iframe');

					if (addedIframes.length > 0) {
						setupIframeListeners();
					}
				}
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		setupIframeListeners();

		return () => observer.disconnect();
	}, [isComputerDevice, setupIframeListeners]);

	// Setup event listeners - unified approach but keeping critical original behaviors
	useEffect(() => {
		if (!isComputerDevice) return;

		// Add our event listeners
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mousemove', handleIframeInteraction, true);

		// Additional listeners to ensure cursor always hides on iframes
		document.addEventListener('mouseover', (e: Event) => {
			if ((e.target as Element)?.tagName.toLowerCase() === 'iframe') {
				setIsOverIframe(true);
				setIsVisible(false);
			}
		}, true);

		// Handle mouse leaving window
		document.addEventListener('mouseleave', () => setIsVisible(false));

		// Handle visibility changes
		const handleVisibilityChange = () => {
			if (document.hidden) {
				setIsVisible(false);
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		// Setup iframe leave detection - important to prevent cursor sticking
		document.addEventListener('mouseout', (e: Event) => {
			if ((e.target as Element)?.tagName.toLowerCase() === 'iframe') {
				handleMouseLeaveIframe();
			}
		}, true);

		// Cleanup function
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mousemove', handleIframeInteraction, true);
			document.removeEventListener('mouseover', ((e: Event) => {
				if ((e.target as Element)?.tagName.toLowerCase() === 'iframe') {
					setIsOverIframe(true);
					setIsVisible(false);
				}
			}) as EventListener, true);
			document.removeEventListener('mouseleave', () => setIsVisible(false));
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			document.removeEventListener('mouseout', ((e: Event) => {
				if ((e.target as Element)?.tagName.toLowerCase() === 'iframe') {
					handleMouseLeaveIframe();
				}
			}) as EventListener, true);
		};
	}, [
		isComputerDevice,
		handleMouseMove,
		handleIframeInteraction,
		handleMouseLeaveIframe,
		setIsOverIframe,
		setIsVisible
	]);

	// Restore safety interval check for iframes
	useEffect(() => {
		if (!isComputerDevice) return;

		// Periodic check to ensure cursor is hidden over iframes
		const interval = setInterval(() => {
			if (cursorState.isVisible && cursorState.position.x > 0 && cursorState.position.y > 0) {
				if (checkIfOverIframe(cursorState.position.x, cursorState.position.y)) {
					setIsOverIframe(true);
					setIsVisible(false);
				}
			}
		}, 100); // Check every 100ms

		return () => clearInterval(interval);
	}, [
		isComputerDevice,
		cursorState.isVisible,
		cursorState.position,
		checkIfOverIframe,
		setIsOverIframe,
		setIsVisible
	]);

	return cursorState;
};

// Main component
const NewCursor: React.FC<CursorProps> = ({
	enableCustomCursor = true
}) => {
	const device = useDeviceDetect();
	const isComputerDevice = device === 'computer';
	const shouldRender = enableCustomCursor && isComputerDevice;

	// Always call hooks, regardless of render conditions
	const { position, isPointer, isVisible, isOverIframe } = useCursorState(isComputerDevice);

	// Memoize class names for better performance
	const cursorClassNames = useMemo(() => {
		return [
			'flare',
			isPointer ? 'pointer' : '',
			!isVisible || isOverIframe || !shouldRender ? 'hidden' : ''
		].filter(Boolean).join(' ');
	}, [isPointer, isVisible, isOverIframe, shouldRender]);

	// Memoize styles for better performance
	const cursorStyles = useMemo(() => ({
		left: `${position.x}px`,
		top: `${position.y}px`,
		width: isPointer ? '30px' : '100px',
		height: isPointer ? '30px' : '100px',
		transform: 'translate(-50%, -50%) translateZ(0)',
		willChange: 'transform, width, height',
	}), [position.x, position.y, isPointer]);

	// Only render the DOM element if we should show it
	if (!shouldRender) {
		return null;
	}

	return (
		<div
			className={cursorClassNames}
			style={cursorStyles}
			aria-hidden="true" // Better accessibility
		/>
	);
};

export default React.memo(NewCursor);