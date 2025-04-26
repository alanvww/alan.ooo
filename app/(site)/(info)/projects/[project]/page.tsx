import Image from 'next/image';
import { urlForImage } from '@/sanity/sanity.image';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getSingleProject } from '@/sanity/sanity.query';
import type { ProjectType } from '@/types';

import { CustomPortableText } from '../../../components/shared/CustomPortableText';
import ProjectRender from '../../../components/shared/ProjectRender';

import fallBackImage from '@/public/project.png';
import fallBackOpenGraphImage from '@/public/opengraph-image.jpg';
import { Suspense } from 'react';
import Loading from '../loading';

type Props = {
	params: Promise<{
		project: string;
	}>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const params = await props.params;
    const slug = params.project;
    const project: ProjectType = await getSingleProject(slug);
    
    if (!project) {
        notFound();
    }

    return {
		title: `${project?.name} | Alan Ren`,
		description: project?.tagline,
		openGraph: {
			images: [
				{
					url:
						project?.coverImage?.image.toString() ||
						fallBackOpenGraphImage.toString(),
				},
			],
			title: project?.name,
			description: project?.tagline,
		},
	};
}

export default async function Project(props: Props) {
    const params = await props.params;
    const slug = params.project;
    const project: ProjectType = await getSingleProject(slug);
    
    if (!project) {
        notFound();
    }

    return (
        <Suspense fallback={<Loading />}>
            <ProjectRender {...project} />
        </Suspense>
    );
}
