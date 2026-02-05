/**
 * Nimesulida 50 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'nimesulida-gotas',
  nome: 'Nimesulida 50 mg/mL (Gotas)',
  nomesComerciais: ['Nisulid Gotas', 'Nimesulida'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas) 50 mg/mL (1 mL = 20 gotas)',
  classe: { nome: 'Anti-inflamatório não esteroidal (AINE)' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2,5 mg/kg/dose 12/12h (máx 5 mg/kg/dia ou 200 mg/dia)',
  doseMinima: '2,5 mg/kg/dose',
  doseMaxima: '5 mg/kg/dia (máx 100 mg/dose)',
  parametrosCalculo: {
    doseUsualMgKg: 2.5,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 50,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 2,5 mg/kg ÷ 50 mg/mL × 20 gotas/mL',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos (ANVISA)' },
  observacoes: 'ANVISA: contraindicado em < 12 anos. Uso por no máximo 15 dias.',
  alertas: ['Contraindicado em < 12 anos (ANVISA)', 'Risco hepático', 'Máx 15 dias de uso'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMg = peso * 2.5;
  if (doseMg > 100) doseMg = 100;
  const volumeMl = doseMg / 50;
  const gotas = Math.round(volumeMl * 20);
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${gotas} gotas (${volumeMl.toFixed(2)} mL)`,
    unidade: 'gotas',
    intervalo: '12/12 horas',
    alertas: idade && idade < 12 ? ['ATENÇÃO: Contraindicado em < 12 anos pela ANVISA'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
