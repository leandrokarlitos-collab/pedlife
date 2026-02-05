/**
 * Loader de Medicamentos TSX
 * 
 * Importa medicamentos dos arquivos TSX de forma dinâmica
 * para reduzir o bundle inicial.
 */

import type { Medication } from '@/types/medication';
import { convertTsxMedicationsArray } from './tsxAdapter';

// Lista de slugs que possuem implementação TSX
const availableTsxCategories = [
  'antibioticos',
  'analgesicos',
  'gastrointestinal',
  'anti-histaminicos',
  'antifungicos',
  'antivirais',
  'corticoides-ev',
  'antiparasitarios',
  'inalatorios',
  'antitussigenos',
  'vitaminas',
  'antidotos',
  'anticonvulsivantes'
];

/**
 * Cache para carregar medicamentos apenas uma vez
 */
const tsxCache: Record<string, Medication[]> = {};

/**
 * Carrega medicamentos TSX para uma categoria específica de forma dinâmica
 */
export async function loadTsxMedications(categorySlug: string): Promise<Medication[]> {
  // Se já estiver no cache, retorna
  if (tsxCache[categorySlug]) return tsxCache[categorySlug];

  try {
    let module;

    // Mapeamento dinâmico de imports para o Vite reconhecer
    switch (categorySlug) {
      case 'antibioticos': module = await import('@/medications/antibioticos'); break;
      case 'analgesicos': module = await import('@/medications/analgesicos'); break;
      case 'gastrointestinal': module = await import('@/medications/gastrointestinal'); break;
      case 'anti-histaminicos': module = await import('@/medications/anti-histaminicos'); break;
      case 'antifungicos': module = await import('@/medications/antifungicos'); break;
      case 'antivirais': module = await import('@/medications/antivirais'); break;
      case 'corticoides-ev': module = await import('@/medications/corticoides'); break;
      case 'antiparasitarios': module = await import('@/medications/antiparasitarios'); break;
      case 'inalatorios': module = await import('@/medications/inalatorios'); break;
      case 'antitussigenos': module = await import('@/medications/antitussigenos'); break;
      case 'vitaminas': module = await import('@/medications/vitaminas'); break;
      case 'antidotos': module = await import('@/medications/antidotos'); break;
      case 'anticonvulsivantes': module = await import('@/medications/anticonvulsivantes'); break;

      // Categorias derivadas
      case 'antiemeticos': {
        const gastro = await import('@/medications/gastrointestinal');
        const meds = gastro.medicamentos ? convertTsxMedicationsArray(gastro.medicamentos.filter(m =>
          ['ondansetrona', 'bromoprida', 'metoclopramida', 'domperidona'].some(name => m.data.nome.toLowerCase().includes(name))
        )) : [];
        tsxCache[categorySlug] = meds;
        return meds;
      }
      case 'expectorantes-mucoliticos': {
        const antituss = await import('@/medications/antitussigenos');
        const meds = antituss.medicamentos ? convertTsxMedicationsArray(antituss.medicamentos.filter(m =>
          ['acetilcisteina', 'ambroxol', 'bromexina', 'carbocisteina', 'guaifenesina', 'hedera'].some(name => m.data.nome.toLowerCase().includes(name))
        )) : [];
        tsxCache[categorySlug] = meds;
        return meds;
      }
      case 'xaropes-tosse': {
        const antituss = await import('@/medications/antitussigenos');
        const meds = antituss.medicamentos ? convertTsxMedicationsArray(antituss.medicamentos) : [];
        tsxCache[categorySlug] = meds;
        return meds;
      }
      default: return [];
    }

    if (module && module.medicamentos) {
      const converted = convertTsxMedicationsArray(module.medicamentos);
      tsxCache[categorySlug] = converted;
      return converted;
    }

    return [];
  } catch (error) {
    console.error(`Erro ao carregar medicamentos TSX para ${categorySlug}:`, error);
    return [];
  }
}

/**
 * Verifica se uma categoria tem medicamentos TSX disponíveis (Síncrono para UI)
 */
export function hasTsxMedications(categorySlug: string): boolean {
  return availableTsxCategories.includes(categorySlug) ||
    ['antiemeticos', 'expectorantes-mucoliticos', 'xaropes-tosse'].includes(categorySlug);
}

/**
 * Lista todas as categorias que têm TSX disponível
 */
export function getCategoriesWithTsx(): string[] {
  return [...availableTsxCategories, 'antiemeticos', 'expectorantes-mucoliticos', 'xaropes-tosse'];
}

/**
 * Estatísticas de medicamentos TSX (Agora precisa ser assíncrono para carregar dados reais)
 */
export async function getTsxStats() {
  const categories = getCategoriesWithTsx();
  let totalMedications = 0;
  const results = [];

  for (const slug of categories) {
    const meds = await loadTsxMedications(slug);
    totalMedications += meds.length;
    results.push({ slug, count: meds.length });
  }

  return {
    totalCategories: categories.length,
    totalMedications,
    categories: results,
  };
}
