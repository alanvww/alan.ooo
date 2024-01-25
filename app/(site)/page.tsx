import dynamic from 'next/dynamic';

import { IsClientCtxProvider } from './utilities/is-client-ctx';

import HomeMenu from './HomeMenu';

const WebGLBackground = dynamic(() => import('./components/WebGLBackground'), {
	ssr: false,
});

export default function Home() {
	return (
		<>
			<WebGLBackground />
			<HomeMenu />
		</>
	);
}
