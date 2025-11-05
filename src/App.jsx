import { useEffect, useState } from 'react';
import { ChatInput } from './components/ChatInput';
import  ChatMessages  from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';
import './App.css';

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

  useEffect( () => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect( () => {
    Chatbot.addResponses(
      {
        'goodbye': 'Goodbye. Have a great day!',
        'bonjour' : 'Bonjour. Comment je pourrai t\'aider'
      }
    );
  }, []);

  return (
    <div className="app-container">
      <ChatMessages 
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
