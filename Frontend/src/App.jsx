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
import AdminDashboard from './components/admin/Dashboard';
import AdminHeader from './components/admin/Header';
import AdminBlacklist from './components/admin/Blacklist';

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
        <Route path='/organization/info' element={<OrgInfo />} />
        <Route path='/organization/profile' element={<OrgProfile />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<div><AdminHeader /><AdminDashboard /></div>} />
        <Route path="/admin/verify" element={<div><AdminHeader /><Verify /></div>} />
        <Route path="/admin/blacklist" element={<div><AdminHeader /><AdminBlacklist /></div>} />
      </Routes>
    </Router>
  );
};

export default App;
