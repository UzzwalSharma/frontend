// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import the CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="neon-text">Welcome to the Simmi's Chat Application</h1>
            <Link to="/chat">
                <button className="neon-button">Go to Chat</button>
            </Link>
        </div>
    );
};

export default Home;
