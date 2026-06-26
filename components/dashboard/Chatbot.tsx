"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant juridique NCS. Comment puis-je vous aider avec le droit des entreprises algérien ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simuler une réponse du bot
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "Je comprends votre question. Je vais vous aider avec les informations juridiques en Algérie. Pourriez-vous préciser votre demande ?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col bg-white rounded-lg border border-[#E2E8F0]">
      {/* Header du chatbot */}
      <div className="border-b border-[#E2E8F0] px-6 py-4">
        <h2 className="text-lg font-semibold text-[#1D283A]">💬 Assistant Juridique</h2>
        <p className="text-sm text-[#64748B]">Posez vos questions sur le droit des entreprises en Algérie</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender === "user"
                  ? "bg-[#0A5C36] text-white"
                  : "bg-[#F8FAFC] text-[#1D283A] border border-[#E2E8F0]"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-[#E2E8F0] p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Posez votre question..."
            className="flex-1 rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm focus:outline-none focus:border-[#0A5C36]"
          />
          <button
            onClick={handleSend}
            className="rounded-lg bg-[#0A5C36] px-4 py-2 text-white hover:bg-[#064528] transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}