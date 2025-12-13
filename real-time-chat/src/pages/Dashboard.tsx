import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div
      style={{
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
      }}
    >
      <h1>👋 ยินดีต้อนรับ!</h1>
      <p>คุณเข้าสู่ระบบสำเร็จแล้ว</p>

      <button
        onClick={logout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
