/**
 * Omeprazol 4 mg/mL - Xarope (manipulado)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'omeprazol-4mg-ml',
  nome: 'Omeprazol 4 mg/mL (Xarope)',
  nomesComerciais: ['Losec MUPS (manipulado)'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope',
  classe: {
    nome: 'Inibidor de Bomba de Prótons',
    descricao: 'Reduz secreção ácida gástrica',
  },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '0,5 a 1 mg/kg/dia, 1 vez ao dia (24/24h)',
  doseMinima: '0,5 mg/kg/dia',
  doseMaxima: '3 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 0.5,
    doseMaxMgKg: 1,
    doseUsualMgKg: 1,
    intervalo: '24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 4,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,25 mL por dia (para dose de 1 mg/kg)',
  },
  observacoes: `Administrar em jejum.
Geralmente manipulado como solução oral a 2-4 mg/mL.
Estável por até 14 dias sob refrigeração (2-8°C).`,
  alertas: ['Administrar em jejum', 'Manter refrigerado'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 1;
  const volumeMl = doseDiariaMg / 4;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '24/24 horas (dose única em jejum)',
    observacoes: ['Administrar em jejum', 'Concentração: 4 mg/mL'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
