import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Layout, Smartphone, Server, CheckCircle } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white py-24 relative overflow-hidden">
        {/* Petit effet de fond abstrait */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* TA PHOTO DE PROFIL ICI */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/profil.png" 
              alt="Clément Gosse" 
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-indigo-400/30 shadow-2xl"
            />
          </div>

          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 font-semibold text-sm mb-6">
            Recherche Alternance / Stage 2026
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Clément Gosse
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mt-2">
              Développeur Frontend
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Étudiant en 2ème année de BUT Informatique.<br />
            Passionné par la création d'applications web performantes et l'écosystème React / Vite.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/portfolio')}
              className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center"
            >
              Voir mes projets code <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Me contacter
            </button>
          </div>
        </div>
      </section>

      {/* --- MES COMPÉTENCES TECH (La Grille) --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Ma Stack Technique</h2>
            <p className="mt-4 text-xl text-gray-600">Les technologies que j'utilise au quotidien pour développer.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkillCard 
              icon={<Code className="w-8 h-8 text-indigo-600" />}
              title="Frontend React"
              desc="Développement d'interfaces dynamiques et réactives avec React, Vite et Tailwind CSS."
            />
            <SkillCard 
              icon={<Smartphone className="w-8 h-8 text-indigo-600" />}
              title="Progressive Web Apps"
              desc="Création de PWA (projet Hélia) avec Service Workers pour une expérience mobile optimale."
            />
            <SkillCard 
              icon={<Layout className="w-8 h-8 text-indigo-600" />}
              title="Intégration UI/UX"
              desc="Traduction fidèle de maquettes en code. Sens du design et de l'expérience utilisateur."
            />
            <SkillCard 
              icon={<Server className="w-8 h-8 text-indigo-600" />}
              title="Outils & Déploiement"
              desc="Maîtrise de Git, GitHub, et déploiement continu sur des plateformes comme Vercel."
            />
          </div>
        </div>
      </section>

      {/* --- BANNIÈRE FINALE CTA --- */}
      <section className="bg-indigo-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Un projet informatique à réaliser ?</h2>
          <p className="text-indigo-200 text-lg mb-10">
            Je suis à la recherche de nouvelles opportunités pour mettre mes compétences en pratique.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg inline-flex items-center"
          >
            <CheckCircle className="mr-2 w-5 h-5" />
            Échanger sur mon profil
          </button>
        </div>
      </section>

    </div>
  );
};

// Composant Carte (Design propre)
const SkillCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100 group">
    <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
      <div className="text-indigo-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);