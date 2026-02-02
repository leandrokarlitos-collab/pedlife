import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Search, X, Pill, ArrowRight, Droplets, Plus,
  Brain, Ambulance, Zap, ShieldAlert, Stethoscope, Wind, Thermometer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { mockMedicationsData, allCategories } from '@/data/mockMedications';

type SearchResultType = 'medication' | 'category' | 'protocol' | 'insulin';

interface SearchResult {
  name: string;
  slug: string;
  type: SearchResultType;
  category?: string;
  categorySlug?: string;
  description?: string;
  link: string;
  icon?: React.ElementType;
  iconColor?: string;
}

// Lista de protocolos disponíveis com seus ícones
const allProtocols = [
  { title: "Trauma Cranioencefálico", description: "Avaliação e manejo de trauma craniano em crianças.", link: "/platform/protocol-calculator/tce", category: "Emergências e Trauma", icon: Brain, iconColor: "text-red-500" },
  { title: "Politraumatismo", description: "Abordagem da criança politraumatizada.", link: "/platform/protocol-calculator/politraumatismo", category: "Emergências e Trauma", icon: Ambulance, iconColor: "text-red-500" },
  { title: "Parada Cardiorrespiratória", description: "Manejo da PCR em pediatria.", link: "/platform/protocol-calculator/parada_cardiorrespiratoria", category: "Emergências e Trauma", icon: Ambulance, iconColor: "text-red-500" },
  { title: "Choque Séptico", description: "Avaliação e tratamento do choque séptico.", link: "/platform/protocol-calculator/choque_septico", category: "Emergências e Trauma", icon: Ambulance, iconColor: "text-red-500" },
  { title: "Celulite", description: "Diagnóstico e tratamento de celulite em pediatria.", link: "/platform/protocol-calculator/celulite", category: "Doenças Infecciosas", icon: Stethoscope, iconColor: "text-purple-500" },
  { title: "Erisipela", description: "Manejo da erisipela em crianças.", link: "/platform/protocol-calculator/erisipela", category: "Doenças Infecciosas", icon: Stethoscope, iconColor: "text-purple-500" },
  { title: "Pneumonia", description: "Diagnóstico e tratamento da pneumonia em pediatria.", link: "/platform/protocol-calculator/pneumonia", category: "Doenças Infecciosas", icon: Stethoscope, iconColor: "text-purple-500" },
  { title: "Doença Diarreica", description: "Manejo da doença diarreica aguda na infância.", link: "/platform/protocol-calculator/doenca_diarreica", category: "Doenças Infecciosas", icon: Stethoscope, iconColor: "text-purple-500" },
  { title: "Asma", description: "Avaliação e tratamento da crise asmática.", link: "/platform/protocol-calculator/asma", category: "Condições Respiratórias", icon: Wind, iconColor: "text-blue-500" },
  { title: "Bronquiolite VSR", description: "Manejo da bronquiolite viral pelo VSR.", link: "/platform/protocol-calculator/bronquiolite_vsr", category: "Condições Respiratórias", icon: Wind, iconColor: "text-blue-500" },
  { title: "SRAG", description: "Síndrome Respiratória Aguda Grave em pediatria.", link: "/platform/protocol-calculator/srag", category: "Condições Respiratórias", icon: Wind, iconColor: "text-blue-500" },
  { title: "Cetoacidose Diabética", description: "Avaliação e manejo da cetoacidose diabética.", link: "/platform/protocol-calculator/cetoacidose_diabetica", category: "Condições Metabólicas", icon: Thermometer, iconColor: "text-orange-500" },
  { title: "Desidratação", description: "Avaliação e tratamento da desidratação em pediatria.", link: "/platform/protocol-calculator/desidratacao", category: "Condições Metabólicas", icon: Thermometer, iconColor: "text-orange-500" },
  { title: "Crise Convulsiva", description: "Manejo da crise convulsiva e estado de mal epiléptico.", link: "/platform/protocol-calculator/crise_convulsiva", category: "Emergências Neurológicas", icon: Zap, iconColor: "text-purple-500" },
  { title: "Crise Álgica na Anemia Falciforme", description: "Manejo da dor na anemia falciforme.", link: "/platform/protocol-calculator/crise_algica_anemia_falciforme", category: "Condições Específicas", icon: Droplets, iconColor: "text-teal-500" },
  { title: "Glomerulonefrite", description: "Avaliação e tratamento da glomerulonefrite difusa aguda.", link: "/platform/protocol-calculator/glomerulonefrite", category: "Condições Específicas", icon: Droplets, iconColor: "text-teal-500" },
  { title: "SIM-P", description: "Síndrome Inflamatória Multissistêmica Pediátrica.", link: "/platform/protocol-calculator/sim_p", category: "Condições Específicas", icon: Droplets, iconColor: "text-teal-500" },
  { title: "Anafilaxia", description: "Manejo da anafilaxia na criança.", link: "/platform/protocol-calculator/anafilaxia", category: "Condições Específicas", icon: Droplets, iconColor: "text-teal-500" },
  { title: "Suspeita de Violência Sexual", description: "Atendimento a casos suspeitos de violência sexual.", link: "/platform/protocol-calculator/violencia_sexual", category: "Situações Especiais", icon: ShieldAlert, iconColor: "text-orange-500" },
];

export const GlobalSearchBar = () => {
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

  // Criar lista de todos os itens pesquisáveis
  const allSearchableItems = useMemo(() => {
    const items: SearchResult[] = [];

    // Medicamentos
    Object.entries(mockMedicationsData).forEach(([categorySlug, categoryData]) => {
      categoryData.medications.forEach(med => {
        items.push({
          name: med.name,
          slug: med.slug,
          type: 'medication',
          category: categoryData.title,
          categorySlug: categorySlug,
          link: `/platform/calculator/${categorySlug}/${med.slug}`
        });
      });
    });

    // Categorias de medicamentos
    allCategories.forEach(cat => {
      items.push({
        name: cat.title,
        slug: cat.slug,
        type: 'category',
        description: cat.description,
        link: `/platform/calculator/${cat.slug}`
      });
    });

    // Protocolos
    allProtocols.forEach(protocol => {
      items.push({
        name: protocol.title,
        slug: protocol.link.split('/').pop() || '',
        type: 'protocol',
        category: protocol.category,
        description: protocol.description,
        link: protocol.link,
        icon: protocol.icon,
        iconColor: protocol.iconColor
      });
    });

    // Referencial de Insulina
    items.push({
      name: 'Referencial para Insulina',
      slug: 'insulin',
      type: 'insulin',
      description: 'Cálculos automáticos para infusão de insulina',
      link: '/platform/insulin'
    });

    return items;
  }, []);

  // Filtrar resultados baseado na query
  const results = useMemo(() => {
    if (query.length < 2) return [];

    const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return allSearchableItems
      .filter(item => {
        const normalizedName = item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const normalizedDesc = (item.description || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const normalizedCategory = (item.category || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return normalizedName.includes(normalizedQuery) ||
               normalizedDesc.includes(normalizedQuery) ||
               normalizedCategory.includes(normalizedQuery);
      })
      .sort((a, b) => {
        // Priorizar matches no nome
        const aNameMatch = a.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery);
        const bNameMatch = b.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery);
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
        return 0;
      })
      .slice(0, 10); // Limitar a 10 resultados
  }, [query, allSearchableItems]);

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

        if (itemRect.bottom > containerRect.bottom) {
          selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else if (itemRect.top < containerRect.top) {
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
    navigate(result.link);
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

  const getTypeIcon = (result: SearchResult) => {
    // Para protocolos, usar o ícone específico
    if (result.type === 'protocol' && result.icon) {
      const Icon = result.icon;
      return <Icon className="w-4 h-4" />;
    }

    switch (result.type) {
      case 'medication':
        return <Pill className="w-4 h-4" />;
      case 'category':
        return <Plus className="w-4 h-4" />;
      case 'insulin':
        return <Droplets className="w-4 h-4" />;
      default:
        return <Stethoscope className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: SearchResultType) => {
    switch (type) {
      case 'medication':
        return 'Medicamento';
      case 'category':
        return 'Categoria';
      case 'protocol':
        return 'Protocolo';
      case 'insulin':
        return 'Referencial';
    }
  };

  const getTypeColor = (result: SearchResult, isSelected: boolean) => {
    if (isSelected) return 'text-premium-violet';

    // Para protocolos, usar a cor específica
    if (result.type === 'protocol' && result.iconColor) {
      return result.iconColor;
    }

    switch (result.type) {
      case 'medication':
        return 'text-blue-500';
      case 'category':
        return 'text-emerald-500';
      case 'insulin':
        return 'text-amber-500';
      default:
        return 'text-slate-500';
    }
  };

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
              "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl backdrop-saturate-150",
              "border border-white/50 dark:border-white/15",
              "ring-1 ring-inset ring-white/20 dark:ring-white/5",
              "rounded-2xl overflow-hidden",
              "shadow-[0_12px_40px_-8px_rgba(0,0,0,0.2),0_4px_16px_-4px_rgba(99,102,241,0.15)]",
              "animate-fade-in"
            )}
          >
            {/* Results List */}
            <div data-results-list className="py-2 max-h-[400px] overflow-y-auto">
              {results.map((result, index) => (
                <button
                  key={`${result.type}-${result.slug}-${index}`}
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
                    <span className={getTypeColor(result, selectedIndex === index)}>
                      {getTypeIcon(result)}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-left min-w-0">
                    <p className={cn(
                      "font-medium text-sm truncate",
                      selectedIndex === index ? "text-premium-violet" : "text-slate-800 dark:text-white"
                    )}>
                      {result.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {result.category || result.description || getTypeLabel(result.type)}
                    </p>
                  </div>

                  {/* Type Badge */}
                  <span className={cn(
                    "text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full",
                    result.type === 'medication' && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                    result.type === 'category' && "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                    result.type === 'protocol' && "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
                    result.type === 'insulin' && "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                  )}>
                    {getTypeLabel(result.type)}
                  </span>

                  {/* Arrow */}
                  <ArrowRight className={cn(
                    "w-4 h-4 transition-all duration-200 flex-shrink-0",
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
            <p className="text-slate-500 text-sm">Nenhum resultado encontrado</p>
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
          "bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl backdrop-saturate-150",
          "border border-white/50 dark:border-white/15",
          "ring-1 ring-inset ring-white/20 dark:ring-white/5",
          "rounded-2xl",
          "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]",
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
          placeholder="Pesquisar medicamentos, protocolos, categorias..."
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
