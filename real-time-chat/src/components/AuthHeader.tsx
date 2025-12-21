import React from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div style={headerStyles.container}>
      <h1 style={headerStyles.title}>{title}</h1>
      <p style={headerStyles.subtitle}>{subtitle}</p>
    </div>
  );
};

const headerStyles: { [key: string]: React.CSSProperties } = {
  container: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.5',
  },
};

export default AuthHeader;
