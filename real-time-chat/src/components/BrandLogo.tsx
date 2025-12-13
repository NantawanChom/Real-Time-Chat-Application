import React from 'react';

interface BrandLogoProps {
  size?: number;
  color?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ size = 50, color = '#007bff' }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '25px' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" fill="white" style={{ display: 'none' }} />

        <path
          d="M21 15C21 16.6569 17.866 18 14 18H10.5C9.40003 18 8.44189 17.5815 7.72895 16.9069C6.9803 16.2081 6.5 15.2215 6.5 14.1557V7C6.5 5.34315 9.63401 4 13.5 4C17.366 4 20.5 5.34315 20.5 7V15H21ZM13.5 13C13.5 13 13.5 13 13.5 13ZM10.5 13H13.5C13.5 13 13.5 13 13.5 13ZM13.5 8H10.5C10.5 8 10.5 8 10.5 8Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M10.5 18C10.5 19.6569 7.36599 21 3.5 21V19C3.5 19 3.5 19 3.5 19V14.1557C3.5 13.0899 3.0197 12.1033 2.27105 11.4045C1.55811 10.7299 0.59997 10.3114 0.5 10.3114V7C0.5 5.34315 3.63401 4 7.5 4V13.5C7.5 15.1569 4.36599 16.5 0.5 16.5V18H10.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default BrandLogo;
