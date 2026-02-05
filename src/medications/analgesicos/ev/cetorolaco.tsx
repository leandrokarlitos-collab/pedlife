/**
 * Cetorolaco 30 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cetorolaco-ev',
  nome: 'Cetorolaco 30 mg/mL (Solução Injetável)',
  nomesComerciais: ['Toragesic', 'Toradol'],
  viaAdministracao: 'EV/IM',
  formaFarmaceutica: 'Ampola 30 mg/mL (1 mL)',
  classe: { nome: 'Anti-inflamatório não esteroidal (AINE)' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '10-20 mL',
    tempoInfusao: '15-30 min (EV)',
  },
  doseUsualTexto: '0,5 mg/kg/dose 6/6h (máx 30 mg/dose, 120 mg/dia)',
  doseMinima: '0,5 mg/kg/dose',
  doseMaxima: '1 mg/kg/dia (máx 30 mg/dose)',
  parametrosCalculo: {
    doseMinMgKg: 0.5,
    doseMaxMgKg: 0.5,
    doseUsualMgKg: 0.5,
    doseMaxDiariaMg: 120,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 30,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,5 mg/kg/dose',
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 anos',
    observacao: 'Uso limitado em pediatria',
  },
  observacoes: `Potente analgésico, similar a opioides em eficácia.
Uso máximo de 5 dias.
Contraindicado em sangramento ativo ou risco de sangramento.`,
  alertas: [
    'Risco de sangramento',
    'Máximo 5 dias de uso',
    'Contraindicado em úlcera péptica',
    'Não usar profilaxia pré-operatória',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseMgKg = 0.5;
  let doseMg = peso * doseMgKg;
  if (doseMg > 30) doseMg = 30;
  
  const volumeMl = doseMg / 30;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;
  
  const alertas: string[] = [];
  if (doseMg >= 30) alertas.push('Dose máxima por tomada: 30 mg');

  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    observacoes: ['Diluir em 10-20 mL SF 0,9%', 'Infundir em 15-30 min', 'Máximo 5 dias'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
