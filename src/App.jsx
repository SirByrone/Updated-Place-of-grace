import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Import all pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import ImpactPage from './pages/ImpactPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import GalleryPage from './pages/GalleryPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import TransparencyPage from './pages/TransparencyPage';
import InclusionPage from './pages/InclusionPage';

import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <ErrorBoundary>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/impact" element={<ImpactPage />} />
                <Route path="/get-involved" element={<GetInvolvedPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/transparency" element={<TransparencyPage />} />
                <Route path="/inclusion" element={<InclusionPage />} />
              </Routes>
            </main>
            <Footer />
          </ErrorBoundary>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App; 