import React from 'react';

export const MentionsLegales: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto prose prose-indigo">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions Légales</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Éditeur du site</h2>
          <p className="text-gray-600 leading-relaxed">
            <strong>Nom :</strong> Clément Gosse<br />
            <strong>Statut :</strong> Étudiant en BUT Informatique (2ème année)<br />
            <strong>Établissement :</strong> Université Côte d'Azur (IUT)<br />
            <strong>Email :</strong> clementgosse83@gmail.com<br />
            <strong>Objet du site :</strong> Portfolio étudiant et vitrine technologique (Projet Universitaire).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Hébergement</h2>
          <p className="text-gray-600 leading-relaxed">
            Ce site est hébergé par <strong>Vercel Inc.</strong><br />
            Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, USA.<br />
            Le code source est hébergé et versionné sur GitHub.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Propriété Intellectuelle</h2>
          <p className="text-gray-600 leading-relaxed">
            L'ensemble de ce site (structure, code source React, textes, design) relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
            Toute reproduction ou représentation, intégrale ou partielle, du code ou de l'interface graphique faite sans mon consentement est illicite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Données Personnelles</h2>
          <p className="text-gray-600 leading-relaxed">
            Le formulaire de contact présent sur ce site utilise EmailJS pour transférer vos messages directement sur ma boîte mail. Aucune de ces données n'est stockée dans une base de données sur ce site.
          </p>
        </section>
      </div>
    </div>
  );
};