
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center px-6 py-20 max-md:px-5">
      <div className="w-full max-w-4xl px-4">
        {/* Glass Card Premium com Gradiente */}
        <div className="relative overflow-hidden p-12 rounded-3xl max-md:p-8 bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl backdrop-saturate-200 border border-white/60 dark:border-white/15 ring-1 ring-inset ring-white/30 dark:ring-white/10 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12),0_4px_20px_-4px_rgba(99,102,241,0.1)] group hover:shadow-[0_20px_60px_-12px_rgba(99,102,241,0.25)] transition-all duration-500">

          {/* Gradiente de fundo sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-indigo-500/5 dark:from-violet-500/10 dark:via-blue-500/10 dark:to-indigo-500/10 pointer-events-none" />

          {/* Linha de luz superior */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl pointer-events-none bg-gradient-to-r from-transparent via-white/60 dark:via-white/30 to-transparent" />

          {/* Conteúdo */}
          <div className="relative flex flex-col items-center text-center space-y-6">
            {/* Título */}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white px-4">
              Comece a usar{' '}
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent">
                gratuitamente
              </span>{' '}
              hoje
            </h2>

            {/* Descrição */}
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Junte-se a milhares de profissionais que já confiam no PedLife para suas decisões clínicas
            </p>

            {/* Botão CTA */}
            <Button
              asChild
              size="lg"
              className="relative rounded-full px-8 mt-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-lg shadow-violet-500/25 overflow-hidden group/btn transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
            >
              <Link to="/auth">
                <span className="relative z-10">Criar conta gratuita</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
