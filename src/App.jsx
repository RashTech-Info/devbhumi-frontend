import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import FloatingButtons from './components/FloatingButtons';
import Home from './pages/Home';
import About from './pages/About';
import Explore from './pages/explore';
import Gallery from './pages/Gallery';
import Testimonial from './pages/testimonial';
import Contact from './pages/Contact';
import Inquiryform from './pages/Inquiry';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './dashboard/Dashboard';
import GalleryAdmin from './dashboard/Gallery';
import InquiryAdmin from './dashboard/Inquiry';
import ContactAdmin from './dashboard/Contact';
import Profile from './dashboard/Profile';
import AdminLayout from './dashboard/AdminLayout';
import Testimonials from './dashboard/Testimonials';
import ProtectedRoute from './dashboard/Protectedroute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main site routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
            <FloatingButtons />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
            <Footer />
            <FloatingButtons />
          </>
        } />
        <Route path="/explore" element={
          <>
            <Navbar />
            <Explore />
            <Footer />
            <FloatingButtons />
          </>
        } />
        <Route path="/gallery" element={
          <>
            <Navbar />
            <Gallery />
            <Footer />
            <FloatingButtons />
          </>
        } />
        <Route path="/testimonials" element={
          <>
            <Navbar />
            <Testimonial />
            <Footer />
            <FloatingButtons />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <Contact />
            <Footer />
            <FloatingButtons />
          </>
        } />
        <Route path="/inquiry" element={
          <>
            <Navbar />
            <Inquiryform />
            <Footer />
            <FloatingButtons />
          </>
        } />
        
        {/* Admin authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Admin dashboard routes */}
        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/gallery" element={<GalleryAdmin />} />
          <Route path="/admin/inquiry" element={<InquiryAdmin />} />
          <Route path="/admin/testimonials" element={<Testimonials />} />
          <Route path="/admin/contact" element={<ContactAdmin />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
        
        {/* Redirect for old dashboard route */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
