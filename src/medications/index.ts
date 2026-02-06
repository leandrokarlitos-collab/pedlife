/**
 * Índice Principal de Medicamentos
 *
 * Este arquivo exporta todas as categorias de medicamentos
 * e fornece funções utilitárias para acesso aos dados.
 */

// Exportar tipos
export * from './types';

// Importar módulos para agregação (necessário para criar a lista unificada)
import * as antibioticos from './antibioticos';
import * as antivirais from './antivirais';
import * as antiHistaminicos from './anti-histaminicos';
import * as anticonvulsivantes from './anticonvulsivantes';
import * as antidotos from './antidotos';
import * as antiparasitarios from './antiparasitarios';
import * as antitussigenos from './antitussigenos';
import * as corticoides from './corticoides';
import * as gastrointestinal from './gastrointestinal';
import * as analgesicos from './analgesicos';
import * as antifungicos from './antifungicos';
import * as inalatorios from './inalatorios';
import * as vitaminas from './vitaminas';

// Exportar categorias (Namespace export)
export {
  antibioticos,
  antivirais,
  antiHistaminicos,
  anticonvulsivantes,
  antidotos,
  antiparasitarios,
  antitussigenos,
  corticoides,
  gastrointestinal,
  analgesicos,
  antifungicos,
  inalatorios,
  vitaminas,
};

// Lista de todas as categorias disponíveis
export const categorias = [
  'antibioticos',
  'antivirais',
  'anti-histaminicos',
  'anticonvulsivantes',
  'antidotos',
  'antiparasitarios',
  'antitussigenos',
  'corticoides',
  'gastrointestinal',
  'analgesicos',
  'antifungicos',
  'inalatorios',
  'vitaminas',
] as const;

export type CategoriaSlug = typeof categorias[number];

// Agregar todos os medicamentos em uma única lista para busca global
// Isso corrige o erro de build onde messageFormatter tentava importar 'medicamentos' daqui
export const medicamentos = [
  ...antibioticos.medicamentos,
  ...antivirais.medicamentos,
  ...antiHistaminicos.medicamentos,
  ...anticonvulsivantes.medicamentos,
  ...antidotos.medicamentos,
  ...antiparasitarios.medicamentos,
  ...antitussigenos.medicamentos,
  ...corticoides.medicamentos,
  ...gastrointestinal.medicamentos,
  ...analgesicos.medicamentos,
  ...antifungicos.medicamentos,
  ...inalatorios.medicamentos,
  ...vitaminas.medicamentos,
];
