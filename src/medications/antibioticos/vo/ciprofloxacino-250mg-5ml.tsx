/**
 * Ciprofloxacino 250 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ciprofloxacino-250mg-5ml',
  nome: 'Ciprofloxacino 250 mg/5 mL',
  nomesComerciais: ['Cipro'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: { nome: 'Fluoroquinolona' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '20-30 mg/kg/dia 12/12h (máx 1,5 g/dia)',
  doseMinima: '20 mg/kg/dia',
  doseMaxima: '1500 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 25,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 250,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,25 mL 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Uso restrito em pediatria. Evitar antiácidos e laticínios.',
  alertas: ['Uso restrito em pediatria (risco articular)', 'Evitar antiácidos 2h antes/depois'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 25;
  if (doseDiariaMg > 1500) doseDiariaMg = 1500;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = (dosePorTomadaMg / 250) * 5;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${Math.round(volumeMl * 10) / 10} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    alertas: ['Fluoroquinolona: uso restrito em pediatria'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
