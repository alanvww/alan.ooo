'use client';
import Link from 'next/link';
import { useState } from 'react';
import * as React from 'react';
import { motion } from 'framer-motion';
interface AnimatedDivProps {
	children: any;
}

function AnimatedDiv({ children }: AnimatedDivProps) {
	const [hovered, setHovered] = useState(false);

	return (
		<Link
			href={`/projects/${children.slug}`}
			key={children._id}
			className="flex items-center py-4 gap-x-4"
		>
			<motion.div
				className="text-white grid grid-cols-2 group flex-grow m-2 text-xl font-semibold w-full"
				initial="hidden"
				animate="visible"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				variants={{
					hidden: {
						scale: 0.8,
						opacity: 0,
					},
					visible: {
						scale: 1,
						opacity: 1,
						transition: {
							delay: 0.4,
						},
					},
				}}
			>
				<h2 className="place-self-start">{children.name}</h2>
				<h2 className={`place-self-end ${hovered ? 'hidden' : ''} `}>
					{children.year}
				</h2>
				<h2
					className={`place-self-end duration-300   ${
						hovered ? 'block ' : 'hidden'
					}  `}
				>
					{children.medium}
				</h2>
			</motion.div>{' '}
		</Link>
	);
}

export default AnimatedDiv;
