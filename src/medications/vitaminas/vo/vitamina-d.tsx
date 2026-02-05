/**
 * Vitamina D (Colecalciferol) - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'vitamina-d',
  nome: 'Vitamina D (Colecalciferol) 2.000 UI/mL (Gotas)',
  nomesComerciais: ['Addera D3', 'DePura', 'Vitamina D3'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas) 2.000 UI/mL (200 UI/gota)',
  classe: { nome: 'Vitamina / Suplemento' },
  categoria: 'vitaminas',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Profilaxia: 400-1000 UI/dia | Tratamento deficiência: 1000-4000 UI/dia conforme nível sérico',
  doseMinima: '400 UI/dia',
  doseMaxima: '4000 UI/dia (tratamento)',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Por indicação clínica',
  },
  restricaoIdade: { idadeMinima: 'RN' },
  observacoes: 'SBP recomenda 400 UI/dia para todos lactentes. Prematuros: 400-800 UI/dia.',
  alertas: ['Monitorar níveis séricos em tratamento prolongado', '1 gota = 200 UI'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseUI = 400;
  let indicacao = 'profilaxia';
  if (idade !== undefined && idade < 1) {
    doseUI = 400;
    indicacao = 'profilaxia lactente';
  } else if (idade && idade >= 1) {
    doseUI = 600;
    indicacao = 'profilaxia pediátrica';
  }
  const gotas = Math.round(doseUI / 200);
  return {
    doseCalculada: `${doseUI} UI (${indicacao})`,
    volumeCalculado: `${gotas} gota(s)`,
    unidade: 'gota(s)',
    intervalo: '1x ao dia',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
