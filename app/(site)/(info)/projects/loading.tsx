export default function Loading() {
	return (
		<main>
			{/* Hero Section Skeleton */}
			<div className="absolute top-0 left-0 w-full h-[25vh] md:h-[36vh] -z-10 flex items-center justify-center">
				{/* Title Skeleton */}
				<div className="absolute text-center self-center px-8 lg:px-16 pt-12 z-10">
					<span className="inline-block w-64 md:w-96 lg:w-[600px] h-8 md:h-12 lg:h-20 bg-[#1d1d20] rounded-sm animate-pulse"></span>
				</div>
				{/* Cover Image Skeleton */}
				<div className="absolute inset-0 bg-[#1d1d20] opacity-30 animate-pulse"></div>
			</div>

			{/* Content Area Skeleton */}
			<div className="max-w-5xl mx-auto mt-[16vh] md:mt-[36vh] md:px-16 px-8 relative">
				{/* Text Content Skeleton - InPageNavigation is fixed/invisible initially so no skeleton needed */}
				<div className="flex flex-col gap-y-5 pt-8">
					<span className="w-full h-6 bg-[#1d1d20] rounded-sm animate-pulse"></span>
					<span className="w-4/5 h-6 bg-[#1d1d20] rounded-sm animate-pulse"></span>
					<span className="w-full h-6 bg-[#1d1d20] rounded-sm animate-pulse"></span>
					<span className="w-3/4 h-6 bg-[#1d1d20] rounded-sm animate-pulse"></span>
				</div>
			</div>
		</main>
	);
}
