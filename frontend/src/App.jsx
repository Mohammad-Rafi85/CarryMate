import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import LoginSender from './pages/LoginSender';
import LoginTraveler from './pages/LoginTraveler';
import Register from './pages/Register';
import RegisterSender from './pages/RegisterSender';
import RegisterTraveler from './pages/RegisterTraveler';
import Dashboard from './pages/Dashboard';
import Chatbot from './components/Chatbot';
import PostDelivery from './pages/PostDelivery';
import PostTrip from './pages/PostTrip';
import MatchResults from './pages/MatchResults';
import TravellerPortal from './pages/TravellerPortal';
import './App.css';

import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';
import HelpCenter from './pages/HelpCenter';

// Sender pages
import SenderDashboardLayout from './pages/sender/SenderDashboardLayout';
import KYCVerification from './pages/sender/KYCVerification';
import CreateShipment from './pages/sender/CreateShipment';
import MyShipments from './pages/sender/MyShipments';
import TrackShipment from './pages/sender/TrackShipment';
import HowItWorksSender from './pages/sender/HowItWorksSender';
import SenderProfile from './pages/sender/SenderProfile';

// Traveller pages
import TravellerDashboardLayout from './pages/traveller/TravellerDashboardLayout';
import DeliveryFeed from './pages/traveller/DeliveryFeed';
import MyDeliveries from './pages/traveller/MyDeliveries';
import TravellerProfile from './pages/traveller/TravellerProfile';
import TravellerKYC from './pages/traveller/TravellerKYC';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/sender" element={<LoginSender />} />
              <Route path="/login/traveler" element={<LoginTraveler />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/sender" element={<RegisterSender />} />
              <Route path="/register/traveler" element={<RegisterTraveler />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/post-delivery" element={<ProtectedRoute><PostDelivery /></ProtectedRoute>} />
              <Route path="/post-trip" element={<ProtectedRoute><PostTrip /></ProtectedRoute>} />
              <Route path="/find-deliveries" element={<ProtectedRoute><MatchResults /></ProtectedRoute>} />
              <Route path="/how-it-works-sender" element={<ProtectedRoute><HowItWorksSender /></ProtectedRoute>} />
              
              {/* Sender Routes */}
              <Route path="/sender" element={<SenderDashboardLayout />}>
                <Route path="kyc" element={<KYCVerification />} />
                <Route path="create" element={<CreateShipment />} />
                <Route path="my-shipments" element={<MyShipments />} />
                <Route path="profile" element={<SenderProfile />} />
                <Route path="track" element={<TrackShipment />} />
                <Route path="track/:id" element={<TrackShipment />} />
                {/* Fallback internal route */}
                <Route path="*" element={<Navigate to="my-shipments" replace />} />
              </Route>

              {/* Traveller Routes */}
              <Route path="/traveller" element={<TravellerDashboardLayout />}>
                <Route path="kyc" element={<TravellerKYC />} />
                <Route path="feed" element={<DeliveryFeed />} />
                <Route path="active" element={<MyDeliveries />} />
                <Route path="profile" element={<TravellerProfile />} />
                <Route path="*" element={<Navigate to="feed" replace />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {/* Global AI Chat Support */}
            <Chatbot />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
