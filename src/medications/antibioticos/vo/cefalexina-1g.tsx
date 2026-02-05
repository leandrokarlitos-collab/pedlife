/**
 * Cefalexina 1 g - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefalexina-1g',
  nome: 'Cefalexina 1 g',
  nomesComerciais: ['Keflex'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Cefalosporina (1ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '30-50 mg/kg/dia 6/6h ou 8/8h',
  parametrosCalculo: {
    doseUsualMgKg: 50,
    intervalo: '6/6h',
    dosesAoDia: 4,
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos' },
  alertas: ['Verificar alergia a cefalosporinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 50;
  const dosePorTomadaMg = doseDiariaMg / 4;
  const numComprimidos = dosePorTomadaMg / 1000;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '6/6 horas',
    alertas: peso < 40 ? ['Considerar suspensão para peso < 40 kg'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
