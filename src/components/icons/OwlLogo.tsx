import React from 'react';

export function OwlLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path 
        d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" 
        fill="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 8C8.5 8 9 8.5 9 9C9 9.5 8.5 10 8 10C7.5 10 7 9.5 7 9C7 8.5 7.5 8 8 8Z" 
        fill="white" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M16 8C16.5 8 17 8.5 17 9C17 9.5 16.5 10 16 10C15.5 10 15 9.5 15 9C15 8.5 15.5 8 16 8Z" 
        fill="white" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12 14L9 16H15L12 14Z" 
        fill="white" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}