"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Download, 
  FileText,
  FileSignature,
  Shield,
  Users,
  Code,
  Building,
  FileCheck,
  ChevronDown,
  ChevronRight,
  Link as LinkIcon
} from "lucide-react";
import Link from "next/link";

// Données des documents
const documents = [
  {
    id: 1,
    title: "Co-Founder Shareholder Agreement",
    description: "Govers equity splits, vesting schedules, and exit rights under the Algerian Startup Act.",
    category: "Agreements",
    icon: Users,
    downloadLink: "#",
  },
  {
    id: 2,
    title: "Mutual NonDisclosure Agreement (NDA)",
    description: "Protects confidential information shared between Algerian startups and third parties.",
    category: "Legal",
    icon: Shield,
    downloadLink: "#",
  },
  {
    id: 3,
    title: "Standard Software Developer Contract",
    description: "Compliant tech employment contract aligned with Algerian labor code and IP transfer rules.",
    category: "Contracts",
    icon: Code,
    downloadLink: "#",
  },
  {
    id: 4,
    title: "Co-Founder Shareholder Agreement",
    description: "Govers equity splits, vesting schedules, and exit rights under the Algerian Startup Act.",
    category: "Agreements",
    icon: Users,
    downloadLink: "#",
  },
  {
    id: 5,
    title: "Mutual NonDisclosure Agreement (NDA)",
    description: "Protects confidential information shared between Algerian startups and third parties.",
    category: "Legal",
    icon: Shield,
    downloadLink: "#",
  },
  {
    id: 6,
    title: "Standard Software Developer Contract",
    description: "Compliant tech employment contract aligned with Algerian labor code and IP transfer rules.",
    category: "Contracts",
    icon: Code,
    downloadLink: "#",
  },
];

// Catégories
const categories = [
  { name: "All", icon: FileText, count: documents.length },
  { name: "Agreements", icon: Users, count: documents.filter(d => d.category === "Agreements").length },
  { name: "Legal", icon: Shield, count: documents.filter(d => d.category === "Legal").length },
  { name: "Contracts", icon: Code, count: documents.filter(d => d.category === "Contracts").length },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedDocs, setExpandedDocs] = useState<number[]>([]);

  // Filtrer les documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Fonction pour afficher/masquer les détails
  const toggleExpand = (id: number) => {
    setExpandedDocs(prev => 
      prev.includes(id) 
        ? prev.filter(docId => docId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header avec badge, titre, sous-titre et bouton sur la même ligne */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            {/* Badge */}
            <div className="mb-3">
              <span className="inline-flex items-center rounded-full bg-[#0A5C36]/10 px-3 py-1 text-sm font-medium text-[#0A5C36]">
                Documents
              </span>
            </div>
            
            {/* Titre */}
            <h1 className="text-3xl font-bold text-[#1D283A] mb-2">
              Documents
            </h1>
            
            {/* Sous-titre */}
            <p className="text-[#64748B] text-lg">
              Legally compliant templates optimized for the Algerian Startup Act.
            </p>
          </div>

          {/* Bouton AI doc scanner - aligné à droite */}
          <div className="flex-shrink-0 mt-2 sm:mt-6">
            <Link href="/dashboard/documents/docScanner">
              <Button 
                className="flex items-center gap-2 text-white rounded-full px-4 py-5 transition-all hover:shadow-lg hover:scale-105"
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
                <span className="text-sm font-medium">AI doc scanner</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search + Filtres sur la même ligne */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Search bar */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search a roadmap..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#E2E8F0] pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#0A5C36]"
          />
        </div>

        {/* Catégories - Filtres */}
        <div className="flex flex-wrap gap-2 flex-shrink-0">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  isActive
                    ? "bg-[#0A5C36] text-white border-[#0A5C36] shadow-md"
                    : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0A5C36] hover:text-[#1D283A]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {category.name}
                <span className={`text-xs ${
                  isActive ? "text-white/80" : "text-[#64748B]"
                }`}>
                  ({category.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Liste des documents en grille 3 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => {
            const isExpanded = expandedDocs.includes(doc.id);
            const Icon = doc.icon;

            return (
              <div
                key={doc.id}
                className="bg-white rounded-lg border border-[#E2E8F0] hover:border-[#0A5C36] hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
                {/* En-tête du document */}
                <div 
                  className="p-4 cursor-pointer hover:bg-[#F8FAFC] transition-colors flex-1"
                  onClick={() => toggleExpand(doc.id)}
                >
                  <div className="flex flex-col items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#0A5C36]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-[#0A5C36]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#1D283A] line-clamp-2">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1 line-clamp-2">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-[#E2E8F0] px-4 py-3 bg-[#F8FAFC] flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Download:", doc.title);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A5C36] text-white rounded-lg hover:bg-[#064528] transition-colors text-xs font-medium"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                  <button 
                    onClick={() => toggleExpand(doc.id)}
                    className="p-1 hover:bg-[#E2E8F0] rounded-lg transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-[#64748B]" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-[#64748B]" />
                    )}
                  </button>
                </div>

                {/* Détails du document (expandable) */}
                {isExpanded && (
                  <div className="border-t border-[#E2E8F0] px-4 py-3 bg-[#F8FAFC] space-y-2">
                    <p className="text-xs text-[#64748B]">
                      <span className="font-medium text-[#1D283A]">Category:</span> {doc.category}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Preview:", doc.title);
                        }}
                        className="flex-1 px-3 py-1.5 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-white transition-colors text-xs font-medium text-center"
                      >
                        Preview
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Download PDF:", doc.title);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#0A5C36] text-white rounded-lg hover:bg-[#064528] transition-colors text-xs font-medium"
                      >
                        <FileCheck className="h-3.5 w-3.5" />
                        PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 bg-[#F8FAFC] rounded-lg border border-dashed border-[#E2E8F0]">
            <FileText className="h-12 w-12 text-[#64748B] mx-auto mb-3" />
            <h3 className="text-lg font-medium text-[#1D283A]">No documents found</h3>
            <p className="text-sm text-[#64748B]">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}