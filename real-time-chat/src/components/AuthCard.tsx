import React, { type ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return <div style={cardStyles.container}>{children}</div>;
};

const cardStyles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '450px',
    width: '90%',
    padding: '50px 40px',
    borderRadius: '16px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.05)',
    backgroundColor: 'white',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
};

export default AuthCard;
