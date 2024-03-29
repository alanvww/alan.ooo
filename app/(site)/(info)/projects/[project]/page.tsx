import Image from 'next/image';
import { urlForImage } from '@/sanity/sanity.image';
import type { Metadata, ResolvingMetadata } from 'next';
import { getSingleProject } from '@/sanity/sanity.query';
import type { ProjectType } from '@/types';

import { CustomPortableText } from '../../../components/shared/CustomPortableText';
import ProjectRender from '../../../components/shared/ProjectRender';

import fallBackImage from '@/public/project.png';
import fallBackOpenGraphImage from '@/public/opengraph-image.jpg';
import { Suspense } from 'react';
import Loading from '../loading';

type Props = {
	params: {
		project: string;
	};
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const slug = params.project;
	const project: ProjectType = await getSingleProject(slug);

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

export default async function Project({ params }: Props) {
	const slug = params.project;
	const project: ProjectType = await getSingleProject(slug);

	return (
		/*
		<main className="max-w-6xl mx-auto lg:px-16 px-8 ">
			<div className="max-w-3xl mx-auto">
				<div
					className={`absolute top-0 left-0 w-full h-[20vh] -z-10 items-center justify-center flex `}
				>
					<h1 className="max-w-full opacity-100 absolute self-center px-4   font-bold pt-[10vh] md:pt-[10vh] lg:text-5xl text-2xl leading-tight ">
						{project?.name}
					</h1>
					<Image
						className="h-[20vh] w-full object-cover opacity-30"
						width="0"
						height="0"
						sizes="100vw"
						src={project?.coverImage?.image || fallBackImage}
						alt={project?.coverImage?.alt || project?.name}
					/>
				</div>

				<div className="flex flex-col gap-y-5 mt-36 leading-7">
					{project?.description && (
						<CustomPortableText
							paragraphClasses=" text-md md:text-xl"
							value={project?.description as any}
						/>
					)}
				</div>
			</div>
		</main>
		*/
		<Suspense fallback={<Loading />}>
			<ProjectRender {...project} />
		</Suspense>
	);
}
