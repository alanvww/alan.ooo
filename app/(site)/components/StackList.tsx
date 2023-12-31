'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import type { TechType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const item = {
	hidden: { y: 5, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

export const StackList = (props: { tech: TechType[] }) => (
	<>
		<motion.div
			className="container md:grid md:grid-cols-3  transition"
			variants={container}
			initial="hidden"
			animate="visible"
		>
			{props.tech &&
				props.tech.map((data) => (
					<motion.section
						key={data._id}
						variants={item}
						className="item flex flex-col rounded-lg duration-150 ease-in-out hover:p-[2px]   bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-theme-green via-gradient-via to-theme-purple  w-full md:w-auto my-2 md:m-3 place-self-auto	"
					>
						<span className="rounded-md border-[0.5px] border-gray-border hover:border-transparent	 p-3 h-full bg-gray-dark">
							<section className="flex flex-row gap-2 m-2">
								<Image
									className="rounded-md object-contain m-2 h-12  "
									src={data.techIcon}
									width={50}
									height={50}
									alt={`${data.techName} logo`}
								/>
								<Link
									href={data.link.toString()}
									className="flex flex-row justify-center"
								>
									<h2 className="text-xl font-bold tracking-tight lg:leading-[3.7rem] my-auto leading-tight hover:underline hover:text-white">
										{data.techName}
									</h2>
								</Link>
							</section>
							<section className="mx-2">
								<ul className="flex flex-wrap items-center gap-2 my-2 mx-2">
									{data.platform.map((platform, id) => (
										<li
											key={id}
											className="bg-[#1d1d20] border border-transparent hover:border-zinc-700 rounded-md px-2 py-1"
										>
											{platform}
										</li>
									))}
								</ul>
								<p className="m-2">{data.comment}</p>
							</section>
						</span>
					</motion.section>
				))}
		</motion.div>
	</>
);
