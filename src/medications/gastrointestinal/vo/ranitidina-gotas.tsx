/**
 * Ranitidina 40 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ranitidina-40mg-ml-gotas',
  nome: 'Cloridrato de Ranitidina 40 mg/mL (Gotas)',
  nomesComerciais: ['Antak Gotas', 'Label'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas)',
  classe: { nome: 'Antagonista H2' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '4-8 mg/kg/dia VO 12/12h (máx 300 mg/dia)',
  doseMinima: '4 mg/kg/dia',
  doseMaxima: '300 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 5,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 40,
    concentracaoDenominadorMl: 1,
    formulaCalculo: '1 gota = 2 mg | Peso (kg) × 1,25 gotas 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: '1 gota = 2 mg. Pode ser dado com ou sem alimentos.',
  alertas: ['1 gota = 2 mg'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 5;
  if (doseDiariaMg > 300) doseDiariaMg = 300;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const gotas = Math.round(dosePorTomadaMg / 2);
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(1)} mg`,
    volumeCalculado: `${gotas} gotas`,
    unidade: 'gotas',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
