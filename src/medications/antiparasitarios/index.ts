/**
 * Categoria: antiparasitarios
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'antiparasitarios',
  nome: 'Antiparasitários',
  descricao: 'Combate a parasitas e verminoses',
  iconeCorClasse: 'text-teal-600',
  bgCorClasse: 'bg-teal-100',
};

import albendazolData from './vo/albendazol';
import ivermectinaData from './vo/ivermectina';
import mebendazolData from './vo/mebendazol';
import nitazoxanidaData from './vo/nitazoxanida';
import pirvinioData from './vo/pirvinio';
import praziquantelData from './vo/praziquantel';
import secnidazolData from './vo/secnidazol';
import tiabendazolData from './vo/tiabendazol';
import tinidazolData from './vo/tinidazol';

export const medicamentos: MedicamentoExport[] = [
  albendazolData,
  ivermectinaData,
  mebendazolData,
  nitazoxanidaData,
  pirvinioData,
  praziquantelData,
  secnidazolData,
  tiabendazolData,
  tinidazolData,
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
