/**
 * Azitromicina di-hidratada 200 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'azitromicina-200mg-5ml',
  nome: 'Azitromicina di-hidratada 200 mg/5 mL',
  nomesComerciais: ['Zitromax', 'Astro', 'Azitromicina Genérico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Macrolídeo',
    descricao: 'Antibiótico macrolídeo de amplo espectro',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água filtrada ou diluente próprio',
    estabilidade: 'Válido por até 5 dias após reconstituição',
  },
  doseUsualTexto: '10 mg/kg/dia, por via oral em dose única diária (24/24h)',
  doseMinima: '10 mg/kg/dia',
  doseMaxima: '2000 mg/dia',
  parametrosCalculo: {
    doseMinMgKg: 10,
    doseMaxMgKg: 10,
    doseUsualMgKg: 10,
    doseMaxDiariaMg: 2000,
    intervalo: '24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 200,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,25 mL = "mL" de 24/24h',
  },
  restricaoIdade: {
    observacao: 'Qualquer idade',
  },
  observacoes: 'Preferencialmente 1h antes ou 2h após refeições. Após reconstituído: Válido por até 5 dias.',
  alertas: ['Pode prolongar intervalo QT', 'Interações com outros medicamentos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 10, 2000);
  const volumeMl = (doseDiariaMg / 200) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  const alertas: string[] = [];
  if (peso * 10 >= 2000) alertas.push('Dose máxima diária atingida');

  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '24/24 horas (dose única diária)',
    observacoes: ['Agitar bem antes de usar', 'Tratamento geralmente por 3-5 dias'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
