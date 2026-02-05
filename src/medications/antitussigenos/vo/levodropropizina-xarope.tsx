/**
 * Levodropropizina 6 mg/mL - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'levodropropizina-xarope',
  nome: 'Levodropropizina 6 mg/mL (Xarope)',
  nomesComerciais: ['Antux Xarope'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 6 mg/mL (30 mg/5 mL)',
  classe: { nome: 'Antitussígeno não opioide' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-12 anos: 1 mg/kg/dose 8/8h | > 12 anos: 60 mg (10 mL) 8/8h',
  doseMinima: '1 mg/kg/dose',
  doseMaxima: '60 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 1,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 6,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 1 mg/kg ÷ 6 mg/mL',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Isômero levógiro da dropropizina. Ação antitussígena periférica.',
  alertas: ['Contraindicado em < 2 anos', 'Não usar em tosse produtiva'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMg = peso * 1;
  if (idade && idade >= 12) doseMg = 60;
  else if (doseMg > 60) doseMg = 60;
  const volumeMl = doseMg / 6;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
