'use client';

import React, { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface CollapsibleProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Collapsible({ 
  title, 
  children, 
  defaultOpen = false,
  className = ''
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border-b border-zinc-800 cursor-none ${className}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left font-medium transition-all focus:outline-none cursor-pointer
"
      >
        {title}
        <span className="ml-2 shrink-0 text-zinc-400">
          {isOpen ? <BiChevronUp className="h-5 w-5" /> : <BiChevronDown className="h-5 w-5" />}
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen 
            ? 'max-h-[1000px] pb-6 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
