import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const OFFERS = [
  {
    title: "Site Vitrine",
    price: "800€",
    description: "Idéal pour présenter votre activité.",
    features: ["Design Responsive", "Jusqu'à 5 pages", "Formulaire de contact", "Optimisation SEO de base"],
    recommended: false,
  },
  {
    title: "Application Web",
    price: "Sur devis",
    description: "Pour des besoins métiers spécifiques.",
    features: ["Interface sur mesure", "Base de données", "Espace membre", "API & Intégrations"],
    recommended: true,
  },
  {
    title: "TJM / Freelance",
    price: "350€ / jour",
    description: "Renfort sur vos équipes techniques.",
    features: ["Développement React/Node", "Intégration Web", "Maintenance", "Code Review"],
    recommended: false,
  },
];

export const Pricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Mes Offres</h2>
        <p className="text-xl text-gray-600 mb-16">Des solutions adaptées à vos projets.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {OFFERS.map((offer, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-lg p-8 relative ${offer.recommended ? 'border-2 border-indigo-600 transform md:-translate-y-4' : ''}`}>
              {offer.recommended && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Populaire
                </span>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{offer.title}</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-4">{offer.price}</div>
              <p className="text-gray-500 mb-6">{offer.description}</p>
              <ul className="space-y-3 mb-8 text-left">
                {offer.features.map((feat, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/contact')}
                className={`w-full py-3 rounded-xl font-semibold transition-colors ${offer.recommended ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
              >
                Me contacter
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};