import React, { useState, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import InputArea from "./components/InputArea";

export default function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  const replaceLastBotMessage = (text) => {
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = { text, sender: "bot" };
      return updated;
    });
  };

  const clearChat = () => {
    if (window.confirm("Clear chat?")) {
      setMessages([]);
      localStorage.removeItem("chatHistory");
    }
  };

  return (
    <>
      <div className="background-animation"></div>

      <div className="chat-container glass-effect">
        <header className="chat-header">
          <div className="header-left">
            <div className="logo">🤖</div>
            <h1>ChatVerse AI</h1>
          </div>

          <button className="clear-btn" onClick={clearChat}>🔄 New Chat</button>
        </header>

        <ChatBox messages={messages} />

        <InputArea 
          addMessage={addMessage} 
          replaceLastBotMessage={replaceLastBotMessage}
        />
      </div>
    </>
  );
}
