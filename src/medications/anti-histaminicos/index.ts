/**
 * Categoria: anti-histaminicos
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'anti-histaminicos',
  nome: 'Anti-Histamínicos',
  descricao: 'Tratamento de alergias e reações alérgicas',
  iconeCorClasse: 'text-orange-500',
  bgCorClasse: 'bg-orange-100',
};

import cetirizina10mgData from './vo/cetirizina-10mg';
import cetirizina1mgMlData from './vo/cetirizina-1mg-ml';
import desloratadina05mgMlData from './vo/desloratadina-0-5mg-ml';
import desloratadina5mgData from './vo/desloratadina-5mg';
import dexclorfeniramina04mgMlData from './vo/dexclorfeniramina-0-4mg-ml';
import dexclorfeniramina2mgData from './vo/dexclorfeniramina-2mg';
import dimenidrinatoGotasData from './vo/dimenidrinato-gotas';
import fexofenadina6mgMlData from './vo/fexofenadina-6mg-ml';
import fexofenadinaComprimidoData from './vo/fexofenadina-comprimido';
import hidroxizina25mgData from './vo/hidroxizina-25mg';
import hidroxizina2mgMlData from './vo/hidroxizina-2mg-ml';
import loratadina10mgData from './vo/loratadina-10mg';
import loratadina1mgMlData from './vo/loratadina-1mg-ml';
import difenidramina50mgMlData from './ev/difenidramina-50mg-ml';
import dimenidrinato3mgMlDlData from './ev/dimenidrinato-3mg-ml-dl';
import prometazina25mgMlData from './im/prometazina-25mg-ml';

export const medicamentos: MedicamentoExport[] = [
  cetirizina10mgData,
  cetirizina1mgMlData,
  desloratadina05mgMlData,
  desloratadina5mgData,
  dexclorfeniramina04mgMlData,
  dexclorfeniramina2mgData,
  dimenidrinatoGotasData,
  fexofenadina6mgMlData,
  fexofenadinaComprimidoData,
  hidroxizina25mgData,
  hidroxizina2mgMlData,
  loratadina10mgData,
  loratadina1mgMlData,
  difenidramina50mgMlData,
  dimenidrinato3mgMlDlData,
  prometazina25mgMlData,
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
