/**
 * Claritromicina 500 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'claritromicina-500mg',
  nome: 'Claritromicina 500 mg',
  nomesComerciais: ['Klaricid', 'Claritrom'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Macrolídeo' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '500 mg 12/12h (máx 1g/dia)',
  doseMinima: '500 mg/dia',
  doseMaxima: '1000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 15,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Dose fixa: 500 mg 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos', pesoMinimo: '≥ 40 kg' },
  observacoes: 'Pode ser administrado com ou sem alimentos.',
  alertas: ['Interação com várias medicações - verificar'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = 500;
  const numComprimidos = 1;
  return {
    doseCalculada: `${dosePorTomadaMg} mg`,
    volumeCalculado: `${numComprimidos} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '12/12 horas',
    alertas: peso < 40 ? ['Peso < 40 kg: considerar dose menor ou suspensão'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
