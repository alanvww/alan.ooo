import Image from 'next/image';
import { getProfile } from '@/sanity/sanity.query';
import type { ProfileType, JobType, CVType, CVItemType } from '@/types';
import { PortableText } from '@portabletext/react';
import { Envelope, File, Link as LinkIcon, MapPin, Calendar, Book, GithubLogo, LinkedinLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import * as motion from "motion/react-client"
import Headline from '../../components/shared/Headline';
import InPageNavigation from '../../components/shared/InPageNavigation';
import { Collapsible } from '@/components/ui/collapsible';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions'

export const metadata: Metadata = {
	title: 'About me - Alan Ren',
	description: 'A little bit about me.',
};

export default async function About() {
	const profile: ProfileType[] = await getProfile();

	return (
		<div className="lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6 relative">
			<InPageNavigation contentSelector=".mainContent" requireScrollToView={true} />
			{profile &&
				profile.map((data) => (
					<div key={data._id} >
						<section className="grid lg:grid-cols-2 grid-cols-1 gap-x-6 justify-items-center">
							<motion.div
								className="order-2 lg:order-none"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<Headline
									title={`I'm Alan Ren. Blending code and creativity to shape digital futures.`}
									description={data.shortBio}
								/>
							</motion.div>

							<motion.div
								className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								<div>
									<motion.div
										initial={{ scale: 0.9, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{ duration: 0.5 }}
									>
										<Image
											className="rounded-2xl mb-4 object-cover w-auto max-h-96 min-h-96 bg-top bg-[#1d1d20]"
											src={data.profileImage.image}
											width={400}
											height={400}
											quality={100}
											priority={true}
											alt={data.profileImage.alt}
										/>
									</motion.div>

									<Link
										href={`${data.resumeURL}?dl=AlanRen_Resume.pdf`}
										className="flex items-center justify-center gap-x-2 bg-[#1d1d20] border border-transparent hover:bg-[#3b3b3b] hover:border-zinc-200 rounded-md duration-200 py-2 text-center cursor-cell font-medium"
									>
										<File className="text-base" /> Download Resume
									</Link>
								</div>

								<ul className="space-y-2">
									<li>
										<a
											href={`mailto:${data.email}`}
											className="flex items-center gap-x-2 hover:underline duration-300"
										>
											<Envelope className="text-lg" />
											{data.email}
										</a>
									</li>
									{data.socialLinks?.github && (
										<li>
											<a
												href={data.socialLinks.github}
												className="flex items-center gap-x-2 hover:underline duration-300"
												target="_blank"
												rel="noopener noreferrer"
											>
												<GithubLogo className="text-lg" />
												GitHub
											</a>
										</li>
									)}
									{data.socialLinks?.linkedin && (
										<li>
											<a
												href={data.socialLinks.linkedin}
												className="flex items-center gap-x-2 hover:underline duration-300"
												target="_blank"
												rel="noopener noreferrer"
											>
												<LinkedinLogo className="text-lg" />
												LinkedIn
											</a>
										</li>
									)}
									{data.socialLinks?.instagram && (
										<li>
											<a
												href={data.socialLinks.instagram}
												className="flex items-center gap-x-2 hover:underline duration-300"
												target="_blank"
												rel="noopener noreferrer"
											>
												<InstagramLogo className="text-lg" />
												Instagram
											</a>
										</li>
									)}
								</ul>
							</motion.div>
						</section>

						<main className="mainContent w-auto md:w-min md:m-auto p-0 flex flex-col md:items-center gap-y-5 pt-8 leading-7">
							<motion.section
								className="mt-24 max-w-4xl "
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.3 }}
							>
								<motion.h2
									className="font-semibold text-4xl mb-4 pt-20 mt-8"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5 }}
								>
									Expertise
								</motion.h2>
								<p className="text-zinc-400 max-w-lg mb-10">
									I&apos;ve spent few years working on my skills. Here are my areas of expertise.
								</p>

								<motion.div
									className="space-y-2"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.2 }}
								>
									{data.skillCategories?.map((category, categoryIndex) => (
										<Collapsible
											key={categoryIndex}
											title={<h3 className="text-xl font-medium">{category.category}</h3>}
											defaultOpen={categoryIndex === 0}
											className="last:border-b-0"
										>
											<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3 pointer-events-none">
												{category.skills.map((skill, skillIndex) => (
													<div
														key={skillIndex}
														className="bg-[#1d1d20] border border-transparent hover:border-zinc-700 rounded-md px-3 py-2 text-center transition-colors duration-200"
													>
														{skill}
													</div>
												))}
											</div>
										</Collapsible>
									))}
								</motion.div>
							</motion.section>

							<motion.section
								className="mt-24 max-w-4xl"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.4 }}
							>
								<motion.h2
									className="font-semibold text-4xl mb-4 pt-20 mt-8"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5 }}
								>
									Experience
								</motion.h2>
								<p className="text-zinc-400 max-w-lg mb-8">
									My professional journey and career path.
								</p>

								<div className="space-y-12">
									{data.experience?.map((job, index) => (
										<motion.div
											key={job._id}
											className="border-l-2 border-zinc-700 pl-6 transition-all"
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.5, delay: 0.1 * index }}
										>
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
													<div className='my-2'>
														<h3 className="text-lg max-w-3xl font-bold mb-0 md:overflow-hidden text-ellipsis md:whitespace-nowrap">{job.jobTitle}</h3>
														<p className="text-zinc-400">{job.name}</p>
													</div>
												</div>
												<div className='flex text-sm md:text-md md:flex-col m-0 p-0 gap-2  items-center md:items-end md:justify-center'>

													<div className="flex my-auto  items-center gap-2 text-zinc-400">
														<Calendar className="inline-block" />
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
													{job.location && (
														<div className="flex my-auto items-center gap-2  text-zinc-400">
															<MapPin className="inline-block" />
															<span>{job.location}</span>
														</div>
													)}
												</div>

											</div>


											<div>
												<div className="mt-4 max-w-3xl text-md leading-8 text prose prose-zinc dark:prose-invert">
													<PortableText value={job.description} />
												</div>

												{job.projectLinks && job.projectLinks.length > 0 && (
													<div className="mt-4">
														<h4 className="font-medium mb-2">Links</h4>
														<ul className="space-y-1">
															{job.projectLinks.map((link, linkIndex) => (
																<li key={linkIndex} className="flex items-center gap-2">
																	<LinkIcon className="text-purple-400" />
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
										</motion.div>
									))}
								</div>
							</motion.section>

							<motion.section
								className="mt-24 max-w-4xl"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.5 }}
							>
								<motion.h2
									className="font-semibold text-4xl mb-4 pt-20 mt-8"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5 }}
								>
									CV
								</motion.h2>
								<p className="text-zinc-400 max-w-lg mb-8">
									My academic and professional achievements.
								</p>

								{data.cvCategories && data.cvCategories.length > 0 ? (
									<motion.div
										className="space-y-8"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.2 }}
									>
										{data.cvCategories.map((category: CVType, index: number) => (
											<motion.div
												key={category._id}
												className="mb-8"
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.5, delay: 0.1 * index }}
											>
												<div className="mb-4">
													<h3 className="text-2xl font-semibold w-fit">{category.categoryName}</h3>
													{category.categoryDescription && (
														<p className="text-zinc-400 mb-6 mt-2">{category.categoryDescription}</p>
													)}

													<div className="space-y-8 mt-6">
														{category.items.map((item: CVItemType, itemIndex: number) => (
															<div key={itemIndex} className="border-l-2 border-zinc-700 pl-6 transition-all">
																<div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
																	<div>
																		<h5 className="text-lg font-bold mt-2 mb-0 overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</h5>
																		{item.eventName && (
																			<p className="text-zinc-400 text-sm mb-2">{item.eventName}</p>
																		)}
																	</div>
																	<div className='flex text-sm md:text-md md:flex-col m-0 p-0 gap-2  items-center md:items-end md:justify-center'>
																		<div className="flex my-auto  items-center gap-2 text-zinc-400">
																			<Calendar className="inline-block" />
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
																		{item.location && (
																			<div className="flex my-auto  items-center gap-2 text-zinc-400">
																				<MapPin className="inline-block" />
																				<span>{item.location}</span>
																			</div>
																		)}
																	</div>

																</div>



																{item.description && (
																	<div className="mt-4 max-w-3xl prose prose-zinc dark:prose-invert">
																		<PortableText value={item.description} />
																	</div>
																)}

																{item.links && item.links.length > 0 && (
																	<div className="mt-4">
																		<h6 className="font-medium mb-2">Links</h6>
																		<ul className="space-y-1">
																			{item.links.map((link, linkIndex) => (
																				<li key={linkIndex} className="flex items-center gap-2">
																					<LinkIcon className="text-purple-400" />
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
											</motion.div>
										))}
									</motion.div>
								) : (
									<p className="text-zinc-400">No CV items available yet.</p>
								)}
							</motion.section>
						</main>
					</div>
				))}
		</div>
	);
}
