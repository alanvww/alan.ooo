'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectType } from '@/types';

import { CustomPortableText } from './CustomPortableText';

const ProjectRender = (project: ProjectType) => {
	const pageProject = project as ProjectType;
	const [inpageLinks, setInpageLinks] = useState<
		{ id: string; text: string }[]
	>([]);

	useEffect(() => {
		const h2NodeArray = document.querySelectorAll('main h2');
		const links = Array.from(h2NodeArray).map((node, index) => {
			const id = `section-${index}`;
			node.setAttribute('id', id);
			return { id, text: (node as HTMLElement).innerText };
		});
		setInpageLinks(links);
	}, [project]);

	return (
		<main className="max-w-6xl mx-auto lg:px-16 px-8 ">
			{inpageLinks.length > 0 && (
				<div className="">
					{inpageLinks.map((link, index) => (
						<Link href={`#${link.id}`} key={index}>
							{link.text}
						</Link>
					))}
				</div>
			)}
			<div className="max-w-3xl mx-auto">
				<div className="absolute top-0 left-0 w-full h-[20vh] -z-10 items-center justify-center flex">
					<h1 className="max-w-full opacity-100 absolute self-center px-4 font-bold pt-[10vh] md:pt-[10vh] lg:text-5xl text-2xl leading-tight">
						{pageProject?.name}
					</h1>
					<Image
						className="h-[20vh] w-full object-cover opacity-30"
						width="0"
						height="0"
						sizes="100vw"
						src={pageProject?.coverImage?.image}
						alt={pageProject?.coverImage?.alt || pageProject?.name}
					/>
				</div>
				<div className="flex flex-col gap-y-5 mt-36 leading-7">
					{pageProject?.description && (
						<CustomPortableText
							paragraphClasses="text-md md:text-xl"
							value={pageProject?.description as any}
						/>
					)}
				</div>
			</div>
		</main>
	);
};

export default ProjectRender;
