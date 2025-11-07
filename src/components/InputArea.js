import React, { useState } from "react";
import { apiKey } from "../config";

export default function InputArea({ addMessage, replaceLastBotMessage }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendToGemini = async (text) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text }] }] })
    });

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    addMessage(text, "user");
    setInput("");

    setLoading(true);
    addMessage("AI is typing...", "bot");

    const reply = await sendToGemini(text);
    replaceLastBotMessage(reply);
    setLoading(false);
  };

  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()}
        disabled={loading}
      />
      <button onClick={handleSend} disabled={loading}>➤</button>
    </div>
  );
}
