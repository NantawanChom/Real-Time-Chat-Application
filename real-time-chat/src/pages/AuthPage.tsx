import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/AuthCard';
import BrandLogo from '../components/BrandLogo';
import AuthHeader from '../components/AuthHeader';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import ToggleLink from '../ui/ToggleLink';

const AuthPage: React.FC = () => {
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

    if (!email || !password || (!isLogin && !username)) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (isLogin) {
      console.log('Logging in...');
    } else {
      console.log('Signing up...');
    }

    // Simulate successful login/signup
    login();
    navigate('/dashboard');
  };

  return (
    <div style={pageStyles.background}>
      <AuthCard>
        <BrandLogo size={50} color="#007bff" />
        <AuthHeader
          title={isLogin ? 'ยินดีต้อนรับกลับมา' : 'เข้าร่วมกับเรา'}
          subtitle={
            isLogin ? 'กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ' : 'สร้างบัญชีใหม่ภายในไม่กี่วินาที'
          }
        />
        {error && <p style={pageStyles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} style={pageStyles.form}>
          {!isLogin && (
            <InputField
              label="ชื่อผู้ใช้งาน"
              type="text"
              placeholder="กำหนดชื่อผู้ใช้งาน"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
            />
          )}
          <InputField
            label="อีเมล"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />

          <InputField
            label="รหัสผ่าน"
            type="password"
            placeholder="รหัสผ่านของคุณ"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <div style={pageStyles.buttonContainer}>
            <Button type="submit" fullWidth={true}>
              {isLogin ? 'เข้าสู่ระบบ' : 'ลงทะเบียน'}
            </Button>
          </div>
        </form>

        <div style={pageStyles.toggleText}>
          {isLogin ? 'ยังไม่มีบัญชีใช่หรือไม่?' : 'เป็นสมาชิกอยู่แล้วใช่หรือไม่?'}
          <ToggleLink text={isLogin ? ' ลงทะเบียน' : ' เข้าสู่ระบบ'} onClick={toggleForm} />
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
    fontSize: '0.9em',
    color: '#666',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: '15px',
    fontWeight: '500',
  },
};

export default AuthPage;
