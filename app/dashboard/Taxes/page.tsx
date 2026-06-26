"use client";

import React, { useState } from "react";
import { 
  Search, 
  Download, 
  FileText,
  Shield,
  Users,
  Code,
  Building,
  FileCheck,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Wallet,
  Landmark,
  PiggyBank,
  Receipt,
  DollarSign,
  BarChart3,
  LineChart,
  PieChart,
  Activity
} from "lucide-react";

export default function TaxesPage() {
  const [activeTab, setActiveTab] = useState("revenue");

  // Données des échéances fiscales
  const deadlines = [
    {
      id: 1,
      title: "G50 Filing (IFU/TVA)",
      date: "June 30, 2026",
      status: "upcoming",
      amount: "45,000 DZD",
    },
    {
      id: 2,
      title: "CNAS Employee Declaration",
      date: "July 15, 2026",
      status: "pending",
      amount: "18,500 DZD",
    },
    {
      id: 3,
      title: "Annual Corporate Tax Return",
      date: "December 31, 2026",
      status: "upcoming",
      amount: "120,000 DZD",
    },
    {
      id: 4,
      title: "VAT Quarterly Declaration",
      date: "September 30, 2026",
      status: "upcoming",
      amount: "32,000 DZD",
    },
  ];

  // Données du G50 Assistant
  const g50Steps = [
    { id: 1, label: "Revenue input", icon: DollarSign, status: "completed" },
    { id: 2, label: "Deductions", icon: TrendingDown, status: "in-progress" },
    { id: 3, label: "Tax form", icon: FileText, status: "pending" },
  ];

  // Fonction pour obtenir le style de la box selon le statut
  const getStepBoxStyle = (status: string) => {
    switch(status) {
      case "completed":
        return {
          border: "border-[#0A5C36] bg-[#0A5C36]/5",
          text: "text-[#0A5C36]",
          icon: <CheckCircle2 className="h-4 w-4 text-[#0A5C36]" />,
        };
      case "in-progress":
        return {
          border: "border-[#0A5C36] bg-white shadow-md",
          text: "text-[#1D283A]",
          icon: <div className="h-2 w-2 rounded-full bg-[#0A5C36] animate-pulse" />,
        };
      case "pending":
        return {
          border: "border-[#E2E8F0] bg-white",
          text: "text-[#64748B]",
          icon: <div className="h-2 w-2 rounded-full bg-[#E2E8F0]" />,
        };
      default:
        return {
          border: "border-[#E2E8F0] bg-white",
          text: "text-[#64748B]",
          icon: null,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <div className="mb-6">
          {/* Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full bg-[#0A5C36]/10 px-3 py-1 text-sm font-medium text-[#0A5C36]">
              The Fiscal Guard
            </span>
          </div>
          
          {/* Titre */}
          <h1 className="text-3xl font-bold text-[#1D283A] mb-2">
            Taxes & finances
          </h1>
          
          {/* Sous-titre */}
          <p className="text-[#64748B] text-lg">
            Real-time compliance tracking, tax forecasting, and Startup Act exemptions.
          </p>
        </div>
      </section>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Carte 1 - Estimated Next Tax Payment */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Estimated Next Tax Payment</p>
              <p className="text-2xl font-bold text-[#1D283A] mt-1">45,000 DZD</p>
              <p className="text-xs text-[#64748B] mt-1">Estimated G50 Filing (IFU/TVA)</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#0A5C36]/10 flex items-center justify-center flex-shrink-0">
              <Receipt className="h-5 w-5 text-[#0A5C36]" />
            </div>
          </div>
        </div>

        {/* Carte 2 - Social Security Contributions */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Social Security Contributions</p>
              <p className="text-2xl font-bold text-[#1D283A] mt-1">18,500 DZD</p>
              <p className="text-xs text-[#64748B] mt-1">CNAS Employee Declarations • Monthly</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#0A5C36]/10 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 text-[#0A5C36]" />
            </div>
          </div>
        </div>

        {/* Carte 3 - Exemption Savings Tracker */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Exemption Savings Tracker</p>
              <p className="text-2xl font-bold text-[#0A5C36] mt-1">+320,000 DZD</p>
              <p className="text-xs text-[#64748B] mt-1">Total Capital Saved via Tax Incentives</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#0A5C36]/10 flex items-center justify-center flex-shrink-0">
              <PiggyBank className="h-5 w-5 text-[#0A5C36]" />
            </div>
          </div>
        </div>
      </div>

      {/* Section Interactive G50 Tax Assistant + Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* G50 Tax Assistant */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 transition-all">
          <h3 className="text-lg font-semibold text-[#1D283A] mb-2">
            Interactive G50 Tax Assistant
          </h3>
          <p className="text-sm text-[#64748B] mb-4">
            Track monthly tax declarations step by step.
          </p>

          {/* Steps en boxes avec flèches */}
          <div className="flex items-center gap-3 mb-4">
            {g50Steps.map((step, index) => {
              const style = getStepBoxStyle(step.status);
              return (
                <React.Fragment key={step.id}>
                  {/* Box de l'étape */}
                  <div className={`flex-1 rounded-xl border-2 p-3 text-center transition-all ${style.border}`}>
                    <div className="flex items-center justify-center gap-2">
                      {style.icon}
                      <span className={`text-sm font-medium ${style.text}`}>
                        {step.label}
                      </span>
                    </div>
                  </div>
                  
                  {/* Flèche entre les étapes (sauf après la dernière) */}
                  {index < g50Steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-[#64748B] flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
            <p className="text-sm text-[#64748B] mb-2">Monthly revenue (DZD)</p>
            <input type="number" className="border border-[#E2E8F0] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0A5C36] w-full" />
          <button className="mt-4 flex items-center gap-2 text-[#0A5C36] font-medium text-sm hover:text-[#064528] transition-colors">
            NEXT
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Upcoming Fiscal Deadlines */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 transition-all">
          <h3 className="text-lg font-semibold text-[#1D283A] mb-2">
            Upcoming Fiscal Deadlines & Action Plan
          </h3>
          <p className="text-sm text-[#64748B] mb-4">
            Critical compliance actions and their current status.
          </p>

          <div className="space-y-3">
            {deadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0A5C36]/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-[#0A5C36]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1D283A]">{deadline.title}</p>
                    <p className="text-xs text-[#64748B]">{deadline.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#1D283A]">{deadline.amount}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    deadline.status === "upcoming"
                      ? "bg-[#FFAE6717] text-[#FF8D28]"
                      : "bg-[#0A5C36]/10 text-[#0A5C36]"
                  }`}>
                    {deadline.status === "upcoming" ? "Upcoming" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 flex items-center gap-2 text-[#0A5C36] font-medium text-sm hover:text-[#064528] transition-colors">
            View All Deadlines
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Monthly Revenue Section */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[#1D283A]">Monthly revenue (DZD)</h3>
            <p className="text-sm text-[#64748B]">Track your monthly revenue trends</p>
          </div>
          <button className="flex items-center gap-2 text-[#0A5C36] font-medium text-sm hover:text-[#064528] transition-colors">
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Graphique simplifié */}
        <div className="h-48 flex items-end gap-4 pt-4">
          {[65, 45, 80, 70, 55, 90, 75, 60, 85, 50, 70, 95].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className="w-full bg-[#0A5C36] rounded-t transition-all hover:bg-[#064528] cursor-pointer"
                style={{ height: `${height * 0.6}%` }}
              />
              <span className="text-[10px] text-[#64748B]">{['J','F','M','A','M','J','J','A','S','O','N','D'][index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}