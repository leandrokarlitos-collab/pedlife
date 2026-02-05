import React from 'react';
import { Calculator, FileText, Search, GitBranch } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Calculator,
      iconBg: "from-violet-500 to-violet-600",
      title: "Calculadora de Doses",
      description: "Cálculos precisos baseados em peso e idade"
    },
    {
      icon: FileText,
      iconBg: "from-blue-500 to-blue-600",
      title: "Protocolos Clínicos",
      description: "Diretrizes atualizadas e baseadas em evidências"
    },
    {
      icon: Search,
      iconBg: "from-emerald-500 to-emerald-600",
      title: "Busca Rápida",
      description: "Acesso instantâneo a medicamentos e doenças"
    },
    {
      icon: GitBranch,
      iconBg: "from-pink-500 to-pink-600",
      title: "Fluxogramas",
      description: "Condutas clínicas em formato visual e intuitivo"
    }
  ];

  return (
    <section id="recursos" className="w-full pt-20 pb-16 px-20 max-md:max-w-full max-md:px-5">
      <div className="flex w-full flex-col items-stretch px-px max-md:max-w-full">
        <div className="self-center flex w-[672px] max-w-full flex-col items-stretch text-center pb-3 px-4">
          <h2 className="text-slate-800 dark:text-white text-3xl font-bold leading-tight self-center z-10 max-md:max-w-full">
            Tudo que você precisa em{' '}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent">
              um só lugar
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed mt-6 max-md:max-w-full">
            Desenvolvido por pediatras para pediatras, com as ferramentas essenciais para sua prática clínica
          </p>
        </div>

        <div className="mt-16 pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="gap-6 flex max-md:flex-col max-md:items-stretch">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex w-3/12 max-md:w-full max-md:ml-0 animate-fade-in-up opacity-0"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="relative w-full p-6 rounded-2xl max-md:mt-6 max-md:px-5 bg-white/50 dark:bg-slate-800/60 backdrop-blur-md backdrop-saturate-125 border border-white/40 dark:border-slate-600/40 ring-1 ring-inset ring-white/10 dark:ring-slate-500/15 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)] group hover:shadow-[0_8px_32px_-8px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_8px_32px_-8px_rgba(99,102,241,0.25)] transition-all duration-300 hover:-translate-y-1">
                    {/* Linha de luz superior */}
                    <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.4) 50%, transparent 90%)' }} />

                    {/* Ícone com gradiente */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl text-slate-800 dark:text-white font-semibold mt-5">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-base font-normal mt-3 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
