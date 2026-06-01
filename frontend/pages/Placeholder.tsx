import React from 'react';
import { Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlaceholderProps {
  title: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg border-t-4 border-indigo-600">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
          <Construction size={40} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Cette page est en cours de construction dans le cadre de ma formation (SAE S3). <br/>
          Revenez quand les dev auront mis les chaussures qui courent vite 🏃‍♂️💨
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};