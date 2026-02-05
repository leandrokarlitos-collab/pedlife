/**
 * Levodropropizina 30 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'levodropropizina-gotas',
  nome: 'Levodropropizina 30 mg/mL (Gotas)',
  nomesComerciais: ['Antux Gotas'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas) 30 mg/mL (1 mL = 20 gotas)',
  classe: { nome: 'Antitussígeno não opioide' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-12 anos: 1 mg/kg/dose 8/8h (máx 60 mg/dia)',
  doseMinima: '1 mg/kg/dose',
  doseMaxima: '20 mg/dose (máx 60 mg/dia)',
  parametrosCalculo: {
    doseUsualMgKg: 1,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 30,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 1 mg/kg ÷ 30 mg/mL × 20 gotas/mL',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Isômero levógiro da dropropizina, mais potente. Não causa sedação.',
  alertas: ['Contraindicado em < 2 anos', 'Não usar em tosse produtiva'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 1;
  if (doseMg > 20) doseMg = 20;
  const volumeMl = doseMg / 30;
  const gotas = Math.round(volumeMl * 20);
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${gotas} gotas (${volumeMl.toFixed(2)} mL)`,
    unidade: 'gotas',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
