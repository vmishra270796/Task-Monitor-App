import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('auth');
    return raw ? JSON.parse(raw).user : null;
  });
  const [token, setToken] = useState(() => {
    const raw = localStorage.getItem('auth');
    return raw ? JSON.parse(raw).token : null;
  });

  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('auth', JSON.stringify({ user, token }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthCtx.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => useContext(AuthCtx);
