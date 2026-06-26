"use client";

import { useState } from "react";

const filters = ["All", "Intellectual property", "Labor & Hiring", "Data privacy", "Consumer protection"];

export function RoadmapFilter() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border-2 ${
            activeFilter === filter
              ? "bg-[#0A5C36] text-white border-[#0A5C36] shadow-md scale-105"
              : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0A5C36] hover:text-[#1D283A] hover:bg-[#F8FAFC]"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}