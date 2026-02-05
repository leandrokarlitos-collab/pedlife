/**
 * Índice Principal de Medicamentos
 *
 * Este arquivo exporta todas as categorias de medicamentos
 * e fornece funções utilitárias para acesso aos dados.
 */

// Exportar tipos
export * from './types';

// Exportar categorias
export * as antibioticos from './antibioticos';
export * as antivirais from './antivirais';
export * as antiHistaminicos from './anti-histaminicos';
export * as anticonvulsivantes from './anticonvulsivantes';
export * as antidotos from './antidotos';
export * as antiparasitarios from './antiparasitarios';
export * as antitussigenos from './antitussigenos';
export * as corticoides from './corticoides';
export * as gastrointestinal from './gastrointestinal';
export * as analgesicos from './analgesicos';
export * as antifungicos from './antifungicos';
export * as inalatorios from './inalatorios';
export * as vitaminas from './vitaminas';

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
