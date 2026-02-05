
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="w-full max-w-[1322px] mx-auto px-4 md:px-px">
      <div className="md:pr-[50px] pt-16 md:pt-[50px] pb-16 md:pb-[100px] max-md:max-w-full">
        <div className="gap-12 flex max-md:flex-col max-md:items-center">
          {/* Coluna da Imagem */}
          <div className="w-full md:w-6/12 flex justify-center items-center max-md:px-4">
            <div className="relative group">
              {/* Glow effect atrás da imagem */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-blue-500/30 dark:from-violet-500/20 dark:to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 scale-95 group-hover:scale-100" />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/78ab2fde8e3747148b556fefd3eab937/9d77224975ffcc8cbbf4b754d53fc6b455f157bb?placeholderIfAbsent=true"
                alt="Pedlife Interface"
                className="relative aspect-square object-contain w-full max-w-md md:max-w-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.02] will-change-transform"
              />
            </div>
          </div>

          {/* Coluna de Texto */}
          <div className="w-full md:w-6/12 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <div className="w-full max-md:max-w-full max-md:mt-0">
              {/* Badge premium */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100/80 dark:bg-violet-900/30 backdrop-blur-sm border border-violet-200/50 dark:border-violet-700/50 mb-6">
                <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
                  Plataforma Premium para Pediatras
                </span>
              </div>

              <div className="z-10 flex flex-col items-center md:items-stretch max-md:max-w-full">
                <h1 className="text-slate-800 dark:text-white text-4xl md:text-5xl font-bold leading-tight md:leading-[56px] max-md:max-w-full">
                  Facilitando decisões{' '}
                  <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    clínicas
                  </span>{' '}
                  na pediatria
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg font-normal leading-relaxed mt-6 md:mt-8 max-md:max-w-full">
                  Sua ferramenta completa para cálculos de doses, protocolos e condutas pediátricas
                </p>
              </div>

              {/* Botões */}
              <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-start gap-4 text-base font-normal text-center mt-10 md:mt-12 md:pr-20 pb-0 md:pb-[25px] max-md:w-full">
                <Button
                  asChild
                  size="lg"
                  className="relative rounded-full w-full md:w-auto px-8 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-lg shadow-violet-500/25 overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
                >
                  <Link to="/register">
                    <span className="relative z-10">Acesse Gratuitamente</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full w-full md:w-auto px-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-300/50 dark:border-slate-600/50 text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Link to="#saiba-mais">
                    Saiba Mais
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

