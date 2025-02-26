import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/main/Landing';
import Header from './components/main/Header';
import Auth from './components/main/Auth/Auth';
import DonorDashboard from './components/donors/Dashboard';
import DonorProfile from './components/donors/Profile';
import OrganizationDashboard from './components/organization/Dashboard';
import ErrorPage from './components/ErrorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<div className='bg-indigo-900'>
          <Header />
          <Landing />
        </div>
        } />
        <Route path="/auth" element={<Auth />} />
        {/* Donor Routes*/}
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/donor/profile" element={<DonorProfile />} />
        {/* Organization Routes*/}
        <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
