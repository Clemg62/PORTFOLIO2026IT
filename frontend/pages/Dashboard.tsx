import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { User, Calendar, Settings, LogOut, Bell, BellRing, BellOff, Edit2, Check, X, Ban } from 'lucide-react';
import { subscriptionService } from '../services/subscription.service';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, token, logout } = useAuth(); // Note: useAuth provides login/logout/register but does not expose 'setUser' directly for updates, so we might need to rely on re-fetching or refreshing the page if we don't update context.
  // Ideally AuthContext should expose a method to update local user state, but we'll fetch from API for now or reload.
  
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<any | null>(null);
  const [loadingSub, setLoadingSub] = useState(true);
  
  // Notification State
  const [notifEnabled, setNotifEnabled] = useState(false);

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '' });
  const [savingProfile, setSavingProfile] = useState(false);

  // Cancellation State
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchSub = async () => {
        if (token) {
            const sub = await subscriptionService.getCurrentSubscription(token);
            setSubscription(sub);
        }
        setLoadingSub(false);
    };

    // Initialize Notification State based on localStorage AND Browser Permission
    const checkNotifStatus = () => {
        const storedPref = localStorage.getItem('helia_notifications_enabled') === 'true';
        const permissionGranted = 'Notification' in window && Notification.permission === 'granted';
        setNotifEnabled(storedPref && permissionGranted);
    };

    if (user) {
        setEditForm({ firstName: user.firstName, lastName: user.lastName });
    }

    fetchSub();
    checkNotifStatus();
  }, [token, user]);

  const toggleNotifications = async () => {
    if (!('Notification' in window)) {
        alert("Votre navigateur ne supporte pas les notifications.");
        return;
    }

    if (notifEnabled) {
        // Disable
        setNotifEnabled(false);
        localStorage.setItem('helia_notifications_enabled', 'false');
    } else {
        // Enable
        if (Notification.permission === 'granted') {
            setNotifEnabled(true);
            localStorage.setItem('helia_notifications_enabled', 'true');
            new Notification('Notifications activées', {
                body: 'Vous recevrez désormais des alertes pour votre abonnement.',
                icon: '/vite.svg'
            });
        } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setNotifEnabled(true);
                localStorage.setItem('helia_notifications_enabled', 'true');
                new Notification('Notifications activées', {
                    body: 'Vous recevrez désormais des alertes pour votre abonnement.',
                    icon: '/vite.svg'
                });
            }
        } else {
            alert("Les notifications sont bloquées dans votre navigateur. Veuillez les autoriser dans les paramètres du site.");
        }
    }
  };

  const handleSaveProfile = async () => {
    if (!token || !user) return;
    setSavingProfile(true);
    try {
        await authService.updateProfile(user.id, token, editForm);
        // Reload page to refresh context (since context doesn't expose setUser update easily in this simplified version)
        window.location.reload(); 
    } catch (error) {
        alert("Erreur lors de la mise à jour");
        setSavingProfile(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!token || !subscription) return;
    if (!window.confirm("Êtes-vous sûr de vouloir résilier votre abonnement ? Il s'arrêtera à la fin de la période en cours.")) return;

    setCancelling(true);
    try {
        await subscriptionService.cancelSubscription(token);
        // Refresh sub data
        const sub = await subscriptionService.getCurrentSubscription(token);
        setSubscription(sub);
        alert("Abonnement résilié avec succès.");
    } catch (error) {
        alert("Erreur lors de la résiliation");
    } finally {
        setCancelling(false);
    }
  };

  const simulateSubscriptionEnd = () => {
    if (!subscription) {
        alert("Aucun abonnement actif.");
        return;
    }

    if (notifEnabled && Notification.permission === 'granted') {
        // Simulate a backend push event via local SW
        if ('serviceWorker' in navigator) {
             navigator.serviceWorker.ready.then(registration => {
                registration.showNotification('Attention : Fin d\'abonnement', {
                    body: 'Votre période d\'essai se termine dans 24h. Pensez à renouveler.',
                    icon: '/vite.svg',
                    tag: 'subscription-end',
                    requireInteraction: true
                });
            });
        } else {
            // Fallback if SW not ready
            new Notification('Attention : Fin d\'abonnement', {
                body: 'Votre période d\'essai se termine dans 24h. Pensez à renouveler.',
                icon: '/vite.svg'
            });
        }
    } else {
        alert("Veuillez d'abord activer les notifications via le bouton (cloche ou paramètres).");
    }
  };

  // Check if plan is free (mock ID 1 or price 0)
  const isFreePlan = subscription?.plan?.price === 0 || subscription?.plan?.priceCents === 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Bonjour, {user?.firstName} !
            </h1>
            <p className="text-gray-600">Bienvenue sur votre espace personnel Hélia.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
             <Button variant="secondary" onClick={toggleNotifications} title={notifEnabled ? "Désactiver les notifications" : "Activer les notifications"}>
                {notifEnabled ? <BellRing size={18} className="text-helia-purple"/> : <BellOff size={18} className="text-gray-400" />}
             </Button>
            <Button variant="outline" className="!text-helia-purple !border-helia-purple hover:!bg-helia-purple hover:!text-white" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
            </Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center">
                    <div className="p-3 bg-helia-orange/10 rounded-full text-helia-orange mr-4">
                        <User size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Mon Profil</h2>
               </div>
               <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-gray-400 hover:text-helia-purple transition-colors"
                title="Modifier"
               >
                 {isEditing ? <X size={20} /> : <Edit2 size={20} />}
               </button>
            </div>
            
            <div className="space-y-3">
              <div className="border-b border-gray-50 pb-2">
                <span className="text-gray-500 text-sm block mb-1">Nom complet</span>
                {isEditing ? (
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="w-1/2 p-1 border rounded text-sm"
                            value={editForm.firstName}
                            onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                        />
                        <input 
                            type="text" 
                            className="w-1/2 p-1 border rounded text-sm"
                            value={editForm.lastName}
                            onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                        />
                    </div>
                ) : (
                    <span className="font-medium">{user?.firstName} {user?.lastName}</span>
                )}
              </div>
              
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Membre depuis</span>
                <span className="font-medium">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>

              {isEditing && (
                  <Button 
                    size="sm" 
                    className="w-full mt-2" 
                    onClick={handleSaveProfile}
                    disabled={savingProfile}
                  >
                    {savingProfile ? 'Enregistrement...' : 'Enregistrer'}
                  </Button>
              )}
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-center mb-4">
              <div className="p-3 bg-helia-purple/10 rounded-full text-helia-purple mr-4">
                <Calendar size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Mon Abonnement</h2>
            </div>
            <div className="py-2">
              {loadingSub ? (
                 <p className="text-gray-400">Chargement...</p>
              ) : subscription ? (
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-helia-purple">{subscription.plan?.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${subscription.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {subscription.status}
                        </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>Début : {new Date(subscription.currentPeriodStart).toLocaleDateString()}</p>
                        <p>Fin : {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
                        {subscription.cancelAtPeriodEnd ? (
                            <p className="text-xs text-red-500 mt-2 font-semibold">Resiliation programmée à la fin de la période.</p>
                        ) : (
                            <p className="text-xs text-gray-400 mt-2">Renouvellement automatique actif</p>
                        )}
                    </div>
                    
                    {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && !isFreePlan && (
                        <button 
                            onClick={handleCancelSubscription}
                            disabled={cancelling}
                            className="w-full mt-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors flex items-center justify-center"
                        >
                            <Ban size={16} className="mr-2" />
                            {cancelling ? 'Traitement...' : 'Résilier l\'abonnement'}
                        </button>
                    )}
                    {isFreePlan && (
                        <p className="text-xs text-gray-400 italic mt-4 text-center">
                            L'offre gratuite prend fin automatiquement.
                        </p>
                    )}

                     {/* Demo Button for PWA */}
                     <button 
                        onClick={simulateSubscriptionEnd}
                        className="w-full text-xs text-center text-helia-orange underline mt-4 hover:text-helia-coral"
                     >
                        (Demo) Simuler alerte fin
                     </button>
                 </div>
              ) : (
                <div className="text-center py-4">
                    <p className="text-gray-500 mb-4">Vous n'avez pas encore d'abonnement actif.</p>
                    <Button size="sm" variant="primary" onClick={() => navigate('/pricing')}>Découvrir les offres</Button>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-center mb-4">
              <div className="p-3 bg-gray-100 rounded-full text-gray-600 mr-4">
                <Settings size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Paramètres</h2>
            </div>
            <ul className="space-y-3">
              <li>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                  Gérer ma famille
                </button>
              </li>
              <li>
                <button 
                  onClick={toggleNotifications}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors flex justify-between items-center"
                >
                  <span>Notifications</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${notifEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                    {notifEnabled ? 'Activées' : 'Désactivées'}
                  </span>
                </button>
              </li>
              <li>
                 <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-red-600 transition-colors">
                  Supprimer mon compte
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};