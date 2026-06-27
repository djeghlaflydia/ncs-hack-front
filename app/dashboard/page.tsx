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
  Bot,
  Plus,
  Loader2,
  Paperclip,
  User,
  Clock,
  Download,
  Play,
  Square
} from "lucide-react";

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
  const [sandboxInput, setSandboxInput] = useState("");
  const [isSandboxRecording, setIsSandboxRecording] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Auto-scroll vers le bas des messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus sur l'input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

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
  };

  const toggleSandboxRecording = () => {
    setIsSandboxRecording(!isSandboxRecording);
  };

  const handleSandboxSend = () => {
    if (!sandboxInput.trim()) return;
    console.log("Sandbox question:", sandboxInput);
    setSandboxInput("");
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File uploaded:", file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      console.log("File dropped:", file.name);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative p-6"
      style={{ 
        backgroundImage: `url('/overview.png')`,
      }}
    >
      {/* Overlay pour la lisibilité */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm -z-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Deux boxes côte à côte */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Box 1 - Welcome Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0A5C36]/10 flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 text-[#0A5C36]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1D283A]">Welcome back, Founder</h1>
                <p className="text-[#64748B] text-base mt-1 leading-relaxed">
                  Your compliance status is locked in. Let's look at today's roadmap.
                </p>
              </div>
            </div>
          </div>

          {/* Box 2 - Journal Officiel Pulse */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-[#1D283A]">Journal Officiel Pulse</h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A5C36]/10 text-[#0A5C36] text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0A5C36] animate-pulse" />
                  Live
                </span>
              </div>
              <span className="text-xs text-[#64748B] hidden sm:block">Real-time legislative changes</span>
            </div>
            <span className="text-xs text-[#64748B] block sm:hidden mb-3">Real-time legislative changes for Algerian tech firms</span>

            <div className="space-y-3">
              {pulseItems.map((item) => (
                <div key={item.id} className="border border-[#E2E8F0] rounded-lg p-4 hover:border-[#0A5C36] transition-all bg-white/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-[#1D283A] text-sm">{item.title}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.tag === "NEW" 
                            ? "bg-[#0A5C36]/10 text-[#0A5C36]"
                            : "bg-[#FFAE6717] text-[#FF8D28]"
                        }`}>
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                    </div>
                    <span className="text-xs text-[#64748B] whitespace-nowrap ml-3 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-4 flex items-center gap-2 text-[#0A5C36] font-medium text-sm hover:text-[#064528] transition-colors">
              View all updates
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Sandbox */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1D283A] mb-4">Quick sandbox</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1 - Dropzone sandbox */}
            <div 
              className={`bg-white/95 backdrop-blur-sm rounded-xl border p-5 hover:border-[#0A5C36] hover:shadow-lg transition-all cursor-pointer shadow-sm ${
                isDragging ? "border-[#0A5C36] bg-[#0A5C36]/5" : "border-[#0A5C36]/20"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="w-11 h-11 rounded-xl bg-[#0A5C36]/10 flex items-center justify-center mb-3">
                <Upload className="h-5 w-5 text-[#0A5C36]" />
              </div>
              <h3 className="font-semibold text-[#1D283A] mb-1">Dropzone sandbox</h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-3">
                Drop any contract here for an instant 5-second regulatory check.
              </p>
              
              {/* Espace Upload */}
              <div 
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${
                  isDragging 
                    ? "border-[#0A5C36] bg-[#0A5C36]/10" 
                    : "border-[#E2E8F0] hover:border-[#0A5C36]"
                }`}
                onClick={handleFileUpload}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                />
                <Upload className="h-6 w-6 text-[#64748B] mx-auto mb-2" />
                <p className="text-xs text-[#64748B]">
                  {isDragging ? "Drop your file here" : "Click or drag to upload"}
                </p>
                <p className="text-[10px] text-[#64748B] mt-1">PDF - DOCX - max 10MB</p>
              </div>
            </div>

            {/* Box 2 - Darja Translator */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-[#FF8D28]/20 p-5 hover:border-[#0A5C36] hover:shadow-lg transition-all cursor-pointer shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-[#FFAE6717] flex items-center justify-center mb-3">
                <Mic className="h-5 w-5 text-[#FF8D28]" />
              </div>
              <h3 className="font-semibold text-[#1D283A] mb-1">Darja Translator</h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-3">
                Say any complex legal term to hear it explained in spoken Algerian Darja instantly.
              </p>
              
              {/* Espace Hold space bar to talk */}
              <div className="border border-[#E2E8F0] rounded-lg p-4 text-center hover:border-[#FF8D28] transition-all">
                <button
                  onClick={toggleSandboxRecording}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
                    isSandboxRecording 
                      ? "bg-red-500 text-white animate-pulse" 
                      : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#FFAE6717] hover:text-[#FF8D28]"
                  }`}
                >
                  {isSandboxRecording ? (
                    <>
                      <Square className="h-4 w-4" />
                      <span className="text-sm font-medium">Recording...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4" />
                      <span className="text-sm font-medium">Hold space bar to talk</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-[#64748B] mt-2">
                  {isSandboxRecording ? "Click to stop recording" : "Press and hold to record"}
                </p>
              </div>
            </div>

            {/* Box 3 - Chat with Sid */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-[#0A5C36]/20 p-5 hover:border-[#0A5C36] hover:shadow-lg transition-all cursor-pointer shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-[#0A5C36]/10 flex items-center justify-center mb-3">
                <Bot className="h-5 w-5 text-[#0A5C36]" />
              </div>
              <h3 className="font-semibold text-[#1D283A] mb-1">Chat with Sid</h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-3">
                Have a highly specific legal or business questions? Launch our AI advisor to get instant, tailored answers about Algerian corporate structures.
              </p>
              
              {/* Espace Type a question... */}
              <div className="flex items-center gap-2 border border-[#E2E8F0] rounded-lg p-2 hover:border-[#0A5C36] transition-all bg-white">
                <input
                  type="text"
                  value={sandboxInput}
                  onChange={(e) => setSandboxInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSandboxSend()}
                  placeholder="Type a question..."
                  className="flex-1 bg-transparent outline-none text-sm text-[#1D283A] placeholder:text-[#64748B]"
                />
                <button
                  onClick={handleSandboxSend}
                  disabled={!sandboxInput.trim()}
                  className={`p-1.5 rounded-lg transition-all ${
                    sandboxInput.trim()
                      ? "bg-[#0A5C36] text-white hover:bg-[#064528]"
                      : "bg-[#F8FAFC] text-[#64748B] cursor-not-allowed"
                  }`}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[10px] text-[#64748B] mt-2">
                Ask anything about Algerian corporate law
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}