import React, { useState } from 'react';
import './App.css';
import ChatBot from './ChatBot';

function App() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleChatbotClick = () => {
        setIsChatOpen(true);
    };

    return (
        <div className="App">
            {!isChatOpen ? (
                <div className="chatbot-icon" onClick={handleChatbotClick}>
                    <div className="chatbot-icon-content">
                        <span>🤖</span>
                    </div>
                    <p>Can You Any Help ?</p>
                </div>
            ) : (
                <ChatBot />
            )}
        </div>
    );
}

export default App;
