import React from 'react';
import Image from 'next/image';
import type { ProjectType } from '@/types';

import { CustomPortableText } from './CustomPortableText';
import InPageNavigation from './InPageNavigation';

const ProjectRender = (project: ProjectType) => {
	return (
		<main>
			{/* Full-width Hero Section: Absolutely positioned at the top */}
			<div className="absolute top-0 left-0 w-full h-[25vh] md:h-[36vh] -z-10 flex items-center justify-center">
				{/* Title: Absolute positioned, centered, above the image */}
				<h1 className="max-w-full opacity-100 absolute text-center self-center px-8 lg:px-16 font-bold pt-12 z-10 lg:text-8xl md:text-5xl text-3xl  leading-tight mix-blend-exclusion">
					{project?.name}
				</h1>
				{/* Cover Image: Absolute positioned, fills container, behind title */}
				<Image
					className="absolute inset-0 w-full h-full object-cover opacity-30"
					fill // Use fill instead of width/height for absolute positioning
					sizes="(max-width:768px)100vw, 700px" // Keep sizes for optimization
					src={project?.coverImage?.image}
					alt={project?.coverImage?.alt || project?.name}
					priority // Consider adding priority if it's LCP
				/>
			</div>

			{/* Overall Content Area: max-w-6xl, pushed below hero, padded */}
			<div className="max-w-5xl mx-auto mt-[16vh] md:mt-[36vh] md:px-16 px-8 relative">
				{/* Pass requireScrollToView={false} for project pages */}
				<InPageNavigation contentSelector=".mainContent" requireScrollToView={false} />

				{/* Text Content Area: Constrained to max-w-3xl within the 6xl container */}
				<div className="mainContent flex flex-col gap-y-5 pt-8 leading-7">
					{project?.description && (
						<CustomPortableText
							paragraphClasses=" text-md md:text-xl"
							value={project?.description as any}
						/>
						/* NOTE: Images rendered within this CustomPortableText block
						   will also be constrained to max-w-3xl unless the component
						   or specific CSS handles them differently. */
					)}
				</div>
			</div>
		</main>
	);
};

export default ProjectRender;
