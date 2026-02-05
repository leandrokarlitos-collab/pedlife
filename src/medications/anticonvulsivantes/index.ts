/**
 * Categoria: anticonvulsivantes
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'anticonvulsivantes',
  nome: 'Anticonvulsivantes',
  descricao: 'Controle e prevenção de crises convulsivas',
  iconeCorClasse: 'text-indigo-600',
  bgCorClasse: 'bg-indigo-100',
};

import clorpromazinaGotasData from './vo/clorpromazina-gotas';
import fenobarbitalGotasData from './vo/fenobarbital-gotas';
import clorpromazinaEvData from './ev/clorpromazina-ev';
import diazepamEvData from './ev/diazepam-ev';
import fenitoinaEvData from './ev/fenitoina-ev';
import fenobarbitalEvData from './ev/fenobarbital-ev';
import midazolamEvData from './ev/midazolam-ev';

export const medicamentos: MedicamentoExport[] = [
  clorpromazinaGotasData,
  fenobarbitalGotasData,
  clorpromazinaEvData,
  diazepamEvData,
  fenitoinaEvData,
  fenobarbitalEvData,
  midazolamEvData,
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
