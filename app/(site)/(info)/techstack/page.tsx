import Image from 'next/image';
import { getTech, getGear } from '@/sanity/sanity.query';
import type { ProfileType, TechType } from '@/types';
import { PortableText } from '@portabletext/react';
import { BiEnvelope, BiFile } from 'react-icons/bi';
import Link from 'next/link';

export default async function About() {
	const tech: TechType[] = await getTech();

	return (
		<main className="lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
			<section className="mb-16 ">
				<h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight ">
					Stack
				</h1>

				<div className="md:grid md:grid-cols-3  transition">
					{tech &&
						tech.map((data) => (
							<section
								key={data._id}
								className="flex flex-col rounded-lg duration-150 ease-in-out hover:p-[2px]   bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-theme-green via-gradient-via to-theme-purple  w-full md:w-auto my-2 md:m-3 place-self-auto	"
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
							</section>
						))}
				</div>
			</section>

			<section className="max-w-2xl mb-16">
				<h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
					Gear
				</h1>
			</section>
		</main>
	);
}
