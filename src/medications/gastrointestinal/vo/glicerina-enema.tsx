/**
 * Glicerina - Enema / Solução Retal
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'glicerina-enema',
  nome: 'Glicerina (Enema/Solução Retal)',
  nomesComerciais: ['Minilax', 'Glicerina'],
  viaAdministracao: 'Retal',
  formaFarmaceutica: 'Solução Retal / Supositório',
  classe: { nome: 'Laxativo estimulante osmótico' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Lactentes: 1-2 mL/kg. Crianças: supositório infantil. Adolescentes: supositório adulto',
  parametrosCalculo: {
    intervalo: 'SOS (quando necessário)',
    dosesAoDia: 1,
    formulaCalculo: 'Lactentes: 1-2 mL/kg via retal',
  },
  restricaoIdade: {
    idadeMinima: 'Neonatos (usar com cautela)',
  },
  observacoes: `Pode ser usada desde período neonatal.
Efeito rápido (15-60 minutos).
Não usar rotineiramente, apenas para alívio agudo.`,
  alertas: [
    'Não usar cronicamente',
    'Pode causar irritação retal',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let dose = '';
  let observacao = '';
  
  if (idade && idade < 2) {
    const volumeMl = Math.round(peso * 1.5);
    dose = `${volumeMl} mL`;
    observacao = 'Solução retal (glicerina líquida)';
  } else if (idade && idade < 12) {
    dose = '1 supositório infantil';
    observacao = 'Supositório de 1,25 g (infantil)';
  } else {
    dose = '1 supositório adulto';
    observacao = 'Supositório de 2,5 g (adulto)';
  }

  return {
    doseCalculada: dose,
    volumeCalculado: dose,
    unidade: '',
    intervalo: 'SOS (quando necessário)',
    observacoes: [observacao, 'Efeito em 15-60 minutos'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
