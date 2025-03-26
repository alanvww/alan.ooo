'use client';

import { Link } from 'next-view-transitions'
import WebGLBackground from '@/app/(site)/components/WebGLBackground';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* WebGL Background */}
      <WebGLBackground />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-9xl font-bold mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-lg mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300 rounded-md"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
