import React from 'react';
import { ShieldCheck, Zap, BookCheck } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      iconBg: "from-emerald-500 to-emerald-600",
      title: "Reduz erros de prescrição",
      description: "Cálculos automáticos e verificação dupla de doses"
    },
    {
      icon: Zap,
      iconBg: "from-amber-500 to-amber-600",
      title: "Acelera tomadas de decisão",
      description: "Acesso rápido a informações essenciais"
    },
    {
      icon: BookCheck,
      iconBg: "from-blue-500 to-blue-600",
      title: "Fontes confiáveis",
      description: "Conteúdo baseado em diretrizes internacionais"
    }
  ];

  return (
    <section id="beneficios" className="w-full pt-16 pb-20 px-20 max-md:max-w-full max-md:px-5">
      <div className="w-full px-4 max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="gap-12 flex max-md:flex-col max-md:items-stretch">
            {/* Coluna de Texto */}
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="flex flex-col self-stretch items-stretch leading-none w-full my-auto max-md:max-w-full max-md:-mr-0.5 max-md:mt-10">
                <h2 className="text-slate-800 dark:text-white text-3xl font-bold z-10 max-md:max-w-full">
                  Benefícios que fazem{' '}
                  <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    a diferença
                  </span>
                </h2>

                <div className="w-full mt-10 max-md:max-w-full">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-5 flex-wrap ${
                          index > 0 ? 'mt-8' : ''
                        } pr-10 max-md:pr-5 group`}
                      >
                        {/* Ícone com gradiente */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.iconBg} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit">
                          <h3 className="text-slate-800 dark:text-white text-xl font-semibold">
                            {benefit.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-base font-normal mt-3 leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Coluna da Imagem */}
            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="w-full pt-[25px] pb-[75px] px-[50px] max-md:max-w-full max-md:px-5">
                <div className="relative group">
                  {/* Glow effect atrás da imagem */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-blue-500/30 dark:from-violet-500/20 dark:to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 scale-95 group-hover:scale-100" />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/78ab2fde8e3747148b556fefd3eab937/8da3d82377c1d03e3cb594b404a3c4f2043ea1a2?placeholderIfAbsent=true"
                    alt="Benefits illustration"
                    className="relative aspect-square object-contain w-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.02] max-md:max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
