import React from 'react';
import { useAuth } from '../auth/AuthContext.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import BoardPage from './BoardPage.jsx';

export default function App() {
  const { user } = useAuth();
  const [mode, setMode] = React.useState('login');
  if (!user) {
    return mode === 'login'
      ? <LoginPage onSwitch={() => setMode('register')} />
      : <RegisterPage onSwitch={() => setMode('login')} />;
  }
  return <BoardPage />;
}
