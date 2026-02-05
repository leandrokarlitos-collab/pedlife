/**
 * Loader de Medicamentos TSX
 * 
 * Importa medicamentos dos arquivos TSX e os disponibiliza
 * para o categoryLoader através do adaptador.
 */

import type { Medication } from '@/types/medication';
import { convertTsxMedicationsArray } from './tsxAdapter';

// Importar TODAS as categorias TSX com index.ts
import * as antibioticos from '@/medications/antibioticos';
import * as analgesicos from '@/medications/analgesicos';
import * as gastrointestinal from '@/medications/gastrointestinal';
import * as antiHistaminicos from '@/medications/anti-histaminicos';
import * as antifungicos from '@/medications/antifungicos';
import * as antivirais from '@/medications/antivirais';
import * as corticoides from '@/medications/corticoides';
// 🆕 Categorias recém-adicionadas
import * as antiparasitarios from '@/medications/antiparasitarios';
import * as inalatorios from '@/medications/inalatorios';
import * as antitussigenos from '@/medications/antitussigenos';
import * as vitaminas from '@/medications/vitaminas';
import * as antidotos from '@/medications/antidotos';
import * as anticonvulsivantes from '@/medications/anticonvulsivantes';

/**
 * Mapeamento de categorias para seus medicamentos TSX
 * TODAS as 13 categorias TSX disponíveis!
 */
const tsxMedicationsByCategory: Record<string, Medication[]> = {
  'antibioticos': antibioticos.medicamentos ? convertTsxMedicationsArray(antibioticos.medicamentos) : [],
  'analgesicos': analgesicos.medicamentos ? convertTsxMedicationsArray(analgesicos.medicamentos) : [],
  'gastrointestinal': gastrointestinal.medicamentos ? convertTsxMedicationsArray(gastrointestinal.medicamentos) : [],
  'anti-histaminicos': antiHistaminicos.medicamentos ? convertTsxMedicationsArray(antiHistaminicos.medicamentos) : [],
  'antifungicos': antifungicos.medicamentos ? convertTsxMedicationsArray(antifungicos.medicamentos) : [],
  'antivirais': antivirais.medicamentos ? convertTsxMedicationsArray(antivirais.medicamentos) : [],
  'corticoides-ev': corticoides.medicamentos ? convertTsxMedicationsArray(corticoides.medicamentos) : [],
  'antiparasitarios': antiparasitarios.medicamentos ? convertTsxMedicationsArray(antiparasitarios.medicamentos) : [],
  'inalatorios': inalatorios.medicamentos ? convertTsxMedicationsArray(inalatorios.medicamentos) : [],
  'antitussigenos': antitussigenos.medicamentos ? convertTsxMedicationsArray(antitussigenos.medicamentos) : [],
  'vitaminas': vitaminas.medicamentos ? convertTsxMedicationsArray(vitaminas.medicamentos) : [],
  'antidotos': antidotos.medicamentos ? convertTsxMedicationsArray(antidotos.medicamentos) : [],
  'anticonvulsivantes': anticonvulsivantes.medicamentos ? convertTsxMedicationsArray(anticonvulsivantes.medicamentos) : [],

  // Categorias derivadas para compatibilidade com Slugs do JSON
  'antiemeticos': gastrointestinal.medicamentos
    ? convertTsxMedicationsArray(gastrointestinal.medicamentos.filter(m =>
      ['ondansetrona', 'bromoprida', 'metoclopramida', 'domperidona'].some(name => m.data.nome.toLowerCase().includes(name))
    ))
    : [],
  'expectorantes-mucoliticos': antitussigenos.medicamentos
    ? convertTsxMedicationsArray(antitussigenos.medicamentos.filter(m =>
      ['acetilcisteina', 'ambroxol', 'bromexina', 'carbocisteina', 'guaifenesina', 'hedera'].some(name => m.data.nome.toLowerCase().includes(name))
    ))
    : [],
  'xaropes-tosse': antitussigenos.medicamentos
    ? convertTsxMedicationsArray(antitussigenos.medicamentos)
    : [],
};

/**
 * Carrega medicamentos TSX para uma categoria específica
 * Retorna array vazio se não houver TSX para a categoria
 */
export function loadTsxMedications(categorySlug: string): Medication[] {
  return tsxMedicationsByCategory[categorySlug] || [];
}

/**
 * Verifica se uma categoria tem medicamentos TSX disponíveis
 */
export function hasTsxMedications(categorySlug: string): boolean {
  const meds = tsxMedicationsByCategory[categorySlug];
  return meds !== undefined && meds.length > 0;
}

/**
 * Lista todas as categorias que têm TSX disponível
 */
export function getCategoriesWithTsx(): string[] {
  return Object.keys(tsxMedicationsByCategory).filter(
    slug => tsxMedicationsByCategory[slug].length > 0
  );
}

/**
 * Estatísticas de medicamentos TSX
 */
export function getTsxStats() {
  const categories = getCategoriesWithTsx();
  const totalMedications = categories.reduce(
    (sum, cat) => sum + tsxMedicationsByCategory[cat].length,
    0
  );

  return {
    totalCategories: categories.length,
    totalMedications,
    categories: categories.map(cat => ({
      slug: cat,
      count: tsxMedicationsByCategory[cat].length,
    })),
  };
}
