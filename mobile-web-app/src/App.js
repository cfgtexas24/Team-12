import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import Register from './pages/Register'
import ChatRoom from './pages/ChatRoom';
import EmergencyContact from './pages/EmergencyContact';
import LifeSkills from './pages/LifeSkills';
import Calendar from './pages/Calendar';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/emergency" element={<EmergencyContact />} />
          <Route path="/lifeskills" element={<LifeSkills />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;