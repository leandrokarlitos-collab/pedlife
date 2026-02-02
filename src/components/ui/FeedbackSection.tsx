import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ThumbsUp, Send, Star, Bug, Lightbulb, X } from 'lucide-react';
import { Button } from './button';

type FeedbackType = 'suggestion' | 'bug' | 'rating' | null;

export const FeedbackSection = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Aqui você pode integrar com um backend ou serviço de feedback
    console.log({ feedbackType, rating, message });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedbackType(null);
      setRating(0);
      setMessage('');
    }, 3000);
  };

  const resetFeedback = () => {
    setFeedbackType(null);
    setRating(0);
    setMessage('');
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "relative rounded-2xl p-6 text-center",
          "bg-white/40 dark:bg-slate-900/25 backdrop-blur-lg backdrop-saturate-125",
          "border border-green-200/50 dark:border-green-500/20",
          "shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]"
        )}
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <ThumbsUp className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
          Obrigado pelo feedback!
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Sua opinião nos ajuda a melhorar o PedLife.
        </p>
      </div>
    );
  }

  return (
    <>
      {!feedbackType ? (
        // Estado inicial - Apenas os 3 botões flutuantes
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setFeedbackType('rating')}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200",
              "bg-white/70 dark:bg-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-900/30",
              "border border-white/50 dark:border-white/10 hover:border-amber-300/50",
              "shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-xl hover:-translate-y-0.5",
              "backdrop-blur-sm group"
            )}
          >
            <Star className="w-7 h-7 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Avaliar</span>
          </button>

          <button
            onClick={() => setFeedbackType('suggestion')}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200",
              "bg-white/70 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/30",
              "border border-white/50 dark:border-white/10 hover:border-blue-300/50",
              "shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-xl hover:-translate-y-0.5",
              "backdrop-blur-sm group"
            )}
          >
            <Lightbulb className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Sugerir</span>
          </button>

          <button
            onClick={() => setFeedbackType('bug')}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200",
              "bg-white/70 dark:bg-slate-800/50 hover:bg-red-50 dark:hover:bg-red-900/30",
              "border border-white/50 dark:border-white/10 hover:border-red-300/50",
              "shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-xl hover:-translate-y-0.5",
              "backdrop-blur-sm group"
            )}
          >
            <Bug className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Reportar</span>
          </button>
        </div>
      ) : (
        // Formulário de feedback com fundo
        <div
          className={cn(
            "relative rounded-2xl p-5 transition-all duration-300",
            "bg-white/40 dark:bg-slate-900/25 backdrop-blur-lg backdrop-saturate-125",
            "border border-white/30 dark:border-white/8",
            "shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]"
          )}
        >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {feedbackType === 'rating' && <Star className="w-5 h-5 text-amber-500" />}
              {feedbackType === 'suggestion' && <Lightbulb className="w-5 h-5 text-blue-500" />}
              {feedbackType === 'bug' && <Bug className="w-5 h-5 text-red-500" />}
              <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
                {feedbackType === 'rating' && 'Avalie sua experiência'}
                {feedbackType === 'suggestion' && 'Envie uma sugestão'}
                {feedbackType === 'bug' && 'Reportar um problema'}
              </h3>
            </div>
            <button
              onClick={resetFeedback}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {feedbackType === 'rating' && (
            <div className="flex justify-center gap-1 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "w-8 h-8 transition-colors",
                      (hoverRating || rating) >= star
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-300 dark:text-slate-600"
                    )}
                  />
                </button>
              ))}
            </div>
          )}

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              feedbackType === 'rating'
                ? 'Conte-nos mais sobre sua experiência (opcional)'
                : feedbackType === 'suggestion'
                ? 'Descreva sua sugestão...'
                : 'Descreva o problema encontrado...'
            }
            rows={3}
            className={cn(
              "w-full px-4 py-3 rounded-xl resize-none transition-all duration-200",
              "bg-white/60 dark:bg-slate-800/40",
              "border border-white/40 dark:border-white/10",
              "focus:border-premium-violet/40 focus:ring-2 focus:ring-premium-violet/20",
              "placeholder:text-slate-400 text-sm text-slate-700 dark:text-slate-200",
              "outline-none"
            )}
          />

          <Button
            onClick={handleSubmit}
            disabled={(feedbackType === 'rating' && rating === 0) || (feedbackType !== 'rating' && !message.trim())}
            className={cn(
              "w-full py-5 font-semibold",
              "bg-premium-violet hover:bg-premium-violet/90 text-white",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar Feedback
          </Button>
        </div>
        </div>
      )}
    </>
  );
};
