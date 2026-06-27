"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight, Globe, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en");

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇩🇿" },
    { code: "darja", label: "Darja", flag: "🇩🇿" },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Signup:", { name, email, password });
      // Redirection vers /dashboard après inscription
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#1F1F1F] flex flex-col">
      {/* Topbar blanche */}
      <div className="bg-white border-b border-[#E2E8F0] px-6 py-3 flex items-center justify-between">
        {/* Logo à gauche */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#0A5C36]/10 flex items-center justify-center">
            <Image 
              src="/logo.svg" 
              alt="INSHAA" 
              width={28} 
              height={28} 
              className="w-7 h-7"
            />
          </div>
          <span className="text-xl font-bold text-[#0A5C36]">INSHAA</span>
        </Link>

        {/* Boutons à droite */}
        <div className="flex items-center gap-3">
          {/* Dropdown Langue */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-1.5 px-3 py-2 hover:bg-[#F8FAFC] rounded-lg transition-all text-[#64748B] hover:text-[#1D283A]"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium hidden sm:inline-block">
                  {currentLanguage.flag}
                </span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-[#E2E8F0] shadow-lg rounded-lg p-1">
              <DropdownMenuLabel className="text-[#1D283A] font-semibold px-2 py-1.5 text-sm">
                Select Language
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#E2E8F0]" />
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center justify-between cursor-pointer rounded-md px-2 py-1.5 transition-all ${
                    language === lang.code
                      ? "text-[#0A5C36] bg-[#0A5C36]/10"
                      : "text-[#64748B] hover:text-[#1D283A] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <span className="text-sm">{lang.label}</span>
                  </span>
                  {language === lang.code && (
                    <Check className="h-4 w-4 text-[#0A5C36]" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Bouton login - Redirection vers /auth/login */}
          <Link href="/auth/login">
            <Button 
              className="bg-[#0A5C36] hover:bg-[#064528] text-white rounded-full px-6 py-2 text-sm font-medium transition-all hover:shadow-lg"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Contenu centré avec deux colonnes */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Colonne gauche - Texte et image */}
          <div className="space-y-6">
            {/* Titre */}
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Launch Your Innovation
            </h1>
            
            {/* Sous-titre */}
            <p className="text-[#94A3B8] text-base md:text-lg max-w-md">
              From a brilliant idea to a legally compliant Algerian startup. 
              We handle the bureaucracy so you can focus on building the future.
            </p>
            
            {/* Image group.svg */}
            <div className="mt-4">
              <Image 
                src="/group.svg" 
                alt="Team illustration" 
                width={300} 
                height={250} 
                priority
              />
            </div>
          </div>

          {/* Colonne droite - Formulaire de login */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white rounded-2xl border border-[#ffffffc6] p-8">
              <h2 className="text-xl font-semibold mb-6">Login</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[#3A3A3A]  px-4 py-3 text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#0A5C36] focus:ring-2 focus:ring-[#0A5C36]/20 transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#3A3A3A]  px-4 py-3 text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#0A5C36] focus:ring-2 focus:ring-[#0A5C36]/20 transition-all"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-[#3A3A3A]  px-4 py-3 pr-12 text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#0A5C36] focus:ring-2 focus:ring-[#0A5C36]/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#94A3B8] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div className="text-right">
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-[#0A5C36] hover:text-[#10B77F] transition-colors font-medium"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0A5C36] hover:bg-[#064528] text-white rounded-xl py-5 text-sm font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      SignUp
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Sign up link - Redirection vers /auth/signup */}
              <div className="mt-6 text-center">
                <p className="text-sm text-[#94A3B8]">
                  Already have an account?{" "}
                  <Link 
                    href="/auth/login" 
                    className="text-[#0A5C36] hover:text-[#10B77F] font-semibold transition-colors"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}