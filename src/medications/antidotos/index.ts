/**
 * Categoria: antidotos
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'antidotos',
  nome: 'Antídotos',
  descricao: 'Reversão de intoxicações e envenenamentos',
  iconeCorClasse: 'text-red-600',
  bgCorClasse: 'bg-red-100',
};

import acetilcisteinaAntidotoData from './ev/acetilcisteina-antidoto';
import flumazenilData from './ev/flumazenil';
import glucagonData from './ev/glucagon';
import naloxonaData from './ev/naloxona';

export const medicamentos: MedicamentoExport[] = [
  acetilcisteinaAntidotoData,
  flumazenilData,
  glucagonData,
  naloxonaData,
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
