"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, User, Menu, Globe, Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar() {
  const [language, setLanguage] = useState("en");

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇩🇿" },
    { code: "darja", label: "Darja", flag: "🇩🇿" },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5 text-[#64748B]" />
        </Button>
        
        {/* Bouton Talk to Sid AI */}
        <Link href="/dashboard/sidAI">
          <Button 
            className="flex items-center gap-2 text-white rounded-full px-4 py-5 cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            style={{
              background: "linear-gradient(to right, #10B77F, #0A5C36)",
            }}
          >
            <Image 
              src="/icon.svg" 
              alt="Sid AI" 
              width={20} 
              height={20} 
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">Talk to Sid AI</span>
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {/* Dropdown Langue */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-1.5 px-3 py-2 hover:bg-[#F8FAFC] rounded-lg transition-all"
            >
              <Globe className="h-4 w-4 text-[#64748B]" />
              <span className="text-sm font-medium text-[#1D283A] hidden sm:inline-block">
                {currentLanguage.flag}
              </span>
              <ChevronDown className="h-3 w-3 text-[#64748B]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-48 bg-white border border-[#E2E8F0] shadow-lg rounded-lg p-1"
          >
            <DropdownMenuLabel className="text-[#1D283A] font-semibold px-2 py-1.5">
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

        {/* Bouton Notifications */}
        <Button variant="ghost" size="icon" className="relative text-[#64748B] hover:text-[#1D283A]">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* Menu Utilisateur */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2 hover:bg-[#F8FAFC]">
              <Avatar className="h-8 w-8 border-2 border-[#0A5C36]/20">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback className="bg-[#0A5C36]/10 text-[#0A5C36] font-semibold">
                  DL
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium text-[#1D283A] sm:inline-block">
                DJEGHLAF LYDIA
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white border border-[#E2E8F0] shadow-lg rounded-lg p-1">
            <DropdownMenuLabel className="text-[#1D283A] font-semibold px-2 py-1.5">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#E2E8F0]" />
            <DropdownMenuItem className="text-[#64748B] hover:text-[#1D283A] hover:bg-[#F8FAFC] cursor-pointer rounded-md px-2 py-1.5 transition-all">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#64748B] hover:text-[#1D283A] hover:bg-[#F8FAFC] cursor-pointer rounded-md px-2 py-1.5 transition-all">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#E2E8F0]" />
            <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer rounded-md px-2 py-1.5 transition-all">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}