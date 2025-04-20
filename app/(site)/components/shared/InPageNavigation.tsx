'use client';
import React, { useEffect, useState, useRef } from 'react'; // Import useRef
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTitle,
	StepperTrigger,
} from "@/components/ui/stepper";

interface InPageNavigationProps {
	contentSelector: string;
	requireScrollToView?: boolean; // New prop
}

const InPageNavigation: React.FC<InPageNavigationProps> = ({
	contentSelector,
	requireScrollToView = true // Default to true (require scroll)
}) => {
	const [steps, setSteps] = useState<Array<{ step: number; title: string; id: string }>>([]);
	const [activeStep, setActiveStep] = useState<number>(1);
	const [isVisible, setIsVisible] = useState<boolean>(false); // Scroll-based visibility
	const [hasEnoughHorizontalSpace, setHasEnoughHorizontalSpace] = useState<boolean>(true); // Horizontal space check
	const navRef = useRef<HTMLDivElement>(null); // Ref for the main container

	useEffect(() => {
		const contentElement = document.querySelector(contentSelector);
		if (!contentElement) return;

		const h2NodeArray = contentElement.querySelectorAll('h2');
		const navigationSteps = Array.from(h2NodeArray).map((node, index) => {
			const id = `section-${index + 1}`;
			node.setAttribute('id', id);
			return {
				step: index + 1,
				title: node.innerHTML,
				id
			};
		});
		setSteps(navigationSteps);

		const handleScroll = () => {
			// Show navigation after scrolling
			// Only check scroll position if requireScrollToView is true
			if (requireScrollToView) {
				if (window.scrollY > 200) {
					setIsVisible(true);
				} else {
					setIsVisible(false);
				}
			} else {
				// Otherwise, it's always visible based on scroll
				setIsVisible(true);
			}

			// Update active step when section crosses 50% of screen height
			navigationSteps.forEach(({ step, id }) => {
				const section = document.querySelector(`#${id}`) as HTMLElement;
				if (
					section &&
					section.offsetTop <= window.scrollY + window.innerHeight / 2
				) {
					setActiveStep(step);
				}
			});
		};

		// Initial call to set visibility correctly on page load
		handleScroll();

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [contentSelector, requireScrollToView]); // Add requireScrollToView

	// Effect to check for available space based on component height and window height
	useEffect(() => {
		const checkSpace = () => {
			const contentElement = document.querySelector(contentSelector) as HTMLElement;
			if (navRef.current && contentElement) {
				// Horizontal check using viewport-relative positions
				const navRect = navRef.current.getBoundingClientRect();
				const contentRect = contentElement.getBoundingClientRect();
				const buffer = 16; // Add a 16px buffer to prevent touching

				// Hide if nav's right edge (+ buffer) overlaps or passes content's left edge
				setHasEnoughHorizontalSpace(navRect.right + buffer < contentRect.left);

			} else {
				// Default to true if elements aren't found initially
				setHasEnoughHorizontalSpace(true);
			}
		};

		// Initial check
		checkSpace();

		// Observe changes in the navigation component's size
		const resizeObserver = new ResizeObserver(checkSpace);
		const currentNavRef = navRef.current; // Capture ref value

		if (currentNavRef) {
			resizeObserver.observe(currentNavRef);
		}

		// Re-check on window resize
		window.addEventListener('resize', checkSpace);

		// Cleanup
		return () => {
			// Use the captured ref value in cleanup
			if (currentNavRef) {
				resizeObserver.unobserve(currentNavRef);
			}
			window.removeEventListener('resize', checkSpace);
		};
	}, [steps, contentSelector, requireScrollToView]);

	const handleStepClick = (step: { id: string }) => {
		const element = document.querySelector(`#${step.id}`);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		// Attach ref and update visibility class
		<div
			ref={navRef}
			className={`fixed left-28 top-64 hidden lg:block transition-opacity duration-300 ${isVisible && hasEnoughHorizontalSpace ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
		>
			<div className="space-y-8">
				<Stepper value={activeStep} orientation="vertical">
					{steps.map((step) => (
						<StepperItem
							key={step.id}
							step={step.step}
							className="relative items-start not-last:flex-1"
						>
							<StepperTrigger
								className="items-start pb-12 last:pb-0 cursor-pointer"
								onClick={() => handleStepClick(step)}
							>
								<StepperIndicator

								/>
								<div className="mt-0.5 px-2 text-left">
									<StepperTitle>{step.title}</StepperTitle>
								</div>
							</StepperTrigger>
							{step.step < steps.length && (
								<StepperSeparator className="absolute inset-y-0 left-3 top-[calc(1.5rem+0.125rem)] -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
							)}
						</StepperItem>
					))}
				</Stepper>
			</div>
		</div>
	);
};

export default InPageNavigation;
