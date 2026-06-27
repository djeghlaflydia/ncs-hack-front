"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Shield,
  Zap,
  Scale,
  Building,
  FileCheck,
  ArrowRight,
  X,
  Eye,
  Download,
  AlertTriangle,
  Info,
  Clock,
  File,
  Link as LinkIcon,
  ExternalLink,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ScannerPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [expandedAnnotations, setExpandedAnnotations] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Données des annotations du document
  const documentAnnotations = [
    {
      id: 1,
      type: "warning",
      title: "Invalid Share Transfer Restriction",
      description: "The clause restricts shares for 12 years. Under Algerian Law No. 22-09 governing Simplified Joint Stock Companies (SPAS), share inalienability clauses cannot legally exceed a maximum of 10 years.",
      highlight: "Article 3 — Transfer of Shares",
      highlightedText: "Shares shall remain strictly inalienable for a period of twelve (12) consecutive years from the date of incorporation, save for transfers by inheritance duly approved by the founding partners.",
      recommendation: "Reduce the inalienability period from 12 years to 10 years maximum to comply with Law No. 22-09.",
      severity: "warning",
      line: 12,
    },
    {
      id: 2,
      type: "error",
      title: "Statutory CNRC Amendment Deadline",
      description: "You have adjusted your initial startup capital. Under the latest 2026 Finance Law mandates, all registered companies must officially file and amend their CNRC commercial register extract within a maximum period of 3 months from the date of the change, or face automated tax and customs auditing flags.",
      highlight: "Article 2 — Capital Contributions",
      highlightedText: "The initial share capital of the Company is fixed at the sum of Two Million Algerian Dinars (DZD 2,000,000), recently increased from the founding contribution of DZD 500,000",
      recommendation: "File the capital amendment with CNRC within 90 days from the date of signature to avoid tax and customs auditing flags.",
      severity: "error",
      line: 8,
      deadline: "90 Days from Signature",
    },
    {
      id: 3,
      type: "info",
      title: "Capital Increase Registered",
      description: "The capital increase from DZD 500,000 to DZD 2,000,000 has been detected and will require updated tax declarations.",
      highlight: "Article 2 — Capital Contributions",
      highlightedText: "The initial share capital of the Company is fixed at the sum of Two Million Algerian Dinars (DZD 2,000,000), recently increased from the founding contribution of DZD 500,000",
      recommendation: "Update tax declarations to reflect the new capital amount.",
      severity: "info",
      line: 8,
    },
  ];

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setScanComplete(true);
        setScanResults(documentAnnotations);
      }, 3000);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
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
      handleFileUpload(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const resetScanner = () => {
    setUploadedFile(null);
    setScanResults([]);
    setScanComplete(false);
    setIsScanning(false);
    setUploadedFile(null);
    setExpandedAnnotations([]);
  };

  const toggleAnnotation = (id: number) => {
    setExpandedAnnotations(prev => 
      prev.includes(id) 
        ? prev.filter(annotationId => annotationId !== id)
        : [...prev, id]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-700",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          badge: "bg-red-100 text-red-700",
          label: "Red Flag",
          highlightBg: "bg-red-100/50",
        };
      case "warning":
        return {
          bg: "bg-[#FFAE6717]",
          border: "border-[#FF8D28]/20",
          text: "text-[#FF8D28]",
          icon: <AlertTriangle className="h-5 w-5 text-[#FF8D28]" />,
          badge: "bg-[#FFAE6717] text-[#FF8D28]",
          label: "Warning",
          highlightBg: "bg-[#FFAE6717]/30",
        };
      case "info":
        return {
          bg: "bg-[#0A5C36]/5",
          border: "border-[#0A5C36]/20",
          text: "text-[#0A5C36]",
          icon: <Info className="h-5 w-5 text-[#0A5C36]" />,
          badge: "bg-[#0A5C36]/10 text-[#0A5C36]",
          label: "Info",
          highlightBg: "bg-[#0A5C36]/10",
        };
      default:
        return {
          bg: "bg-[#F8FAFC]",
          border: "border-[#E2E8F0]",
          text: "text-[#64748B]",
          icon: <Info className="h-5 w-5 text-[#64748B]" />,
          badge: "bg-[#F8FAFC] text-[#64748B]",
          label: "Info",
          highlightBg: "bg-[#F8FAFC]",
        };
    }
  };

  return (
    <div className="space-y-4 p-4 max-w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1D283A] mb-1">
          AI Smart Document Scanner
        </h1>
        <p className="text-sm text-[#64748B]">
          Instantly cross-reference drafts against the Algerian Commercial Code, the 2026 Finance Law, and Startup Act frameworks.
        </p>
      </div>

      {/* Zone de scan */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {/* État initial - Upload */}
        {!uploadedFile && !isScanning && !scanComplete && (
          <div className="p-8">
            <div
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
                isDragging
                  ? "border-[#0A5C36] bg-[#0A5C36]/5"
                  : "border-[#E2E8F0] hover:border-[#0A5C36] hover:bg-[#F8FAFC]"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.docx,.doc"
                className="hidden"
              />
              
              <div className="w-14 h-14 rounded-full bg-[#0A5C36]/10 flex items-center justify-center mx-auto mb-3">
                <Upload className="h-7 w-7 text-[#0A5C36]" />
              </div>
              
              <h3 className="text-lg font-semibold text-[#1D283A] mb-1">
                Drag - drop - scan
              </h3>
              <p className="text-sm text-[#64748B] mb-3">
                PDF - DOCX - max 10MB
              </p>
              
              <div className="flex items-center gap-4 justify-center">
                <div className="h-px w-10 bg-[#E2E8F0]" />
                <span className="text-sm text-[#64748B] font-medium">OR</span>
                <div className="h-px w-10 bg-[#E2E8F0]" />
              </div>

              <button
                onClick={handleClickUpload}
                className="mt-3 flex items-center gap-2 mx-auto px-5 py-2 bg-[#0A5C36] text-white rounded-lg hover:bg-[#064528] transition-colors font-medium text-sm"
              >
                <Upload className="h-4 w-4" />
                Upload
              </button>
            </div>
          </div>
        )}

        {/* État d'upload */}
        {isUploading && (
          <div className="text-center py-12">
            <Loader2 className="h-10 w-10 text-[#0A5C36] animate-spin mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-[#1D283A] mb-1">
              Uploading your document...
            </h3>
            <p className="text-sm text-[#64748B]">
              Please wait while we process your file
            </p>
          </div>
        )}

        {/* État de scan */}
        {isScanning && (
          <div className="text-center py-12">
            <div className="relative inline-block mb-3">
              <div className="w-14 h-14 rounded-full border-4 border-[#E2E8F0] border-t-[#0A5C36] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#0A5C36]" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#1D283A] mb-1">
              Scanning your document...
            </h3>
            <p className="text-sm text-[#64748B]">
              Cross-referencing against Algerian Commercial Code, 2026 Finance Law, and Startup Act
            </p>
          </div>
        )}

        {/* Résultats du scan - Vue split avec document à gauche et remarques à droite */}
        {scanComplete && uploadedFile && (
          <div>
            {/* Barre d'outils supérieure */}
            <div className="flex items-center justify-between p-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0A5C36]/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-[#0A5C36]" />
                </div>
                <div>
                  <p className="font-medium text-[#1D283A] text-sm">{uploadedFile.name}</p>
                  <p className="text-xs text-[#64748B]">
                    {(uploadedFile.size / 1024).toFixed(2)} KB • Scanned successfully
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-white transition-colors text-xs font-medium">
                  <Download className="h-3.5 w-3.5" />
                  Export
                </button>
                <button
                  onClick={resetScanner}
                  className="p-1.5 rounded-lg hover:bg-[#E2E8F0] transition-colors"
                >
                  <X className="h-4 w-4 text-[#64748B]" />
                </button>
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-4 gap-2 p-3 border-b border-[#E2E8F0]">
              <div className="bg-[#FFAE6717] rounded-lg p-2 text-center border border-[#FF8D28]/20">
                <p className="text-lg font-bold text-[#FF8D28]">1</p>
                <p className="text-xs text-[#64748B]">Warning</p>
              </div>
              <div className="bg-red-50 rounded-lg p-2 text-center border border-red-200">
                <p className="text-lg font-bold text-red-600">2</p>
                <p className="text-xs text-[#64748B]">Red Flags</p>
              </div>
              <div className="bg-[#0A5C36]/5 rounded-lg p-2 text-center border border-[#0A5C36]/20">
                <p className="text-lg font-bold text-[#0A5C36]">1</p>
                <p className="text-xs text-[#64748B]">Deadline</p>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg p-2 text-center border border-[#E2E8F0]">
                <p className="text-lg font-bold text-[#1D283A]">14</p>
                <p className="text-xs text-[#64748B]">Statutes</p>
              </div>
            </div>

            {/* Split View: Document à gauche, Remarques à droite */}
            <div className="flex flex-col lg:flex-row h-[600px]">
              {/* Document Preview - Gauche */}
              <div className="lg:w-1/2 border-r border-[#E2E8F0] overflow-y-auto p-4 bg-[#F8FAFC]">
                <div className="font-serif text-sm leading-relaxed">
                  {/* En-tête du document */}
                  <div className="text-center mb-4">
                    <h2 className="text-lg font-bold text-[#1D283A]">REPUBLIQUE ALGÉRIENNE DÉMOCRATIQUE ET POPULAIRE</h2>
                    <div className="h-px w-20 bg-[#0A5C36] mx-auto my-2" />
                    <h3 className="text-base font-semibold text-[#1D283A]">Shareholder Agreement</h3>
                    <p className="text-xs text-[#64748B] italic">Sociétés par Actions Simplifiées — SPAS</p>
                  </div>

                  {/* Article 1 */}
                  <div className="mb-3">
                    <h4 className="font-bold text-[#1D283A] text-sm">Article 1 — Object of the Company.</h4>
                    <p className="text-[#1D283A] text-xs leading-relaxed">
                      The present company, constituted under the laws of the People's Democratic Republic of Algeria, shall have for its corporate object the design, development, and commercialization of digital technology platforms, including all related professional services within the Algerian territory.
                    </p>
                  </div>

                  {/* Article 2 - Avec surlignage */}
                  <div className="mb-3 relative">
                    <h4 className="font-bold text-[#1D283A] text-sm">Article 2 — Capital Contributions.</h4>
                    <p className="text-[#1D283A] text-xs leading-relaxed">
                      The initial share capital of the Company is fixed at the sum of{' '}
                      <span className="bg-[#FFAE6717]/30 px-1 py-0.5 rounded border-l-2 border-[#FF8D28] cursor-pointer hover:bg-[#FFAE6717]/50 transition-colors">
                        <strong>Two Million Algerian Dinars (DZD 2,000,000)</strong>
                      </span>
                      , recently increased from the founding contribution of{' '}
                      <span className="bg-[#0A5C36]/10 px-1 py-0.5 rounded border-l-2 border-[#0A5C36] cursor-pointer hover:bg-[#0A5C36]/20 transition-colors">
                        DZD 500,000
                      </span>
                      , divided into shares of equal nominal value subscribed and held by the founding partners as outlined in Annex A.
                    </p>
                    <div className="absolute -right-1 top-0 flex items-center gap-1">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#FFAE6717] text-[#FF8D28] text-[9px] font-medium">
                        <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
                        Change
                      </span>
                    </div>
                  </div>

                  {/* Article 3 - Avec surlignage */}
                  <div className="mb-3 relative">
                    <h4 className="font-bold text-[#1D283A] text-sm">Article 3 — Transfer of Shares.</h4>
                    <p className="text-[#1D283A] text-xs leading-relaxed">
                      Any transfer assignment, or pledge of shares between partners or to third parties shall remain subject to the prior written consent of the General Assembly. Shares shall remain{' '}
                      <span className="bg-red-100/50 px-1 py-0.5 rounded border-l-2 border-red-500 cursor-pointer hover:bg-red-200/50 transition-colors">
                        <strong>strictly inalienable for a period of twelve (12) consecutive years from the date of incorporation</strong>
                      </span>
                      , save for transfers by inheritance duly approved by the founding partners.
                    </p>
                    <div className="absolute -right-1 top-0 flex items-center gap-1">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[9px] font-medium">
                        <AlertCircle className="h-2.5 w-2.5 mr-0.5" />
                        Invalid
                      </span>
                    </div>
                  </div>

                  {/* Article 4 */}
                  <div>
                    <h4 className="font-bold text-[#1D283A] text-sm">Article 4 — Governance.</h4>
                    <p className="text-[#1D283A] text-xs leading-relaxed">
                      The Company shall be managed by a Board of Directors composed of no fewer than three (3) members, elected for renewable terms of three (3) years, deliberating validly upon convocation of its President.
                    </p>
                  </div>

                  {/* Footer du document */}
                  <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex justify-between text-xs text-[#64748B]">
                    <span>PAGE 1/4</span>
                    <span>{uploadedFile.name}</span>
                  </div>
                </div>
              </div>

              {/* Annotations - Droite */}
              <div className="lg:w-1/2 overflow-y-auto p-3 bg-white">
                <h3 className="font-semibold text-[#1D283A] text-sm mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-[#0A5C36]" />
                  Annotations ({documentAnnotations.length})
                </h3>
                <div className="space-y-3">
                  {documentAnnotations.map((annotation) => {
                    const severity = getSeverityColor(annotation.severity);
                    const isExpanded = expandedAnnotations.includes(annotation.id);

                    return (
                      <div
                        key={annotation.id}
                        className={`border rounded-lg transition-all ${severity.border} ${severity.bg}`}
                      >
                        <div
                          className="p-3 cursor-pointer hover:bg-black/5 transition-colors"
                          onClick={() => toggleAnnotation(annotation.id)}
                        >
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5">{severity.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="font-semibold text-[#1D283A] text-sm">{annotation.title}</h4>
                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium ${severity.badge}`}>
                                  {severity.label}
                                </span>
                                {annotation.deadline && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-medium">
                                    <Clock className="h-2.5 w-2.5 mr-0.5" />
                                    {annotation.deadline}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#64748B] mt-0.5 line-clamp-2">{annotation.description}</p>
                              <div className="mt-1 flex items-center gap-1.5">
                                <File className="h-3 w-3 text-[#64748B]" />
                                <span className="text-[10px] text-[#64748B]">Line {annotation.line} · {annotation.highlight}</span>
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-[#64748B] flex-shrink-0" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-[#64748B] flex-shrink-0" />
                            )}
                          </div>
                        </div>

                        {/* Détails expandés */}
                        {isExpanded && (
                          <div className="px-3 pb-3 pt-0 border-t border-[#E2E8F0]">
                            <div className="mt-2 p-2 bg-white/50 rounded-lg border border-[#E2E8F0]">
                              <p className="text-[10px] font-medium text-[#1D283A] mb-1"> Highlighted Text:</p>
                              <p className="text-[10px] text-[#64748B] italic bg-white p-1.5 rounded border border-[#E2E8F0]">
                                "{annotation.highlightedText}"
                              </p>
                            </div>
                            <div className="mt-2 p-2 bg-[#0A5C36]/5 rounded-lg border border-[#0A5C36]/20">
                              <p className="text-[10px] font-medium text-[#0A5C36] mb-1"> Recommendation:</p>
                              <p className="text-[10px] text-[#64748B]">{annotation.recommendation}</p>
                            </div>
                            <div className="mt-2 flex gap-2">
                              <button className="flex items-center gap-1 px-2.5 py-1 bg-[#0A5C36] text-white rounded-lg hover:bg-[#064528] transition-colors text-[10px] font-medium">
                                <FileCheck className="h-3 w-3" />
                                Apply Fix
                              </button>
                              <button className="flex items-center gap-1 px-2.5 py-1 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-white transition-colors text-[10px] font-medium">
                                <ExternalLink className="h-3 w-3" />
                                Source
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}