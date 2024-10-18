import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import InputEmoji from 'react-input-emoji';
import { formatDistanceToNow } from 'date-fns';
import { FaMicrophone, FaRegSmile, FaRegThumbsUp, FaRegHeart, FaRegLaughBeam, FaRegSadTear } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast
import './chat.css';

const socket = io('https://backend-jovv.onrender.com');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('User');
    const [reactions, setReactions] = useState({});
    const messagesEndRef = useRef(null);
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        socket.on('chatMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('previousMessages', (msgs) => {
            setMessages(msgs);
        });

        return () => {
            socket.off('chatMessage');
            socket.off('previousMessages');
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, reactions]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const sendMessage = (e) => {
       
        if (message.trim()) {
            const msgData = {
                username,
                text: message,
                time: Date.now(),
            };
            socket.emit('chatMessage', msgData);
            setMessage('');
        }
    };

    const startListening = () => {
        if (!SpeechRecognition) {
            alert('Speech Recognition is not supported in this browser.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.start();
        setIsListening(true);

        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            setMessage(speechToText);
        };

        recognition.onspeechend = () => {
            recognition.stop();
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };
    };

    // Handle reaction and trigger a toast notification
    const handleReaction = (msgIndex, reaction, reactionLabel) => {
        setReactions((prevReactions) => ({
            ...prevReactions,
            [msgIndex]: reaction,
        }));

        // Trigger toast notification for the reaction
        toast(`${username} reacted with ${reactionLabel}`);
    };

    return (
        <div className="chat-container">
            <Toaster /> {/* Toast notification container */}
            <h2 className="chat-header">Group Chat</h2>
            <div className="message-container">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.username}:</strong> {msg.text}
                        <span className="message-time">
                            {msg.time && !isNaN(msg.time)
                                ? formatDistanceToNow(new Date(msg.time), { addSuffix: true })
                                : 'Unknown time'}
                        </span>
                        <div className="reaction-container">
                            {/* Reaction icons */}
                            <FaRegThumbsUp
                                className="reaction-icon"
                                onClick={() => handleReaction(index, '👍', '👍')}
                            />
                            <FaRegSmile
                                className="reaction-icon"
                                onClick={() => handleReaction(index, '😊', '😊')}
                            />
                            <FaRegHeart
                                className="reaction-icon"
                                onClick={() => handleReaction(index, '❤️', '❤️')}
                            />
                            <FaRegLaughBeam
                                className="reaction-icon"
                                onClick={() => handleReaction(index, '😂', '😂')}
                            />
                            <FaRegSadTear
                                className="reaction-icon"
                                onClick={() => handleReaction(index, '😢', '😢')}
                            />
                            {/* Display selected reaction */}
                            {reactions[index] && (
                                <span className="selected-reaction">{reactions[index]}</span>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="chat-form">
                <InputEmoji
                    value={message}
                    onChange={setMessage}
                    onEnter={sendMessage}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button type="submit" className="chat-button">
                    Send
                </button>
                <button
                    type="button"
                    className={`mic-button ${isListening ? 'listening' : ''}`}
                    onClick={startListening}
                    title="Press to speak"
                >
                    <FaMicrophone size={20} />
                </button>
            </form>
        </div>
    );
};

export default Chat;
