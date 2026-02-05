/**
 * Acetilcisteína - Solução para Nebulização
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'acetilcisteina-nebulizacao',
  nome: 'Acetilcisteína 100 mg/mL (Solução para Nebulização)',
  nomesComerciais: ['Fluimucil para Nebulização'],
  viaAdministracao: 'Inalatória',
  formaFarmaceutica: 'Solução para Nebulização 100 mg/mL (ampola 3 mL = 300 mg)',
  classe: { nome: 'Mucolítico' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '< 6 anos: 100-150 mg (1-1,5 mL) 12/12h | ≥ 6 anos: 150-300 mg (1,5-3 mL) 12/12h',
  doseMinima: '100 mg/dose',
  doseMaxima: '300 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 100,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Diluir com SF 0,9% no mesmo volume (1:1). Nebulizar por 10-15 minutos.',
  alertas: ['Diluir com SF 0,9%', 'Pode causar broncoespasmo em asmáticos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMg = 150;
  if (idade && idade < 6) {
    doseMg = 100;
  } else if (idade && idade >= 6) {
    doseMg = 200;
  }
  const volumeMl = doseMg / 100;
  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL + ${volumeMl} mL de SF 0,9%`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    alertas: ['Diluir 1:1 com SF'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
