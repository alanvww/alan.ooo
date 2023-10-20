'use client';
import Link from 'next/link';
import { useState } from 'react';

interface AnimatedDivProps {
	children: any;
}

function AnimatedDiv({ children }: AnimatedDivProps) {
	const [hovered, setHovered] = useState(false);

	return (
		<Link
			href={`/projects/${children.slug}`}
			key={children._id}
			className="flex items-center py-4 gap-x-4"
		>
			<div
				className="text-white grid grid-cols-2 group flex-grow m-2 text-xl font-semibold w-full transition-all duration-300  ease-in-out"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<h2 className="place-self-start">{children.name}</h2>
				<h2 className={`place-self-end ${hovered ? 'hidden' : ''} `}>
					{children.year}
				</h2>
				<h2
					className={`place-self-end duration-300   ${
						hovered ? 'block ' : 'hidden'
					}  `}
				>
					{children.medium}
				</h2>
			</div>
		</Link>
	);
}

export default AnimatedDiv;
