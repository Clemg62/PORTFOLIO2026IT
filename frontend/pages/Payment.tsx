import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { planService } from '../services/plan.service';
import { subscriptionService } from '../services/subscription.service';
import { Plan } from '../types';
import { MOCK_PLANS } from '../constants';
import { Loader2, CreditCard, Lock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';

// Reuse helper locally to enrich plans with mock features if needed
const enrichPlanWithFeatures = (plan: Plan): Plan => {
  const mockMatch = MOCK_PLANS.find(m => 
    m.name.toLowerCase().includes(plan.name.toLowerCase()) || 
    plan.name.toLowerCase().includes(m.name.toLowerCase())
  );
  
  if (mockMatch) {
    return { ...plan, features: mockMatch.features };
  }
  
  return {
    ...plan,
    features: ['Accès complet à la plateforme', 'Support client standard']
  };
};

export const Payment: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!planId) return;
      try {
        const fetchedPlan = await planService.getPlanById(planId);
        if (fetchedPlan) {
          setPlan(enrichPlanWithFeatures(fetchedPlan));
        } else {
            // Fallback to mock if API fails
            const idAsNumber = parseInt(planId, 10);
            const mock = MOCK_PLANS.find(p => p.id === idAsNumber);
            if(mock) setPlan(mock);
            else setError("Plan introuvable");
        }
      } catch (err) {
        setError("Impossible de charger les détails du plan.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [planId]);

  const triggerSuccessNotification = () => {
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('Bienvenue chez Hélia !', {
                body: `Votre abonnement ${plan?.name} est actif. Profitez-en dès maintenant.`,
                icon: '/vite.svg',
                vibrate: [200, 100, 200],
                tag: 'subscription-start'
            } as any);
        });
    }
  };

  const processPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan || !token) return;

    setPaymentLoading(true);
    setError('');

    try {
        // Backend call to create subscription
        await subscriptionService.subscribe(plan.id, token);
        
        setPaymentSuccess(true);
        triggerSuccessNotification();

        setTimeout(() => {
            navigate('/dashboard');
        }, 3000);
    } catch (err: any) {
        setError(err.message || "Le paiement a échoué. Veuillez réessayer.");
        setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Loader2 className="animate-spin text-helia-purple" size={48} />
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
             <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
             <h2 className="text-xl font-bold text-gray-900 mb-2">Une erreur est survenue</h2>
             <p className="text-gray-600 mb-6">{error || "Plan introuvable"}</p>
             <Button onClick={() => navigate('/pricing')}>Retour aux offres</Button>
        </div>
      </div>
    );
  }

  // Logic for Family Plan Trial (ID 2 in MOCK_PLANS)
  const isFamilyPlan = plan.id === 2;
  const isTrial = isFamilyPlan; 
  const displayPrice = isTrial ? 0 : plan.priceCents;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/pricing')} className="flex items-center text-gray-600 hover:text-helia-purple mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Retour aux offres
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-3xl shadow-sm p-8 h-fit">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Récapitulatif</h2>
                <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                        <p className="text-sm text-gray-500">
                            {isTrial ? "Période d'essai 30 jours" : `Facturation ${plan.interval.includes('mois') || plan.interval === 'month' ? 'mensuelle' : 'annuelle'}`}
                        </p>
                    </div>
                    <div className="text-right">
                        {isTrial ? (
                             <div className="flex flex-col items-end">
                                <span className="text-2xl font-bold text-helia-purple">0.00€</span>
                                <span className="text-xs text-gray-400 line-through">{(plan.priceCents / 100).toFixed(2)}€</span>
                             </div>
                        ) : (
                            <span className="text-2xl font-bold text-helia-purple">
                                {(plan.priceCents / 100).toFixed(2)}€
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="py-6 space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Inclus dans l'offre :</h4>
                    <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-4">
                    <span className="text-gray-900 font-bold text-lg">Total à payer aujourd'hui</span>
                    <span className="text-3xl font-bold text-gray-900">
                        {(displayPrice / 100).toFixed(2)}€
                    </span>
                </div>
                {isTrial && (
                     <p className="text-xs text-gray-500 mt-2 text-right">
                        Puis {(plan.priceCents / 100).toFixed(2)}€ / mois après 30 jours.
                     </p>
                )}
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-3xl shadow-lg p-8 relative overflow-hidden">
                {paymentSuccess ? (
                    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center animate-fade-in z-10">
                        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                            {isTrial ? "Essai activé !" : "Paiement validé !"}
                        </h3>
                        <p className="text-gray-600 mb-8">Votre abonnement est actif. Une notification de confirmation a été envoyée.</p>
                        <p className="text-sm text-gray-400">Redirection automatique...</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Information de paiement</h2>
                        
                        {error && (
                            <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-start">
                                <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <form onSubmit={processPayment} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Titulaire de la carte</label>
                                <input 
                                    type="text" 
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-helia-purple focus:border-helia-purple transition-shadow"
                                    placeholder="Jean Dupont"
                                    value={cardHolder}
                                    onChange={(e) => setCardHolder(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CreditCard className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="0000 0000 0000 0000"
                                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-helia-purple focus:border-helia-purple font-mono"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        required
                                        maxLength={19}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                                    <input 
                                        type="text" 
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-helia-purple focus:border-helia-purple font-mono"
                                        placeholder="MM/AA"
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        required
                                        maxLength={5}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                    <input 
                                        type="text" 
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-helia-purple focus:border-helia-purple font-mono"
                                        placeholder="123"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value)}
                                        required
                                        maxLength={3}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center text-xs text-gray-500 py-2">
                                <Lock size={14} className="mr-1.5" />
                                Paiement sécurisé SSL.
                            </div>

                            <Button 
                                type="submit" 
                                disabled={paymentLoading}
                                className="w-full justify-center text-lg py-4"
                            >
                                {paymentLoading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={20} /> Traitement...
                                    </>
                                ) : (
                                    isTrial ? "Commencer l'essai gratuit" : `Payer ${(plan.priceCents / 100).toFixed(2)}€`
                                )}
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};