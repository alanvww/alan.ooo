import * as React from 'react';
import * as motion from "motion/react-client"
import type { TechType, GearType } from '@/types';
import Image from 'next/image';
import { Link } from 'next-view-transitions'

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
			<h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:leading-[3.7rem] leading-tight ">
				Stack
			</h1>
			<p className="text-md text-zinc-400 mb-6">
				Essential software and digital tools that power my workflow and development process.
			</p>
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
							whileHover={{ borderColor: 'rgba(0, 0, 0, 0)' }}
							className="group border-2 border-gray-border item flex flex-col rounded-lg bg-radial-[at_50%_75%] from-theme-green via-gradient-via to-theme-purple  w-full md:w-auto my-2 md:m-3 place-self-auto	"
						>
							<motion.span
								className="rounded-md  p-3 h-full bg-gray-dark"
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
										<h2 className="text-xl font-bold tracking-tight my-auto leading-tight hover:underline hover:text-white">
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

		<section className="mb-16">
			<h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:leading-[3.7rem] leading-tight">
				Gear
			</h1>
			<p className="text-md text-zinc-400 mb-6">
				Physical equipment and devices I rely on daily for productivity and creation.
			</p>
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
							whileHover={{ borderColor: 'rgba(0, 0, 0, 0)' }}
							className="group border-2 border-gray-border item flex flex-col rounded-lg bg-radial-[at_50%_75%] from-theme-green via-gradient-via to-theme-purple w-full md:w-auto my-2 md:m-3 place-self-auto	"
						>
							<motion.span
								className="rounded-md  p-3 h-full bg-gray-dark"
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
										<h2 className="text-xl font-bold tracking-tight my-auto leading-tight hover:underline hover:text-white">
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
