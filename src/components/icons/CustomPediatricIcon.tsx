import React from 'react';

export const CustomPediatricIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Cabeça do bebê */}
      <circle cx="12" cy="6" r="4" fill="currentColor" opacity="0.9" />
      
      {/* Corpo do bebê */}
      <path 
        d="M4 15c0-2.5 2-4 3.5-4c.5 0 1 .2 1.5.5c.8.4 1.8.5 3 .5c1.2 0 2.2-.1 3-.5c.5-.3 1-.5 1.5-.5c1.5 0 3.5 1.5 3.5 4c0 4.5-3.33 7-8 7c-4.67 0-8-2.5-8-7z" 
        fill="currentColor" 
        opacity="0.9"
      />
      
      {/* Coração pulsante - marcador de cuidado pediátrico */}
      <circle cx="18" cy="6" r="1.5">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};
