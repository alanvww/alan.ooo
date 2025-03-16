import Image from 'next/image';
import { getProfile } from '@/sanity/sanity.query';
import type { ProfileType, JobType, CVType } from '@/types';
import { PortableText } from '@portabletext/react';
import { BiEnvelope, BiFile, BiLink, BiMap, BiCalendar, BiBookAlt } from 'react-icons/bi';
import Headline from '../../components/shared/Headline';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'About me - Alan Ren',
	description: 'A little bit about me.',
};

export default async function About() {
	const profile: ProfileType[] = await getProfile();

	return (
		<div className="lg:max-w-7xl mx-auto max-w-3xl  md:px-16 px-6">
			{profile &&
				profile.map((data) => (
					<div key={data._id}>
						<section className="grid lg:grid-cols-2 grid-cols-1 gap-x-6 justify-items-center">
							<div className="order-2 lg:order-none">
								<Headline
									title={`I'm ${data.fullName}. I live in ${data.location}, where I
									design the future.`}
									description={data.shortBio}
								/>
							</div>

							<div className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
								<div>
									<Image
										className="rounded-2xl mb-4 object-cover w-auto max-h-96 min-h-96 bg-top bg-[#1d1d20]"
										src={data.profileImage.image}
										width={400}
										height={400}
										quality={100}
										priority={true}
										alt={data.profileImage.alt}
									/>

									<Link
										href={`${data.resumeURL}?dl=AlanRen_Resume.pdf`}
										className="flex items-center justify-center gap-x-2 bg-[#1d1d20] border border-transparent hover:border-zinc-700 rounded-md duration-200 py-2 text-center cursor-cell font-medium"
									>
										<BiFile className="text-base" /> Download Resume
									</Link>
								</div>

								<ul>
									<li>
										<a
											href={`mailto:${data.email}`}
											className="flex items-center gap-x-2 hover:text-purple-400 duration-300"
										>
											<BiEnvelope className="text-lg" />
											{data.email}
										</a>
									</li>
								</ul>
							</div>
						</section>

						<section className="mt-24 max-w-3xl">
							<h2 className="font-semibold text-4xl mb-4">Expertise</h2>
							<p className="text-zinc-400 max-w-lg">
								I&apos;ve spent few years working on my skills. Here are my areas of expertise.
							</p>

							<div className="mt-8 space-y-8">
								{data.skillCategories?.map((category, categoryIndex) => (
									<div key={categoryIndex}>
										<h3 className="text-xl font-medium mb-2">{category.category}</h3>
										<ul className="flex flex-wrap items-center gap-3">
											{category.skills.map((skill, skillIndex) => (
												<li
													key={skillIndex}
													className="bg-[#1d1d20] border border-transparent hover:border-zinc-700 rounded-md px-2 py-1"
												>
													{skill}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</section>

						<section className="mt-24 max-w-4xl">
							<h2 className="font-semibold text-4xl mb-4">Experience</h2>
							<p className="text-zinc-400 max-w-lg mb-8">
								My professional journey and career path.
							</p>

							<div className="space-y-12">
								{data.experience?.map((job, index) => (
									<div key={job._id} className="border-l-2 border-zinc-700 pl-6 transition-all">
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
											<div className="flex items-center gap-4">
												{job.logo && (
													<Image
														src={job.logo}
														width={40}
														height={40}
														alt={job.name}
														className="rounded-sm"
													/>
												)}
												<div>
													<h3 className="text-xl font-bold">{job.jobTitle}</h3>
													<p className="text-zinc-400">{job.name}</p>
												</div>
											</div>
											<div className="flex items-center gap-2 text-zinc-400">
												<BiCalendar className="inline-block" />
												<span>
													{new Date(job.startDate).toLocaleDateString('en-US', { 
														year: 'numeric', 
														month: 'short'
													})} - {
														job.endDate 
															? new Date(job.endDate).toLocaleDateString('en-US', { 
																year: 'numeric', 
																month: 'short'
															}) 
															: 'Present'
													}
												</span>
											</div>
										</div>

										{job.location && (
											<div className="flex items-center gap-2 mt-2 text-zinc-400">
												<BiMap className="inline-block" />
												<span>{job.location}</span>
											</div>
										)}

										<div className="mt-4 prose prose-zinc dark:prose-invert">
											<PortableText value={job.description} />
										</div>

										{job.projectLinks && job.projectLinks.length > 0 && (
											<div className="mt-4">
												<h4 className="font-medium mb-2">Project Links</h4>
												<ul className="space-y-1">
													{job.projectLinks.map((link, linkIndex) => (
														<li key={linkIndex} className="flex items-center gap-2">
															<BiLink className="text-purple-400" />
															<a 
																href={link.url} 
																target="_blank" 
																rel="noopener noreferrer"
																className="hover:text-purple-400 duration-300"
															>
																{link.label}
															</a>
														</li>
													))}
												</ul>
											</div>
										)}

										{job.projectImages && job.projectImages.length > 0 && (
											<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
												{job.projectImages.map((img, imgIndex) => (
													<div key={imgIndex} className="relative">
														<Image
															src={img.image}
															width={400}
															height={300}
															alt={img.alt || `Project image ${imgIndex + 1}`}
															className="rounded-lg object-cover"
														/>
														{img.caption && (
															<p className="text-sm text-zinc-400 mt-1">{img.caption}</p>
														)}
													</div>
												))}
											</div>
										)}
									</div>
								))}
							</div>
						</section>

						<section className="mt-24 max-w-4xl">
							<h2 className="font-semibold text-4xl mb-4">CV</h2>
							<p className="text-zinc-400 max-w-lg mb-8">
								My academic and professional achievements.
							</p>

							{data.cvItems && data.cvItems.length > 0 ? (
								<div className="space-y-16">
									{data.cvItems.map((cvItem: CVType) => (
										<div key={cvItem._id}>
											<h3 className="text-2xl font-semibold mb-6">{cvItem.title}</h3>
											{cvItem.description && (
												<p className="text-zinc-400 mb-8">{cvItem.description}</p>
											)}

											{cvItem.categories.map((category, categoryIndex) => (
												<div key={categoryIndex} className="mb-12">
													<h4 className="text-xl font-medium border-b border-zinc-700 pb-2 mb-6">
														{category.categoryName}
													</h4>
													{category.categoryDescription && (
														<p className="text-zinc-400 mb-4">{category.categoryDescription}</p>
													)}

													<div className="space-y-8">
														{category.items.map((item, itemIndex) => (
															<div key={itemIndex} className="border-l-2 border-zinc-700 pl-6 transition-all">
																<div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
																	<div>
																		<h5 className="text-lg font-bold">{item.title}</h5>
																		{item.eventName && (
																			<p className="text-zinc-400">{item.eventName}</p>
																		)}
																	</div>
																	<div className="flex items-center gap-2 text-zinc-400">
																		<BiCalendar className="inline-block" />
																		<span>
																			{new Date(item.date).toLocaleDateString('en-US', { 
																				year: 'numeric', 
																				month: 'short'
																			})} {
																				item.endDate 
																					? ` - ${new Date(item.endDate).toLocaleDateString('en-US', { 
																						year: 'numeric', 
																						month: 'short'
																					})}` 
																					: ''
																			}
																		</span>
																	</div>
																</div>

																{item.location && (
																	<div className="flex items-center gap-2 mt-2 text-zinc-400">
																		<BiMap className="inline-block" />
																		<span>{item.location}</span>
																	</div>
																)}

																{item.description && (
																	<div className="mt-4 prose prose-zinc dark:prose-invert">
																		<PortableText value={item.description} />
																	</div>
																)}

																{item.links && item.links.length > 0 && (
																	<div className="mt-4">
																		<h6 className="font-medium mb-2">Related Links</h6>
																		<ul className="space-y-1">
																			{item.links.map((link, linkIndex) => (
																				<li key={linkIndex} className="flex items-center gap-2">
																					<BiLink className="text-purple-400" />
																					<a 
																						href={link.url} 
																						target="_blank" 
																						rel="noopener noreferrer"
																						className="hover:text-purple-400 duration-300"
																					>
																						{link.label}
																					</a>
																				</li>
																			))}
																		</ul>
																	</div>
																)}

																{item.images && item.images.length > 0 && (
																	<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
																		{item.images.map((img, imgIndex) => (
																			<div key={imgIndex} className="relative">
																				<Image
																					src={img.image}
																					width={400}
																					height={300}
																					alt={img.alt || `Item image ${imgIndex + 1}`}
																					className="rounded-lg object-cover"
																				/>
																				{img.caption && (
																					<p className="text-sm text-zinc-400 mt-1">{img.caption}</p>
																				)}
																			</div>
																		))}
																	</div>
																)}
															</div>
														))}
													</div>
												</div>
											))}
										</div>
									))}
								</div>
							) : (
								<p className="text-zinc-400">No CV items available yet.</p>
							)}
						</section>
					</div>
				))}
		</div>
	);
}
