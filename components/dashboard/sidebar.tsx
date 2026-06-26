"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
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
    title: "Documents",
    icon: FileText,
    href: "/dashboard/documents",
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
      <div className="flex h-16 items-center border-b border-[#E2E8F0] px-6">
        <span className="text-xl font-bold text-[#0A5C36]">NCS</span>
        <span className="ml-1 text-xs text-[#64748B]">hack</span>
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