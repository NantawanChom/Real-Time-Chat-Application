import React, { type InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, error, ...props }) => {
  return (
    <div style={inputStyles.container}>
      {label && <label style={inputStyles.label}>{label}</label>}
      <input
        {...props}
        style={{
          ...inputStyles.input,
          ...(error && inputStyles.inputError),
          ...(props.onFocus && inputStyles.inputFocus),
        }}
      />
      {error && <span style={inputStyles.errorText}>{error}</span>}
    </div>
  );
};

const inputStyles: { [key: string]: React.CSSProperties } = {
  container: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.9em',
    color: '#444',
    fontWeight: '500',
  },

  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    fontSize: '1em',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none',
  },

  inputError: {
    borderColor: '#e74c3c',
  },

  inputFocus: {},
  errorText: {
    color: '#e74c3c',
    fontSize: '0.8em',
    marginTop: '5px',
    display: 'block',
  },
};

export default InputField;
