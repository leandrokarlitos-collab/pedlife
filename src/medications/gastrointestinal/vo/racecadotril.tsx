/**
 * Racecadotril - Antidiarreico
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'racecadotril',
  nome: 'Racecadotril 10/30 mg',
  nomesComerciais: ['Tiorfan'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Granulado Oral',
  classe: { nome: 'Antidiarreico (inibidor da encefalinase)' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '1,5 mg/kg/dose 8/8h',
  doseMinima: '1,5 mg/kg/dose',
  doseMaxima: '100 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 1.5,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Peso (kg) × 1,5 mg 8/8h',
  },
  restricaoIdade: { idadeMinima: '≥ 3 meses' },
  observacoes: 'Dissolver em água ou alimento. Usar associado a SRO.',
  alertas: ['Não substitui a reidratação oral'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 1.5;
  if (doseMg > 100) doseMg = 100;
  let apresentacao = '10 mg';
  let qtd = Math.round(doseMg / 10);
  if (doseMg >= 30) {
    apresentacao = '30 mg';
    qtd = Math.round(doseMg / 30);
  }
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${qtd} sachê(s) de ${apresentacao}`,
    unidade: 'sachê(s)',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
