/**
 * Categoria: antivirais
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'antivirais',
  nome: 'Antivirais',
  descricao: 'Medicações para combate a infecções virais',
  iconeCorClasse: 'text-green-500',
  bgCorClasse: 'bg-green-100',
};

import aciclovir40mgMlData from './vo/aciclovir-40mg-ml';
import aciclovir250mgData from './ev/aciclovir-250mg';
import palivizumabeData from './im/palivizumabe';

export const medicamentos: MedicamentoExport[] = [
  aciclovir40mgMlData,
  aciclovir250mgData,
  palivizumabeData,
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
