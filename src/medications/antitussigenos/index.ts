/**
 * Categoria: antitussigenos
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'antitussigenos',
  nome: 'Antitussígenos e Expectorantes',
  descricao: 'Supressores de tosse e facilitadores de eliminação de secreções',
  iconeCorClasse: 'text-cyan-600',
  bgCorClasse: 'bg-cyan-100',
};

import acetilcisteinaNebulizacaoData from './vo/acetilcisteina-nebulizacao';
import acetilcisteinaXaropeAdultoData from './vo/acetilcisteina-xarope-adulto';
import acetilcisteinaXaropePediatricoData from './vo/acetilcisteina-xarope-pediatrico';
import ambroxolGotasData from './vo/ambroxol-gotas';
import ambroxolXaropeData from './vo/ambroxol-xarope';
import bromexinaGotasData from './vo/bromexina-gotas';
import bromexinaXaropeData from './vo/bromexina-xarope';
import carbocisteinaGotasData from './vo/carbocisteina-gotas';
import carbocisteinaXaropeData from './vo/carbocisteina-xarope';
import clobutinolDoxilaminaData from './vo/clobutinol-doxilamina';
import cloperastinaSuspensaoData from './vo/cloperastina-suspensao';
import cloperastinaXaropeData from './vo/cloperastina-xarope';
import dropropizinaGotasData from './vo/dropropizina-gotas';
import dropropizinaXaropeAdultoData from './vo/dropropizina-xarope-adulto';
import dropropizinaXaropePediatricoData from './vo/dropropizina-xarope-pediatrico';
import guaifenesinaData from './vo/guaifenesina';
import hederaHelix15mgData from './vo/hedera-helix-15mg';
import hederaHelixData from './vo/hedera-helix';
import levodropropizinaGotasData from './vo/levodropropizina-gotas';
import levodropropizinaXaropeData from './vo/levodropropizina-xarope';

export const medicamentos: MedicamentoExport[] = [
  acetilcisteinaNebulizacaoData,
  acetilcisteinaXaropeAdultoData,
  acetilcisteinaXaropePediatricoData,
  ambroxolGotasData,
  ambroxolXaropeData,
  bromexinaGotasData,
  bromexinaXaropeData,
  carbocisteinaGotasData,
  carbocisteinaXaropeData,
  clobutinolDoxilaminaData,
  cloperastinaSuspensaoData,
  cloperastinaXaropeData,
  dropropizinaGotasData,
  dropropizinaXaropeAdultoData,
  dropropizinaXaropePediatricoData,
  guaifenesinaData,
  hederaHelix15mgData,
  hederaHelixData,
  levodropropizinaGotasData,
  levodropropizinaXaropeData,
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
