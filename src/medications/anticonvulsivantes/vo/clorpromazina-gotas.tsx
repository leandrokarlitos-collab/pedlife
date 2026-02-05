/**
 * Clorpromazina 40 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'clorpromazina-gotas',
  nome: 'Cloridrato de Clorpromazina 40 mg/mL (Gotas)',
  nomesComerciais: ['Amplictil Gotas', 'Clorpromazina Gotas'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral 40 mg/mL (1 mL = 20 gotas)',
  classe: {
    nome: 'Antipsicótico / Fenotiazínico',
    descricao: 'Neuroléptico com ação sedativa e antiemética',
  },
  categoria: 'anticonvulsivantes',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '0,5-1 mg/kg/dose VO 6/6h ou 8/8h (máx 40 mg/dose)',
  doseMinima: '0,5 mg/kg/dose',
  doseMaxima: '2 mg/kg/dia (máx 40 mg/dose)',
  parametrosCalculo: {
    doseMinMgKg: 0.5,
    doseMaxMgKg: 1,
    doseUsualMgKg: 0.5,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 40,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,5-1 mg/kg ÷ 40 mg/mL × 20 gotas/mL',
  },
  restricaoIdade: {
    idadeMinima: '≥ 6 meses',
    observacao: 'Usar com cautela em crianças',
  },
  observacoes: `Usado como antiemético, sedativo e em alguns transtornos psiquiátricos.
Pode causar sonolência intensa.
Risco de reações extrapiramidais (distonias).
Administrar após as refeições.`,
  alertas: [
    'Risco de reações extrapiramidais',
    'Sonolência intensa',
    'Pode causar hipotensão postural',
    'Fotossensibilidade',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseMgKg = 0.5;
  let doseMg = peso * doseMgKg;
  if (doseMg > 40) doseMg = 40;
  
  const volumeMl = doseMg / 40;
  const gotas = Math.round(volumeMl * 20);

  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${gotas} gotas (${volumeMl.toFixed(2)} mL)`,
    unidade: 'gotas',
    intervalo: '6/6 ou 8/8 horas',
    observacoes: ['Administrar após refeições', '1 gota = 2 mg'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
