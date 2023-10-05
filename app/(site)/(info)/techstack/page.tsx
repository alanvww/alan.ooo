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
			<section className="mb-16">
				<h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight ">
					Stack
				</h1>
				<section className="md:grid md:grid-cols-3">
					{tech &&
						tech.map((data) => (
							<div
								key={data._id}
								className="flex flex-col rounded-xl border-solid border-2 border-[#ffffff] p-4 w-full md:w-auto my-2 md:m-3 place-self-auto	"
							>
								<section className="flex flex-row gap-2 m-2">
									<Image
										className="rounded-md object-contain m-2  bg-top bg-[#1d1d2000]"
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

								<p className="m-2">{data.comment}</p>
								<section className="flex flex-row gap-1 m-1 mr-5">
									{data.platform.map((platform) => (
										<div
											key={''}
											className="text-sm font-bold tracking-tight leading-tight text-white bg-[#1d1d20] rounded-lg p-3 h-fit my-auto"
										>
											{platform}
										</div>
									))}
								</section>
							</div>
						))}
				</section>
			</section>

			<section className="max-w-2xl mb-16">
				<h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
					Gear
				</h1>
			</section>
		</main>
	);
}
