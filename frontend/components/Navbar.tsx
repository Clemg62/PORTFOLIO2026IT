import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

// Liste des liens de navigation mise à jour pour ton portfolio
const NAV_ITEMS = [
  { path: '/', label: 'Accueil' },
  { path: '/portfolio', label: 'Projets' },
  { path: '/about', label: 'Parcours' },
  { path: '/dashboard', label: 'Démo Technique' }
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo / Nom */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="font-bold text-2xl text-indigo-600 tracking-tight">Clément<span className="text-gray-900">.</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-indigo-600 ${isActive ? '!text-indigo-600 !font-bold' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Contact */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="primary" size="sm" onClick={() => navigate('/contact')}>
              Me contacter
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
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
                className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 ${isActive ? 'bg-indigo-50 text-indigo-600' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 space-y-2">
              <Button className="w-full justify-center" variant="primary" onClick={() => { navigate('/contact'); setIsOpen(false); }}>
                Me contacter
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};