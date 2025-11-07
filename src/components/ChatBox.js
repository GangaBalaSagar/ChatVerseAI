import React, { useRef, useEffect } from "react";
import Message from "./Message";

export default function ChatBox({ messages }) {
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <main id="chat-box" className="chat-box" ref={chatRef}>
      {messages.map((msg, i) => (
        <Message key={i} sender={msg.sender} text={msg.text} />
      ))}
    </main>
  );
}
