import React, { type HTMLAttributes } from 'react';

interface ToggleLinkProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
}

const ToggleLink: React.FC<ToggleLinkProps> = ({ text, style, ...props }) => {
  return (
    <span style={{ ...toggleLinkStyles.link, ...style }} {...props}>
      {text}
    </span>
  );
};

const toggleLinkStyles: { [key: string]: React.CSSProperties } = {
  link: {
    color: '#007bff',
    cursor: 'pointer',
    fontWeight: '600',
    marginLeft: '5px',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
};

export default ToggleLink;
