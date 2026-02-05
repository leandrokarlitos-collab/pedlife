/**
 * Categoria: analgesicos
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

export const categoriaInfo = {
  slug: 'analgesicos',
  nome: 'Analgésicos e Anti-inflamatórios',
  descricao: 'Medicamentos para dor e inflamação',
  iconeCorClasse: 'text-amber-600',
  bgCorClasse: 'bg-amber-100',
};

import cetoprofenoCapsulaData from './vo/cetoprofeno-capsula';
import cetoprofenoGotasData from './vo/cetoprofeno-gotas';
import codeinaOralData from './vo/codeina-oral';
import diclofenacoData from './vo/diclofenaco';
import dipironaGotasData from './vo/dipirona-gotas';
import dipironaSupositorioData from './vo/dipirona-supositorio';
import dipironaXaropeData from './vo/dipirona-xarope';
import ibuprofeno100mgMlGotasData from './vo/ibuprofeno-100mg-ml-gotas';
import ibuprofeno200mgMlGotasData from './vo/ibuprofeno-200mg-ml-gotas';
import ibuprofeno50mgMlData from './vo/ibuprofeno-50mg-ml';
import naproxenoData from './vo/naproxeno';
import nimesulidaComprimidoData from './vo/nimesulida-comprimido';
import nimesulidaGotasData from './vo/nimesulida-gotas';
import paracetamol100mgMlData from './vo/paracetamol-100mg-ml';
import paracetamol140mgMlData from './vo/paracetamol-140mg-ml';
import paracetamol200mgMlGotasData from './vo/paracetamol-200mg-ml-gotas';
import paracetamol200mgMlData from './vo/paracetamol-200mg-ml';
import paracetamol32mgMlData from './vo/paracetamol-32mg-ml';
import tramadolCapsulaData from './vo/tramadol-capsula';
import tramadolGotasData from './vo/tramadol-gotas';
import cetoprofenoEvData from './ev/cetoprofeno-ev';
import cetorolacoData from './ev/cetorolaco';
import codeinaInjetavelData from './ev/codeina-injetavel';
import dipirona500mgMlEvData from './ev/dipirona-500mg-ml-ev';
import dipironaEvData from './ev/dipirona-ev';
import morfina10mgMlData from './ev/morfina-10mg-ml';
import morfinaData from './ev/morfina';
import paracetamolEvData from './ev/paracetamol-ev';
import tramadolData from './ev/tramadol';

export const medicamentos: MedicamentoExport[] = [
  cetoprofenoCapsulaData,
  cetoprofenoGotasData,
  codeinaOralData,
  diclofenacoData,
  dipironaGotasData,
  dipironaSupositorioData,
  dipironaXaropeData,
  ibuprofeno100mgMlGotasData,
  ibuprofeno200mgMlGotasData,
  ibuprofeno50mgMlData,
  naproxenoData,
  nimesulidaComprimidoData,
  nimesulidaGotasData,
  paracetamol100mgMlData,
  paracetamol140mgMlData,
  paracetamol200mgMlGotasData,
  paracetamol200mgMlData,
  paracetamol32mgMlData,
  tramadolCapsulaData,
  tramadolGotasData,
  cetoprofenoEvData,
  cetorolacoData,
  codeinaInjetavelData,
  dipirona500mgMlEvData,
  dipironaEvData,
  morfina10mgMlData,
  morfinaData,
  paracetamolEvData,
  tramadolData,
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
