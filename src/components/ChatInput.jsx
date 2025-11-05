import { useState } from "react";
import { Chatbot } from 'supersimpledev'
import { LoadingBubble } from './LoadingBubble';
import dayjs from "dayjs";
import './ChatInput.css';


export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if(isLoading || inputText === '') return;

    const nowUser = dayjs().valueOf();
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        time: dayjs(nowUser).format('HH:mm'),
        id: crypto.randomUUID()
      }
    ]
    setChatMessages(newChatMessages);

    const nowLoading = dayjs().valueOf();
    setChatMessages([
      ...newChatMessages,
      {
        message: <LoadingBubble />,
        sender: 'robot',
        time: dayjs(nowLoading).format('HH:mm'),
        id: crypto.randomUUID()
      }
    ]);


    // setChatMessages([
    //   ...newChatMessages,
    //   {
    //     message: 'Loading...',
    //     sender: 'robot',
    //     id: crypto.randomUUID()
    //   }
    // ]);

    setIsLoading(true);

    setInputText('');

    const response = await Chatbot.getResponseAsync(inputText);
    const nowRobot = dayjs().valueOf();
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        time: dayjs(nowRobot).format('HH:mm'),
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(false);

    setInputText('');
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.setItem('message', JSON.stringify([]));
  }

  function saveInputTextEnter(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={saveInputTextEnter}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="chat-button"
      >Send</button>
      <button
        onClick={clearMessages}
        className="chat-button-clear"
      >Clear</button>
    </div>
  );
}