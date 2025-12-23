import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && savedLanguage.startsWith('en')) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('th');
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div style={styles.container}>
      <button
        onClick={() => changeLanguage('th')}
        style={{
          ...styles.button,
          ...(currentLanguage === 'th' ? styles.activeButton : {}),
        }}
      >
        ไทย
      </button>
      <button
        onClick={() => changeLanguage('en')}
        style={{
          ...styles.button,
          ...(currentLanguage === 'en' ? styles.activeButton : {}),
        }}
      >
        English
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  button: {
    padding: '8px 16px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  activeButton: {
    backgroundColor: '#7b5a43',
    color: '#fff',
    borderColor: '#7b5a43',
  },
};

export default LanguageSwitcher;
