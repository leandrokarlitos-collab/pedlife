/**
 * Clobutinol + Doxilamina - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'clobutinol-doxilamina',
  nome: 'Clobutinol 48 mg/mL + Doxilamina 9 mg/mL (Gotas)',
  nomesComerciais: ['Hytos Plus'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas) - Clobutinol 48 mg/mL + Doxilamina 9 mg/mL',
  classe: { nome: 'Antitussígeno + Anti-histamínico' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-6 anos: 5-10 gotas 8/8h | 6-12 anos: 10-20 gotas 8/8h | > 12 anos: 20-40 gotas 8/8h',
  doseMinima: '5 gotas/dose',
  doseMaxima: '40 gotas/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Combinação de antitussígeno central (clobutinol) + anti-histamínico sedativo.',
  alertas: ['Pode causar sonolência', 'Contraindicado em < 2 anos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let gotas = 10;
  if (idade && idade >= 2 && idade < 6) {
    gotas = 8;
  } else if (idade && idade >= 6 && idade < 12) {
    gotas = 15;
  } else if (idade && idade >= 12) {
    gotas = 30;
  }
  return {
    doseCalculada: `${gotas} gotas`,
    volumeCalculado: `${gotas} gotas`,
    unidade: 'gotas',
    intervalo: '8/8 horas',
    alertas: ['Pode causar sonolência'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
