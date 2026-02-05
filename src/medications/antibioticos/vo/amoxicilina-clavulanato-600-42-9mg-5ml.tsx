/**
 * Amoxicilina + Clavulanato 600 + 42,9 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amoxicilina-clavulanato-600-42-9mg-5ml',
  nome: 'Amoxicilina + Clavulanato 600 + 42,9 mg/5 mL',
  nomesComerciais: ['Clavulin ES'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Penicilina + Inibidor de beta-lactamase',
    descricao: 'Antibiótico com espectro ampliado - formulação ES',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água filtrada',
    estabilidade: 'Válido por 10 dias sob refrigeração',
  },
  doseUsualTexto: '90 mg/kg/dia, por via oral a cada 12/12h',
  doseMinima: '90 mg/kg/dia',
  doseMaxima: '4000 mg/dia',
  parametrosCalculo: {
    doseMinMgKg: 90,
    doseMaxMgKg: 90,
    doseUsualMgKg: 90,
    doseMaxDiariaMg: 4000,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 600,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,375 mL = nº mL de 12/12h',
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 meses',
  },
  observacoes: 'Formulação ES para infecções por pneumococos resistentes. Administrar no início das refeições.',
  alertas: ['Para infecções por S. pneumoniae resistente', 'Verificar alergia a penicilinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 90, 4000);
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = (dosePorTomadaMg / 600) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  const alertas: string[] = [];
  if (peso * 90 >= 4000) alertas.push('Dose máxima diária atingida');

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg (de amoxicilina)`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    observacoes: ['Formulação ES - para pneumococos resistentes'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
