import React, { useState } from 'react';
import './ChatBot.css';
import axios from 'axios';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! I am your friendly assistant. How can I help you today?' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);

    const handleSendMessage = async () => {
        if (userInput.trim()) {
            // Add user message to the state
            setMessages([...messages, { sender: 'user', text: userInput }]);
            setUserInput('');
            setIsBotTyping(true);

            try {
                // Send the request to the OpenAI API
                const response = await axios.post(
                    'https://api.openai.com/v1/chat/completions', // API endpoint
                    {
                        model: 'gpt-3.5-turbo', // Specify the model
                        messages: [
                            { role: 'system', content: 'You are a helpful assistant.' },
                            { role: 'user', content: userInput } // User message
                        ],
                        max_tokens: 150,  // Max number of tokens in response
                        temperature: 0.7  // Adjust creativity level of response
                    },
                    {
                        headers: {
                            'Authorization': `Bearer YOUR_API_KEY_HERE` // Add "Bearer" before the API key
                        }
                    }
                );

                // Extract the bot's response
                const botMessage = response.data.choices[0].message.content.trim();

                // Add bot message to state
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'bot', text: botMessage }
                ]);
                setIsBotTyping(false);
            } catch (error) {
                console.error('Error fetching from OpenAI API:', error);
                setIsBotTyping(false);
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
                        {message.text}
                    </div>
                ))}

                {isBotTyping && (
                    <div className="bot-typing">
                        <div className="typing-dots">...</div>
                    </div>
                )}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBot;
