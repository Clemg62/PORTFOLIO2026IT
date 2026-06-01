import React from 'react';
import { Briefcase, Code, Terminal, Database, Server, Layout, FileText, CheckCircle2 } from 'lucide-react';

// --- DONNÉES DES PROJETS ---
const PROJECTS = [
  {
    id: 1,
    title: "Hélia - Assistant Virtuel",
    category: "Web & PWA",
    description: "Développement d'un assistant virtuel intelligent sous forme de Progressive Web App (PWA). Gestion des états complexes et interface utilisateur optimisée.",
    tech: ["React", "Vite", "Tailwind CSS", "Service Workers"],
    icon: <Layout className="w-6 h-6 text-indigo-500" />
  },
  {
    id: 2,
    title: "Projet Quixo",
    category: "Algorithmique & Logique",
    description: "Développement d'un jeu de plateau stratégique où le but est d'aligner plusieurs murs en poussant les cases du plateau. Implémentation de la logique de jeu.",
    tech: ["C", "Python", "Logique algorithmique"],
    icon: <Terminal className="w-6 h-6 text-emerald-500" />
  },
  {
    id: 3,
    title: "Rise & Fall",
    category: "Jeu Multijoueur & BDD",
    description: "Jeu de tour par tour (15 min/tour) inspiré de Daifen. Jouable de 5 à 30 joueurs simultanément. Gestion des données des joueurs et de l'état du serveur.",
    tech: ["Java", "SQL", "Yaml", "Architecture Client/Serveur"],
    icon: <Database className="w-6 h-6 text-orange-500" />
  }
];

// --- DONNÉES DE L'EXPÉRIENCE ---
const EXPERIENCES = [
  {
    id: 1,
    period: "2024 - 2026",
    role: "Alternance Informatique",
    company: "Les Prairies de la Mer",
    description: "Application pratique des compétences de développement et gestion du parc/système informatique en milieu professionnel.",
    isTech: true
  },
  {
    id: 2,
    period: "2022 - 2026",
    role: "Vidéaste / Content Creator",
    company: "Académie de Football & Clubs sportifs",
    description: "Production, tournage (caméra, drone) et montage (Motion Design). Démontre une forte créativité, maîtrise des outils digitaux et autonomie.",
    isTech: false
  },
  {
    id: 3,
    period: "Juillet - Août 2023",
    role: "Employé Polyvalent",
    company: "Supérette Vival",
    description: "Gestion des stocks, encaissement, relation client. Développement de l'adaptabilité et du sens des responsabilités.",
    isTech: false
  },
  {
    id: 4,
    period: "Mai 2022",
    role: "Stage d'observation",
    company: "BNP Paribas (Mougins)",
    description: "Découverte du monde de l'entreprise et du secteur bancaire.",
    isTech: false
  }
];

export const Portfolio: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* EN-TÊTE */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Mes Projets & Expériences
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Un aperçu de mes réalisations académiques en développement et de mon parcours professionnel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* COLONNE GAUCHE : PROJETS (Prend 2 colonnes sur grand écran) */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center border-b border-gray-200 pb-4">
              <Code className="w-6 h-6 mr-3 text-indigo-600" />
              Projets Académiques (SAÉ)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      {project.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* SOFTSKILLS (Inspiré de ta capture d'écran) */}
            <h2 className="text-2xl font-bold text-gray-900 flex items-center border-b border-gray-200 pb-4 mt-16">
              <FileText className="w-6 h-6 mr-3 text-indigo-600" />
              Soft Skills
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-wrap gap-4">
              {['Créativité', 'Rigueur', 'Autonomie', 'Esprit d\'analyse', 'Adaptabilité', 'Travail en équipe'].map((skill, index) => (
                <div key={index} className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                  <span className="text-gray-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* COLONNE DROITE : EXPÉRIENCE PRO (Timeline) */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center border-b border-gray-200 pb-4 mb-8">
              <Briefcase className="w-6 h-6 mr-3 text-indigo-600" />
              Parcours Pro
            </h2>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-indigo-100 text-indigo-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                    <div className={`w-2 h-2 rounded-full ${exp.isTech ? 'bg-indigo-600' : 'bg-gray-400'}`}></div>
                  </div>
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">{exp.role}</h4>
                    </div>
                    <div className="text-indigo-600 font-medium text-xs mb-2">{exp.company}</div>
                    <time className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">{exp.period}</time>
                    <p className="text-xs text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};