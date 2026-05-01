import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Map, Compass, Home, LogOut, User, ShieldAlert } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ added

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ✅ active link checker
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        
        <Link to="/" className="navbar-logo">
          <Compass className="logo-icon" size={28} />
          <span>SmartTravel Lanka</span>
        </Link>

        <ul className="navbar-menu">

          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active-link' : ''}`}
            >
              <Home size={18} /> Home
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link
                  to="/explore"
                  className={`nav-link ${isActive('/explore') ? 'active-link' : ''}`}
                >
                  <Map size={18} /> Explore
                </Link>
              </li>

              <li>
                <Link
                  to="/planner"
                  className={`nav-link ${isActive('/planner') ? 'active-link' : ''}`}
                >
                  <Compass size={18} /> Planner
                </Link>
              </li>

              {user.role === 'ROLE_ADMIN' && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className={`nav-link ${isActive('/admin/dashboard') ? 'active-link' : ''}`}
                  >
                    <ShieldAlert size={18} /> Admin
                  </Link>
                </li>
              )}

              <li>
                <span className="nav-user">
                  <User size={18} /> {user.username}
                </span>
              </li>

              <li>
                <button onClick={handleLogout} className="btn-logout">
                  <LogOut size={18} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`nav-link ${isActive('/login') ? 'active-link' : ''}`}
                >
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;