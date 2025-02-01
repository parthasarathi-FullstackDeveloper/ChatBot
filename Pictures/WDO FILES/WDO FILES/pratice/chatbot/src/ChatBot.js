import React, { useState } from 'react';
import axios from 'axios';
import { REACT_APP_API_KEY, REACT_APP_API_URL } from './APIKEY';
import './ChatBot.css';
import 'font-awesome/css/font-awesome.min.css'; // Importing Font Awesome icons

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! I am your friendly assistant. How can I help you today?' }
    ]);
    const [userInput, setUserInput] = useState('');

    const handleSendMessage = async () => {
        if (userInput.trim()) {
            setMessages([...messages, { sender: 'user', text: userInput }]);
            setUserInput('');

            try {
                const response = await axios.post(
                    REACT_APP_API_URL,
                    {
                        model: 'gpt-4o-mini',
                        messages: [{ role: 'user', content: userInput }]
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${REACT_APP_API_KEY}`
                        }
                    }
                );

                const botMessage = response.data.choices[0].message.content.trim();

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'bot', text: botMessage }
                ]);
            } catch (error) {
                console.error('Error:', error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' }
                ]);
            }
        }
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    return (
        <div className="chatbot-container">
            <div className="chatbox">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        <span>{message.text}</span>
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>
                    <i className="fa fa-paper-plane"></i> {/* Send icon */}
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
