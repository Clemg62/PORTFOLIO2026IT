import React from 'react';
import {
  Camera,
  Video,
  MonitorPlay,
  Award,
  ChevronRight,
  Plane,
  Scissors
} from "lucide-react";

export const About: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* --- HERO STORYTELLING --- */}
      <section className="relative overflow-hidden bg-white pt-24 pb-24 lg:pt-32 lg:pb-40">
        {/* Décorations d'arrière-plan */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-200">
            Mon Histoire
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            Lorsque la passion
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              devient une profession
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            En 2026, j'ai décidé après 2 ans de pilotage, de passer ma formation de télépilote professionnel, et d'ouvrir mon auto-entreprise afin d'enfin vivre de ma passion pour la création vidéo.
          </p>

          {/* Stats / Points forts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="text-4xl font-black text-indigo-600 mb-2 group-hover:scale-110 transition-transform">DGAC</div>
              <div className="text-gray-700 font-medium">Télépilote Certifié</div>
              <div className="text-sm text-gray-500 mt-1">Vols déclarés et sécurisés</div>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="text-4xl font-black text-purple-600 mb-2 group-hover:scale-110 transition-transform">4K</div>
              <div className="text-gray-700 font-medium">Haute Résolution</div>
              <div className="text-sm text-gray-500 mt-1">Prises de vues premium</div>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="text-4xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform">100%</div>
              <div className="text-gray-700 font-medium">Sur-mesure</div>
              <div className="text-sm text-gray-500 mt-1">Un montage qui vous ressemble</div>
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

      {/* --- LE CONSTAT (Pourquoi faire appel à un pro ?) --- */}
      <section id="problem-section" className="py-32 bg-gray-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-400 font-bold text-sm uppercase tracking-wider mb-4 block">
                Le Constat
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Vos souvenirs devraient rester intacts
                <span className="text-indigo-400"> à jamais.</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-white">Jules et Mélanie, 35 et 33 ans.</strong>{" "}
                  Mariés depuis 5 ans avec un budget limité à l'époque, ils regrettent aujourd'hui de ne pas avoir de belles images de leur mariage. Ils seraient prêts à tout pour revivre ce moment et y consacrer le budget nécessaire.
                </p>
                <p>
                  <strong className="text-white">Hugo, 26 ans.</strong>{" "}
                  Organisateur d'un tournoi de foot, il aimerait immortaliser les matchs pour en faire un évènement unique pour les clubs de sa région. Mais il n'est pas formé, son smartphone ne suffit pas, et les réglementations drones sont trop strictes pour lui.
                </p>
                <div className="p-6 bg-indigo-900/30 border border-indigo-500/30 rounded-2xl mt-8">
                  <p className="text-xl font-semibold text-indigo-200 italic">
                    "Et si la création de vos vidéos devenait simple, professionnelle et sans compromis sur la qualité ?"
                  </p>
                </div>
              </div>
            </div>

            {/* Image d'illustration Vidéo/Drone */}
            <div className="relative group">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden border border-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1579965342575-16428a7c8881?auto=format&fit=crop&q=80&w=800"
                  alt="Tournage vidéo"
                  className="w-full h-full object-cover rounded-xl shadow-2xl transform scale-100 group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MA MÉTHODE / EXPERTISE --- */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-24 max-w-4xl mx-auto">
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-wide mb-4 block">
              Ma méthode
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              De l'idée à <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">l'écran</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Un équipement de pointe et une maîtrise complète de la chaîne de production pour sublimer votre projet.
            </p>
          </div>

          <div className="space-y-24">
            
            {/* EXPERTISE 1: DRONE */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white rounded-full shadow-2xl border-8 border-gray-50 flex items-center justify-center overflow-hidden group">
                   <img src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800" alt="Drone" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                   <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Plane className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Prise de vue aérienne<br/>Télépilote Certifié</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Donnez de la hauteur à vos projets. Je gère l'aspect créatif mais aussi toute la partie légale (autorisations de vol) pour des images aériennes spectaculaires et en toute légalité.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 font-medium"><Award className="w-5 h-5 text-indigo-500 mr-3" /> Certification DGAC</li>
                  <li className="flex items-center text-gray-700 font-medium"><Video className="w-5 h-5 text-indigo-500 mr-3" /> Vidéo 4K fluide et stabilisée</li>
                </ul>
              </div>
            </div>

            {/* EXPERTISE 2: CADREUR */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
               <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white rounded-3xl shadow-2xl border-8 border-gray-50 flex items-center justify-center overflow-hidden group rotate-3">
                   <img src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&q=80&w=800" alt="Camera" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Camera className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Captation au sol<br/>Discrétion & Qualité</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Équipé de matériel moderne (iPhone 15 Pro, stabilisateurs professionnels, fond vert, éclairage), je capture les moments sur le vif avec une qualité cinématographique.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 font-medium"><Camera className="w-5 h-5 text-purple-500 mr-3" /> Matériel léger et polyvalent</li>
                  <li className="flex items-center text-gray-700 font-medium"><Video className="w-5 h-5 text-purple-500 mr-3" /> Maîtrise de la lumière et du cadre</li>
                </ul>
              </div>
            </div>

             {/* EXPERTISE 3: MONTAGE */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white rounded-3xl shadow-2xl border-8 border-gray-50 flex items-center justify-center overflow-hidden group -rotate-3">
                   <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800" alt="Montage" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Scissors className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Post-Production<br/>L'art de raconter une histoire</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Formé professionnellement grâce à EDITING 360, j'utilise la suite Adobe depuis 2019. C'est ici que la magie opère : rythme, colorimétrie et design sonore.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 font-medium"><MonitorPlay className="w-5 h-5 text-blue-500 mr-3" /> Suite Adobe (Premiere Pro, After Effects)</li>
                  <li className="flex items-center text-gray-700 font-medium"><Scissors className="w-5 h-5 text-blue-500 mr-3" /> Sound Design & Color Grading</li>
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
              Qui suis-je ?
            </h2>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-xl border border-indigo-100 flex flex-col md:flex-row items-center gap-10">
            {/* Photo de profil (Mets ta vraie photo dans le dossier public) */}
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <img
                src="/team/clement.png" // Assure-toi que cette image existe bien, ou remplace par ton image
                alt="Clément Gosse"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback si l'image n'est pas trouvée
                  e.currentTarget.src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400";
                }}
              />
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900">Clément Gosse</h3>
              <p className="text-indigo-600 font-semibold text-lg mt-1 mb-4">Créateur Visuel Freelance</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Passionné par l'image depuis toujours, j'accompagne les particuliers et les entreprises dans la création de leurs contenus vidéos. De la réflexion initiale à l'export final, je mets mon exigence technique et ma sensibilité artistique au service de votre projet.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Discutons de votre projet
                <ChevronRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};