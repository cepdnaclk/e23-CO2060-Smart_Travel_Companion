import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Map, Compass, Home, LogOut, User, ShieldAlert } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Compass className="logo-icon" size={28} />
          <span>SmartTravel Lanka</span>
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="nav-link"><Home size={18} /> Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/explore" className="nav-link"><Map size={18} /> Explore</Link>
              </li>
              <li>
                <Link to="/planner" className="nav-link"><Compass size={18} /> Planner</Link>
              </li>
              {user.role === 'ROLE_ADMIN' && (
                <li>
                  <Link to="/admin/dashboard" className="nav-link"><ShieldAlert size={18} /> Admin</Link>
                </li>
              )}
              <li>
                <span className="nav-user"><User size={18} /> {user.username}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn-logout"><LogOut size={18} /> Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
