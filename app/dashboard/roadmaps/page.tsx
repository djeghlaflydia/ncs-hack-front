"use client";

import { useState } from "react";
import { Search, ChevronRight, Play, Circle, CheckCircle2 } from "lucide-react";

// Données des roadmaps
const roadmaps = [
  {
    id: 1,
    title: "Qarini project",
    progress: 20,
    steps: 10,
    completedSteps: 2,
    updatedAt: "yesterday",
    status: "in-progress",
    milestones: [
      {
        id: 1,
        title: "Notary & Association Statutes",
        description: "Drafting the corporate charter and signing official company bylaws.",
        status: "completed",
        completedDate: "June 12",
        icon: "📄",
      },
      {
        id: 2,
        title: "Bank Capital Block",
        description: "Deposit your company's minimum initial capital at an approved local bank branch to receive a blocking certificate.",
        status: "in-progress",
        actionRequired: true,
        filesLeft: 5,
        icon: "🏦",
        details: {
          whatToBring: [
            "A copy of your national ID card (Carte Nationale)",
            "The draft of your notary association statutes",
            "Physical currency for the minimum capital deposit"
          ]
        }
      },
      {
        id: 3,
        title: "CNRC Commercial Registration",
        description: "Official entry into the National Commercial Registry to unlock your corporate NIF, NIS, and official stamp.",
        status: "locked",
        unlocksAfter: "Step 2 clears",
        icon: "📋",
      },
      {
        id: 4,
        title: "Tax Registration",
        description: "Register for VAT and corporate tax with the local tax authorities.",
        status: "locked",
        unlocksAfter: "Step 3 clears",
        icon: "💰",
      },
      {
        id: 5,
        title: "Social Security Registration",
        description: "Register your employees with CNAS for social security coverage.",
        status: "locked",
        unlocksAfter: "Step 4 clears",
        icon: "👥",
      },
    ]
  },
];

export default function RoadmapsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRoadmap, setSelectedRoadmap] = useState<typeof roadmaps[0] | null>(null);

  // Filtrer les roadmaps
  const filteredRoadmaps = roadmaps.filter(roadmap => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || roadmap.status === statusFilter.toLowerCase().replace(" ", "-");
    return matchesSearch && matchesStatus;
  });

  // Statistiques
  const totalRoadmaps = roadmaps.length;
  const inProgress = roadmaps.filter(r => r.status === "in-progress").length;
  const completed = roadmaps.filter(r => r.status === "completed").length;

  // Fonction pour gérer le clic sur "Resume"
  const handleResume = (roadmap: typeof roadmaps[0]) => {
    setSelectedRoadmap(roadmap);
  };

  // Fonction pour revenir à la liste
  const handleBack = () => {
    setSelectedRoadmap(null);
  };

  // Si un roadmap est sélectionné, afficher le détail
  if (selectedRoadmap) {
    return <RoadmapDetail roadmap={selectedRoadmap} onBack={handleBack} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
            <div className="mb-6">
              {/* Badge */}
              <div className="mb-3">
                <span className="inline-flex items-center rounded-full bg-[#0A5C36]/10 px-3 py-1 text-sm font-medium text-[#0A5C36]">
                  My roadmaps
                </span>
              </div>
              
              {/* Titre */}
              <h1 className="text-3xl font-bold text-[#1D283A] mb-2">
                My roadmaps
              </h1>
              
              {/* Sous-titre */}
              <p className="text-[#64748B] text-lg">
                Manage, track, and update your generated learning paths.
              </p>
            </div>
          </section>

      {/* Search et Filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search a roadmap..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#E2E8F0] pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#0A5C36]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#64748B]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:outline-none focus:border-[#0A5C36]"
          >
            <option value="All">All</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 text-center">
          <div className="text-2xl font-bold text-[#1D283A]">{totalRoadmaps}</div>
          <div className="text-sm text-[#64748B]">Total Roadmaps</div>
        </div>
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 text-center">
          <div className="text-2xl font-bold text-[#0A5C36]">{inProgress}</div>
          <div className="text-sm text-[#64748B]">In progress</div>
        </div>
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 text-center">
          <div className="text-2xl font-bold text-[#64748B]">{completed}</div>
          <div className="text-sm text-[#64748B]">Completed</div>
        </div>
      </div>

      {/* Liste des roadmaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoadmaps.map((roadmap) => (
            <div
            key={roadmap.id}
            className="bg-white rounded-lg border border-[#E2E8F0] p-6 hover:border-[#0A5C36] transition-all flex flex-col"
            >
            {/* Titre */}
            <h3 className="text-lg font-semibold text-[#1D283A] mb-3">
                {roadmap.title}
            </h3>
            
            {/* Pourcentage et steps sur la même ligne */}
            <div className="flex items-center justify-between text-sm text-[#64748B] mb-1">
                <span>{roadmap.progress}% complete</span>
                <span>{roadmap.completedSteps}/{roadmap.steps} steps</span>
            </div>
            
            {/* Barre de progression */}
            <div className="w-full h-2 bg-[#F8FAFC] rounded-full overflow-hidden mb-3">
                <div
                className="h-full bg-[#0A5C36] rounded-full transition-all"
                style={{ width: `${roadmap.progress}%` }}
                />
            </div>
            
            {/* Footer avec Updated et Resume */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F8FAFC]">
                <span className="text-sm text-[#64748B]">Updated {roadmap.updatedAt}</span>
                <button
                onClick={() => handleResume(roadmap)}
                className="flex items-center gap-2 px-4 py-2 bg-[#0A5C36] text-white rounded-lg hover:bg-[#064528] transition-colors text-sm font-medium"
                >
                <Play className="h-4 w-4" />
                Resume
                </button>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
}

// Composant RoadmapDetail intégré dans le même fichier
function RoadmapDetail({ roadmap, onBack }: { roadmap: typeof roadmaps[0], onBack: () => void }) {
  const completedMilestones = roadmap.milestones.filter(m => m.status === "completed").length;
  const totalMilestones = roadmap.milestones.length;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return <span className="text-xs font-medium text-[#0A5C36]">Completed</span>;
      case "in-progress":
        return <span className="text-xs font-medium text-[#0A5C36]">In progress</span>;
      case "locked":
        return <span className="text-xs font-medium text-[#64748B]">Locked</span>;
      default:
        return null;
    }
  };

  // Couleur du cercle selon le statut
  const getStepCircleStyles = (status: string) => {
    switch(status) {
      case "completed":
        return "bg-[#0A5C36] text-white border-[#0A5C36]";
      case "in-progress":
        return "bg-[#0A5C36] text-white border-[#0A5C36] ring-4 ring-[#0A5C36]/20";
      case "locked":
        return "bg-[#E2E8F0] text-[#64748B] border-[#E2E8F0]";
      default:
        return "bg-[#E2E8F0] text-[#64748B] border-[#E2E8F0]";
    }
  };

  // Couleur du trait selon le statut
  const getLineColor = (status: string) => {
    switch(status) {
      case "completed":
        return "bg-[#0A5C36]";
      case "in-progress":
        return "bg-[#0A5C36]";
      case "locked":
        return "bg-[#E2E8F0]";
      default:
        return "bg-[#E2E8F0]";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec bouton retour */}
      <div className="space-y-4">
        {/* Première ligne: Arrow left + Back to My Roadmaps */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#64748B]" />
          </button>
          <button
            onClick={onBack}
            className="text-sm font-medium text-[#64748B] hover:text-[#0A5C36] transition-colors"
          >
            Back to My Roadmaps
          </button>
        </div>

        {/* Titre */}
        <h1 className="text-2xl font-bold text-[#1D283A]">{roadmap.title}</h1>

        {/* Badge de statut */}
        <div className="inline-flex items-center gap-3 rounded-full bg-[#FFAE6717] px-4 py-1.5">
          <span className="text-sm text-[#FF8D28]">In progress</span>
          <span className="text-sm font-medium text-[#FF8D28]">{roadmap.progress}% done</span>
        </div>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#1D283A]">Overall progress</span>
          <span className="text-sm text-[#64748B]">{completedMilestones} of {totalMilestones} milestones completed</span>
        </div>
        <div className="mt-2 w-full h-2 bg-[#F8FAFC] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0A5C36] rounded-full transition-all"
            style={{ width: `${(completedMilestones / totalMilestones) * 100}%` }}
          />
        </div>
      </div>

      {/* Liste des milestones avec timeline */}
      <div className="relative pl-8">
        {roadmap.milestones.map((milestone, index) => {
          const isLast = index === roadmap.milestones.length - 1;
          const circleStyles = getStepCircleStyles(milestone.status);
          const lineColor = getLineColor(milestone.status);

          return (
            <div key={milestone.id} className="relative">
              {/* Trait vertical (sauf pour le dernier) */}
              {!isLast && (
                <div 
                  className={`absolute left-3.5 top-8 w-0.5 h-[calc(100%+0px)] ${lineColor}`}
                  style={{ 
                    height: 'calc(100% - 0px)',
                  }}
                />
              )}

              {/* Cercle avec numéro */}
              <div className="relative flex items-start gap-6 pb-8">
                {/* Cercle - Positionné à gauche */}
                <div className="relative z-10 flex-shrink-0">
                  <div 
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm border-2 ${circleStyles}`}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Contenu de l'étape */}
                <div className="flex-1">
                  <div
                    className={`rounded-lg border p-6 transition-all ${
                      milestone.status === "completed"
                        ? "border-[#0A5C36]/20 bg-white"
                        : milestone.status === "in-progress"
                        ? "border-[#0A5C36] shadow-md bg-white"
                        : "border-[#E2E8F0] opacity-60 bg-[#F8FAFC]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-[#64748B] text-sm">
                            STEP {index + 1}
                          </h3>
                        </div>

                        <h4 className="text-lg font-bold text-[#1D283A] mt-1">
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-[#64748B] mt-1">
                          {milestone.description}
                        </p>

                        {milestone.status === "completed" && milestone.completedDate && (
                          <span className="inline-flex items-center rounded-full bg-[#0A5C36]/10 px-3 py-1 text-sm font-medium text-[#0A5C36]">
                            Completed on {milestone.completedDate}
                        </span>
                        )}

                        {milestone.status === "in-progress" && milestone.filesLeft && (
                          <div className="mt-3 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-[#0A5C36]" />
                            <span className="text-sm font-medium text-[#0A5C36]">
                              Download {milestone.filesLeft} Copy.pdf
                            </span>
                          </div>
                        )}

                        {milestone.status === "locked" && milestone.unlocksAfter && (
                          <p className="text-sm text-[#64748B] mt-2">
                            Unlocks after {milestone.unlocksAfter}
                          </p>
                        )}

                        {milestone.details?.whatToBring && (
                          <div className="mt-4 bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0]">
                            <h5 className="text-sm font-semibold text-[#1D283A] mb-2">
                              Step details and guidance
                            </h5>
                            <p className="text-sm font-medium text-[#1D283A] mb-2">What to bring:</p>
                            <ul className="space-y-1">
                              {milestone.details.whatToBring.map((item, idx) => (
                                <li key={idx} className="text-sm text-[#64748B] flex items-start gap-2">
                                  <span className="text-[#0A5C36]">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Importer les icônes manquantes
import { ArrowLeft, AlertCircle, FileText } from "lucide-react";