'use client';
import React from 'react';
import { motion } from 'motion/react';

// Define an interface for the component props
interface HeadlineProps {
	title: string; // For the content of the <h1> tag
	description: string; // For the content of the <p> tag
}

export default function Headline({ title, description }: HeadlineProps) {
	return (
		<motion.section
			className="max-w-2xl flex flex-col items-center justify-center w-full mx-auto lg:py-32 lg:px-0"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ scale: 0, opacity: 0 }}
			transition={{}}
		>
			<div className='m-auto'>
				<h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
					{title}
				</h1>
				<p className="text-lg text-zinc-400 leading-relaxed">{description}</p>
			</div>
		</motion.section>
	);
}
