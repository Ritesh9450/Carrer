import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export default function Layout({ children }) {
  const { user, logout } = useAuth(); const nav = useNavigate();
  return <><header className="topbar"><Link to="/" className="brand"><span className="brand-icon"><BriefcaseBusiness size={21}/></span>Career<span>Connect</span></Link><nav><NavLink to="/">Find opportunities</NavLink>{user?.role === 'student' && <NavLink to="/applications">My applications</NavLink>}{user?.role === 'recruiter' && <NavLink to="/recruiter">Recruiter dashboard</NavLink>}{user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}</nav><div className="nav-actions">{user ? <><span className="welcome"><UserCircle size={17}/> {user.name}</span><button className="btn btn-ghost btn-small" onClick={() => {logout(); nav('/');}}><LogOut size={15}/> Logout</button></> : <><Link className="btn btn-ghost btn-small" to="/login">Log in</Link><Link className="btn btn-primary btn-small" to="/register">Sign up</Link></>}</div></header><main>{children}</main><footer>© {new Date().getFullYear()} CareerConnect · Connecting talent with opportunity</footer></>;
}
