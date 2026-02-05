/**
 * Categoria: antifungicos
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'antifungicos',
  nome: 'Antifúngicos',
  descricao: 'Medicamentos para tratamento de infecções fúngicas',
  iconeCorClasse: 'text-lime-600',
  bgCorClasse: 'bg-lime-100',
};

import fluconazolSuspensaoData from './vo/fluconazol-suspensao';
import fluconazolVoData from './vo/fluconazol-vo';
import itraconazolData from './vo/itraconazol';
import nistatinaSuspensaoData from './vo/nistatina-suspensao';
import anfotericinaBData from './ev/anfotericina-b';
import fluconazolEvData from './ev/fluconazol-ev';
import micafunginaData from './ev/micafungina';

export const medicamentos: MedicamentoExport[] = [
  fluconazolSuspensaoData,
  fluconazolVoData,
  itraconazolData,
  nistatinaSuspensaoData,
  anfotericinaBData,
  fluconazolEvData,
  micafunginaData,
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
