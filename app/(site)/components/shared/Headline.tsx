'use client';
import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

// Define an interface for the component props
interface HeadlineProps {
	title: string; // For the content of the <h1> tag
	description: string; // For the content of the <p> tag
	className?: string; // Optional custom class for the container
	titleClassName?: string; // Optional custom class for the title
	descriptionClassName?: string; // Optional custom class for the description
}

export default function Headline({ 
	title, 
	description, 
	className, 
	titleClassName, 
	descriptionClassName 
}: HeadlineProps) {
	return (
		<motion.section
			className={cn(
				"max-w-2xl flex flex-col items-center justify-center w-full lg:py-26 lg:px-0",
				className
			)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ scale: 0, opacity: 0 }}
			transition={{}}
		>
			<div className='m-auto'>
				<h1 className={cn(
					"text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight",
					titleClassName
				)}>
					{title}
				</h1>
				<p className={cn(
					"text-lg text-zinc-400 leading-relaxed",
					descriptionClassName
				)}>
					{description}
				</p>
			</div>
		</motion.section>
	);
}
