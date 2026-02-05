/**
 * Pelargonium sidoides 307 mg/mL - Xarope (Kaloba)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'pelargonium-xarope',
  nome: 'Pelargonium sidoides 307 mg/mL (Kaloba Xarope)',
  nomesComerciais: ['Kaloba Xarope'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 307 mg/mL de extrato de raiz de Pelargonium',
  classe: { nome: 'Fitoterápico / Imunomodulador' },
  categoria: 'vitaminas',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '1-5 anos: 2,5 mL 8/8h | 6-12 anos: 5 mL 8/8h | > 12 anos: 7,5 mL 8/8h',
  doseMinima: '2,5 mL 8/8h',
  doseMaxima: '7,5 mL 8/8h',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Fitoterápico para infecções respiratórias agudas. Usar por 5-7 dias.',
  alertas: ['Fitoterápico', 'Usar por 5-7 dias'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let volumeMl = 5;
  if (idade && idade >= 1 && idade < 6) {
    volumeMl = 2.5;
  } else if (idade && idade >= 6 && idade < 12) {
    volumeMl = 5;
  } else if (idade && idade >= 12) {
    volumeMl = 7.5;
  }
  return {
    doseCalculada: `${volumeMl} mL`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
