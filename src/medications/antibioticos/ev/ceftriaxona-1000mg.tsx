/**
 * Ceftriaxona 1000 mg - Pó para Solução Injetável
 *
 * Cefalosporina de 3ª geração para uso endovenoso.
 * Amplo espectro para infecções graves em pediatria.
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ceftriaxona-1000mg',
  nome: 'Ceftriaxona 1000 mg',
  nomesComerciais: ['Rocefin', 'Triaxon', 'Ceftriaxona Genérico'],

  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',

  classe: {
    nome: 'Cefalosporina (3ª geração)',
    descricao: 'Antibiótico beta-lactâmico de amplo espectro para infecções graves',
  },

  categoria: 'antibioticos',

  reconstituicao: {
    necessaria: true,
    diluente: 'Água Destilada',
    volumeMl: 5,
    concentracaoFinal: '200 mg/mL',
    estabilidade: 'Usar imediatamente após reconstituição ou até 24h sob refrigeração',
  },

  diluicao: {
    solucao: 'SF 0,9%',
    volumeMl: '50-100 mL',
    tempoInfusao: '30 min',
  },

  doseUsualTexto: `50 mg/kg/dia EV de 12/12h (infecções leves)
100 mg/kg/dia EV de 24/24h (infecções graves)`,
  doseMinima: '50 mg/kg/dia',
  doseMaxima: '2000 mg/dia',

  parametrosCalculo: {
    doseMinMgKg: 50,
    doseMaxMgKg: 100,
    doseUsualMgKg: 50,
    doseMaxDiariaMg: 2000,
    intervalo: '12/12h ou 24/24h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 1000,
    concentracaoDenominadorMl: 5,
    formulaCalculo: `Peso (kg) × 0,25 mL de 12/12h (para 50 mg/kg/dia)
Peso (kg) × 0,5 mL de 24/24h (para 100 mg/kg/dia)`,
    logicaJs: `
      const doseDiaria = Math.min(peso * 50, 2000);
      const dosePorTomada = doseDiaria / 2;
      const volumeMl = (dosePorTomada / 1000) * 5;
      return Math.round(volumeMl * 100) / 100;
    `,
  },

  restricaoIdade: {
    observacao: 'Ajustar dose em prematuros e neonatos conforme função renal',
  },

  observacoes: `Monitorar função renal e níveis séricos (nível pico e vale em tratamentos prolongados).
Ajustar dose em prematuros e neonatos.
Evitar uso com outros nefrotóxicos.
Infusão deve ser feita em 30 minutos.
Conservar sob refrigeração.`,

  alertas: [
    'Não usar em neonatos com hiperbilirrubinemia',
    'Evitar administração concomitante com cálcio em neonatos',
    'Monitorar função renal em tratamentos prolongados',
    'Risco de colite pseudomembranosa',
  ],

  ultimaAtualizacao: '2026-02-02',
};

/**
 * Calcula a dose de Ceftriaxona 1000mg baseado no peso
 */
export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  // Dose usual para infecções leves: 50 mg/kg/dia dividido em 2 doses
  const doseDiariaMg = Math.min(peso * 50, 2000);
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMlReconstituido = (dosePorTomadaMg / 1000) * 5; // 1000mg em 5mL
  const volumeArredondado = Math.round(volumeMlReconstituido * 100) / 100;

  const alertas: string[] = [];
  const observacoes: string[] = [];

  // Verificar se atingiu dose máxima
  if (peso * 50 >= 2000) {
    alertas.push('Dose máxima diária atingida (2000 mg/dia)');
  }

  // Adicionar observações sobre preparo
  observacoes.push('Reconstituir com 5 mL de Água Destilada');
  observacoes.push('Diluir em 50-100 mL de SF 0,9%');
  observacoes.push('Infundir em 30 minutos');

  // Alertas específicos para neonatos
  if (idade !== undefined && idade < 1) {
    alertas.push('ATENÇÃO: Neonato - verificar contraindicações com hiperbilirrubinemia');
    alertas.push('Não administrar concomitantemente com soluções contendo cálcio');
  }

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL (da solução reconstituída)`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    observacoes,
    alertas,
  };
}

// Exportação padrão do módulo
const medicamento: MedicamentoExport = {
  data,
  calcularDose,
};

export default medicamento;
