'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import { ReactPlayerProps } from 'react-player';

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
	ssr: false,
});

const ClientSidePlayer = (props: ReactPlayerProps) => {
	return <ReactPlayer {...props} />;
};

export default ClientSidePlayer;
