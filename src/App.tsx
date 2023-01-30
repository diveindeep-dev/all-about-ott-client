import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from './pages';
import SignUp from './pages/Auth/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
