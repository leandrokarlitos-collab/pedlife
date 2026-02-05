/**
 * Clindamicina 75 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'clindamicina-75mg-5ml',
  nome: 'Clindamicina 75 mg/5 mL',
  nomesComerciais: ['Dalacin C'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Lincosamida',
    descricao: 'Antibiótico para anaeróbios e infecções de pele/ossos',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '8-20 mg/kg/dia 8/8h',
  doseMinima: '8 mg/kg/dia',
  doseMaxima: '40 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 8,
    doseMaxMgKg: 20,
    doseUsualMgKg: 10,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 75,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,33 mL (para 10 mg/kg/dose)',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Uso em anaeróbios/pulmão/ossos. Risco de colite pseudomembranosa.',
  alertas: ['Risco de colite pseudomembranosa', 'Interromper se diarreia grave'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = peso * 10;
  const volumeMl = (dosePorTomadaMg / 75) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    alertas: ['Monitorar sinais de colite'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
