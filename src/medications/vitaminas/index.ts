/**
 * Categoria: vitaminas
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'vitaminas',
  nome: 'Vitaminas e Suplementos',
  descricao: 'Vitaminas e suplementos nutricionais',
  iconeCorClasse: 'text-lime-600',
  bgCorClasse: 'bg-lime-100',
};

import pelargoniumGotasData from './vo/pelargonium-gotas';
import pelargoniumXaropeData from './vo/pelargonium-xarope';
import polivitaminicoData from './vo/polivitaminico';
import timomodulinaData from './vo/timomodulina';
import vitaminaDData from './vo/vitamina-d';

export const medicamentos: MedicamentoExport[] = [
  pelargoniumGotasData,
  pelargoniumXaropeData,
  polivitaminicoData,
  timomodulinaData,
  vitaminaDData,
];

export function getMedicamentoById(id: string): MedicamentoExport | undefined {
  return medicamentos.find((med) => med.data.id === id);
}

export function getMedicamentosByVia(via: string): MedicamentoExport[] {
  return medicamentos.filter((med) => {
    const vias = Array.isArray(med.data.viaAdministracao)
      ? med.data.viaAdministracao
      : [med.data.viaAdministracao];
    return vias.includes(via as any);
  });
}
