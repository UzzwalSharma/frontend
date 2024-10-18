// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from '/src/groupchat.jsx'; // Import your Chat component
import Home from '/src/Home.jsx'; // You can create a Home component or use your existing one
import './App.css'; // Your main app CSS

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </Router>
    );
};

export default App;
