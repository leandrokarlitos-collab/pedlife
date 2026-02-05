/**
 * Dropropizina 30 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'dropropizina-gotas',
  nome: 'Dropropizina 30 mg/mL (Gotas)',
  nomesComerciais: ['Vibral Gotas', 'Notuss Gotas'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas) 30 mg/mL (1 mL = 20 gotas)',
  classe: { nome: 'Antitussígeno não opioide' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-3 anos: 1 mg/kg/dose 6/6h | > 3 anos: 1-2 mg/kg/dose 6/6h (máx 60 mg/dose)',
  doseMinima: '1 mg/kg/dose',
  doseMaxima: '2 mg/kg/dose (máx 60 mg/dose)',
  parametrosCalculo: {
    doseUsualMgKg: 1,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 30,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 1 mg/kg ÷ 30 mg/mL × 20 gotas/mL',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Antitussígeno de ação periférica. Não causa sedação significativa.',
  alertas: ['Contraindicado em < 2 anos', 'Não usar em tosse produtiva'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 1;
  if (doseMg > 60) doseMg = 60;
  const volumeMl = doseMg / 30;
  const gotas = Math.round(volumeMl * 20);
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${gotas} gotas (${volumeMl.toFixed(2)} mL)`,
    unidade: 'gotas',
    intervalo: '6/6h ou 8/8h',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
