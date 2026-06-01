import React from 'react';
import {
  Code,
  Smartphone,
  Layout,
  Terminal,
  ChevronRight,
  Database,
  Zap
} from "lucide-react";

export const About: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* --- HERO STORYTELLING --- */}
      <section className="relative overflow-hidden bg-white pt-24 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-200">
            Mon Parcours
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            De la passion
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              au code source.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Actuellement en 2ème année de BUT Informatique, je me spécialise dans le développement web et la création d'interfaces utilisateur modernes, réactives et accessibles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="text-4xl font-black text-indigo-600 mb-2 group-hover:scale-110 transition-transform">React</div>
              <div className="text-gray-700 font-medium">Framework Frontend</div>
              <div className="text-sm text-gray-500 mt-1">Composants & Hooks</div>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="text-4xl font-black text-purple-600 mb-2 group-hover:scale-110 transition-transform">PWA</div>
              <div className="text-gray-700 font-medium">Progressive Web Apps</div>
              <div className="text-sm text-gray-500 mt-1">Expérience Mobile First</div>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="text-4xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform">UI/UX</div>
              <div className="text-gray-700 font-medium">Design & Intégration</div>
              <div className="text-sm text-gray-500 mt-1">Tailwind CSS & Maquettes</div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => {
            const nextSection = document.getElementById('problem-section');
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronRight className="w-8 h-8 text-indigo-400 transform rotate-90" />
        </div>
      </section>

      {/* --- LE CONSTAT (La vision Tech) --- */}
      <section id="problem-section" className="py-32 bg-gray-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-400 font-bold text-sm uppercase tracking-wider mb-4 block">
                La Vision
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Le web mérite des interfaces
                <span className="text-indigo-400"> performantes.</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Aujourd'hui, une application web ne doit pas seulement "fonctionner". Elle doit être rapide, intuitive et s'adapter parfaitement à tous les écrans.
                </p>
                <p>
                  Durant ma formation et mes projets (comme l'application Hélia), j'ai appris que l'expérience utilisateur est déterminée par la qualité du code en arrière-plan : architecture propre, gestion des états optimisée et bonnes pratiques de déploiement.
                </p>
                <div className="p-6 bg-indigo-900/30 border border-indigo-500/30 rounded-2xl mt-8">
                  <p className="text-xl font-semibold text-indigo-200 italic">
                    "Mon objectif ? Transformer des logiques complexes en interfaces simples et fluides pour l'utilisateur final."
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden border border-gray-800 p-8">
                {/* Représentation abstraite de code plutôt qu'une image */}
                <div className="w-full h-full bg-gray-900 rounded-xl border border-gray-700 shadow-2xl p-6 font-mono text-sm text-indigo-300 overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
                    <p><span className="text-pink-500">const</span> <span className="text-blue-400">Developer</span> = {'{'}</p>
                    <p className="pl-4">name: <span className="text-green-400">'Clément Gosse'</span>,</p>
                    <p className="pl-4">role: <span className="text-green-400">'Frontend Dev'</span>,</p>
                    <p className="pl-4">skills: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Vite'</span>, <span className="text-green-400">'Tailwind'</span>],</p>
                    <p className="pl-4">passion: <span className="text-green-400">'Clean Code'</span></p>
                    <p>{'}'};</p>
                    <br/>
                    <p><span className="text-blue-400">Developer</span>.<span className="text-yellow-200">build</span>();</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MA MÉTHODE (Tech) --- */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-24 max-w-4xl mx-auto">
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-wide mb-4 block">
              Processus de développement
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              De la maquette au <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">déploiement</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Une méthodologie rigoureuse pour garantir des applications fiables et maintenables.
            </p>
          </div>

          <div className="space-y-24">
            
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white rounded-full shadow-2xl border-8 border-gray-50 flex items-center justify-center overflow-hidden group">
                   <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800" alt="UI Design" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                   <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Layout className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Conception & UI/UX<br/>Penser avant de coder</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Tout bon projet commence par une réflexion sur l'architecture et l'expérience utilisateur. J'attache une grande importance à la structure des données et au design visuel avant d'écrire la première ligne de code.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 font-medium"><Database className="w-5 h-5 text-indigo-500 mr-3" /> Modélisation des données</li>
                  <li className="flex items-center text-gray-700 font-medium"><Layout className="w-5 h-5 text-indigo-500 mr-3" /> Intégration fidèle des maquettes</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
               <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white rounded-3xl shadow-2xl border-8 border-gray-50 flex items-center justify-center overflow-hidden group rotate-3">
                   <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800" alt="React Code" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Code className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Développement Web<br/>L'écosystème React</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Je code principalement des Single Page Applications (SPA) dynamiques en utilisant React. L'objectif est d'avoir un code modulaire, réutilisable et facile à maintenir.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 font-medium"><Code className="w-5 h-5 text-purple-500 mr-3" /> JavaScript & React.js</li>
                  <li className="flex items-center text-gray-700 font-medium"><Zap className="w-5 h-5 text-purple-500 mr-3" /> Environnement Vite & Tailwind CSS</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white rounded-3xl shadow-2xl border-8 border-gray-50 flex items-center justify-center overflow-hidden group -rotate-3">
                   <img src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=800" alt="Mobile App" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">PWA & Déploiement<br/>Accessible partout</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  J'explore la création de Progressive Web Apps (PWA) pour offrir une expérience proche du natif sur mobile (installation, mode hors-ligne). J'utilise Git pour le versioning et Vercel/Netlify pour les mises en production.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 font-medium"><Smartphone className="w-5 h-5 text-blue-500 mr-3" /> Configuration Service Workers</li>
                  <li className="flex items-center text-gray-700 font-medium"><Terminal className="w-5 h-5 text-blue-500 mr-3" /> Git, GitHub & CI/CD basique</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* --- PROFIL SEUL --- */}
      <section className="py-32 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Le Développeur
            </h2>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-xl border border-indigo-100 flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <img
                src="/profil.png" 
                alt="Clément Gosse"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900">Clément Gosse</h3>
              <p className="text-indigo-600 font-semibold text-lg mt-1 mb-4">Étudiant Développeur Frontend</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Curieux, rigoureux et autonome. J'aime transformer des problèmes techniques en solutions graphiques. Actuellement à la recherche de nouveaux défis pour valider mes acquis et monter en compétences sur des projets réels.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Voir mes disponibilités
                <ChevronRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};