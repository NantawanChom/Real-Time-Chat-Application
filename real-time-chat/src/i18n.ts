import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      auth: {
        welcomeBack: 'Welcome Back',
        joinUs: 'Join Us',
        loginSubtitle: 'Please log in to continue',
        signupSubtitle: 'Create a new account in seconds',
        username: 'Username',
        usernamePlaceholder: 'Enter your username',
        email: 'Email',
        emailPlaceholder: 'example@email.com',
        password: 'Password',
        passwordPlaceholder: 'Your password',
        login: 'Log In',
        signup: 'Sign Up',
        noAccount: "Don't have an account?",
        haveAccount: 'Already a member?',
        fillAllFields: 'Please fill in all fields',
      },
    },
  },
  th: {
    translation: {
      auth: {
        welcomeBack: 'ยินดีต้อนรับกลับมา',
        joinUs: 'เข้าร่วมกับเรา',
        loginSubtitle: 'กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ',
        signupSubtitle: 'สร้างบัญชีใหม่ภายในไม่กี่วินาที',
        username: 'ชื่อผู้ใช้งาน',
        usernamePlaceholder: 'กำหนดชื่อผู้ใช้งาน',
        email: 'อีเมล',
        emailPlaceholder: 'example@email.com',
        password: 'รหัสผ่าน',
        passwordPlaceholder: 'รหัสผ่านของคุณ',
        login: 'เข้าสู่ระบบ',
        signup: 'ลงทะเบียน',
        noAccount: 'ยังไม่มีบัญชีใช่หรือไม่?',
        haveAccount: 'เป็นสมาชิกอยู่แล้วใช่หรือไม่?',
        fillAllFields: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'th',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
