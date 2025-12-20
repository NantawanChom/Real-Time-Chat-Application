import React, { type InputHTMLAttributes } from 'react';

const SearchBar: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <div style={styles.container}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={styles.icon}
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input type="text" placeholder="Find friends or groups..." style={styles.input} {...props} />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    borderRadius: '12px',
    padding: '10px 16px',
    marginBottom: '25px',
  },
  icon: {
    marginRight: '10px',
  },
  input: {
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '1em',
    color: '#333',
    width: '100%',
    outline: 'none',
  },
};

export default SearchBar;
