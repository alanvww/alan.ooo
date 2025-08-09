'use client';
import dynamic from 'next/dynamic';
import React, { Suspense, useState, useEffect } from 'react';
import type ReactPlayerProps from 'react-player';

// Clean dynamic import with proper error handling
const ReactPlayer = dynamic(
	() => import('react-player').then((mod) => {
		console.log('ReactPlayer module loaded:', mod);
		// Ensure we get the default export
		const Component = mod.default || mod;
		console.log('ReactPlayer component:', Component);
		return { default: Component };
	}).catch((error) => {
		console.error('Failed to load ReactPlayer:', error);
		throw error;
	}),
	{
		ssr: false,
		loading: () => <div className="w-full h-full bg-gray-200 animate-pulse rounded" />,
	}
);

const ClientSidePlayer = (props: ReactPlayerProps) => {
	const [isClient, setIsClient] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		console.log('ClientPlayer: Setting isClient to true');
		setIsClient(true);
	}, []);

	// Add error boundary for ReactPlayer
	const handleError = (error: any) => {
		console.error('ReactPlayer error:', error);
		setHasError(true);
	};

	console.log('ClientPlayer render:', { isClient, hasError, props });

	if (!isClient) {
		console.log('ClientPlayer: Not client yet, showing loading');
		return <div className="w-full h-full bg-gray-200 animate-pulse rounded" />;
	}

	if (hasError) {
		console.log('ClientPlayer: Has error, showing error state');
		return (
			<div className="w-full h-full bg-red-100 border border-red-300 rounded flex items-center justify-center text-red-600">
				Video failed to load
			</div>
		);
	}

	console.log('ClientPlayer: Rendering ReactPlayer');
	return (
		<Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded" />}>
			<ReactPlayer 
				{...props} 
				onError={handleError}
			/>
		</Suspense>
	);
};

export default ClientSidePlayer;
