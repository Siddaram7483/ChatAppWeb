import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';
import Contacts from './components/Contacts';

export default function App() {
  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/setAvatar' element={<SetAvatar />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/' element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
