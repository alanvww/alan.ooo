'use client';
import { useTransitionRouter } from 'next-view-transitions'
import type { ProjectType } from '@/types';
import { BiChevronRight } from 'react-icons/bi';


import { motion } from "motion/react"
import { defaultTransition, DURATION, EASE_STANDARD } from "@/app/(site)/utilities/animations"
import Image from 'next/image';
interface ProjectCardProps {
	id: number;
	project: ProjectType;
	whileInView: any;
	initial: any;
}


function ProjectCard({ id, project, whileInView, initial }: ProjectCardProps) {
	const router = useTransitionRouter();

	const handleProjectClick = (e: React.MouseEvent) => {
		e.preventDefault();
        // Persist list scroll position and the slug of the clicked project
        sessionStorage.setItem('projectsPageScroll', window.scrollY.toString());
        sessionStorage.setItem('projects:lastSlug', project.slug);
		router.push(`/projects/${project.slug}`);
	};

	return (
        <motion.div
			key={id}
            id={`project-${project.slug}`}
			className="md:cursor-none  text-white flex flex-col my-8 group "
			whileInView={whileInView}
			initial={initial}
            transition={{ ...defaultTransition, duration: DURATION.fast, ease: EASE_STANDARD }}
			onClick={handleProjectClick}
		>
			<motion.div className="flex flex-row -z-10">
				<motion.div className="flex flex-row shrink-1 grow my-auto  -z-10">
					<h2 className="font-bold text-2xl group-hover:underline ">
						{project.name}
					</h2>
					<h3 className="hidden  md:block font-light text-sm align-middle my-auto mx-2 px-2 bg-gray-border text-[#A1A1A9] rounded-full">
						{project.year}
					</h3>
				</motion.div>
				<span className="flex font-medium align-middle place-self-end ml-2  shrink-0 group-hover:underline -z-10">
					Read more
					<BiChevronRight className=" align-middle  text-2xl " />
				</span>
			</motion.div>
			<h3 className={`text-[#A1A1A9] -z-10`}>{project.medium}</h3>
			<motion.div className="relative py-4 -z-10 ">
				<Image
					className="h-auto w-full md:w-4/5 rounded-md object-contain border border-transparent group-hover:border-white -z-50"
					width="0"
					height="0"
					sizes="(max-width:768px)100vw, 700px"
					src={project.coverImage.image}
					alt={project.coverImage.alt || project.name}
				></Image>
			</motion.div>
		</motion.div>
	);
}

export default ProjectCard;
