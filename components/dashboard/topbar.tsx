"use client";

import { useState } from "react";
import { Bell, User, Menu } from "lucide-react";
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
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5 text-[#64748B]" />
        </Button>
        
        {/* Bouton Talk to Sid AI */}
        <Button 
          className="flex items-center gap-2 bg-[#0A5C36] hover:bg-[#064528] text-white rounded-full px-4 py-3 transition-all hover:shadow-lg"
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
      </div>

      <div className="flex items-center gap-3">

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
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-[#1D283A]">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[#64748B] hover:text-[#1D283A] cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#64748B] hover:text-[#1D283A] cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 hover:text-red-700 cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}