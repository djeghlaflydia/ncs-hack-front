import { ArrowRight } from "lucide-react";

interface BlueprintCardProps {
  blueprint: {
    id: number;
    title: string;
    description: string;
    category: string;
    readTime: string;
    tag: string;
  };
}

export function BlueprintCard({ blueprint }: BlueprintCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] hover:border-[#0a5c3638] transition-all hover:shadow-lg cursor-pointer overflow-hidden">
      <div className="p-6">
        {/* Première ligne: Icon + Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Icon vert foncé dans un carré vert clair */}
            <div className="w-10 h-10 rounded-lg bg-[#0A5C36]/10 flex items-center justify-center">
              <svg 
                className="w-5 h-5 text-[#0A5C36]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                />
              </svg>
            </div>
            </div>
            {/* Badge de catégorie */}
            <span className="inline-flex items-center rounded-full bg-[#0A5C36]/10 px-3 py-1 text-xs font-medium text-[#0A5C36]">
              {blueprint.tag}
            </span>
          
        </div>

        {/* Titre */}
        <h3 className="text-lg font-semibold text-[#1D283A] mb-2">
          {blueprint.title}
        </h3>
        
        {/* Sous-titre / Description */}
        <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
          {blueprint.description}
        </p>
        
        {/* Texte vert foncé en bas */}
        <div className="flex items-center text-[#0A5C36] font-medium text-sm">
          <span>Read Blueprint</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </div>
  );
}