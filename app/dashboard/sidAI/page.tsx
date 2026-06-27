"use client";

import { useState, useRef, useEffect } from "react";
import { 
  ArrowRight, 
  Send, 
  Mic, 
  MicOff,
  Upload,
  FileText,
  Sparkles,
  MessageSquare,
  Bot,
  Play,
  Square,
  Plus,
  Download,
  Clock,
  Zap,
  Shield,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome back, Founder! Your compliance status is locked in. Let's look at today's roadmap.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Données du Journal Officiel Pulse
  const pulseItems = [
    {
      id: 1,
      title: "New Digital Signature Decree Passed",
      time: "Today",
      description: "The Algerian Government has officially legalized fully digital remote contracts for local tech firms under Decree 26-104.",
      tag: "NEW",
    },
    {
      id: 2,
      title: "A-Label Startup Funds Allocation Split",
      time: "Yesterday",
      description: "New financing pools opened via Algerian Startup Fund (ASF) for tech-labeled projects. Three tranches available: pre-seed, MVP, scale.",
      tag: "UPDATE",
    },
  ];

  // Données du Quick Sandbox
  const sandboxItems = [
    {
      id: 1,
      title: "Dropzone sandbox",
      description: "Drop any contract here for an instant 5-second regulatory check.",
      icon: Upload,
      color: "bg-[#0A5C36]/10 text-[#0A5C36]",
    },
    {
      id: 2,
      title: "Darja Translator",
      description: "Say any complex legal term to hear it explained in spoken Algerian Darja instantly.",
      icon: Mic,
      color: "bg-[#FFAE6717] text-[#FF8D28]",
    },
    {
      id: 3,
      title: "Chat with Sid",
      description: "Have a highly specific legal or business questions? Launch our AI advisor to get instant, tailored answers about Algerian corporate structures.",
      icon: Bot,
      color: "bg-[#0A5C36]/10 text-[#0A5C36]",
    },
  ];

  // Auto-scroll vers le bas des messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus sur l'input
  useEffect(() => {
    if (inputRef.current && isExpanded) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Simuler une réponse du bot
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand your question. Let me help you with that. Based on Algerian corporate law, here's what you need to know... Would you like more details on this topic?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Démarrer l'enregistrement
      console.log("Recording started...");
    } else {
      // Arrêter l'enregistrement
      console.log("Recording stopped...");
    }
  };

  // Rendu du composant Journal Officiel Pulse
  const renderPulseSection = () => (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 hover:border-[#0A5C36] transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#1D283A]">Journal Officiel Pulse</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A5C36]/10 text-[#0A5C36] text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0A5C36] animate-pulse" />
              Live
            </span>
          </div>
        </div>
        <span className="text-xs text-[#64748B]">Real-time legislative changes for Algerian tech firms</span>
      </div>

      <div className="space-y-4">
        {pulseItems.map((item) => (
          <div key={item.id} className="border border-[#E2E8F0] rounded-lg p-4 hover:border-[#0A5C36] transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-[#1D283A]">{item.title}</h4>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.tag === "NEW" 
                      ? "bg-[#0A5C36]/10 text-[#0A5C36]"
                      : "bg-[#FFAE6717] text-[#FF8D28]"
                  }`}>
                    {item.tag}
                  </span>
                </div>
                <p className="text-sm text-[#64748B]">{item.description}</p>
              </div>
              <span className="text-xs text-[#64748B] whitespace-nowrap ml-4">{item.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 flex items-center gap-2 text-[#0A5C36] font-medium text-sm hover:text-[#064528] transition-colors">
        View all updates
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );

  // Rendu du composant Quick Sandbox
  const renderSandboxSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#1D283A]">Quick sandbox</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sandboxItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="bg-white rounded-lg border border-[#E2E8F0] p-4 hover:border-[#0A5C36] hover:shadow-lg transition-all cursor-pointer">
              <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-[#1D283A] mb-1">{item.title}</h4>
              <p className="text-sm text-[#64748B]">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* Drag-drop info */}
      <div className="flex items-center justify-between bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-[#64748B]" />
            <span className="text-sm text-[#64748B]">Drag - drop - scan</span>
          </div>
          <div className="h-4 w-px bg-[#E2E8F0]" />
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#64748B]" />
            <span className="text-sm text-[#64748B]">PDF - DOCX - max 10MB</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0A5C36] text-white rounded-lg hover:bg-[#064528] transition-colors text-sm font-medium">
          Upload
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col  p-6">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto pr-4 space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === "user"
                  ? "bg-[#0A5C36] text-white"
                  : "bg-white border border-[#E2E8F0] text-[#1D283A]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === "bot" && (
                  <Image 
                    src="/logo.svg" 
                    alt="Sid AI" 
                    width={20} 
                    height={20} 
                    className="w-5 h-5"
                  />
                )}
                <span className="text-xs font-medium opacity-70">
                  {message.sender === "bot" ? "Sid AI" : "You"}
                </span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              <span className="text-[10px] opacity-50 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 text-[#0A5C36] animate-spin" />
                <span className="text-sm text-[#64748B]">Sid is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Toujours visible */}
      <div className="flex-shrink-0 bg-white rounded-xl border border-[#E2E8F0] p-3">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleRecording}
            className={`p-2 rounded-full transition-all ${
              isRecording 
                ? "bg-red-500 text-white animate-pulse" 
                : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]"
            }`}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Sid anything about Algerian corporate law..."
            className="flex-1 bg-transparent outline-none text-sm text-[#1D283A] placeholder:text-[#64748B]"
          />

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] transition-colors">
              <Paperclip className="h-5 w-5" />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isProcessing}
              className={`p-2 rounded-full transition-all ${
                input.trim() && !isProcessing
                  ? "bg-[#0A5C36] text-white hover:bg-[#064528]"
                  : "bg-[#F8FAFC] text-[#64748B] cursor-not-allowed"
              }`}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Info hold space bar */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-[#64748B]">Hold space bar to talk</span>
          <span className="text-xs text-[#64748B]">Sid AI • Algerian Corporate Law Expert</span>
        </div>
      </div>
    </div>
  );
}

// Importer Paperclip depuis lucide-react
import { Paperclip } from "lucide-react";