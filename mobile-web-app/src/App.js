import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ChatRoom from './pages/ChatRoom';
import UserLandingPage from './pages/UserLandingPage'
import EmergencyContact from './pages/EmergencyContact';
import LifeSkills from './pages/LifeSkills';
import Calendar from './pages/Calendar';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import PopupChat from './components/PopupChat'; // Import the new PopupChat component
import './styles/App.css';

function App() {
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = (message) => {
    setChatMessages([...chatMessages, { text: message, sender: 'You' }]);
    // Here you would typically send the message to a server
    // For now, we'll just simulate a response
    setTimeout(() => {
      setChatMessages(prevMessages => [...prevMessages, { text: 'This is a response', sender: 'Bot' }]);
    }, 1000);
  };

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
          <Route path="/dashboard" element={<UserLandingPage />} />
        </Routes>
        <Navbar />
        <PopupChat messages={chatMessages} onSendMessage={handleSendMessage} />
      </div>
    </Router>
  );
}

export default App;