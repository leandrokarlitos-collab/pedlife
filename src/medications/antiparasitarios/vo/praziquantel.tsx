/**
 * Praziquantel 600 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'praziquantel',
  nome: 'Praziquantel 600 mg (Comprimido)',
  nomesComerciais: ['Cisticid', 'Praziquantel'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido 600 mg',
  classe: { nome: 'Anti-helmíntico' },
  categoria: 'antiparasitarios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Esquistossomose: 40-60 mg/kg dose única | Teníase: 5-10 mg/kg dose única',
  doseMinima: '5 mg/kg',
  doseMaxima: '60 mg/kg',
  parametrosCalculo: {
    doseUsualMgKg: 40,
    intervalo: 'Dose única',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 40 mg/kg (esquistossomose)',
  },
  restricaoIdade: { idadeMinima: '≥ 4 anos' },
  observacoes: 'Administrar com alimentos. Comprimidos podem ser divididos ou triturados.',
  alertas: ['Administrar com alimentos', 'Pode causar tontura - evitar dirigir'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseMgEsquisto = peso * 40;
  const doseMgTenia = peso * 10;
  const comprimidosEsquisto = doseMgEsquisto / 600;
  const comprimidosTenia = doseMgTenia / 600;
  return {
    doseCalculada: `Esquistossomose: ${doseMgEsquisto.toFixed(0)} mg | Teníase: ${doseMgTenia.toFixed(0)} mg`,
    volumeCalculado: `Esquisto: ${comprimidosEsquisto.toFixed(1)} comp | Teníase: ${comprimidosTenia.toFixed(1)} comp`,
    unidade: 'comprimido(s)',
    intervalo: 'Dose única',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
