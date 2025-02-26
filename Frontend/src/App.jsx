import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './components/donors/Test';
import Landing from './components/main/Landing';
import Header from './components/main/Header';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className='bg-indigo-900'>
          <Header />
          <Landing />
        </div>
        } />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
