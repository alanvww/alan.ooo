'use client';
import React, { useState, useEffect, useCallback } from 'react';

function NewCursor() {
	// Track both the raw and smoothed cursor positions
	const [position, setPosition] = useState({ x: -100, y: -100 });
	const [isPointer, setIsPointer] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	// Create a more robust pointer detection system
	const detectPointerElement = useCallback((element: Element | null): boolean => {
		// If no element, return false
		if (!element) return false;

		try {
			// Get computed style of the element
			const style = window.getComputedStyle(element);

			// Check for special cases first
			const tagName = element.tagName.toLowerCase();
			const isMediaElement = tagName === 'video' || tagName === 'iframe';

			// List of cursor values that indicate interactive elements
			const interactiveCursors = ['pointer', 'grab', 'grabbing', 'text'];

			// Special handling for media elements
			if (isMediaElement) {
				// Check if we're near the border of the media element
				const rect = element.getBoundingClientRect();
				const mouseX = position.x;
				const mouseY = position.y;

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
				(element.parentElement && detectPointerElement(element.parentElement)) || false
			);
		} catch (error) {
			console.error('Error in pointer detection:', error);
			return false;
		}
	}, [position]);

	// Enhanced mouse move handler with Firefox-specific checks
	const handleMouseMove = useCallback((e: MouseEvent) => {
		requestAnimationFrame(() => {
			try {
				// Get the actual target element
				const target = document.elementFromPoint(e.clientX, e.clientY);

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
					setPosition({ x: e.clientX, y: e.clientY });
					setIsVisible(true);

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
	}, [detectPointerElement]);

	// Add specialized event handlers for Firefox media elements
	const handleMouseEnterMedia = useCallback((e: Event) => {
		const target = e.target as Element;
		if (target && (target.tagName === 'VIDEO' || target.tagName === 'IFRAME')) {
			setIsVisible(true);
			setIsPointer(true);
		}
	}, []);

	const handleMouseLeaveMedia = useCallback((e: Event) => {
		const target = e.target as Element;
		if (target && (target.tagName === 'VIDEO' || target.tagName === 'IFRAME')) {
			setIsPointer(false);
		}
	}, []);

	useEffect(() => {
		// Add our event listeners
		window.addEventListener('mousemove', handleMouseMove, { passive: true });

		// Add media-specific event listeners
		const mediaElements = document.querySelectorAll('video, iframe');
		mediaElements.forEach(element => {
			element.addEventListener('mouseenter', handleMouseEnterMedia);
			element.addEventListener('mouseleave', handleMouseLeaveMedia);
		});

		// Handle visibility changes
		const handleVisibilityChange = () => {
			if (document.hidden) {
				setIsVisible(false);
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		// Cleanup function
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('visibilitychange', handleVisibilityChange);

			// Clean up media event listeners
			mediaElements.forEach(element => {
				element.removeEventListener('mouseenter', handleMouseEnterMedia);
				element.removeEventListener('mouseleave', handleMouseLeaveMedia);
			});
		};
	}, [handleMouseMove, handleMouseEnterMedia, handleMouseLeaveMedia]);

	// Only render if visible
	if (!isVisible) {
		return null;
	}

	return (
		<div
			className={`flare ${isPointer ? 'pointer' : ''}`}
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
				width: isPointer ? '30px' : '100px',
				height: isPointer ? '30px' : '100px',
			}}
		/>
	);
}

export default NewCursor;
