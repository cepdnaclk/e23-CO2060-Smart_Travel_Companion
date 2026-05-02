import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from token on app start
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);

        // ⏳ Check token expiration
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser({
            username: decoded.sub,
            role: decoded.role,
          });
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        setUser(null);
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (token) => {
    try {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);

      setUser({
        username: decoded.sub,
        role: decoded.role,
      });
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};