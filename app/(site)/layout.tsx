import { ViewTransitions } from 'next-view-transitions'
import NewCursor from './components/global/NewCursor';

// We keep the metadata but don't duplicate the HTML/body structure
export const metadata = {
	title: 'Portfolio - Alan Ren',
	description: 'A personal portfolio built with Next.js by Alan Ren',
};

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ViewTransitions>
			<NewCursor enableCustomCursor />
			{children}
		</ViewTransitions>
	);
}
