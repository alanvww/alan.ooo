'use client';
import * as React from 'react';
import { motion } from 'motion/react';
import type { TechType, GearType } from '@/types';
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

export const StackList = (props: { tech: TechType[]; gear: GearType[] }) => (
	<main className="lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
		<section className="mb-16 ">
			<h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight ">
				Stack
			</h1>
			<motion.div
				className="container md:grid md:grid-cols-3"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				{props.tech &&
					props.tech.map((data) => (
						<motion.section
							key={data._id}
							variants={item}
							whileHover={{ padding: '2px' }}
							className="item flex flex-col rounded-lg     bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-theme-green via-gradient-via to-theme-purple  w-full md:w-auto my-2 md:m-3 place-self-auto	"
						>
							<motion.span
								whileHover={{ borderColor: 'rgba(255, 255, 255, 0.0)' }}
								className="rounded-md border-[0.5px] border-gray-border 	 p-3 h-full bg-gray-dark"
							>
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
							</motion.span>
						</motion.section>
					))}
			</motion.div>
		</section>

		<section className="max-w-2xl mb-16">
			<h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
				Gear
			</h1>
			<motion.div
				className="container md:grid md:grid-cols-3"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				{props.gear &&
					props.gear.map((data) => (
						<motion.section
							key={data._id}
							variants={item}
							whileHover={{ padding: '2px' }}
							className="item flex flex-col rounded-lg     bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-theme-green via-gradient-via to-theme-purple  w-full md:w-auto my-2 md:m-3 place-self-auto	"
						>
							<motion.span
								whileHover={{ borderColor: 'rgba(255, 255, 255, 0.0)' }}
								className="rounded-md border-[0.5px] border-gray-border 	 p-3 h-full bg-gray-dark"
							>
								<section className="flex flex-row gap-2 m-2">
									<Image
										className="rounded-md object-contain m-2 h-12  "
										src={data.gearImage.image}
										width={50}
										height={50}
										alt={`${data.gearName} logo`}
									/>
									<Link
										href={data.link.toString()}
										className="flex flex-row justify-center"
									>
										<h2 className="text-xl font-bold tracking-tight lg:leading-[3.7rem] my-auto leading-tight hover:underline hover:text-white">
											{data.gearName}
										</h2>
									</Link>
								</section>
								<section className="mx-2">
									<p className="m-2">{data.comment}</p>
								</section>
							</motion.span>
						</motion.section>
					))}
			</motion.div>
		</section>
	</main>
);
