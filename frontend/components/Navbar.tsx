import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { APP_NAME, NAV_ITEMS } from '../constants';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img
              src="/logo.png"
              alt="Hélia"
              className="h-10 w-auto"
              />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-helia-purple ${isActive ? '!text-helia-magenta !font-bold' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* CTA & Account */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                 <span className="text-sm font-medium text-gray-700">Hello, {user?.firstName}</span>
                 <Button variant="primary" size="sm" onClick={() => navigate('/dashboard')}>
                    Mon Espace
                 </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
                  <UserIcon className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                  S'inscrire
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-helia-purple focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in-down">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 ${isActive ? 'bg-helia-orange/10 text-helia-purple' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 space-y-2">
              {isAuthenticated ? (
                 <>
                  <Button className="w-full justify-center mb-2" variant="primary" onClick={() => { navigate('/dashboard'); setIsOpen(false); }}>
                    Mon Espace
                  </Button>
                  <Button className="w-full justify-center" variant="secondary" onClick={() => { logout(); setIsOpen(false); }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                 </>
              ) : (
                <>
                  <Button className="w-full justify-center" variant="secondary" onClick={() => { navigate('/login'); setIsOpen(false); }}>
                    Connexion
                  </Button>
                  <Button className="w-full justify-center" variant="primary" onClick={() => { navigate('/register'); setIsOpen(false); }}>
                    Commencer
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};