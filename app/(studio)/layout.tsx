export const metadata = {
	title: 'Sanity Studio',
	description: 'Content management for portfolio site',
}


export default function StudioLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{children}
		</>
	);
}
