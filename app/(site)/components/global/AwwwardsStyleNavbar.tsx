'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AwwwardsStyleNavbar() {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleMouseLeave = () => {
		setIsExpanded(false);
	};

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white">
			<div className="container mx-auto px-4 py-2 flex justify-between items-center">
				<div>
					{/* Your logo or brand name here */}
					<span>BrandName</span>
				</div>
				<button onClick={() => setIsExpanded(!isExpanded)}>
					{/* Replace with an icon or text */}
					Menu
				</button>
			</div>
			{isExpanded && (
				<div
					onMouseLeave={handleMouseLeave}
					className="container mx-auto px-4 py-4 bg-gray-700"
				>
					{/* Expanded menu content */}
					<ul className="flex flex-col md:flex-row gap-4">
						<li>
							<Link href="/about">About</Link>
						</li>

						{/* More menu items */}
					</ul>
				</div>
			)}
		</nav>
	);
}
