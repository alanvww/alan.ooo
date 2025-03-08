'use client';

import Link from 'next/link';
import WebGLBackground from '@/app/(site)/components/WebGLBackground';

export default function ProjectNotFound() {
    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* WebGL Background */}
            <div className='bg-black opacity-20'>
                <WebGLBackground />

            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-9xl font-bold mb-4">404</h1>
                    <h2 className="text-3xl font-semibold mb-6">Project Not Found</h2>
                    <p className="text-lg mb-8 max-w-md mx-auto">
                        Sorry, the project you're looking for doesn't exist or has been removed from the portfolio.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link
                            href="/projects"
                            className="inline-flex items-center px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md"
                        >
                            Browse All Projects
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
