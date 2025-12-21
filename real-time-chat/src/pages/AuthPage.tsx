import React, { useState, type FormEvent, type ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/AuthCard';
import BrandLogo from '../components/BrandLogo';
import AuthHeader from '../components/AuthHeader';
import LanguageSwitcher from '../components/LanguageSwitcher';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import ToggleLink from '../ui/ToggleLink';

const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');

  const toggleForm = (): void => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
    setEmail('');
    setPassword('');
    setUsername('');
    setError('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError('');

    if (!username || !password || (!isLogin && !email)) {
      setError(t('auth.fillAllFields'));
      return;
    }

    if (isLogin) {
      console.log('Logging in...');
    } else {
      console.log('Signing up...');
    }

    login();
    navigate('/chat');
  };

  return (
    <div style={pageStyles.background}>
      <AuthCard>
        <LanguageSwitcher />
        <BrandLogo size={50} color="#7b5a43" />
        <AuthHeader
          title={isLogin ? t('auth.welcomeBack') : t('auth.joinUs')}
          subtitle={isLogin ? t('auth.loginSubtitle') : t('auth.signupSubtitle')}
        />
        {error && <p style={pageStyles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} style={pageStyles.form}>
          {!isLogin && (
            <InputField
              label={t('auth.email')}
              type="email"
              placeholder={t('auth.emailPlaceholder')}
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          )}
          <InputField
            label={t('auth.username')}
            type="text"
            placeholder={t('auth.usernamePlaceholder')}
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
          />

          <InputField
            label={t('auth.password')}
            type="password"
            placeholder={t('auth.passwordPlaceholder')}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <div style={pageStyles.buttonContainer}>
            <Button type="submit" fullWidth={true}>
              {isLogin ? t('auth.login') : t('auth.signup')}
            </Button>
          </div>
        </form>

        <div style={pageStyles.toggleText}>
          {isLogin ? t('auth.noAccount') : t('auth.haveAccount')}
          <ToggleLink
            text={isLogin ? ' ' + t('auth.signup') : ' ' + t('auth.login')}
            onClick={toggleForm}
          />
        </div>
      </AuthCard>
    </div>
  );
};

const pageStyles: { [key: string]: React.CSSProperties } = {
  background: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
  },
  form: {
    width: '100%',
    marginTop: '10px',
  },
  buttonContainer: {
    marginTop: '5px',
  },
  toggleText: {
    marginTop: '30px',
    fontSize: '16px',
    color: '#666',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: '16px',
    fontWeight: '500',
  },
};

export default AuthPage;
