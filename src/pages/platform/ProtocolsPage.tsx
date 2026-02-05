import React from 'react';
import { Input } from "@/components/ui/input";
import { 
  BookOpenText, 
  Search, 
  Brain, 
  Ambulance, 
  Zap, 
  ShieldAlert,
  Stethoscope,
  Droplets,
  Wind,
  Thermometer
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FeedbackSection } from '@/components/ui/FeedbackSection';

interface ProtocolCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  iconColorClass?: string;
  hasCalculator?: boolean;
  calculatorLink?: string;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({
  title,
  description,
  icon: Icon,
  link,
  iconColorClass = "text-primary",
  hasCalculator = false,
  calculatorLink
}) => (
  <Link
    to={hasCalculator && calculatorLink ? calculatorLink : link}
    className="block h-full"
  >
    <div className="protocol-card group relative h-full min-h-[200px] p-5 rounded-2xl transition-all duration-300 flex flex-col
      bg-white/60 dark:bg-slate-800/80
      hover:bg-white/80 dark:hover:bg-slate-700/90
      shadow-md shadow-black/5 dark:shadow-black/30
      hover:shadow-xl hover:-translate-y-1
      backdrop-blur-sm cursor-pointer
      border border-white/40 dark:border-slate-600/60
      overflow-hidden">

      {/* Borda animada com efeito de desenho */}
      <svg className="border-draw" width="100%" height="100%">
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="15"
          ry="15"
          fill="none"
          stroke="rgb(139, 92, 246)"
          strokeWidth="2"
        />
      </svg>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Ícone e título */}
        <div className="flex items-start gap-3 mb-4">
          <div className={`p-3 rounded-xl transition-all duration-300 flex-shrink-0
            bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-600/90 dark:to-slate-700/70
            group-hover:scale-110 group-hover:shadow-lg
            ${iconColorClass.includes('red') ? 'group-hover:shadow-red-500/30' : ''}
            ${iconColorClass.includes('purple') ? 'group-hover:shadow-purple-500/30' : ''}
            ${iconColorClass.includes('blue') ? 'group-hover:shadow-blue-500/30' : ''}
            ${iconColorClass.includes('orange') ? 'group-hover:shadow-orange-500/30' : ''}
            ${iconColorClass.includes('teal') ? 'group-hover:shadow-teal-500/30' : ''}`}>
            <Icon className={`h-6 w-6 ${iconColorClass}`} />
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100
              group-hover:text-violet-700 dark:group-hover:text-violet-400
              transition-colors duration-300 line-clamp-2 leading-snug">
              {title}
            </h3>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Indicador de ação */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
            {hasCalculator ? 'Calculadora' : 'Protocolo'}
          </span>
          <div className="flex items-center gap-1 text-violet-500 dark:text-violet-400
            opacity-0 group-hover:opacity-100 transition-all duration-300
            translate-x-[-4px] group-hover:translate-x-0">
            <span className="text-xs font-medium">Abrir</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

interface CategorySectionProps {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  protocols: Array<{
    title: string;
    description: string;
    icon: React.ElementType;
    link: string;
    iconColorClass?: string;
    hasCalculator?: boolean;
    calculatorLink?: string;
  }>;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, icon: Icon, iconColor, protocols }) => (
  <section className="mb-10">
    <div className="flex items-center gap-3 mb-5">
      <div className={`p-2 rounded-xl bg-gradient-to-br from-white/70 to-white/30
        dark:from-slate-800/70 dark:to-slate-800/30 shadow-sm`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent ml-2" />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {protocols.map((protocol, index) => (
        <ProtocolCard key={`${title}-protocol-${index}`} {...protocol} />
      ))}
    </div>
  </section>
);

const ProtocolsPage: React.FC = () => {
  // Emergências e Trauma
  const emergencyProtocols = [
    {
      title: "Trauma Cranioencefálico",
      description: "Avaliação e manejo de trauma craniano em crianças.",
      icon: Brain,
      iconColorClass: "text-red-500",
      link: "/platform/protocols/tce",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/tce"
    },
    {
      title: "Politraumatismo",
      description: "Abordagem da criança politraumatizada.",
      icon: Ambulance,
      iconColorClass: "text-red-500",
      link: "/platform/protocols/politraumatismo",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/politraumatismo"
    },
    {
      title: "Parada Cardiorrespiratória",
      description: "Manejo da PCR em pediatria.",
      icon: Ambulance,
      iconColorClass: "text-red-500",
      link: "/platform/protocols/parada-cardiorrespiratoria",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/parada_cardiorrespiratoria"
    },
    {
      title: "Choque Séptico",
      description: "Avaliação e tratamento do choque séptico.",
      icon: Ambulance,
      iconColorClass: "text-red-500",
      link: "/platform/protocols/choque-septico",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/choque_septico"
    }
  ];

  // Doenças Infecciosas
  const infectiousDiseaseProtocols = [
    {
      title: "Celulite",
      description: "Diagnóstico e tratamento de celulite em pediatria.",
      icon: Stethoscope,
      iconColorClass: "text-purple-500",
      link: "/platform/protocols/celulite",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/celulite"
    },
    {
      title: "Erisipela",
      description: "Manejo da erisipela em crianças.",
      icon: Stethoscope,
      iconColorClass: "text-purple-500",
      link: "/platform/protocols/erisipela",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/erisipela"
    },
    {
      title: "Pneumonia",
      description: "Diagnóstico e tratamento da pneumonia em pediatria.",
      icon: Stethoscope,
      iconColorClass: "text-purple-500",
      link: "/platform/protocols/pneumonia",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/pneumonia"
    },
    {
      title: "Doença Diarreica",
      description: "Manejo da doença diarreica aguda na infância.",
      icon: Stethoscope,
      iconColorClass: "text-purple-500",
      link: "/platform/protocols/doenca-diarreica",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/doenca_diarreica"
    }
  ];

  // Condições Respiratórias
  const respiratoryProtocols = [
    {
      title: "Asma",
      description: "Avaliação e tratamento da crise asmática.",
      icon: Wind,
      iconColorClass: "text-blue-500",
      link: "/platform/protocols/asma",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/asma"
    },
    {
      title: "Bronquiolite VSR",
      description: "Manejo da bronquiolite viral pelo VSR.",
      icon: Wind,
      iconColorClass: "text-blue-500",
      link: "/platform/protocols/bronquiolite",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/bronquiolite_vsr"
    },
    {
      title: "SRAG",
      description: "Síndrome Respiratória Aguda Grave em pediatria.",
      icon: Wind,
      iconColorClass: "text-blue-500",
      link: "/platform/protocols/srag",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/srag"
    }
  ];

  // Condições Metabólicas e Endócrinas
  const metabolicProtocols = [
    {
      title: "Cetoacidose Diabética",
      description: "Avaliação e manejo da cetoacidose diabética.",
      icon: Thermometer,
      iconColorClass: "text-orange-500",
      link: "/platform/protocols/cetoacidose",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/cetoacidose_diabetica"
    },
    {
      title: "Desidratação",
      description: "Avaliação e tratamento da desidratação em pediatria.",
      icon: Thermometer,
      iconColorClass: "text-orange-500",
      link: "/platform/protocols/desidratacao",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/desidratacao"
    }
  ];

  // Emergências Neurológicas
  const neurologicalProtocols = [
    {
      title: "Crise Convulsiva",
      description: "Manejo da crise convulsiva e estado de mal epiléptico.",
      icon: Zap,
      iconColorClass: "text-purple-500",
      link: "/platform/protocols/crise-convulsiva",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/crise_convulsiva"
    }
  ];

  // Condições Específicas
  const specificConditionProtocols = [
    {
      title: "Crise Álgica na Anemia Falciforme",
      description: "Manejo da dor na anemia falciforme.",
      icon: Droplets,
      iconColorClass: "text-teal-500",
      link: "/platform/protocols/crise-algica",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/crise_algica_anemia_falciforme"
    },
    {
      title: "Glomerulonefrite",
      description: "Avaliação e tratamento da glomerulonefrite difusa aguda.",
      icon: Droplets,
      iconColorClass: "text-teal-500",
      link: "/platform/protocols/glomerulonefrite",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/glomerulonefrite"
    },
    {
      title: "SIM-P",
      description: "Síndrome Inflamatória Multissistêmica Pediátrica.",
      icon: Droplets,
      iconColorClass: "text-teal-500",
      link: "/platform/protocols/simp",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/sim_p"
    },
    {
      title: "Anafilaxia",
      description: "Manejo da anafilaxia na criança.",
      icon: Droplets,
      iconColorClass: "text-teal-500",
      link: "/platform/protocols/anafilaxia",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/anafilaxia"
    }
  ];

  // Situações Especiais
  const specialSituationsProtocols = [
    {
      title: "Suspeita de Violência Sexual",
      description: "Atendimento a casos suspeitos de violência sexual.",
      icon: ShieldAlert,
      iconColorClass: "text-orange-500",
      link: "/platform/protocols/violencia-sexual",
      hasCalculator: true,
      calculatorLink: "/platform/protocol-calculator/violencia_sexual"
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4 relative">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1" style={{ top: '8%', left: '12%' }} />
        <div className="particle particle-3" style={{ top: '35%', right: '18%' }} />
        <div className="particle particle-2" style={{ bottom: '25%', left: '22%' }} />
        <div className="particle particle-1" style={{ top: '70%', right: '25%' }} />
      </div>

      <div className="relative z-10">
        <header className="mb-14 text-center animate-fade-in">
          <div className="relative inline-block mb-8">
            <div className="icon-glass-bg p-6 rounded-2xl animate-pulse-glow corner-accent">
              <BookOpenText className="h-20 w-20 text-violet-600 dark:text-violet-400 drop-shadow-2xl" />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-indigo-500/20 blur-2xl rounded-full opacity-50 -z-10" />
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold gradient-text-premium mb-5 text-glow-strong tracking-tight">
            Protocolos Clínicos
          </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
          Sistema de apoio à decisão clínica baseado em 
          <span className="gradient-text-accent font-semibold"> protocolos médicos pediátricos</span>.
        </p>
        
          {/* Decorative line with shimmer */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 shimmer-effect" />
            </div>
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-75" />
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 shimmer-effect" />
            </div>
          </div>
        </header>

        <div className="mb-12 max-w-2xl mx-auto animate-slide-in-left">
          <div className="relative glass-card-premium p-2 corner-accent group">
            <div className="absolute inset-0 shimmer-effect opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-xl" />
            <Input
              type="search"
              placeholder="🔍 Buscar protocolo..."
              className="glass-input pl-14 text-lg py-7 border-0 focus:glow-effect-hover relative z-10 font-medium"
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 icon-glass-bg p-2 rounded-lg">
              <Search className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Emergências e Trauma */}
      <CategorySection 
        title="Emergências e Trauma" 
        icon={Ambulance} 
        iconColor="text-red-500" 
        protocols={emergencyProtocols} 
      />
      
      {/* Seção de Doenças Infecciosas */}
      <CategorySection 
        title="Doenças Infecciosas" 
        icon={Stethoscope} 
        iconColor="text-purple-500" 
        protocols={infectiousDiseaseProtocols} 
      />

      {/* Seção de Condições Respiratórias */}
      <CategorySection 
        title="Condições Respiratórias" 
        icon={Wind} 
        iconColor="text-blue-500" 
        protocols={respiratoryProtocols} 
      />

      {/* Seção de Condições Metabólicas e Endócrinas */}
      <CategorySection 
        title="Condições Metabólicas e Endócrinas" 
        icon={Thermometer} 
        iconColor="text-orange-500" 
        protocols={metabolicProtocols} 
      />

      {/* Seção de Emergências Neurológicas */}
      <CategorySection 
        title="Emergências Neurológicas" 
        icon={Zap} 
        iconColor="text-purple-500" 
        protocols={neurologicalProtocols} 
      />

      {/* Seção de Condições Específicas */}
      <CategorySection 
        title="Condições Específicas" 
        icon={Droplets} 
        iconColor="text-teal-500" 
        protocols={specificConditionProtocols} 
      />

      {/* Seção de Situações Especiais */}
      <CategorySection
        title="Situações Especiais"
        icon={ShieldAlert}
        iconColor="text-orange-500"
        protocols={specialSituationsProtocols}
      />

      {/* Seção de Feedback */}
      <div className="mt-12 mb-6">
        <FeedbackSection />
      </div>
    </div>
  );
};

export default ProtocolsPage;
