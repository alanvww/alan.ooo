'use client';
import Link from 'next/link';
import type { ProjectType } from '@/types';
import { BiChevronRight } from 'react-icons/bi';

import { motion } from 'framer-motion';
import Image from 'next/image';
interface ProjectCardProps {
	id: number;
	project: ProjectType;
	variants: any;
}

function ProjectCard(this: any, { id, project, variants }: ProjectCardProps) {
	return (
		<motion.div
			key={id}
			variants={variants}
			className="text-white flex flex-col my-8 group"
		>
			<Link key={id} href={`/projects/${project.slug}`} className="cursor-none">
				<motion.div className="flex flex-row">
					<motion.div className="flex flex-row shrink-1 grow my-auto">
						<h2 className="font-bold text-2xl group-hover:underline ">
							{project.name}
						</h2>
						<h3 className="hidden  md:block font-light text-sm align-middle my-auto mx-2 px-2 bg-gray-border text-[#A1A1A9] rounded-full">
							{project.year}
						</h3>
					</motion.div>
					<Link
						key={id}
						href={`/projects/${project.slug}`}
						className="flex font-medium align-middle place-self-end ml-2  shrink-0 group-hover:underline"
					>
						Read more
						<BiChevronRight className=" align-middle  text-2xl " />
					</Link>
				</motion.div>
				<h3 className={`text-[#A1A1A9]`}>{project.medium}</h3>
				<motion.div className="relative py-4 -z-10">
					<Image
						className="h-auto w-full md:w-4/5 rounded-md object-contain"
						width="0"
						height="0"
						sizes="100vw"
						src={project.coverImage.image}
						alt={project.coverImage.alt}
					></Image>
				</motion.div>
			</Link>
		</motion.div>
	);
}

export default ProjectCard;
