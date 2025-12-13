import React, { type ReactNode } from 'react';
import AuthPage from './pages/AuthPage';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';

function App() {
  interface ProtectedRouteProps {
    children: ReactNode;
  }

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  };

  const AuthRedirect: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn) {
      return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
  };

  return (
    <div style={appContainerStyle}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <AuthPage />
              </AuthRedirect>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="*"
            element={<h1 style={{ textAlign: 'center', marginTop: '100px' }}>404 Not Found</h1>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const appContainerStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh',
};

export default App;
