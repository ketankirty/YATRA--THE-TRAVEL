import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetails from './pages/DestinationDetails';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';
import BookingPage from './pages/BookingPage';
import AuthProvider from './context/AuthContext';
import ChatBot from './components/chat/ChatBot';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destination/:id" element={<DestinationDetails />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </AuthProvider>
  );
}

export default App;