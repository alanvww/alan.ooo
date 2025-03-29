'use client'

import { StudioProvider, StudioLayout } from 'sanity'
import config from '@/sanity.config'
import React,{ useRef } from 'react'

// This wrapper component helps handle React 19 strictness issues
export default function StudioWrapper() {
    // Use a ref to avoid state updates during render
    const configRef = useRef(config)

    return (
        <>
            <StudioProvider config={configRef.current}>
                <StudioLayout />
            </StudioProvider>
        </>
    )
}