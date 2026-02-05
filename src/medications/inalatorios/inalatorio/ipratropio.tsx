/**
 * Brometo de Ipratrópio 0,25 mg/mL - Solução para Nebulização
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ipratropio',
  nome: 'Brometo de Ipratrópio 0,25 mg/mL (Solução para Nebulização)',
  nomesComerciais: ['Atrovent'],
  viaAdministracao: 'Inalatória',
  formaFarmaceutica: 'Solução para Nebulização 0,25 mg/mL (flaconete 2 mL = 0,5 mg)',
  classe: { nome: 'Anticolinérgico / Broncodilatador' },
  categoria: 'inalatorios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '< 6 anos: 125-250 mcg (0,5-1 mL) | ≥ 6 anos: 250-500 mcg (1-2 mL) | Adultos: 500 mcg',
  doseMinima: '125 mcg/dose',
  doseMaxima: '500 mcg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 0.25,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por idade',
  },
  restricaoIdade: { idadeMinima: 'Neonatos (com cautela)' },
  observacoes: 'Pode ser misturado com salbutamol na mesma nebulização. Usar em crise asmática junto com beta-2.',
  alertas: ['Evitar contato com os olhos', 'Usar em associação com beta-2 agonista na crise'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMcg = 250;
  let volumeMl = 1;
  if (idade && idade < 6) {
    doseMcg = 125;
    volumeMl = 0.5;
  } else if (idade && idade >= 6 && idade < 12) {
    doseMcg = 250;
    volumeMl = 1;
  } else if (idade && idade >= 12) {
    doseMcg = 500;
    volumeMl = 2;
  }
  return {
    doseCalculada: `${doseMcg} mcg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '6/6h ou 8/8h',
    alertas: ['Associar com salbutamol na crise'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
