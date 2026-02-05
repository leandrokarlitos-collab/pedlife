/**
 * Categoria: gastrointestinal
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'gastrointestinal',
  nome: 'Gastrointestinal',
  descricao: 'Medicações para trato digestivo',
  iconeCorClasse: 'text-violet-600',
  bgCorClasse: 'bg-violet-100',
};

import bromopridaComprimidoData from './vo/bromoprida-comprimido';
import bromopridaGotasData from './vo/bromoprida-gotas';
import domperidona1mgMlData from './vo/domperidona-1mg-ml';
import fosfatoSodioData from './vo/fosfato-sodio';
import glicerinaEnemaData from './vo/glicerina-enema';
import hidroxidoMagnesioData from './vo/hidroxido-magnesio';
import lactobacillusReuteriData from './vo/lactobacillus-reuteri';
import lactulonaData from './vo/lactulona';
import macrogolEletrolitosData from './vo/macrogol-eletrolitos';
import macrogolData from './vo/macrogol';
import metoclopramidaGotasData from './vo/metoclopramida-gotas';
import oleoMineralData from './vo/oleo-mineral';
import omeprazol4mgMlData from './vo/omeprazol-4mg-ml';
import ondansetronaComprimidoData from './vo/ondansetrona-comprimido';
import ondansetronaXaropeData from './vo/ondansetrona-xarope';
import racecadotrilData from './vo/racecadotril';
import ranitidinaGotasData from './vo/ranitidina-gotas';
import ranitidinaXaropeData from './vo/ranitidina-xarope';
import saccharomycesBoulardiiData from './vo/saccharomyces-boulardii';
import zinco10mgMlData from './vo/zinco-10mg-ml';
import zinco2mgMlData from './vo/zinco-2mg-ml';
import bromoprida5mgMlData from './ev/bromoprida-5mg-ml';
import metoclopramida5mgMlData from './ev/metoclopramida-5mg-ml';
import omeprazol40mgEvData from './ev/omeprazol-40mg-ev';
import ondansetrona2mgMlData from './ev/ondansetrona-2mg-ml';
import ranitidinaEvData from './ev/ranitidina-ev';

export const medicamentos: MedicamentoExport[] = [
  bromopridaComprimidoData,
  bromopridaGotasData,
  domperidona1mgMlData,
  fosfatoSodioData,
  glicerinaEnemaData,
  hidroxidoMagnesioData,
  lactobacillusReuteriData,
  lactulonaData,
  macrogolEletrolitosData,
  macrogolData,
  metoclopramidaGotasData,
  oleoMineralData,
  omeprazol4mgMlData,
  ondansetronaComprimidoData,
  ondansetronaXaropeData,
  racecadotrilData,
  ranitidinaGotasData,
  ranitidinaXaropeData,
  saccharomycesBoulardiiData,
  zinco10mgMlData,
  zinco2mgMlData,
  bromoprida5mgMlData,
  metoclopramida5mgMlData,
  omeprazol40mgEvData,
  ondansetrona2mgMlData,
  ranitidinaEvData,
];

export function getMedicamentoById(id: string): MedicamentoExport | undefined {
  return medicamentos.find((med) => med.data.id === id);
}

export function getMedicamentosByVia(via: string): MedicamentoExport[] {
  return medicamentos.filter((med) => {
    const vias = Array.isArray(med.data.viaAdministracao)
      ? med.data.viaAdministracao
      : [med.data.viaAdministracao];
    return vias.includes(via as any);
  });
}
