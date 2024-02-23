'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { ProjectType } from '@/types';
import { BiChevronRight } from 'react-icons/bi';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
		<motion.div
			key={id}
			variants={variants}
			className="text-white flex flex-col my-8"
		>
			<motion.div className="flex flex-row">
				<motion.div className="flex flex-row shrink-0 grow my-2">
					<h2 className="font-bold text-2xl place-self-start ">
						{project.name}
					</h2>
					<h3 className="font-light text-sm align-middle my-auto mx-2 px-2 bg-gray-border text-[#A1A1A9] rounded-full">
						{project.year}
					</h3>
				</motion.div>
				<Link
					key={id}
					href={`/projects/${project.slug}`}
					className="flex font-medium align-middle my-auto hover:underline"
				>
					Read more
					<BiChevronRight className=" align-middle my-auto  text-2xl " />
				</Link>
			</motion.div>
			<h3 className={`text-[#A1A1A9]`}>{project.medium}</h3>
			<motion.div className="relative py-4 -z-10">
				<Image
					className="h-auto w-4/5 rounded-md object-contain"
					width="0"
					height="0"
					sizes="100vw"
					src={project.coverImage.image}
					alt={project.coverImage.alt}
				></Image>
			</motion.div>
		</motion.div>
	);
}

export default AnimatedDiv;
