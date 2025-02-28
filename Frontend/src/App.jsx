import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/main/Landing';
import Header from './components/main/Header';
import Auth from './components/main/Auth/Auth';
import DonorDashboard from './components/donors/Dashboard';
import DonorProfile from './components/donors/Profile';
import OrganizationDashboard from './components/organization/Dashboard';
import ErrorPage from './components/ErrorPage';
import OrgInfo from './components/main/Auth/OrgInfo';
import OrgProfile from './components/organization/Profile';
import Verify from './components/admin/Verify';
import AdminLoginPage from './components/admin/Login';
import AdminDashboard from './components/admin/Dashboard';
import AdminHeader from './components/admin/Header';
import AdminBlacklist from './components/admin/Blacklist';
import ProtectedRoute from './components/admin/ProtectedRoute'; // Import the ProtectedRoute component
import Unauthorized from './components/admin/Unauthorized';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/"
          element={
            <div className="bg-indigo-900">
              <Header />
              <Landing />
            </div>
          }
        />
        <Route path="/auth" element={<Auth />} />
        {/* Donor Routes */}
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/donor/profile" element={<DonorProfile />} />
        {/* Organization Routes */}
        <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
        <Route path="/organization/info" element={<OrgInfo />} />
        <Route path="/organization/profile" element={<OrgProfile />} />
        {/* Admin Panel */}
        <Route
          path="/login/admin"
          element={
            <div>
              <AdminLoginPage />
              <Auth />
            </div>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <div>
                <AdminHeader />
                <AdminDashboard />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/verify"
          element={
            <ProtectedRoute requiredRole="admin">
              <div>
                <AdminHeader />
                <Verify />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blacklist"
          element={
            <ProtectedRoute requiredRole="admin">
              <div>
                <AdminHeader />
                <AdminBlacklist />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
};

export default App;
