/**
 * Tipos e interfaces para definição de medicamentos
 *
 * Este arquivo contém as interfaces TypeScript usadas para tipagem forte
 * dos medicamentos cadastrados no sistema PedLife.
 */

import { ReactNode } from 'react';

/**
 * Via de administração do medicamento
 */
export type ViaAdministracao =
  | 'VO'      // Via Oral
  | 'EV'      // Endovenosa
  | 'IM'      // Intramuscular
  | 'SC'      // Subcutânea
  | 'SL'      // Sublingual
  | 'Retal'   // Retal
  | 'Tópica'  // Tópica
  | 'Nasal'   // Nasal
  | 'Oftálmica' // Oftálmica
  | 'Otológica' // Otológica
  | 'Inalatória'; // Inalatória

/**
 * Forma farmacêutica do medicamento
 */
export type FormaFarmaceutica =
  | 'Pó/Suspensão Oral'
  | 'Suspensão Oral'
  | 'Solução Oral'
  | 'Comprimido Oral'
  | 'Cápsula Oral'
  | 'Xarope'
  | 'Gotas'
  | 'Pó para Solução Injetável'
  | 'Solução Injetável'
  | 'Pomada'
  | 'Creme'
  | 'Colírio'
  | 'Spray Nasal';

/**
 * Classe farmacológica do medicamento
 */
export interface ClasseFarmacologica {
  nome: string;
  descricao?: string;
}

/**
 * Informações de reconstituição do medicamento
 */
export interface Reconstituicao {
  necessaria: boolean;
  diluente?: string;
  volumeMl?: number;
  concentracaoFinal?: string;
  estabilidade?: string;
}

/**
 * Informações de diluição para administração EV
 */
export interface Diluicao {
  solucao: string;        // Ex: "SF 0,9%", "SG 5%"
  volumeMl: string;       // Ex: "50-100 mL"
  tempoInfusao?: string;  // Ex: "30 min", "60 min"
}

/**
 * Parâmetros de cálculo de dose
 */
export interface ParametrosCalculo {
  /** Dose em mg/kg */
  doseMinMgKg?: number;
  doseMaxMgKg?: number;
  doseUsualMgKg?: number;

  /** Dose máxima diária absoluta em mg */
  doseMaxDiariaMg?: number;

  /** Intervalo entre doses */
  intervalo: string;  // Ex: "8/8h", "12/12h", "24/24h"

  /** Número de doses por dia */
  dosesAoDia?: number;

  /** Concentração do medicamento */
  concentracaoNumeradorMg?: number;
  concentracaoDenominadorMl?: number;

  /** Fórmula de cálculo (macete) */
  formulaCalculo?: string;

  /** Lógica JavaScript para cálculo */
  logicaJs?: string;
}

/**
 * Restrições de idade para uso do medicamento
 */
export interface RestricaoIdade {
  idadeMinima?: string;   // Ex: "≥ 2 meses", "≥ 1 ano"
  pesoMinimo?: string;    // Ex: "≥ 20 kg"
  observacao?: string;
}

/**
 * Interface principal de definição de medicamento
 */
export interface MedicamentoData {
  /** Identificador único do medicamento */
  id: string;

  /** Nome completo do medicamento com concentração */
  nome: string;

  /** Nome comercial comum */
  nomesComerciais?: string[];

  /** Via de administração */
  viaAdministracao: ViaAdministracao | ViaAdministracao[];

  /** Forma farmacêutica */
  formaFarmaceutica: FormaFarmaceutica;

  /** Classe farmacológica */
  classe: ClasseFarmacologica;

  /** Categoria no sistema (slug) */
  categoria: string;

  /** Informações de reconstituição */
  reconstituicao?: Reconstituicao;

  /** Informações de diluição */
  diluicao?: Diluicao;

  /** Dose usual em texto para exibição */
  doseUsualTexto: string;

  /** Dose mínima */
  doseMinima?: string;

  /** Dose máxima */
  doseMaxima?: string;

  /** Parâmetros para cálculo automático de dose */
  parametrosCalculo?: ParametrosCalculo;

  /** Restrições de idade/peso */
  restricaoIdade?: RestricaoIdade;

  /** Observações importantes */
  observacoes?: string;

  /** Alertas de segurança */
  alertas?: string[];

  /** Data da última atualização */
  ultimaAtualizacao?: string;

  /** Duração do tratamento (quando explícita) */
  duracaoTratamento?: string; // Ex: "7-10 dias", "5 dias", "dose única"
}

/**
 * Props para componente de medicamento
 */
export interface MedicamentoComponentProps {
  peso?: number;
  idade?: number;
  onCalcular?: (resultado: ResultadoCalculo) => void;
}

/**
 * Resultado do cálculo de dose
 */
export interface ResultadoCalculo {
  doseCalculada: string;
  volumeCalculado?: string;
  unidade: string;
  intervalo: string;
  observacoes?: string[];
  alertas?: string[];
}

/**
 * Exportação de um arquivo de medicamento
 */
export interface MedicamentoExport {
  data: MedicamentoData;
  calcularDose?: (peso: number, idade?: number) => ResultadoCalculo;
}
