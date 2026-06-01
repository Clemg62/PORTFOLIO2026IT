import React from 'react';
import { Construction } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

interface PlaceholderProps {
  title: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg border-t-4 border-helia-purple">
        <div className="w-20 h-20 bg-helia-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 text-helia-purple">
          <Construction size={40} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">
          Cette page est en cours de construction pour le projet SAE S3. 
          Revenez quand les dev auront mis les chaussures qui courent vite.
        </p>
        <Button onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};