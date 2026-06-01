import React from "react";
import { Button } from "../components/Button";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-relaxed tracking-tight">
             Politique <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 pb-1">de confidentialité</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Protéger vos données, ma priorité. Découvrez comment je m'engage à garantir la confidentialité et la sécurité de vos informations personnelles lors de votre visite sur mon portfolio.
          </p>
        </div>
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[350px] h-[350px] bg-purple-200/40 rounded-full blur-3xl opacity-50"></div>
      </section>

      {/* --- CONTENT SECTIONS --- */}
      <section className="py-16 bg-white">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12">
          <div className="flex-1 space-y-12 max-w-2xl w-full text-left">
            <div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-3">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                En tant que développeur web et étudiant, la confidentialité de vos données est essentielle pour moi. Je m'engage à respecter votre vie privée et à protéger les informations que vous me confiez. Cette politique explique en détail quelles données sont collectées via ce site web, comment elles sont utilisées, et les mesures prises pour garantir leur sécurité.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-3">Données collectées</h2>
              <p className="text-gray-700 leading-relaxed">
                Je collecte uniquement les informations nécessaires pour répondre à vos demandes de contact ou de recrutement : nom, prénom, adresse email, entreprise, et les détails de votre projet web ou offre de stage/alternance. Des données de navigation anonymisées (via les cookies) peuvent également être recueillies pour analyser le trafic du site.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-3">Utilisation des données</h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données me permettent exclusivement de communiquer avec vous concernant des opportunités professionnelles, d'établir des devis pour des projets web, et de répondre à vos messages envoyés depuis le formulaire de contact. Aucune de vos données n'est utilisée à des fins commerciales de prospection.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-3">Partage des données</h2>
              <p className="text-gray-700 leading-relaxed">
                Vos informations personnelles ne sont jamais vendues, louées ou partagées avec des tiers. Elles restent strictement confidentielles et ne sont accessibles que par moi-même. Les seuls cas de partage concernent des nécessités techniques (par exemple, le service d'envoi d'emails sécurisé EmailJS).
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-3">Sécurité</h2>
              <p className="text-gray-700 leading-relaxed">
                Ce site utilise le protocole HTTPS pour garantir le chiffrement des données échangées entre votre navigateur et le serveur. Les formulaires de contact sont sécurisés pour empêcher toute interception de vos informations.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-3">Vos droits</h2>
              <p className="text-gray-700 leading-relaxed">
                Conformément à la réglementation (RGPD), vous pouvez à tout moment accéder à vos données, demander leur rectification ou leur suppression. Pour exercer vos droits, il vous suffit de me contacter directement à : <a href="mailto:clementgosse83@gmail.com" className="text-indigo-600 font-semibold hover:underline">clementgosse83@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">La sécurité au cœur du code</h2>
              <p className="text-indigo-200 mb-8">
                L'intégrité de vos données est assurée, de la prise de contact jusqu'à la mise en production de votre projet.
              </p>
              <Button 
                className="bg-indigo-600 text-white hover:bg-indigo-500 px-8 py-3 rounded-lg font-bold transition-colors" 
                onClick={() => window.history.back()}
              >
                Retourner sur le site
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};