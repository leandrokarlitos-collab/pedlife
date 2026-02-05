import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      avatar: "https://cdn.builder.io/api/v1/image/assets/78ab2fde8e3747148b556fefd3eab937/c6b4b1e717cc80a7d3b865374ed5328262ad7073?placeholderIfAbsent=true",
      name: "Dr. Lucas M.",
      role: "Pediatra, 8 anos de experiência",
      quote: "Uso todos os dias no plantão, se tornou uma ferramenta essencial para minha prática clínica."
    },
    {
      avatar: "https://cdn.builder.io/api/v1/image/assets/78ab2fde8e3747148b556fefd3eab937/8d1e5dec6ff5041fa6ccc65a8681c18df0e69422?placeholderIfAbsent=true",
      name: "Dra. Carla P.",
      role: "Residente R2 em Pediatria",
      quote: "Salvou meu tempo várias vezes durante os plantões. Interface intuitiva e conteúdo confiável."
    },
    {
      avatar: "https://cdn.builder.io/api/v1/image/assets/78ab2fde8e3747148b556fefd3eab937/11d1e71edac164240ee58d45729fa7c54c64ba71?placeholderIfAbsent=true",
      name: "Dra. Ana S.",
      role: "Pediatra UBS",
      quote: "Fundamental para consultas rápidas e cálculos precisos. Recomendo para todos os colegas."
    }
  ];

  return (
    <section id="depoimentos" className="w-full pt-20 pb-16 px-20 max-md:max-w-full max-md:px-5">
      <div className="flex w-full flex-col items-stretch px-px max-md:max-w-full">
        <h2 className="text-slate-800 dark:text-white text-3xl font-bold leading-tight text-center self-center z-10 max-md:max-w-full">
          O que dizem{' '}
          <span className="bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent">
            nossos usuários
          </span>
        </h2>

        <div className="mt-16 pt-[5px] pb-[25px] px-[15px] max-md:max-w-full max-md:mt-10">
          <div className="gap-6 flex max-md:flex-col max-md:items-stretch">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-[33%] flex flex-col max-md:w-full max-md:ml-0">
                <div className="relative w-full h-full flex flex-col mx-auto p-6 rounded-2xl max-md:mt-6 max-md:px-5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md backdrop-saturate-125 border border-white/50 dark:border-slate-600/40 ring-1 ring-inset ring-white/20 dark:ring-slate-500/15 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)] group hover:shadow-[0_8px_32px_-8px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_8px_32px_-8px_rgba(99,102,241,0.25)] transition-all duration-300 hover:-translate-y-1">
                  {/* Linha de luz superior */}
                  <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.6) 50%, transparent 90%)' }} />

                  {/* Ícone de aspas */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-violet-100/80 dark:bg-violet-900/40 flex items-center justify-center">
                    <Quote className="w-4 h-4 text-violet-500 dark:text-violet-400" />
                  </div>

                  {/* Avatar e Info */}
                  <div className="flex items-center gap-4 leading-none pr-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full blur-sm opacity-30" />
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="relative aspect-square object-cover w-14 shrink-0 rounded-full ring-2 ring-white/80 dark:ring-slate-700/80"
                      />
                    </div>
                    <div className="flex flex-col items-stretch my-auto">
                      <div className="text-slate-800 dark:text-white text-base font-semibold">
                        {testimonial.name}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm font-normal mt-1.5">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-relaxed mt-5 italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
