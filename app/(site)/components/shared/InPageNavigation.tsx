'use client';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { BiSubdirectoryLeft } from 'react-icons/bi';

interface InPageNavigationProps {
	contentSelector: string; // Selector to find the content that contains the headings
}

const InPageNavigation: React.FC<InPageNavigationProps> = ({
	contentSelector,
}) => {
	const [inpageLinks, setInpageLinks] = useState<
		{ id: string; text: string }[]
	>([]);
	const [activeSection, setActiveSection] = useState<string>('');
	const [scrollProgress, setScrollProgress] = useState<number>(0);
	const navRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const contentElement = document.querySelector(contentSelector);
		if (!contentElement) return;

		const h2NodeArray = contentElement.querySelectorAll('h2');
		const links = Array.from(h2NodeArray).map((node, index) => {
			const id = `section-${index}`;
			node.setAttribute('id', id);
			return { id, text: node.innerHTML };
		});
		setInpageLinks(links);

		const handleScroll = () => {
			let selectedId = '';
			let maxScrollHeight = document.body.scrollHeight - window.innerHeight;
			let currentScrollPosition = window.scrollY;
			let navHeightPercent = navRef.current
				? (navRef.current.clientHeight / window.innerHeight) * 100
				: 0;
			let effectiveScrollRange = 80 - 20 - navHeightPercent; // 20% to 80% of the viewport, minus the height of the nav
			let scrollPercentage =
				(currentScrollPosition / maxScrollHeight) * effectiveScrollRange + 20;

			links.forEach((link) => {
				const section = document.querySelector(`#${link.id}`) as HTMLElement;
				if (
					section &&
					section.offsetTop <= window.scrollY + window.innerHeight / 4
				) {
					selectedId = link.id;
				}
			});

			setScrollProgress(scrollPercentage);
			setActiveSection(selectedId);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [contentSelector]);

	return (
		<div
			ref={navRef}
			className={`md:fixed right-0 h-fit hidden md:flex md:mr-2 p-px cursor-pointer`}
			style={{ top: `${scrollProgress}%` }}
		>
			<ul className="flex flex-col justify-items-end text-end 	 rounded-2xl p-5">
				{inpageLinks.map((link, index) => (
					<li
						key={index}
						className={`mx-1 p-2  border-r-2   ${activeSection === link.id ? 'border-theme-green text-theme-green  border-b-2 ' : 'border-white'} hover:text-theme-green hover:border-theme-green`}
						style={{ height: `${100 / inpageLinks.length}%` }}
					>
						<Link
							className="flex my-auto font-medium align-middle place-self-end ml-2  shrink-0 items-end justify-end"
							href={`#${link.id}`}
							replace
						>
							{link.text}
							<BiSubdirectoryLeft className="my-auto align-middle  text-md " />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default InPageNavigation;
