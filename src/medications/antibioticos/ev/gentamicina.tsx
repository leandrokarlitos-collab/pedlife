/**
 * Gentamicina (20, 40, 80 mg/mL) - Solução Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'gentamicina-ev',
  nome: 'Gentamicina (20/40/80 mg/mL)',
  nomesComerciais: ['Garamicina', 'Gentamicina Genérico'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Solução Injetável',
  classe: {
    nome: 'Aminoglicosídeo',
    descricao: 'Antibiótico para infecções graves por gram-negativos',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  diluicao: {
    solucao: 'SF 0,9%',
    volumeMl: '50-100 mL',
    tempoInfusao: '30-60 min',
  },
  doseUsualTexto: '7 mg/kg/dia em dose única diária ou dividida a cada 8h',
  doseMinima: '5 mg/kg/dia',
  doseMaxima: '240 mg/dia',
  parametrosCalculo: {
    doseMinMgKg: 5,
    doseMaxMgKg: 7,
    doseUsualMgKg: 7,
    doseMaxDiariaMg: 240,
    intervalo: '24/24h ou 8/8h',
    dosesAoDia: 1,
    formulaCalculo: `Peso (kg) × 0,35 mL/dia (para 20 mg/mL)
Peso (kg) × 0,175 mL/dia (para 40 mg/mL e 80 mg/2mL)`,
  },
  observacoes: `Monitorar função renal e níveis séricos (pico e vale).
Ajustar dose conforme idade, função renal e peso.
Evitar uso concomitante com outros nefrotóxicos ou ototóxicos.`,
  alertas: [
    'Nefrotóxico - monitorar creatinina',
    'Ototóxico - monitorar audição',
    'Ajustar em insuficiência renal',
    'Evitar uso com outros aminoglicosídeos',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 7, 240);
  const vol20mg = doseDiariaMg / 20;
  const vol40mg = doseDiariaMg / 40;
  const vol80mg = doseDiariaMg / 40; // 80mg/2mL = 40mg/mL

  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `20mg/mL: ${vol20mg.toFixed(1)} mL | 40mg/mL: ${vol40mg.toFixed(2)} mL`,
    unidade: 'mL',
    intervalo: '24/24 horas (dose única diária)',
    observacoes: ['Diluir em 50-100 mL SF 0,9%', 'Infundir em 30-60 min'],
    alertas: ['Monitorar função renal e níveis séricos'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
