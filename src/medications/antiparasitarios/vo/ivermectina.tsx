/**
 * Ivermectina 6 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ivermectina-6mg',
  nome: 'Ivermectina 6 mg (Comprimido)',
  nomesComerciais: ['Ivermec', 'Revectina'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Anti-helmíntico / Antiparasitário' },
  categoria: 'antiparasitarios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '150-200 mcg/kg dose única (escabiose/oncocercose)',
  doseMinima: '150 mcg/kg',
  doseMaxima: '200 mcg/kg',
  parametrosCalculo: {
    doseUsualMgKg: 0.2,
    intervalo: 'Dose única',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 0,2 mg = dose total',
  },
  restricaoIdade: { idadeMinima: '≥ 5 anos', pesoMinimo: '≥ 15 kg' },
  observacoes: 'Administrar em jejum com água. Repetir em 7-14 dias se necessário.',
  alertas: ['Contraindicado em < 15 kg', 'Administrar em jejum'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseMg = peso * 0.2;
  const numComprimidos = doseMg / 6;
  return {
    doseCalculada: `${doseMg.toFixed(1)} mg (${(doseMg * 1000 / peso).toFixed(0)} mcg/kg)`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: 'Dose única',
    alertas: peso < 15 ? ['Peso < 15 kg: contraindicado'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
