/**
 * Categoria: corticoides
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'corticoides',
  nome: 'Corticoides',
  descricao: 'Anti-inflamatórios potentes para condições agudas',
  iconeCorClasse: 'text-red-500',
  bgCorClasse: 'bg-red-100',
};

import dexametasona2mgMlData from './ev/dexametasona-2mg-ml';
import dexametasona4mgMlData from './ev/dexametasona-4mg-ml';
import hidrocortisona100mgData from './ev/hidrocortisona-100mg';
import hidrocortisona500mgData from './ev/hidrocortisona-500mg';
import metilprednisolona125mgData from './ev/metilprednisolona-125mg';
import metilprednisolona40mgData from './ev/metilprednisolona-40mg';
import sulfatoMagnesio10Data from './ev/sulfato-magnesio-10';
import sulfatoMagnesio50Data from './ev/sulfato-magnesio-50';

export const medicamentos: MedicamentoExport[] = [
  dexametasona2mgMlData,
  dexametasona4mgMlData,
  hidrocortisona100mgData,
  hidrocortisona500mgData,
  metilprednisolona125mgData,
  metilprednisolona40mgData,
  sulfatoMagnesio10Data,
  sulfatoMagnesio50Data,
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
