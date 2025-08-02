import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Trophy, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: 'var(--card-background)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem 0',
      boxShadow: 'var(--shadow)'
    }}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--primary-color)',
              textDecoration: 'none'
            }}>
              <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>
                Intern Dashboard
              </span>
              <span style={{ display: 'inline', '@media (min-width: 768px)': { display: 'none' } }}>
                Dashboard
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/dashboard" 
              className="btn"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                padding: '0.5rem 1rem'
              }}
            >
              <Home size={16} style={{ marginRight: '0.5rem' }} />
              Dashboard
            </Link>
            
            <Link 
              to="/leaderboard" 
              className="btn"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                padding: '0.5rem 1rem'
              }}
            >
              <Trophy size={16} style={{ marginRight: '0.5rem' }} />
              Leaderboard
            </Link>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--background-color)',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-color)'
            }}>
              <User size={16} />
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                {user?.name}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="btn"
              style={{
                backgroundColor: 'transparent',
                color: '#dc2626',
                border: '1px solid #fecaca',
                padding: '0.5rem 1rem'
              }}
            >
              <LogOut size={16} style={{ marginRight: '0.5rem' }} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                padding: '0.5rem'
              }}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--background-color)',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link 
                to="/dashboard" 
                className="btn"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  padding: '0.75rem 1rem',
                  textAlign: 'center',
                  textDecoration: 'none'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home size={16} style={{ marginRight: '0.5rem' }} />
                Dashboard
              </Link>
              
              <Link 
                to="/leaderboard" 
                className="btn"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  padding: '0.75rem 1rem',
                  textAlign: 'center',
                  textDecoration: 'none'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Trophy size={16} style={{ marginRight: '0.5rem' }} />
                Leaderboard
              </Link>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--card-background)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)'
              }}>
                <User size={16} />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                  {user?.name}
                </span>
              </div>

              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="btn"
                style={{
                  backgroundColor: 'transparent',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  padding: '0.75rem 1rem',
                  width: '100%'
                }}
              >
                <LogOut size={16} style={{ marginRight: '0.5rem' }} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 