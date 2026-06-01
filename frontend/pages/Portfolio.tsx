import React, { useRef, useState } from 'react';
import { Play, Film, X } from 'lucide-react';

// --- CONFIGURATION DE TES PROJETS ---
// Remplace les IDs YouTube et les noms de fichiers par les tiens
const PROJECTS = [
  {
    id: 1,
    title: "Mariage de Christophe et Peggy",
    category: "Mariage",
    description: "Film complet retraçant cette journée magique.",
    videoUrl: "/videos/mariage_chris.mp4", // Ton extrait de 15s dans public/videos/
    thumbnail: "/images/minia_mariage.png", // Ta photo dans public/images/
    youtubeId: "X2pQgm1iuf4" // L'ID de ta vidéo YouTube (même non répertoriée)
  },
  {
    id: 2,
    title: "Présentation drone",
    category: "Événementiel",
    description: "Plan drone et montage dynamique. Prises de vues drone et immersion totale.",
    videoUrl: "/videos/drone_video.mp4",
    thumbnail: "/images/minia_drone.png",
    youtubeId: "UV1yIX4NW1I"
  }
];

export const Portfolio: React.FC = () => {
  const [selectedYoutubeId, setSelectedYoutubeId] = useState<string | null>(null);

  return (
    <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-full mb-6">
          <Film className="w-6 h-6 text-indigo-400 mr-2" />
          <span className="text-indigo-200 font-semibold uppercase tracking-wider text-sm">Réalisations</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Mon Portfolio
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Survolez pour un aperçu, <strong>cliquez pour visionner le projet complet</strong>.
        </p>
      </div>

      {/* Grille de projets (2 colonnes sur PC) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {PROJECTS.map((project) => (
          <VideoCard 
            key={project.id} 
            project={project} 
            onClick={() => setSelectedYoutubeId(project.youtubeId)} 
          />
        ))}
      </div>

      {/* --- FENÊTRE POPUP (MODALE) YOUTUBE --- */}
      {selectedYoutubeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
          <button 
            onClick={() => setSelectedYoutubeId(null)}
            className="absolute top-6 right-6 text-white hover:text-indigo-400 transition-colors"
          >
            <X size={48} />
          </button>
          
          <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedYoutubeId}?autoplay=1`}
              title="Lecteur Vidéo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

// --- COMPOSANT INTERNE : CARTE VIDÉO ---
const VideoCard = ({ project, onClick }: { project: any, onClick: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-2xl h-[450px] bg-black border border-gray-800 transition-all hover:border-indigo-500/50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Média (Image ou Vidéo) */}
      <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 group-hover:scale-105">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted loop playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
      </div>

      {/* Infos du projet */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-10">
        <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-3 uppercase">
          {project.category}
        </span>
        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {project.description}
        </p>
      </div>

      {/* Icône Play centrale */}
      {!isHovered && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-6 rounded-full border border-white/20">
          <Play className="w-8 h-8 text-white fill-white" />
        </div>
      )}
    </div>
  );
};