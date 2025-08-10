'use client';
import dynamic from 'next/dynamic';
import React, { Suspense, useState, useEffect } from 'react';

// Define the types locally since react-player types are not easily accessible
interface ReactPlayerProps {
    src?: string;
    controls?: boolean;
    light?: boolean | string | React.ReactElement;
    width?: string | number;
    height?: string | number;
    playing?: boolean;
    onError?: (error: any) => void;
    [key: string]: any; // Allow other props
}

// Create a type that extends ReactPlayerProps with our custom props
type ClientPlayerProps = ReactPlayerProps & {
    url?: string;
};

const ReactPlayer = dynamic(
    () => import('react-player'),
    {
        ssr: false,
        loading: () => <div className="w-full h-full bg-gray-200 animate-pulse rounded" />,
    }
);

const ClientSidePlayer = (props: ClientPlayerProps) => {
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
    const { url, ...rest } = props;
    
    // Create the final props object, using url as src if provided
    const playerProps: ReactPlayerProps = {
        ...rest,
        src: url || rest.src
    };

    return (
        <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded" />}>
            <ReactPlayer {...playerProps} onError={handleError} />
        </Suspense>
    );
};

export default ClientSidePlayer;
