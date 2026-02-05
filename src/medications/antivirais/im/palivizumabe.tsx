/**
 * Palivizumabe 50/100 mg - Pó para Solução Injetável IM
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'palivizumabe',
  nome: 'Palivizumabe 50/100 mg',
  nomesComerciais: ['Synagis'],
  viaAdministracao: 'IM',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: {
    nome: 'Anticorpo monoclonal',
    descricao: 'Profilaxia contra VSR em lactentes de alto risco',
  },
  categoria: 'antivirais',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água para Injetáveis',
    volumeMl: 0.6, // 50mg em 0.6mL ou 100mg em 1mL
    concentracaoFinal: '100 mg/mL',
  },
  doseUsualTexto: '15 mg/kg/dose, uma vez por mês',
  doseMinima: '15 mg/kg/dose',
  doseMaxima: '15 mg/kg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 15,
    intervalo: 'Mensal (28-30 dias)',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 0,15 mL por dose',
  },
  observacoes: `Aplicar no músculo ântero-lateral da coxa.
Repetir a cada 28-30 dias durante a estação do VSR (geralmente até 5 doses).
Volumes maiores que 1 mL devem ser divididos em múltiplas aplicações.`,
  alertas: [
    'Aplicar apenas via IM',
    'Dividir em múltiplos locais se > 1 mL',
    'Repetir mensalmente durante estação VSR',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseMg = peso * 15;
  const volumeMl = peso * 0.15;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;

  const alertas: string[] = [];
  const observacoes = [
    'Reconstituir 50mg com 0,6 mL ou 100mg com 1 mL de AD',
    'Aplicar na coxa ântero-lateral',
  ];

  if (volumeMl > 1) {
    alertas.push(`Volume > 1 mL: dividir em ${Math.ceil(volumeMl)} aplicações`);
  }

  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: 'Mensal (1x/mês)',
    observacoes,
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
