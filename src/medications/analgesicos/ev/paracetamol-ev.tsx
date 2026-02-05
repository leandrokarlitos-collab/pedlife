/**
 * Paracetamol 10 mg/mL - Solução para Infusão
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'paracetamol-10mg-ml-ev',
  nome: 'Paracetamol 10 mg/mL (Solução para Infusão)',
  nomesComerciais: ['Ofirmev', 'Perfalgan'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Solução para Infusão',
  classe: { nome: 'Analgésico / Antitérmico' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  diluicao: {
    tempoInfusao: '15 min',
  },
  doseUsualTexto: '15 mg/kg/dose EV 6/6h (máx 1 g/dose, 4 g/dia)',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '1000 mg/dose ou 4000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 15,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 10,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 1,5 mL/dose',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Infundir em 15 minutos. Hepatotóxico em superdose.',
  alertas: ['Hepatotóxico em superdose', 'Infundir em 15 min'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 15;
  if (doseMg > 1000) doseMg = 1000;
  const volumeMl = doseMg / 10;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(0)} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
