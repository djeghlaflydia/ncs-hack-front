"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Receipt,
  FileText,
  Shield,
  Settings,
  LogOut,
  BookOpen,
  MessageSquare,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: MessageSquare,
    href: "/dashboard",
  },
  {
    title: "Your Rights",
    icon: Shield,
    href: "/dashboard/rights",
  },
  {
    title: "My Roadmaps",
    icon: BookOpen,
    href: "/dashboard/roadmaps",
  },
  {
    title: "Task tracker",
    icon: CheckSquare,
    href: "/dashboard/tasks",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/dashboard/documents",
  },
  {
    title: "Taxes",
    icon: Receipt,
    href: "/dashboard/taxes",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[#E2E8F0] bg-white">
      {/* Logo et titre */}
      <div className="flex items-center gap-3 border-b border-[#E2E8F0] px-6 py-4">
        <Image 
          src="/logo.svg" 
          alt="INSHAA Logo" 
          width={48} 
          height={48} 
          className="w-12 h-12 flex-shrink-0"
        />
        <div className="flex flex-col">
          <span className="text-xl font-bold text-[#0A5C36] leading-none">
            INSHAA
          </span>
          <span className="text-[10px] text-[#1D283A] font-medium mt-0.5">
            Building your startup legally
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#0A5C36]/10 text-[#0A5C36]"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1D283A]"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#E2E8F0] p-4">
        <Link href="/login">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#64748B] transition-all hover:bg-[#F8FAFC] hover:text-[#1D283A]">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </Link>
      </div>
    </aside>
  );
}