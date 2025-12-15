import React, { type ButtonHTMLAttributes, type CSSProperties } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  style,
  ...props
}) => {
  const baseStyle: CSSProperties = {
    padding: '14px 25px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.05em',
    fontWeight: '600',
    transition: 'background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease',
    width: fullWidth ? '100%' : 'auto',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const variantStyles: { [key in ButtonVariant]: CSSProperties } = {
    primary: {
      backgroundColor: '#5a3f31',
      color: 'white',
      outline: 'none',
    },
    secondary: {
      backgroundColor: 'white',
      color: '#b08969',
      border: '1px solid #b08969',
      boxShadow: 'none',
    },
  };

  return (
    <button style={{ ...baseStyle, ...variantStyles[variant], ...style }} {...props}>
      {children}
    </button>
  );
};

export default Button;
