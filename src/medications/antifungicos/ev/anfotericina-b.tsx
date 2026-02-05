/**
 * Anfotericina B - Desoxicolato / Lipossomal
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'anfotericina-b',
  nome: 'Anfotericina B (Desoxicolato / Lipossomal)',
  nomesComerciais: ['Fungizone (desoxicolato)', 'AmBisome (lipossomal)'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável 50 mg',
  classe: { nome: 'Antifúngico poliênico' },
  categoria: 'antifungicos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água estéril (sem bacteriostático)',
    volumeReconstituicao: '10 mL',
    concentracaoFinal: '5 mg/mL',
  },
  diluicao: {
    diluente: 'SG 5% (NUNCA SF!)',
    concentracaoFinal: '0,1 mg/mL',
    tempoInfusao: '2-6 horas (desoxicolato) / 1-2 horas (lipossomal)',
  },
  doseUsualTexto: 'Desoxicolato: 0,5-1,5 mg/kg/dia | Lipossomal: 3-5 mg/kg/dia',
  doseMinima: '0,5 mg/kg/dia',
  doseMaxima: '1,5 mg/kg/dia (desoxicolato) / 5 mg/kg/dia (lipossomal)',
  parametrosCalculo: {
    doseUsualMgKg: 1,
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 1 mg/kg/dia (desoxicolato)',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: 'NUNCA diluir em SF (precipita). Iniciar com dose-teste de 0,1 mg/kg. Pré-medicação com antipiréticos.',
  alertas: [
    'NUNCA diluir em SF - usar apenas SG 5%',
    'Nefrotóxica - monitorar função renal e K+',
    'Pode causar febre e calafrios durante infusão',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseMgDesoxicolato = peso * 1;
  const doseMgLipossomal = peso * 3;
  return {
    doseCalculada: `Desoxicolato: ${doseMgDesoxicolato.toFixed(1)} mg | Lipossomal: ${doseMgLipossomal.toFixed(1)} mg`,
    volumeCalculado: `Após reconstituição: ${(doseMgDesoxicolato / 5).toFixed(1)} mL (desoxi) | ${(doseMgLipossomal / 5).toFixed(1)} mL (lipo)`,
    unidade: 'mg',
    intervalo: '24/24 horas',
    alertas: ['Diluir apenas em SG 5%', 'Monitorar função renal e potássio'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
