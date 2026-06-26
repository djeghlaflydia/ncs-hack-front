"use client";

import { useState } from "react";
import { X, BookOpen, FileText, Globe } from "lucide-react";

interface ArticleDetailProps {
  article: {
    title: string;
    code: string;
    officialText: string;
    source: string;
  };
  onClose: () => void;
}

export function ArticleDetail({ article, onClose }: ArticleDetailProps) {
  const [activeTab, setActiveTab] = useState<"official" | "darja">("official");

  // Traduction en Darja (exemple)
  const darjaText = `Fiha SARL (Société à Responsabilité Limitée), rass el mal tqesem 3la chqat metsawyin (parts sociales) mwzzeen bin el shoraka 7sab el mousahamat te3hom. Aya tahwil d'actions l'ghir el shoraka ye7taj l'mouafaqa d'el shoraka eli yemthelou 3la 9al 3la tlata rboue (3/4) men rass el mal, ila kanech el statuts ykhelfo w ytlabou akthar men heka.`;

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] h-full flex flex-col">
      {/* Header avec bouton de fermeture */}
      <div className="border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#0A5C36]" />
          <span className="text-sm font-medium text-[#0A5C36]">ACTIVE ARTICLE</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-[#F8FAFC] transition-colors"
        >
          <X className="h-5 w-5 text-[#64748B]" />
        </button>
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Code de l'article */}
        <div className="mb-6">
          <span className="inline-flex items-center rounded-full bg-[#0A5C36]/10 px-3 py-1 text-sm font-medium text-[#0A5C36]">
            {article.code}
          </span>
        </div>

        {/* Titre */}
        <h2 className="text-2xl font-bold text-[#1D283A] mb-6">
          {article.title}
        </h2>

        {/* Onglets */}
        <div className="flex gap-4 border-b border-[#E2E8F0] mb-6">
          <button 
            onClick={() => setActiveTab("official")}
            className={`pb-3 px-1 text-sm font-medium flex items-center gap-2 transition-all ${
              activeTab === "official"
                ? 'border-b-2 border-[#0A5C36] text-[#0A5C36]'
                : 'text-[#64748B] hover:text-[#1D283A]'
            }`}
          >
            <FileText className="h-4 w-4" />
            Official legal text
          </button>
          <button 
            onClick={() => setActiveTab("darja")}
            className={`pb-3 px-1 text-sm font-medium flex items-center gap-2 transition-all ${
              activeTab === "darja"
                ? 'border-b-2 border-[#0A5C36] text-[#0A5C36]'
                : 'text-[#64748B] hover:text-[#1D283A]'
            }`}
          >
            <Globe className="h-4 w-4" />
            Plain algerian darja
          </button>
        </div>

        {/* Contenu selon l'onglet sélectionné */}
        <div className="bg-[#F8FAFC] rounded-lg p-6 border border-[#E2E8F0] mb-6">
          <p className="text-[#1D283A] leading-relaxed">
            {activeTab === "official" ? article.officialText : darjaText}
          </p>
        </div>

        {/* Source */}
        <div className="text-sm text-[#64748B] border-t border-[#E2E8F0] pt-4">
          <span className="font-medium">Source:</span> {article.source}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 bg-[#0A5C36] text-white rounded-lg hover:bg-[#064528] transition-colors text-sm font-medium">
            📥 Download PDF
          </button>
          <button className="px-4 py-2 border border-[#E2E8F0] text-[#1D283A] rounded-lg hover:bg-[#F8FAFC] transition-colors text-sm font-medium">
            📤 Share
          </button>
        </div>
      </div>
    </div>
  );
}