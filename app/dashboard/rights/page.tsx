"use client";

import { useState } from "react";
import { RoadmapFilter } from "@/components/dashboard/RoadmapFilter";
import { BlueprintCard } from "@/components/dashboard/BlueprintCard";
import { ArticleDetail } from "@/components/dashboard/ArticleDetail";

const blueprints = [
  {
    id: 1,
    title: "Co-founder equity split",
    description: "How founders legally divide ownership shares in an Algerian SARL or SPA. Covers vesting, dilution, and protecting your stake before the cap table grows.",
    category: "Intellectual property",
    readTime: "12 mars 2024",
    tag: "Blueprint",
    article: {
      title: "Co-Founder Equity Split",
      code: "Code de Commerce · Art. 564",
      officialText: "In an SARL (Société à Responsabilité Limitée), the share capital is divided into equal parts (parts sociales) distributed among the partners in proportion to their contributions. Any transfer of shares to third parties requires the consent of partners representing at least three-quarters of the share capital, unless the statutes provide for a stricter majority.",
      source: "Code de Commerce · Art. 564 — official Journal Officiel translation.",
    }
  },
  {
    id: 2,
    title: "User Data Compliance",
    description: "Your obligations under Law 18-07 when collecting personal data from users. Covers consent, the ANPDP declaration, and cross-border data transfers.",
    category: "Data privacy",
    readTime: "25 mai 2024",
    tag: "Compliance",
    article: {
      title: "User Data Compliance",
      code: "Loi 18-07 · Art. 34",
      officialText: "Any processing of personal data must be based on the explicit consent of the data subject. The data controller must inform the data subject of the purposes of the processing, the categories of data collected, and the recipients of the data. The data subject has the right to access, rectify, and oppose the processing of their data.",
      source: "Loi 18-07 relative à la protection des données personnelles — Official Journal",
    }
  },
  {
    id: 3,
    title: "Protecting brand name",
    description: "Registering a trademark with INAPI to secure your startup name and logo. Learn what is protectable and how long exclusivity lasts.",
    category: "Intellectual property",
    readTime: "1 juin 2022",
    tag: "IP",
    article: {
      title: "Protecting Brand Name",
      code: "Loi sur les Marques · Art. 15",
      officialText: "A trademark registration grants its owner an exclusive right to use the mark for a period of 10 years, renewable indefinitely. The application must be filed with INAPI and includes a representation of the mark, a list of goods and services, and the payment of the prescribed fees.",
      source: "Loi relative à la protection des marques — INAPI",
    }
  },
];

export default function RightsPage() {
  // État pour stocker le blueprint sélectionné
  const [selectedBlueprint, setSelectedBlueprint] = useState<typeof blueprints[0] | null>(null);

  // Fonction pour gérer le clic sur une carte
  const handleCardClick = (blueprint: typeof blueprints[0]) => {
    setSelectedBlueprint(blueprint);
  };

  // Fonction pour fermer le panneau de droite
  const handleClose = () => {
    setSelectedBlueprint(null);
  };

  return (
    <div className="flex gap-6">
      {/* Colonne de gauche - Liste des blueprints */}
      <div className={`${selectedBlueprint ? 'w-1/2' : 'w-full'} transition-all duration-300 overflow-y-auto`}>
        <div className="space-y-6 pr-2">
          {/* Section Your Rights avec Badge, Titre et Sous-titre */}
          <section>
            <div className="mb-6">
              {/* Badge */}
              <div className="mb-3">
                <span className="inline-flex items-center rounded-full bg-[#0A5C36]/10 px-3 py-1 text-sm font-medium text-[#0A5C36]">
                  Know Your Rights
                </span>
              </div>
              
              {/* Titre */}
              <h1 className="text-3xl font-bold text-[#1D283A] mb-2">
                The Founder's Shield
              </h1>
              
              {/* Sous-titre */}
              <p className="text-[#64748B] text-lg">
                Democratizing Algerian corporate law in plain language.
              </p>
            </div>
          </section>

          {/* Filtres */}
          <section>
            <div className="mb-6">
              <RoadmapFilter />
            </div>

            {/* Roadmaps en grille 2 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blueprints.map((blueprint) => (
                <div 
                  key={blueprint.id} 
                  onClick={() => handleCardClick(blueprint)}
                  className="cursor-pointer"
                >
                  <BlueprintCard 
                    blueprint={blueprint} 
                    isSelected={selectedBlueprint?.id === blueprint.id}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Colonne de droite - Détail de l'article (s'affiche quand on clique sur une carte) */}
      {selectedBlueprint && (
        <div className="w-1/2 animate-slide-in">
          <ArticleDetail 
            article={selectedBlueprint.article}
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}