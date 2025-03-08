'use client';

import React, { useEffect, useState } from 'react';
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
}

const InPageNavigation: React.FC<InPageNavigationProps> = ({ contentSelector }) => {
	const [steps, setSteps] = useState<Array<{ step: number; title: string; id: string }>>([]);
	const [activeStep, setActiveStep] = useState<number>(1);

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
			navigationSteps.forEach(({ step, id }) => {
				const section = document.querySelector(`#${id}`) as HTMLElement;
				if (
					section &&
					section.offsetTop <= window.scrollY + window.innerHeight / 4
				) {
					setActiveStep(step);
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [contentSelector]);

	const handleStepClick = (step: { id: string }) => {
		const element = document.querySelector(`#${step.id}`);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="fixed left-28  top-64 hidden lg:block">
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