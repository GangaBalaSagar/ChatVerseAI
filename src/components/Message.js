import React from "react";

export default function Message({ sender, text }) {
  const cls = sender === "user" ? "message user-message" : "message bot-message";

  if (text.includes("```")) {
    const codeContent = text.replace(/```/g, "");
    return <div className={cls}><pre>{codeContent}</pre></div>;
  }

  return <div className={cls}>{text}</div>;
}
