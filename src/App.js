import React from 'react'
import Login from './pages/Login.js';
import { UserAuthProvider } from './context/UserAuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <UserAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </UserAuthProvider>
  );
}

export default App