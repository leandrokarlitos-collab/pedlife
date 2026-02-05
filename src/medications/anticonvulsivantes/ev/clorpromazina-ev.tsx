/**
 * Clorpromazina 5 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'clorpromazina-ev',
  nome: 'Cloridrato de Clorpromazina 5 mg/mL (Solução Injetável)',
  nomesComerciais: ['Amplictil', 'Clorpromazina'],
  viaAdministracao: 'IM',
  formaFarmaceutica: 'Ampola 5 mg/mL (5 mL = 25 mg)',
  classe: {
    nome: 'Antipsicótico / Fenotiazínico',
    descricao: 'Neuroléptico com ação sedativa',
  },
  categoria: 'anticonvulsivantes',
  reconstituicao: { necessaria: false },
  diluicao: {
    solucao: 'SF 0,9%',
    observacao: 'Preferir via IM. Se EV: diluir e infundir MUITO LENTAMENTE',
  },
  doseUsualTexto: '0,5-1 mg/kg/dose IM 6/6h ou 8/8h (máx 40 mg/dose)',
  doseMinima: '0,5 mg/kg/dose',
  doseMaxima: '1 mg/kg/dose (máx 40 mg/dose em crianças)',
  parametrosCalculo: {
    doseMinMgKg: 0.5,
    doseMaxMgKg: 1,
    doseUsualMgKg: 0.5,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 5,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,5-1 mg/kg',
  },
  restricaoIdade: {
    idadeMinima: '≥ 6 meses',
    observacao: 'Usar com cautela em crianças',
  },
  observacoes: `Principalmente usado como antiemético e sedativo.
Via IM é preferível (via EV pode causar hipotensão grave).
Risco de reações extrapiramidais.
Fotossensibilidade - proteger da luz.`,
  alertas: [
    'Preferir via IM (EV pode causar hipotensão)',
    'Risco de reações extrapiramidais',
    'Pode causar sonolência intensa',
    'Proteger ampolas da luz',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseMgKg = 0.5;
  let doseMg = peso * doseMgKg;
  if (doseMg > 40) doseMg = 40;
  
  const volumeMl = doseMg / 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '6/6 ou 8/8 horas',
    observacoes: ['Via IM preferível', 'Aplicar profundamente no músculo'],
    alertas: ['Monitorar pressão arterial'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
