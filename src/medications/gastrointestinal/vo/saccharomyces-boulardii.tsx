/**
 * Saccharomyces boulardii - Probiótico
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'saccharomyces-boulardii',
  nome: 'Saccharomyces boulardii 100/200/250 mg',
  nomesComerciais: ['Floratil', 'Repoflor'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Cápsula/Pó Oral',
  classe: { nome: 'Probiótico' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '200-250 mg 1-2x/dia',
  doseMinima: '100 mg/dia',
  doseMaxima: '500 mg/dia',
  parametrosCalculo: {
    intervalo: '12/12h ou 24/24h',
    dosesAoDia: 2,
    formulaCalculo: 'Dose fixa por idade',
  },
  restricaoIdade: { idadeMinima: '≥ 3 meses' },
  observacoes: 'Útil em diarreia aguda e prevenção de diarreia por antibióticos.',
  alertas: ['Não tomar com líquidos muito quentes'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMg = 200;
  if (idade && idade < 2) doseMg = 100;
  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: '1 cápsula/sachê',
    unidade: 'cápsula(s)/sachê(s)',
    intervalo: '12/12 ou 24/24 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
