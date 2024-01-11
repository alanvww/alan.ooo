'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { ProjectType } from '@/types';

import { motion } from 'framer-motion';
interface AnimatedDivProps {
	id: number;
	project: ProjectType;
	variants: any;
}

const variants = {
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
};

function AnimatedDiv(this: any, { id, project, variants }: AnimatedDivProps) {
	const [hovered, setHovered] = useState(false);

	return (
		<motion.div key={id} variants={variants}>
			<Link
				key={id}
				href={`/projects/${project.slug}`}
				className="flex items-center py-4 gap-x-4"
			>
				<motion.div
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					className="text-white grid grid-cols-2 group flex-grow m-2 text-xl font-semibold w-full"
				>
					<h2 className="place-self-start">{project.name}</h2>
					<h2 className={`place-self-end ${hovered ? 'hidden' : ''} `}>
						{project.year}
					</h2>
					<h2
						className={`place-self-end duration-300   ${
							hovered ? 'block ' : 'hidden'
						}  `}
					>
						{project.medium}
					</h2>
				</motion.div>{' '}
			</Link>
		</motion.div>
	);
}

export default AnimatedDiv;
