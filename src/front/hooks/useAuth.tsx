import { useState, useEffect } from 'react';

export interface AuthUser {
  id: number;
  email: string;
  display_name?: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setUser(data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    if (!res.ok) throw new Error((await res.json()).msg || 'Registration failed');
    const data = await res.json();
    localStorage.setItem('token', data.token);
    setUser({ ...data.user, display_name: name });
    return { data, error: null };
  };

  const signIn = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error((await res.json()).msg || 'Login failed');
    const data = await res.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return { data, error: null };
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, signUp, signIn, signOut };
};
