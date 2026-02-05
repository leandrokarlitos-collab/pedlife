/**
 * Isoniazida 100 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'isoniazida-100mg',
  nome: 'Isoniazida 100 mg',
  nomesComerciais: ['Isoniazida'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Tuberculostático' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '10-15 mg/kg/dia 24/24h (máx 300 mg/dia)',
  doseMinima: '10 mg/kg/dia',
  doseMaxima: '300 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 10 mg/dia',
  },
  restricaoIdade: { idadeMinima: 'Todas as idades' },
  observacoes: 'Uso no esquema de tratamento da tuberculose. Hepatotóxico. Associar piridoxina (Vit B6).',
  alertas: ['Monitorar função hepática', 'Associar piridoxina para prevenir neuropatia'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 10;
  if (doseDiariaMg > 300) doseDiariaMg = 300;
  const numComprimidos = doseDiariaMg / 100;
  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '24/24 horas',
    alertas: ['Associar piridoxina (Vit B6)'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
