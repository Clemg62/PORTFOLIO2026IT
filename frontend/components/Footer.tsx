import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="font-serif text-2xl font-bold text-indigo-600">Clément Gosse</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Étudiant en BUT Informatique. Passionné par le développement web, l'écosystème React et la création d'interfaces modernes.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-indigo-600">Accueil</Link></li>
              <li><Link to="/portfolio" className="hover:text-indigo-600">Projets & Expériences</Link></li>
              <li><Link to="/about" className="hover:text-indigo-600">À propos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/legal" className="hover:text-indigo-600">Mentions Légales</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-600">Politique de Confidentialité</Link></li>
              <li><Link to="/cookies" className="hover:text-indigo-600">Gestion des cookies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>clementgosse83@gmail.com</li>
              <li>06 46 52 53 43</li>
              <li>Côte d'Azur, France</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Clément Gosse. Tous droits réservés.</p>
          <div className="flex items-center text-sm text-gray-400 mt-4 md:mt-0">
            Codé avec <Heart size={16} className="text-indigo-500 mx-1 fill-current" /> en React.
          </div>
        </div>
      </div>
    </footer>
  );
};