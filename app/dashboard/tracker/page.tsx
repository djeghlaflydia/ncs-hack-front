"use client";

import { useState } from "react";
import { 
  Search, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle,
  FileText,
  Upload,
  Download,
  Plus,
  Filter,
  ChevronDown
} from "lucide-react";

// Données des tâches
const tasks = [
  {
    id: 1,
    title: "Request Negative Certificate from CNRC",
    description: "Verify name availability and reserve the company name.",
    status: "to-do",
    priority: "High",
    taskNumber: 1,
  },
  {
    id: 2,
    title: "Bank Capital Clearance Certificate",
    description: "Awaiting the physical certificate from the bank branch manager to unblock funds.",
    status: "pending",
    priority: "Medium",
    taskNumber: 2,
    pendingReason: "Pending Bank Review",
  },
  {
    id: 3,
    title: "Submit Statutes to Tax Authority",
    description: "",
    status: "pending",
    priority: "High",
    taskNumber: 3,
  },
  {
    id: 4,
    title: "Draft Company Statutes",
    description: "",
    status: "completed",
    priority: "Low",
    taskNumber: 4,
  },
  {
    id: 5,
    title: "Secure Co-founder ID Proofs",
    description: "",
    status: "completed",
    priority: "Low",
    taskNumber: 5,
  },
  {
    id: 6,
    title: "Reserve Commercial Name",
    description: "",
    status: "completed",
    priority: "Low",
    taskNumber: 6,
  },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filtrer les tâches
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || task.status === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Statistiques
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;

  // Grouper les tâches par statut
  const toDoTasks = tasks.filter(t => t.status === "to-do");
  const pendingTasks = tasks.filter(t => t.status === "pending");
  const completedTasksList = tasks.filter(t => t.status === "completed");

  // Rendu du badge de statut
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "to-do":
        return {
          icon: <Circle className="h-3 w-3" />,
          label: "To Do",
          color: "bg-[#FFAE6717] text-[#FF8D28] border-[#FF8D28]/20",
        };
      case "pending":
        return {
          icon: <Clock className="h-3 w-3" />,
          label: "Pending",
          color: "bg-[#0A5C36]/10 text-[#0A5C36] border-[#0A5C36]/20",
        };
      case "completed":
        return {
          icon: <CheckCircle2 className="h-3 w-3" />,
          label: "Completed",
          color: "bg-[#0A5C36]/10 text-[#0A5C36] border-[#0A5C36]/20",
        };
      default:
        return {
          icon: <Circle className="h-3 w-3" />,
          label: "Unknown",
          color: "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]",
        };
    }
  };

  // Rendu du badge de priorité
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "High":
        return {
          label: "High",
          color: "bg-[#FFAE6717] text-[#FF8D28] border-[#FF8D28]/20",
        };
      case "Medium":
        return {
          label: "Medium",
          color: "bg-[#0A5C36]/10 text-[#0A5C36] border-[#0A5C36]/20",
        };
      case "Low":
        return {
          label: "Low",
          color: "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]",
        };
      default:
        return {
          label: priority,
          color: "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]",
        };
    }
  };

  // Rendu d'une tâche
  const renderTask = (task: typeof tasks[0]) => {
    const isCompleted = task.status === "completed";
    const statusBadge = getStatusBadge(task.status);
    const priorityBadge = getPriorityBadge(task.priority);

    // Icône selon le statut
    const getStatusIcon = () => {
      switch(task.status) {
        case "to-do":
          return <Circle className="h-4 w-4 text-[#FF8D28]" />;
        case "pending":
          return <Clock className="h-4 w-4 text-[#0A5C36]" />;
        case "completed":
          return <CheckCircle2 className="h-4 w-4 text-[#0A5C36]" />;
        default:
          return <Circle className="h-4 w-4 text-[#64748B]" />;
      }
    };

    return (
      <div
        key={task.id}
        className={`bg-white rounded-lg border p-4 hover:border-[#0A5C36] transition-all ${
          isCompleted 
            ? "border-[#0A5C36]/20" 
            : "border-[#E2E8F0]"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 flex-shrink-0">
            {getStatusIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-[#64748B]">
                {task.taskNumber}
              </span>
              <h4 className={`text-sm font-semibold text-[#1D283A]`}>
                {task.title}
              </h4>
            </div>
            {/* Afficher la description seulement si elle n'est pas vide */}
            {task.description && (
              <p className={`text-xs text-[#64748B] mt-0.5`}>
                {task.description}
              </p>
            )}
            {task.pendingReason && (
              <p className="text-xs text-[#FF8D28] mt-1 font-medium">
                {task.pendingReason}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {/* Badge de priorité */}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${priorityBadge.color}`}>
                {priorityBadge.label}
              </span>
              {/* Badge de statut */}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusBadge.color}`}>
                {statusBadge.icon}
                {statusBadge.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <div className="mb-6">
          {/* Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full bg-[#0A5C36]/10 px-3 py-1 text-sm font-medium text-[#0A5C36]">
              My Action Plan
            </span>
          </div>
          
          {/* Titre */}
          <h1 className="text-3xl font-bold text-[#1D283A] mb-2">
            Task tracker
          </h1>
          
          {/* Sous-titre */}
          <p className="text-[#64748B] text-lg">
            Track, manage, and complete your localized administrative steps.
          </p>
        </div>
      </section>

      {/* Statistiques */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#1D283A]">
            {completedTasks} of {totalTasks} Tasks Completed
          </span>
          <span className="text-sm text-[#64748B]">
            {Math.round((completedTasks / totalTasks) * 100)}% complete
          </span>
        </div>
        <div className="mt-2 w-full h-2 bg-[#F8FAFC] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0A5C36] rounded-full transition-all"
            style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
          />
        </div>
      </div>

      {/* Search et Filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#E2E8F0] pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#0A5C36]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#64748B]">Filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:outline-none focus:border-[#0A5C36]"
          >
            <option value="All">All</option>
            <option value="To-do">To Do</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Liste des tâches en colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Colonne To Do */}
        <div>
          <h3 className="text-sm font-medium text-[#64748B] mb-3 flex items-center gap-2">
            <Circle className="h-3 w-3 text-[#FF8D28]" />
            To Do ({toDoTasks.length})
          </h3>
          <div className="space-y-3">
            {toDoTasks.length > 0 ? (
              toDoTasks.map((task) => renderTask(task))
            ) : (
              <div className="text-sm text-[#64748B] text-center py-8 bg-[#F8FAFC] rounded-lg border border-dashed border-[#E2E8F0]">
                No tasks
              </div>
            )}
          </div>
        </div>

        {/* Colonne Pending */}
        <div>
          <h3 className="text-sm font-medium text-[#64748B] mb-3 flex items-center gap-2">
            <Clock className="h-3 w-3 text-[#0A5C36]" />
            Pending ({pendingTasks.length})
          </h3>
          <div className="space-y-3">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => renderTask(task))
            ) : (
              <div className="text-sm text-[#64748B] text-center py-8 bg-[#F8FAFC] rounded-lg border border-dashed border-[#E2E8F0]">
                No tasks
              </div>
            )}
          </div>
        </div>

        {/* Colonne Completed */}
        <div>
          <h3 className="text-sm font-medium text-[#64748B] mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3 text-[#0A5C36]" />
            Completed ({completedTasksList.length})
          </h3>
          <div className="space-y-3">
            {completedTasksList.length > 0 ? (
              completedTasksList.map((task) => renderTask(task))
            ) : (
              <div className="text-sm text-[#64748B] text-center py-8 bg-[#F8FAFC] rounded-lg border border-dashed border-[#E2E8F0]">
                No tasks
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}