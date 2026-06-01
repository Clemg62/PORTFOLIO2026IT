import React from 'react';

export const MentionsLegales: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto prose prose-indigo">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions Légales</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Éditeur du site</h2>
          <p className="text-gray-600">
            <strong>Nom :</strong> Clément Gosse<br />
            <strong>Statut :</strong> Entrepreneur Individuel (EI)<br />
            <strong>Adresse :</strong> [Ton Adresse Complète]<br />
            <strong>Email :</strong> contact@clementgosse.fr<br />
            <strong>SIRET :</strong> [Ton Numéro SIRET à 14 chiffres]<br />
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Hébergement</h2>
          <p className="text-gray-600">
            Ce site est hébergé par GitHub Pages / Vercel (à adapter selon ton choix final).<br />
            Adresse : 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Propriété Intellectuelle</h2>
          <p className="text-gray-600">
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques (vos vidéos et photos).
          </p>
        </section>
      </div>
    </div>
  );
};