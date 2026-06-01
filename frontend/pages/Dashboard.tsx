import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { User, Database, Code, BellRing, BellOff, Edit2, Check, X } from 'lucide-react';

export const Dashboard: React.FC = () => {
  // Fausses données pour la démo technique
  const [user, setUser] = useState({ firstName: 'Clément', lastName: 'Gosse', email: 'clementgosse83@gmail.com' });
  
  // États de l'interface
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ firstName: user.firstName, lastName: user.lastName });
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    // Vérifier si le navigateur autorise les notifications
    const checkNotifStatus = () => {
        const storedPref = localStorage.getItem('helia_notifications_enabled') === 'true';
        const permissionGranted = 'Notification' in window && Notification.permission === 'granted';
        setNotifEnabled(storedPref && permissionGranted);
    };
    checkNotifStatus();
  }, []);

  const toggleNotifications = async () => {
    if (!('Notification' in window)) {
        alert("Votre navigateur ne supporte pas les notifications.");
        return;
    }
    if (notifEnabled) {
        setNotifEnabled(false);
        localStorage.setItem('helia_notifications_enabled', 'false');
    } else {
        if (Notification.permission === 'granted') {
            setNotifEnabled(true);
            localStorage.setItem('helia_notifications_enabled', 'true');
            new Notification('PWA : Notifications activées', {
                body: 'Démonstration du Service Worker réussie.',
            });
        } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setNotifEnabled(true);
                localStorage.setItem('helia_notifications_enabled', 'true');
                new Notification('PWA : Notifications activées', {
                    body: 'Démonstration du Service Worker réussie.',
                });
            }
        }
    }
  };

  const handleSaveProfile = () => {
    setSavingProfile(true);
    // Simulation d'un appel API (chargement de 1 seconde)
    setTimeout(() => {
        setUser({ ...user, firstName: editForm.firstName, lastName: editForm.lastName });
        setIsEditing(false);
        setSavingProfile(false);
    }, 1000);
  };

  const simulatePushEvent = () => {
    if (notifEnabled && Notification.permission === 'granted') {
        new Notification('Événement React', {
            body: 'Ceci est une simulation de push notification locale.',
        });
    } else {
        alert("Veuillez d'abord activer les notifications (démo PWA) via le bouton Système.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de la démo */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-2 uppercase tracking-wide">
              Espace de Démonstration (Projet Hélia)
            </span>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Session Développeur
            </h1>
            <p className="text-gray-600">Démonstration technique des états React et des fonctionnalités web.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Carte 1 : Profil & État React */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center">
                    <div className="p-3 bg-blue-50 rounded-full text-blue-600 mr-4">
                        <User size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">État Utilisateur</h2>
               </div>
               <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-gray-400 hover:text-indigo-600 transition-colors"
                title="Tester le setState"
               >
                 {isEditing ? <X size={20} /> : <Edit2 size={20} />}
               </button>
            </div>
            
            <div className="space-y-3">
              <div className="border-b border-gray-50 pb-2">
                <span className="text-gray-500 text-sm block mb-1">Nom complet (State local)</span>
                {isEditing ? (
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="w-1/2 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={editForm.firstName}
                            onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                        />
                        <input 
                            type="text" 
                            className="w-1/2 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={editForm.lastName}
                            onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                        />
                    </div>
                ) : (
                    <span className="font-medium text-gray-900">{user.firstName} {user.lastName}</span>
                )}
              </div>
              
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-gray-900">{user.email}</span>
              </div>

              {isEditing && (
                  <Button 
                    size="sm" 
                    className="w-full mt-4" 
                    onClick={handleSaveProfile}
                    disabled={savingProfile}
                  >
                    {savingProfile ? 'Mise à jour du State...' : 'Valider la modification'}
                  </Button>
              )}
            </div>
          </div>

          {/* Carte 2 : Simulation API */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-center mb-4">
              <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mr-4">
                <Database size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Données Mockées</h2>
            </div>
            <div className="py-2">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-indigo-600">Connexion Serveur</span>
                        <span className="px-2 py-1 rounded-full text-xs font-bold uppercase bg-green-100 text-green-700 flex items-center">
                            <Check size={12} className="mr-1"/> Simulé
                        </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 bg-gray-50 p-4 rounded-lg font-mono text-xs border border-gray-100">
                        <p className="text-green-600">{"// JSON Response"}</p>
                        <p>{"{"}</p>
                        <p className="pl-4">"status": <span className="text-blue-600">"active"</span>,</p>
                        <p className="pl-4">"role": <span className="text-blue-600">"admin"</span>,</p>
                        <p className="pl-4">"token": <span className="text-blue-600">"eyJhbGciOiJIUzI1..."</span></p>
                        <p>{"}"}</p>
                    </div>
                     <button 
                        onClick={simulatePushEvent}
                        className="w-full text-xs text-center text-indigo-600 font-semibold border border-indigo-200 py-2.5 rounded-lg mt-4 hover:bg-indigo-50 transition-colors"
                     >
                        Tester une Notification Web
                     </button>
                 </div>
            </div>
          </div>

          {/* Carte 3 : Système */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-center mb-4">
              <div className="p-3 bg-gray-100 rounded-full text-gray-600 mr-4">
                <Code size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Système</h2>
            </div>
            <ul className="space-y-3 mt-6">
              <li>
                <button 
                  onClick={toggleNotifications}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors flex justify-between items-center border border-gray-100"
                >
                  <span className="flex items-center font-medium">
                    {notifEnabled ? <BellRing size={16} className="mr-2 text-indigo-600"/> : <BellOff size={16} className="mr-2 text-gray-400"/>}
                    API Notifications
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${notifEnabled ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>
                    {notifEnabled ? 'Activé' : 'Désactivé'}
                  </span>
                </button>
              </li>
              <li>
                <div className="w-full text-left px-4 py-3 rounded-xl text-gray-700 flex justify-between items-center border border-gray-100 bg-gray-50">
                  <span className="font-medium">Stockage Local (Storage)</span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-green-100 text-green-700">Actif</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};