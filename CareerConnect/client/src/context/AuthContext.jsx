import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null), [loading, setLoading] = useState(true);
  useEffect(() => { if (localStorage.getItem('cc_token')) api.get('/auth/me').then(r => setUser(r.data.user)).catch(() => localStorage.removeItem('cc_token')).finally(() => setLoading(false)); else setLoading(false); }, []);
  const login = async data => { const r = await api.post('/auth/login', data); localStorage.setItem('cc_token', r.data.token); setUser(r.data.user); };
  const register = async data => { const r = await api.post('/auth/register', data); localStorage.setItem('cc_token', r.data.token); setUser(r.data.user); };
  const logout = () => { localStorage.removeItem('cc_token'); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
