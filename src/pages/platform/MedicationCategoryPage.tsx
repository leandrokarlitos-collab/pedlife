
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockMedicationsData } from '@/data/mockMedications';
import MedicationListItem from '@/components/platform/MedicationListItem';
import MedicationGroupItem from '@/components/platform/MedicationGroupItem';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pill, BookOpen, CalendarDays, Search, ArrowUpAZ, ArrowDownAZ, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { slugify } from '@/lib/utils'; // Importar slugify

type SortOrder = 'none' | 'asc' | 'desc';

const MedicationCategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [showGrouped, setShowGrouped] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('none');
  const [selectedRoute, setSelectedRoute] = React.useState<string>('all');

  const categoryData = categorySlug ? mockMedicationsData[categorySlug] : undefined;

  // Extrair vias de administração únicas dos medicamentos
  const availableRoutes = React.useMemo(() => {
    if (!categoryData) return [];

    const routes = new Set<string>();
    categoryData.medications.forEach(med => {
      if (med.application) {
        // Separar vias combinadas como "EV / IM" em vias individuais
        const parts = med.application.split(/\s*[\/,]\s*/);
        parts.forEach(part => {
          const trimmed = part.trim().toUpperCase();
          if (trimmed) routes.add(trimmed);
        });
      }
    });

    return Array.from(routes).sort();
  }, [categoryData]);

  // Função para verificar se um medicamento corresponde à via selecionada
  const matchesRoute = (medication: { application?: string }) => {
    if (selectedRoute === 'all') return true;
    if (!medication.application) return false;

    const medRoutes = medication.application.toUpperCase().split(/\s*[\/,]\s*/);
    return medRoutes.some(route => route.trim() === selectedRoute);
  };

  // Função para alternar ordenação
  const toggleSortOrder = () => {
    setSortOrder(current => {
      if (current === 'none' || current === 'desc') return 'asc';
      return 'desc';
    });
  };

  // Função para ordenar medicamentos
  const sortMedications = <T extends { name: string }>(medications: T[]): T[] => {
    if (sortOrder === 'none') return medications;

    return [...medications].sort((a, b) => {
      const nameA = a.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const nameB = b.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  };

  if (!categoryData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-fade-in">
        <div className="glass-card-premium p-12 rounded-3xl text-center corner-accent max-w-md">
          <div className="icon-glass-bg p-6 rounded-2xl mb-6 inline-block animate-pulse-glow">
            <Pill className="h-20 w-20 text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3 gradient-text-premium">Categoria não encontrada</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">A categoria de medicamento que você está procurando não foi encontrada.</p>
          <Button asChild variant="gradient" className="ripple-effect">
            <Link to="/platform/calculator">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Calculadora
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const CategoryIcon = categoryData.icon || Pill;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 min-h-[calc(100vh-10rem)]">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/platform/calculator" className="text-muted-foreground hover:gradient-text-premium transition-all duration-300">
                Calculadora
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500" />
          <BreadcrumbItem>
            <BreadcrumbPage className="gradient-text-premium font-semibold">{categoryData.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="glass-card-premium p-8 rounded-2xl mb-8 relative overflow-hidden group animate-fade-in">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-indigo-500/10 opacity-50" />
        
        <div className="flex items-start gap-5 relative z-10">
          <div className="icon-glass-bg p-5 rounded-2xl group-hover:scale-105 transition-all duration-300">
            <CategoryIcon className={`h-12 w-12 ${categoryData.iconColorClass}`} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold gradient-text-premium mb-4">{categoryData.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="badge-premium bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-300/50 dark:border-violet-700/50 flex items-center gap-2">
                <Pill className="h-4 w-4 text-violet-600 dark:text-violet-400" /> 
                <span className="font-bold gradient-text-premium">{categoryData.medicationsCount}</span> Medicações
              </span>
              <span className="badge-premium bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-300/50 dark:border-blue-700/50 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" /> 
                <span className="font-semibold">Guia médico</span>
              </span>
              <span className="badge-premium bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-300/50 dark:border-indigo-700/50 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> 
                <span className="font-semibold">{categoryData.lastUpdated}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Box */}
      <div className="mb-8 animate-slide-in-left">
        <div className="relative glass-card-premium p-2 max-w-2xl corner-accent group">
          <div className="absolute inset-0 shimmer-effect opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-xl" />
          <Input
            type="search"
            placeholder="🔍 Buscar medicamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass-input pl-14 text-base py-6 border-0 focus:glow-effect-hover relative z-10 font-medium"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 icon-glass-bg p-2 rounded-lg">
            <Search className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
        </div>
      </div>

      <div>
        {categoryData.medications.length > 0 ? (
          <>
            {/* Botões de controle: filtro, ordenação e visualização */}
            <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
              {/* Filtros por via de administração */}
              {!showGrouped && availableRoutes.length > 1 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Filter className="h-3.5 w-3.5" />
                    <span className="font-medium">Via:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSelectedRoute('all')}
                      className={`
                        px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200
                        ${selectedRoute === 'all'
                          ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50'
                          : 'bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-800/80'
                        }
                      `}
                    >
                      Todas
                    </button>
                    {availableRoutes.map(route => (
                      <button
                        key={route}
                        onClick={() => setSelectedRoute(route)}
                        className={`
                          px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200
                          ${selectedRoute === route
                            ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50'
                            : 'bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-800/80'
                          }
                        `}
                      >
                        {route}
                      </button>
                    ))}
                    {selectedRoute !== 'all' && (
                      <button
                        onClick={() => setSelectedRoute('all')}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                        title="Limpar filtro"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Espaçador quando não há filtro */}
              {(showGrouped || availableRoutes.length <= 1) && <div />}

              {/* Botões de ordenação e visualização */}
              <div className="flex items-center gap-2">
                {/* Botão de ordenação alfabética */}
                {!showGrouped && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSortOrder}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200
                      ${sortOrder !== 'none'
                        ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50'
                        : 'bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-800/80'
                      }
                    `}
                    title={sortOrder === 'asc' ? 'Ordenar Z-A' : sortOrder === 'desc' ? 'Remover ordenação' : 'Ordenar A-Z'}
                  >
                    {sortOrder === 'asc' ? (
                      <ArrowUpAZ className="h-4 w-4" />
                    ) : sortOrder === 'desc' ? (
                      <ArrowDownAZ className="h-4 w-4" />
                    ) : (
                      <ArrowUpAZ className="h-4 w-4 opacity-60" />
                    )}
                    <span className="text-xs font-medium">
                      {sortOrder === 'asc' ? 'A-Z' : sortOrder === 'desc' ? 'Z-A' : 'Ordenar'}
                    </span>
                  </Button>
                )}

                {/* Botão para alternar entre visualização agrupada e lista plana */}
                {categoryData.medicationGroups && categoryData.medicationGroups.length > 0 && (
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => setShowGrouped(!showGrouped)}
                    className="ripple-effect"
                  >
                    {showGrouped ? "📋 Ver como Lista" : "📦 Ver como Grupos"}
                  </Button>
                )}
              </div>
            </div>

            {/* Visualização agrupada */}
            {showGrouped && categoryData.medicationGroups && categoryData.medicationGroups.length > 0 && (
              <div className="space-y-4">
                {/* Grupos de medicamentos */}
                {categoryData.medicationGroups.map((group) => (
                  <MedicationGroupItem 
                    key={group.baseSlug} 
                    group={group} 
                    categorySlug={categorySlug || ''} 
                  />
                ))}
                
                {/* Medicamentos que não estão em nenhum grupo */}
                {categoryData.medications
                  .filter(med => {
                    // Verificar se o medicamento não está em nenhum grupo
                    return !categoryData.medicationGroups?.some(group => 
                      group.variants.some(variant => variant.slug === med.slug)
                    );
                  })
                  .map((med) => {
                    const medSlug = med.slug || slugify(med.name);
                    return (
                      <Link 
                        key={medSlug} 
                        to={`/platform/calculator/${categorySlug}/${medSlug}`} 
                        className="block mb-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                      >
                        <MedicationListItem medication={med} />
                      </Link>
                    );
                  })
                }
              </div>
            )}

            {/* Visualização em lista plana */}
            {!showGrouped && (
              <div className="rounded-2xl p-4 space-y-2 bg-white/40 dark:bg-slate-900/30 backdrop-blur-xl border border-white/40 dark:border-white/10">
                {sortMedications(categoryData.medications
                  .filter(med => {
                    // Filtro por via de administração
                    if (!matchesRoute(med)) return false;

                    // Filtro por termo de busca
                    if (!searchTerm) return true;
                    const search = searchTerm.toLowerCase();
                    return (
                      med.name.toLowerCase().includes(search) ||
                      med.form?.toLowerCase().includes(search) ||
                      med.description?.toLowerCase().includes(search)
                    );
                  }))
                  .map((med) => {
                    const medSlug = med.slug || slugify(med.name);
                    return (
                      <Link
                        key={medSlug}
                        to={`/platform/calculator/${categorySlug}/${medSlug}`}
                        className="block hover:bg-gradient-to-r hover:from-violet-500/5 hover:to-blue-500/5 rounded-xl transition-all duration-300"
                      >
                        <MedicationListItem medication={med} />
                      </Link>
                    );
                  })}
                {categoryData.medications.filter(med => {
                  if (!matchesRoute(med)) return false;
                  if (!searchTerm) return true;
                  const search = searchTerm.toLowerCase();
                  return (
                    med.name.toLowerCase().includes(search) ||
                    med.form?.toLowerCase().includes(search) ||
                    med.description?.toLowerCase().includes(search)
                  );
                }).length === 0 && (
                  <div className="glass-card p-12 rounded-2xl text-center">
                    <p className="text-muted-foreground text-lg">
                      Nenhum medicamento encontrado
                      {searchTerm && <> para "<span className="gradient-text-premium font-semibold">{searchTerm}</span>"</>}
                      {selectedRoute !== 'all' && <> com via <span className="gradient-text-premium font-semibold">{selectedRoute}</span></>}
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <Card className="dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
            <CardContent className="p-10 text-center">
              <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum medicamento cadastrado para esta categoria ainda.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link to="/platform/calculator">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Categorias
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MedicationCategoryPage;
