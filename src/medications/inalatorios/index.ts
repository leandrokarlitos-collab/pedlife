/**
 * Categoria: inalatorios
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'inalatorios',
  nome: 'Inalatórios',
  descricao: 'Medicamentos para uso inalatório e respiratório',
  iconeCorClasse: 'text-sky-600',
  bgCorClasse: 'bg-sky-100',
};

import beclometasonaNasalData from './inalatorio/beclometasona-nasal';
import beclometasonaNebulizacaoData from './inalatorio/beclometasona-nebulizacao';
import beclometasonaSprayData from './inalatorio/beclometasona-spray';
import budesonidaFormoterolData from './inalatorio/budesonida-formoterol';
import fluticasonaSprayData from './inalatorio/fluticasona-spray';
import ipratropioData from './inalatorio/ipratropio';
import salmeterolFluticasonaData from './inalatorio/salmeterol-fluticasona';

export const medicamentos: MedicamentoExport[] = [
  beclometasonaNasalData,
  beclometasonaNebulizacaoData,
  beclometasonaSprayData,
  budesonidaFormoterolData,
  fluticasonaSprayData,
  ipratropioData,
  salmeterolFluticasonaData,
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
