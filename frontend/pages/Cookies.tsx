import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Cookie, Shield, BarChart, Megaphone, Check } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const Cookies: React.FC = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });
  
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Changement du nom de la clé locale
    const stored = localStorage.getItem('portfolio_cookie_preferences');
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
  }, []);

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Cannot toggle essential
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('portfolio_cookie_preferences', JSON.stringify(prefs));
    setPreferences(prefs);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const acceptAll = () => {
    savePreferences({ essential: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    savePreferences({ essential: true, analytics: false, marketing: false });
  };

  const saveSelection = () => {
    savePreferences(preferences);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
           <div className="inline-block p-4 bg-indigo-100 rounded-full mb-6">
             <Cookie className="w-10 h-10 text-indigo-600" />
           </div>
           <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Gestion des Cookies</h1>
           <p className="text-lg text-gray-600 max-w-xl mx-auto">
             Ce portfolio utilise des cookies pour optimiser votre expérience de navigation et analyser le trafic. 
             Vous avez le contrôle total sur ceux que vous souhaitez autoriser.
           </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
            {/* Essential */}
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-green-100 text-green-700 rounded-xl flex-shrink-0">
                    <Shield size={24} />
                </div>
                <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                        <h3 className="text-lg font-bold text-gray-900">Cookies Nécessaires</h3>
                        <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full uppercase tracking-wider">Toujours actif</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Indispensables au bon fonctionnement du site (sécurité, mémorisation de vos préférences de cookies). Ils ne peuvent pas être désactivés car le site ne pourrait pas fonctionner correctement sans eux.
                    </p>
                </div>
            </div>

            {/* Analytics */}
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-blue-100 text-blue-700 rounded-xl flex-shrink-0">
                    <BarChart size={24} />
                </div>
                <div className="flex-grow">
                     <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-gray-900">Analytiques</h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={preferences.analytics}
                                onChange={() => handleToggle('analytics')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Me permettent de comprendre comment vous utilisez mon portfolio (projets les plus regardés, temps passé) afin d'améliorer mon contenu. Ces données sont anonymisées.
                    </p>
                </div>
            </div>

            {/* Marketing */}
            <div className="p-6 md:p-8 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-purple-100 text-purple-700 rounded-xl flex-shrink-0">
                    <Megaphone size={24} />
                </div>
                <div className="flex-grow">
                     <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-gray-900">Marketing</h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={preferences.marketing}
                                onChange={() => handleToggle('marketing')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Ces cookies permettent de vous proposer du contenu pertinent. (Note : Ce portfolio n'utilise actuellement aucun cookie publicitaire tiers, cette option est présente à titre préventif).
                    </p>
                </div>
            </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
            <Button className="w-full sm:w-auto bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-semibold py-2 px-6 rounded-lg transition-colors" onClick={rejectAll}>
                Tout refuser
            </Button>
            <Button className="w-full sm:w-auto bg-indigo-100 text-indigo-700 hover:bg-indigo-200 font-semibold py-2 px-6 rounded-lg transition-colors" onClick={saveSelection}>
                Enregistrer mes choix
            </Button>
            <Button className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 font-semibold py-2 px-6 rounded-lg shadow-md transition-colors" onClick={acceptAll}>
                Tout accepter
            </Button>
        </div>

        {/* Message de confirmation */}
        {saved && (
            <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center animate-fade-in-up z-50">
                <Check size={20} className="mr-3" />
                <span className="font-medium">Préférences enregistrées !</span>
            </div>
        )}
      </div>
    </div>
  );
};