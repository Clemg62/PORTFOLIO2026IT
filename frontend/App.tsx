import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthContext';

// Pages
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Contact } from './pages/Contact'
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { MentionsLegales } from "./pages/Legal";
import { Cookies } from "./pages/Cookies";
import { Portfolio } from './pages/Portfolio'; 
// J'ai supprimé les imports de Login, Register, Pricing, Payment et ProtectedRoute

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Toutes les routes sont publiques maintenant */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal" element={<MentionsLegales />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/portfolio" element={<Portfolio />} /> 
              
              {/* Le dashboard est devenu ta page de Démo Technique Publique */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;