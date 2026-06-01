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
              <img 
                src="/logo.png" 
                alt="Logo Hélia" 
                className="w-8 h-autpo"
              />
              <h3 className="font-serif text-2xl font-bold text-helia-purple">Hélia</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Le lien numérique qui réunit les familles, simplifie le quotidien des seniors et rassure les proches.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-helia-coral">Accueil</Link></li>
              <li><Link to="/pricing" className="hover:text-helia-coral">Nos Offres</Link></li>
              <li><Link to="/about" className="hover:text-helia-coral">À propos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/legal" className="hover:text-helia-coral">Mentions Légales</Link></li>
              <li><Link to="/privacy" className="hover:text-helia-coral">Politique de Confidentialité</Link></li>
              <li><Link to="/cookies" className="hover:text-helia-coral">Gestion des cookies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>contact@helia.fr</li>
              <li>01 23 45 67 89</li>
              <li>2000 Rte des Lucioles, Biot</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Hélia. Tous droits réservés.</p>
          <div className="flex items-center text-sm text-gray-400 mt-4 md:mt-0">
            Fait avec <Heart size={16} className="text-helia-pink mx-1 fill-current" /> par les étudiants du BUT Info.
          </div>
        </div>
      </div>
    </footer>
  );
};