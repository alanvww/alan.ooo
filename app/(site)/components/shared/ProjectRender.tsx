import React from 'react';
import Image from 'next/image';
import type { ProjectType } from '@/types';

import { CustomPortableText } from './CustomPortableText';
import InPageNavigation from './InPageNavigation';
import * as motion from 'motion/react-client';
import { defaultTransition, itemVariants } from '@/app/(site)/utilities/animations';

const ProjectRender = (project: ProjectType) => {
    return (
        <main>
            {/* Full-width Hero Section: Absolutely positioned at the top */}
            <div className="absolute top-0 left-0 w-full h-[25vh] md:h-[36vh] -z-10 flex items-center justify-center">
                {/* Title: Absolute positioned, centered, above the image */}
                <motion.h1
                    className="max-w-full opacity-100 absolute text-center self-center px-8 lg:px-16 font-bold pt-12 z-10 lg:text-8xl md:text-5xl text-3xl  leading-tight mix-blend-exclusion"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={defaultTransition}
                >
                    {project?.name}
                </motion.h1>
                {/* Cover Image: Absolute positioned, fills container, behind title */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={defaultTransition}
                >
                    <Image
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                        fill
                        sizes="(max-width:768px)100vw, 700px"
                        src={project?.coverImage?.image}
                        alt={project?.coverImage?.alt || project?.name}
                        priority
                    />
                </motion.div>
            </div>

            {/* Overall Content Area: max-w-6xl, pushed below hero, padded */}
            <div className="max-w-5xl mx-auto mt-[16vh] md:mt-[36vh] md:px-16 px-8 relative">
                {/* Pass requireScrollToView={false} for project pages */}
                <InPageNavigation contentSelector=".mainContent" requireScrollToView={false} />

                {/* Text Content Area: Constrained to max-w-3xl within the 6xl container */}
                <motion.div className="mainContent flex flex-col gap-y-5 pt-8 leading-7" variants={itemVariants} initial="hidden" animate="visible">
                    {project?.description && (
                        <CustomPortableText
                            paragraphClasses=" text-md md:text-xl"
                            value={project?.description as any}
                        />
                    )}
                </motion.div>
            </div>
        </main>
    );
};

export default ProjectRender;
