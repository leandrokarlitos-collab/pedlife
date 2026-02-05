import type { MockMedicationData, MedicationCategoryData, CategoryInfo, Medication, MedicationGroup } from '@/types/medication';
import { LucideIcon, Pill } from 'lucide-react';
import { slugify } from '@/lib/utils';
import { loadTsxMedications, hasTsxMedications, getCategoriesWithTsx } from './tsxMedicationLoader';

// Importar arquivos de categoria existentes
import antibioticos from '@/medications/Categorias/antibioticos_fixed.json';
import anticonvulsivantes from '@/medications/Categorias/anticonvulsivantes_fixed.json';
import antiemeticos from '@/medications/Categorias/antiemeticos_fixed.json';
import antimicrobianos from '@/medications/Categorias/antimicrobianos_fixed.json';
import antivirais from '@/medications/Categorias/antivirais_fixed.json';
import bloqueadorNeuromuscular from '@/medications/Categorias/bloqueador_neuromuscular_fixed.json';
import carvaoAtivado from '@/medications/Categorias/carvao_ativado_fixed.json';
import corticoidesEv from '@/medications/Categorias/corticoides_ev_fixed.json';
import medicacaoBradicardia from '@/medications/Categorias/medicacao_bradicardia_fixed.json';
import nasais from '@/medications/Categorias/nasais_fixed.json';
import oftalmologicos from '@/medications/Categorias/oftalmologicos_fixed.json';
import otologicos from '@/medications/Categorias/otologicos_fixed.json';
import oftalmologicosOtologicos from '@/medications/Categorias/oftalmologicos_otologicos_fixed.json';
import pcr from '@/medications/Categorias/pcr_fixed.json';
import sedativos from '@/medications/Categorias/sedativos_fixed.json';
import xaropesTosse from '@/medications/Categorias/xaropes_tosse_fixed.json';

// Importar novas categorias atualizadas
import antibioticosUpdated from '@/medications/Categorias/antibioticos_updated.json';
import anticonvulsivantesUpdated from '@/medications/Categorias/anticonvulsivantes_updated.json';
import antihistaminicos from '@/medications/Categorias/anti-histaminicos_updated.json';
import antidotos from '@/medications/Categorias/antidotos_updated.json';
import antiparasitarios from '@/medications/Categorias/antiparasitarios_updated.json';
import antitussigenos from '@/medications/Categorias/antitussigenos_updated.json';
import antiviraisUpdated from '@/medications/Categorias/antivirais_updated.json';
import corticoidesUpdated from '@/medications/Categorias/corticoides-ev_updated.json';
import expectorantesMucoliticos from '@/medications/Categorias/expectorantes-mucoliticos_updated.json';
import gastrointestinal from '@/medications/Categorias/gastrointestinal_updated.json';

// categoria 'diureticos' removida (não existe JSON correspondente)

// Arquivo estático de cada categoria (combinando dados antigos e novos)
const categoryFiles: Record<string, Medication[]> = {
  // Categorias atualizadas com novos dados - Antimicrobianos fundidos com Antibióticos
  'antibioticos': [...antibioticos, ...antibioticosUpdated, ...antimicrobianos],
  'anticonvulsivantes': [...anticonvulsivantes, ...anticonvulsivantesUpdated],
  'antivirais': [...antivirais, ...antiviraisUpdated],
  'corticoides-ev': [...corticoidesEv, ...corticoidesUpdated],

  // Novas categorias
  'anti-histaminicos': antihistaminicos,
  'antidotos': antidotos,
  'antiparasitarios': antiparasitarios,
  'antitussigenos': antitussigenos,
  'expectorantes-mucoliticos': expectorantesMucoliticos,
  'gastrointestinal': gastrointestinal,

  // Categorias existentes mantidas
  'antiemeticos': antiemeticos,
  'bloqueador-neuromuscular': bloqueadorNeuromuscular,
  'carvao-ativado': carvaoAtivado,
  'medicacao-bradicardia': medicacaoBradicardia,
  'nasais': nasais,
  // 🆕 Oftalmológicos e Otológicos unificados
  'oftalmologicos-otologicos': [...oftalmologicos, ...otologicos, ...oftalmologicosOtologicos],
  'pcr': pcr,
  'sedativos': sedativos,
  'xaropes-tosse': xaropesTosse,
};

const categoryIconMap: Record<string, { icon: LucideIcon; iconColorClass: string; bgColorClass: string; description: string }> = {
  // Todas as categorias com ícone Pill unificado e variações de cor
  'antibioticos': { icon: Pill, iconColorClass: 'text-blue-500', bgColorClass: 'bg-blue-100', description: 'Medicamentos para tratamento de infecções bacterianas' },
  'antivirais': { icon: Pill, iconColorClass: 'text-green-500', bgColorClass: 'bg-green-100', description: 'Medicações para combate a infecções virais' },
  'antiemeticos': { icon: Pill, iconColorClass: 'text-purple-500', bgColorClass: 'bg-purple-100', description: 'Controle de náuseas e vômitos' },
  'anticonvulsivantes': { icon: Pill, iconColorClass: 'text-indigo-600', bgColorClass: 'bg-indigo-100', description: 'Controle e prevenção de crises convulsivas' },
  'bloqueador-neuromuscular': { icon: Pill, iconColorClass: 'text-gray-600', bgColorClass: 'bg-gray-100', description: 'Relaxantes musculares para procedimentos' },
  'corticoides-ev': { icon: Pill, iconColorClass: 'text-red-500', bgColorClass: 'bg-red-100', description: 'Anti-inflamatórios potentes para condições agudas' },
  'medicacao-bradicardia': { icon: Pill, iconColorClass: 'text-yellow-600', bgColorClass: 'bg-yellow-100', description: 'Tratamento de frequência cardíaca baixa' },
  'nasais': { icon: Pill, iconColorClass: 'text-green-400', bgColorClass: 'bg-green-50', description: 'Medicações de uso nasal e descongestionantes' },
  'anti-histaminicos': { icon: Pill, iconColorClass: 'text-orange-500', bgColorClass: 'bg-orange-100', description: 'Tratamento de alergias e reações alérgicas' },
  'antidotos': { icon: Pill, iconColorClass: 'text-red-600', bgColorClass: 'bg-red-100', description: 'Reversão de intoxicações e envenenamentos' },
  'antiparasitarios': { icon: Pill, iconColorClass: 'text-teal-600', bgColorClass: 'bg-teal-100', description: 'Combate a parasitas e verminoses' },
  'antitussigenos': { icon: Pill, iconColorClass: 'text-cyan-600', bgColorClass: 'bg-cyan-100', description: 'Supressores de tosse e reflexo de tosse' },
  'expectorantes-mucoliticos': { icon: Pill, iconColorClass: 'text-emerald-600', bgColorClass: 'bg-emerald-100', description: 'Facilitam a eliminação de secreções' },
  'gastrointestinal': { icon: Pill, iconColorClass: 'text-violet-600', bgColorClass: 'bg-violet-100', description: 'Medicações para trato digestivo' },
  'oftalmologicos-otologicos': { icon: Pill, iconColorClass: 'text-blue-500', bgColorClass: 'bg-blue-100', description: 'Colírios, medicações para olhos e ouvidos' },
  'pcr': { icon: Pill, iconColorClass: 'text-red-700', bgColorClass: 'bg-red-200', description: 'Medicamentos para parada cardiorrespiratória' },
  'sedativos': { icon: Pill, iconColorClass: 'text-purple-600', bgColorClass: 'bg-purple-100', description: 'Sedação e controle de ansiedade' },
  'xaropes-tosse': { icon: Pill, iconColorClass: 'text-amber-500', bgColorClass: 'bg-amber-100', description: 'Xaropes para alívio da tosse' },
  'carvao-ativado': { icon: Pill, iconColorClass: 'text-gray-600', bgColorClass: 'bg-gray-100', description: 'Tratamento de intoxicações e envenenamentos' },
  // 🆕 Categorias TSX Adicionadas
  'analgesicos': { icon: Pill, iconColorClass: 'text-rose-600', bgColorClass: 'bg-rose-100', description: 'Analgésicos e anti-inflamatórios para dor e febre' },
  'antifungicos': { icon: Pill, iconColorClass: 'text-fuchsia-600', bgColorClass: 'bg-fuchsia-100', description: 'Medicamentos antifúngicos para infecções fúngicas' },
  'inalatorios': { icon: Pill, iconColorClass: 'text-sky-600', bgColorClass: 'bg-sky-100', description: 'Medicamentos para uso inalatório e respiratório' },
  'vitaminas': { icon: Pill, iconColorClass: 'text-lime-600', bgColorClass: 'bg-lime-100', description: 'Vitaminas e suplementos nutricionais' },
};

function formatCategoryName(slug: string): string {
  // Mapeamento de slugs para nomes corretos com acentos
  const nameMap: Record<string, string> = {
    'antibioticos': 'Antibióticos',
    'antivirais': 'Antivirais',
    'antiemeticos': 'Antieméticos',
    'anticonvulsivantes': 'Anticonvulsivantes',
    'bloqueador-neuromuscular': 'Bloqueador Neuromuscular',
    'corticoides-ev': 'Corticóides',
    'medicacao-bradicardia': 'Medicação Bradicardia',
    'nasais': 'Nasais',
    'anti-histaminicos': 'Anti-Histamínicos',
    'antidotos': 'Antídotos',
    'antiparasitarios': 'Antiparasitários',
    'antitussigenos': 'Antitussígenos',
    'expectorantes-mucoliticos': 'Expectorantes Mucolíticos',
    'gastrointestinal': 'Gastrointestinal',
    'oftalmologicos-otologicos': 'Oftalmológicos e Otológicos',
    'pcr': 'Parada Cardiorrespiratória',
    'sedativos': 'Sedativos',
    'xaropes-tosse': 'Xaropes: Tosse',
    'carvao-ativado': 'Carvão Ativado',
    // 🆕 Categorias TSX Adicionadas
    'analgesicos': 'Analgésicos e Anti-inflamatórios',
    'antifungicos': 'Antifúngicos',
    'inalatorios': 'Inalatórios',
    'vitaminas': 'Vitaminas e Suplementos',
  };

  return nameMap[slug] || slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

function getLastUpdatedDate(): string {
  const now = new Date();
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${months[now.getMonth()]}/${now.getFullYear()}`;
}

function extractBaseName(fullName: string): string {
  // Remover informações extras e números
  const cleaned = fullName.replace(/\s*\([^)]*\)/g, '').split(/\d/)[0].trim();
  return cleaned;
}

function groupMedicationsByApplication(medications: Medication[]): MedicationGroup[] {
  // Agrupar medicamentos por via de administração
  const applicationGroups: Record<string, Medication[]> = {};

  medications.forEach(med => {
    const app = med.application || 'Outros';
    if (!applicationGroups[app]) applicationGroups[app] = [];
    applicationGroups[app].push(med);
  });

  const groups: MedicationGroup[] = [];

  // Criar grupos por aplicação
  Object.entries(applicationGroups).forEach(([app, meds]) => {
    // Dentro de cada aplicação, agrupar por nome base
    const baseNameGroups: Record<string, Medication[]> = {};

    meds.forEach(med => {
      const baseName = extractBaseName(med.name);
      if (!baseNameGroups[baseName]) baseNameGroups[baseName] = [];
      baseNameGroups[baseName].push(med);
    });

    // Criar grupos para cada nome base
    Object.entries(baseNameGroups).forEach(([baseName, variants]) => {
      groups.push({
        baseName: `${baseName} (${app})`,
        baseSlug: `${baseName.replace(/\s+/g, '-').toLowerCase()}-${app.toLowerCase()}`,
        variants
      });
    });
  });

  return groups;
}

export function loadMedicationData(): MockMedicationData {
  const data: MockMedicationData = {};
  const seen = new Set<string>();

  // 🆕 Combinar categorias JSON e TSX
  const allCategorySlug = new Set([
    ...Object.keys(categoryFiles),
    ...getCategoriesWithTsx()
  ]);

  for (const slug of allCategorySlug) {
    const iconInfo = categoryIconMap[slug] || { icon: Pill, iconColorClass: 'text-gray-500', bgColorClass: 'bg-gray-100', description: 'Medicamentos diversos' };

    // 🆕 TENTAR CARREGAR TSX PRIMEIRO
    let medications: Medication[] = [];

    if (hasTsxMedications(slug)) {
      // Usar medicamentos TSX (já convertidos para formato Medication)
      medications = loadTsxMedications(slug);
      console.log(`✅ [TSX] Carregado ${medications.length} medicamentos para ${slug}`);

      // 🐛 DEBUG: Verificar se customCalculator está presente
      const primeiroMed = medications[0];
      if (primeiroMed) {
        console.log('🔍 [DEBUG] Primeiro medicamento TSX:', primeiroMed.name);
        console.log('🔍 [DEBUG] Tem customCalculator?', !!primeiroMed.calculationParams?.customCalculator);
      }
    } else {
      // Fallback para JSON
      const meds = categoryFiles[slug] || [];
      medications = meds;
      console.log(`📋 [JSON] Carregado ${medications.length} medicamentos para ${slug}`);
    }

    // Remover duplicatas e gerar slugs únicos
    const unique = medications.filter(m => {
      const key = `${m.name}-${m.form || ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(m => {
      // Gerar slug único baseado no nome do medicamento
      const uniqueSlug = m.slug || slugify(m.name);
      return {
        ...m,
        slug: uniqueSlug
      };
    });

    // Agrupar variantes - tratamento especial para antibióticos
    const groups: MedicationGroup[] = [];

    if (slug === 'antibioticos') {
      // Para antibióticos, agrupar primeiro por via de administração, depois por variantes
      groups.push(...groupMedicationsByApplication(unique));
    } else {
      // Para outras categorias, usar o agrupamento padrão
      const map: Record<string, Medication[]> = {};
      unique.forEach(m => {
        const base = extractBaseName(m.name);
        map[base] = map[base] || [];
        map[base].push(m);
      });
      for (const base in map) {
        groups.push({ baseName: base, baseSlug: base.replace(/\s+/g, '-').toLowerCase(), variants: map[base] });
      }
    }

    data[slug] = {
      slug,
      title: formatCategoryName(slug),
      description: iconInfo.description,
      icon: iconInfo.icon,
      iconColorClass: iconInfo.iconColorClass,
      bgColorClass: iconInfo.bgColorClass,
      medicationsCount: unique.length,
      lastUpdated: getLastUpdatedDate(),
      medications: unique,
      medicationGroups: groups,
      showGrouped: true
    };
  }

  return data;
}

export function loadCategories(): CategoryInfo[] {
  return Object.values(loadMedicationData()).map(cat => ({
    title: cat.title,
    slug: cat.slug,
    description: cat.description,
    icon: cat.icon,
    iconColorClass: cat.iconColorClass,
    bgColorClass: cat.bgColorClass,
    medicationsCount: cat.medicationsCount,
    lastUpdated: cat.lastUpdated
  }));
}
