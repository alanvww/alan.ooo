import React from 'react';
import Image from 'next/image';
import type { ProjectType } from '@/types';

import { CustomPortableText } from './CustomPortableText';
import InPageNavigation from './InPageNavigation';

const ProjectRender = (project: ProjectType) => {
	return (
		<main className="max-w-6xl mx-auto lg:px-16 px-8 	">
			{/* Pass requireScrollToView={false} for project pages */}
			<InPageNavigation contentSelector=".mainContent" requireScrollToView={false} />

			<div className="max-w-3xl mx-auto">
				<div className="absolute top-0 left-0 w-full h-[20vh] -z-10 items-center justify-center flex">
					<h1 className="max-w-full opacity-100 absolute self-center px-4 font-bold pt-[10vh] md:pt-[10vh] lg:text-5xl text-2xl leading-tight">
						{project?.name}
					</h1>
					<Image
						className="h-[20vh] w-full object-cover opacity-30"
						width="0"
						height="0"
						sizes="(max-width:768px)100vw, 700px"
						src={project?.coverImage?.image}
						alt={project?.coverImage?.alt || project?.name}
					/>
				</div>
				<div className="mainContent flex flex-col gap-y-5 mt-36 leading-7">
					{project?.description && (
						<CustomPortableText
							paragraphClasses="text-md md:text-xl"
							value={project?.description as any}
						/>
					)}
				</div>
			</div>
		</main>
	);
};

export default ProjectRender;
