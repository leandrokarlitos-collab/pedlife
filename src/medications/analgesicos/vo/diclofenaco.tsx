/**
 * Diclofenaco Resinato - Suspensão/Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'diclofenaco-resinato',
  nome: 'Diclofenaco Resinato (Suspensão/Gotas)',
  nomesComerciais: ['Cataflan Gotas', 'Voltaren Gotas'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Gotas 15 mg/mL (1 mL = 20 gotas)',
  classe: { nome: 'Anti-inflamatório não esteroidal (AINE)' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '0,5-1 mg/kg/dose 8/8h ou 12/12h (máx 3 mg/kg/dia ou 150 mg/dia)',
  doseMinima: '0,5 mg/kg/dose',
  doseMaxima: '3 mg/kg/dia (máx 150 mg/dia)',
  parametrosCalculo: {
    doseMinMgKg: 0.5,
    doseMaxMgKg: 1,
    doseUsualMgKg: 0.75,
    doseMaxDiariaMg: 150,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 15,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,5-1 mg/kg ÷ 15 mg/mL × 20 gotas/mL',
  },
  restricaoIdade: {
    idadeMinima: '≥ 1 ano',
  },
  observacoes: `Administrar com alimentos.
Apresentação resinato tem melhor palatabilidade.
Efeito analgésico e anti-inflamatório.`,
  alertas: [
    'Risco gastrointestinal',
    'Administrar com alimentos',
    'Cautela em asma',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseMgKg = 0.75;
  let doseMg = peso * doseMgKg;
  if (doseMg > 50) doseMg = 50;
  
  const volumeMl = doseMg / 15;
  const gotas = Math.round(volumeMl * 20);
  
  const alertas: string[] = [];
  if (idade && idade < 1) alertas.push('Não recomendado em < 1 ano');

  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${gotas} gotas (${volumeMl.toFixed(1)} mL)`,
    unidade: 'gotas',
    intervalo: '8/8 horas',
    observacoes: ['Administrar com alimentos'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
