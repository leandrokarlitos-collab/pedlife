/**
 * Codeína 30 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'codeina-ev',
  nome: 'Fosfato de Codeína 30 mg/mL (Solução Injetável)',
  nomesComerciais: ['Codein', 'Codeína Injetável'],
  viaAdministracao: 'IM/SC',
  formaFarmaceutica: 'Ampola 30 mg/mL (1 mL)',
  classe: {
    nome: 'Opioide fraco',
    descricao: 'Analgésico opioide',
  },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '0,5-1 mg/kg/dose IM/SC 4/4h (máx 60 mg/dose)',
  doseMinima: '0,5 mg/kg/dose',
  doseMaxima: '1,5 mg/kg/dose (máx 60 mg/dose)',
  parametrosCalculo: {
    doseMinMgKg: 0.5,
    doseMaxMgKg: 1,
    doseUsualMgKg: 0.5,
    intervalo: '4/4h',
    dosesAoDia: 6,
    concentracaoNumeradorMg: 30,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,5-1 mg/kg',
  },
  restricaoIdade: {
    idadeMinima: '≥ 12 anos (FDA)',
    observacao: 'FDA contraindicou em < 12 anos',
  },
  observacoes: `FDA e EMA contraindicam em < 12 anos devido a risco de depressão respiratória.
Via IM ou SC (evitar via EV pelo risco de histamina).
Uso pouco comum em pediatria.
Controlado - Portaria 344 (receita B1).`,
  alertas: [
    'CONTRAINDICADO em < 12 anos (FDA/EMA)',
    'Evitar via EV (risco de liberação de histamina)',
    'Risco de depressão respiratória',
    'Constipação frequente',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseMgKg = 0.5;
  let doseMg = peso * doseMgKg;
  if (doseMg > 60) doseMg = 60;
  
  const volumeMl = doseMg / 30;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;
  
  const alertas: string[] = [];
  if (idade && idade < 12) alertas.push('ATENÇÃO: FDA/EMA contraindicam em < 12 anos');

  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '4/4 horas',
    observacoes: ['Via IM ou SC', 'Evitar via EV'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
