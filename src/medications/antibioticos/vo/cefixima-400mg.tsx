/**
 * Cefixima 400 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefixima-400mg',
  nome: 'Cefixima 400 mg',
  nomesComerciais: ['Pananixime'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Cefalosporina (3ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '8-10 mg/kg/dia',
  doseMinima: '8 mg/kg/dia',
  doseMaxima: '12 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 10 ÷ 400 = nº CP/dia',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos', pesoMinimo: '≥ 30 kg' },
  alertas: ['Verificar alergia a cefalosporinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 10;
  const numComprimidos = doseDiariaMg / 400;
  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '24/24 horas',
    alertas: peso < 30 ? ['Peso < 30 kg: preferir suspensão'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
