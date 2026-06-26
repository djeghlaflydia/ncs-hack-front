import { RoadmapFilter } from "@/components/dashboard/RoadmapFilter";
import { BlueprintCard } from "@/components/dashboard/BlueprintCard";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Settings, 
  DollarSign,
  ArrowRight 
} from "lucide-react";

const blueprints = [
  {
    id: 1,
    title: "Co-founder equity split",
    description:
      "How founders legally divide ownership shares in an Algerian SARL or SPA. Covers vesting, dilution, and protecting your stake before the cap table grows.",
    category: "Intellectual property",
    readTime: "12 min",
    tag: "Blueprint",
  },
  {
    id: 2,
    title: "User Data Compliance",
    description:
      "Your obligations under Law 18-07 when collecting personal data from users. Covers consent, the ANPDP declaration, and cross-border data transfers.",
    category: "Data privacy",
    readTime: "8 min",
    tag: "Compliance",
  },
  {
    id: 3,
    title: "Protecting brand name",
    description:
      "Registering a trademark with INAPI to secure your startup name and logo. Learn what is protectable and how long exclusivity lasts.",
    category: "Intellectual property",
    readTime: "10 min",
    tag: "IP",
  },
];

const taskItems = [
  { label: "Documents", icon: FileText, progress: 60 },
  { label: "Taxes", icon: DollarSign, progress: 30 },
  { label: "Settings", icon: Settings, progress: 100 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
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

      {/* Filtres et Roadmaps */}
      <section>
        <div className="mb-6">
          <RoadmapFilter />
        </div>

        {/* Roadmaps en grille 2 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprints.map((blueprint) => (
            <BlueprintCard key={blueprint.id} blueprint={blueprint} />
          ))}
        </div>
      </section>

      {/* Task Tracker */}
      <section>
        <h2 className="text-2xl font-bold text-[#1D283A] mb-4">Task tracker</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {taskItems.map((task) => {
            const Icon = task.icon;
            const isComplete = task.progress === 100;
            return (
              <Card 
                key={task.label} 
                className={`border ${isComplete ? 'border-[#0A5C36]/20 bg-[#0A5C36]/5' : 'border-[#E2E8F0]'}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`rounded-lg p-2 ${isComplete ? 'bg-[#0A5C36]/10' : 'bg-[#F8FAFC]'}`}>
                        <Icon className={`h-4 w-4 ${isComplete ? 'text-[#0A5C36]' : 'text-[#64748B]'}`} />
                      </div>
                      <span className="font-medium text-[#1D283A]">{task.label}</span>
                    </div>
                    {isComplete && (
                      <span className="text-xs font-medium text-[#0A5C36]">✓ Complete</span>
                    )}
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-[#F8FAFC]">
                      <div
                        style={{ width: `${task.progress}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full ${
                          isComplete ? 'bg-[#0A5C36]' : 'bg-[#0A5C36]/60'
                        }`}
                      />
                    </div>
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-[#64748B]">{task.progress}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}