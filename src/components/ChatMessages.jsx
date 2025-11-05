import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';


function useAutoScroll(dependencies) {
  const messageRef = useRef(null);

  useEffect(() => {
    const scrollElem = messageRef.current;

    if (scrollElem) {
      // scrollElem.scrollTop = scrollElem.scrollHeight;
      scrollElem.scrollTo({
        top: scrollElem.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [dependencies]);    
  
  return messageRef;
}

export function ChatMessages({chatMessages}) {
  const messageRef = useAutoScroll(chatMessages);
  return(
    <div className="chat-message-container"
          ref={messageRef}
        >
      {chatMessages.length !== 0 ?             
        chatMessages.map((chatMessage) => {
          return(
            <ChatMessage 
              message={chatMessage.message}
              sender={chatMessage.sender}
              time={chatMessage.time}
              key={chatMessage.id}
            />
          );
        })
        : 
        <p className="welcome-message">
          Wlecome to the chatbot project! Send a message using the textbox below
        </p>
      } 
    </div>
  );
} 

export default ChatMessages;