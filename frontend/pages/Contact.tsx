import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

// --- REMPLACE CES 3 VALEURS PAR LES TIENNES ---
const SERVICE_ID = "service_llhyilg";   // Ton Service ID
const TEMPLATE_ID = "template_vhz1vj5"; // Ton Template ID
const PUBLIC_KEY = "i0cdSFFz9Pe3YimDY";     // Ta Public Key
// ----------------------------------------------

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'mariage',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    // Préparation des données pour EmailJS
    // Les noms des clés (name, email, etc.) doivent correspondre à ton Template EmailJS
    const templateParams = {
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      message: formData.message,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setLoading(false);
        setStatus('success');
        setFormData({ name: '', email: '', projectType: 'mariage', message: '' }); // Reset du formulaire
        alert("Message envoyé avec succès ! Je vous réponds sous 24h.");
      }, (error) => {
        console.log(error.text);
        setLoading(false);
        setStatus('error');
        alert("Oups, une erreur est survenue. Essayez de me contacter directement par email.");
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Parlons de votre projet</h1>
          <p className="text-xl text-gray-600">Devis gratuit sous 24h. Racontez-moi votre idée.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Informations de contact (inchangé) */}
          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
            <h3 className="text-2xl font-bold text-indigo-900 mb-8">Mes Coordonnées</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600"><Phone size={24} /></div>
                <div><p className="text-sm text-gray-500">Téléphone</p><p className="font-semibold text-gray-900">+33 6 00 00 00 00</p></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600"><Mail size={24} /></div>
                <div><p className="text-sm text-gray-500">Email</p><p className="font-semibold text-gray-900">contact@ton-domaine.fr</p></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600"><MapPin size={24} /></div>
                <div><p className="text-sm text-gray-500">Localisation</p><p className="font-semibold text-gray-900">France entière</p></div>
              </div>
            </div>
            {/* Carte statique */}
            <div className="mt-8 rounded-xl overflow-hidden h-48 bg-gray-200 relative">
               <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" alt="Bureau" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>

          {/* Formulaire connecté */}
          <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                <input 
                  type="text" required name="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Votre nom"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" required name="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="votre@email.com"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de projet</label>
                <select 
                  name="projectType"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                >
                  <option value="mariage">Mariage / Événement Privé</option>
                  <option value="corporate">Film d'entreprise / Corporate</option>
                  <option value="drone">Prise de vue Drone</option>
                  <option value="montage">Montage Vidéo</option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={4} required name="message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Détaillez votre projet..."
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
              >
                {loading ? (
                   <><span>Envoi en cours...</span><Loader2 className="animate-spin" /></>
                ) : (
                   <><span>Envoyer ma demande</span><Send size={20} /></>
                )}
              </button>
              
              {status === 'success' && <p className="text-green-600 text-center text-sm font-medium mt-2">Message envoyé ! 🚀</p>}
              {status === 'error' && <p className="text-red-600 text-center text-sm font-medium mt-2">Erreur lors de l'envoi.</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};