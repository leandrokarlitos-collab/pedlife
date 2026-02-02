import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, Pill, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { mockMedicationsData } from '@/data/mockMedications';

interface SearchResult {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
}

export const MedicationSearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Atualizar posição do dropdown quando focado
  useEffect(() => {
    if (isFocused && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isFocused, query]);

  // Criar lista de todos os medicamentos
  const allMedications = useMemo(() => {
    const meds: SearchResult[] = [];

    Object.entries(mockMedicationsData).forEach(([categorySlug, categoryData]) => {
      categoryData.medications.forEach(med => {
        meds.push({
          name: med.name,
          slug: med.slug,
          category: categoryData.title,
          categorySlug: categorySlug
        });
      });
    });

    return meds;
  }, []);

  // Filtrar resultados baseado na query
  const results = useMemo(() => {
    if (query.length < 2) return [];

    const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return allMedications
      .filter(med => {
        const normalizedName = med.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return normalizedName.includes(normalizedQuery);
      })
      .slice(0, 8); // Limitar a 8 resultados
  }, [query, allMedications]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [results]);

  // Scroll para o item selecionado
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const container = resultsRef.current.querySelector('[data-results-list]');
      const selectedItem = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);

      if (container && selectedItem) {
        const containerRect = container.getBoundingClientRect();
        const itemRect = selectedItem.getBoundingClientRect();

        // Se o item está abaixo da área visível
        if (itemRect.bottom > containerRect.bottom) {
          selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
        // Se o item está acima da área visível
        else if (itemRect.top < containerRect.top) {
          selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    }
  }, [selectedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsFocused(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(`/platform/calculator/${result.categorySlug}/${result.slug}`);
    setQuery('');
    setIsFocused(false);
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showResults = isFocused && results.length > 0;

  // Componente do dropdown usando Portal
  const DropdownPortal = () => {
    if (!showResults && !(isFocused && query.length >= 2 && results.length === 0)) {
      return null;
    }

    return createPortal(
      <>
        {/* Results Dropdown */}
        {showResults && (
          <div
            ref={resultsRef}
            style={{
              position: 'absolute',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            }}
            className={cn(
              "z-[9999]",
              // Glassmorphism
              "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl backdrop-saturate-150",
              "border border-white/50 dark:border-white/15",
              "ring-1 ring-inset ring-white/20 dark:ring-white/5",
              "rounded-2xl overflow-hidden",
              // Sombra
              "shadow-[0_12px_40px_-8px_rgba(0,0,0,0.2),0_4px_16px_-4px_rgba(99,102,241,0.15)]",
              // Animation
              "animate-fade-in"
            )}
          >
            {/* Results List */}
            <div data-results-list className="py-2 max-h-[320px] overflow-y-auto">
              {results.map((result, index) => (
                <button
                  key={`${result.categorySlug}-${result.slug}`}
                  data-index={index}
                  onClick={() => handleSelect(result)}
                  className={cn(
                    "w-full px-4 py-3 flex items-center gap-3 transition-all duration-150",
                    "hover:bg-premium-violet/10",
                    selectedIndex === index && "bg-premium-violet/10"
                  )}
                >
                  {/* Icon */}
                  <div className={cn(
                    "p-2 rounded-xl transition-all duration-200",
                    "bg-slate-100 dark:bg-slate-800",
                    selectedIndex === index && "bg-premium-violet/20"
                  )}>
                    <Pill className={cn(
                      "w-4 h-4",
                      selectedIndex === index ? "text-premium-violet" : "text-slate-500"
                    )} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-left">
                    <p className={cn(
                      "font-medium text-sm",
                      selectedIndex === index ? "text-premium-violet" : "text-slate-800 dark:text-white"
                    )}>
                      {result.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {result.category}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className={cn(
                    "w-4 h-4 transition-all duration-200",
                    selectedIndex === index
                      ? "text-premium-violet opacity-100 translate-x-0"
                      : "text-slate-300 opacity-0 -translate-x-2"
                  )} />
                </button>
              ))}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono">↑↓</kbd>
                navegar
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono">Enter</kbd>
                selecionar
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono">Esc</kbd>
                fechar
              </p>
            </div>
          </div>
        )}

        {/* No results message */}
        {isFocused && query.length >= 2 && results.length === 0 && (
          <div
            style={{
              position: 'absolute',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            }}
            className={cn(
              "z-[9999]",
              "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl backdrop-saturate-150",
              "border border-white/50 dark:border-white/15",
              "rounded-2xl p-6 text-center",
              "shadow-[0_12px_40px_-8px_rgba(0,0,0,0.2)]"
            )}
          >
            <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Nenhum medicamento encontrado</p>
            <p className="text-slate-400 text-xs mt-1">Tente outro termo de busca</p>
          </div>
        )}
      </>,
      document.body
    );
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input Container */}
      <div
        className={cn(
          "relative flex items-center transition-all duration-300",
          // Glassmorphism
          "bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl backdrop-saturate-150",
          "border border-white/50 dark:border-white/15",
          "ring-1 ring-inset ring-white/20 dark:ring-white/5",
          "rounded-2xl",
          // Sombra
          "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]",
          // Focus state
          isFocused && "ring-2 ring-premium-violet/30 border-premium-violet/30 shadow-[0_8px_30px_-4px_rgba(99,102,241,0.15)]"
        )}
      >
        {/* Search Icon */}
        <div className="pl-4 pr-2">
          <Search className={cn(
            "w-5 h-5 transition-colors duration-200",
            isFocused ? "text-premium-violet" : "text-slate-400"
          )} />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Pesquisar medicamentos..."
          className={cn(
            "flex-1 py-4 pr-4 bg-transparent outline-none",
            "text-slate-800 dark:text-white placeholder:text-slate-400",
            "text-base"
          )}
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={clearSearch}
            className="p-2 mr-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Dropdown renderizado via Portal */}
      <DropdownPortal />
    </div>
  );
};
