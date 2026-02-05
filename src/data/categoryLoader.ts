import type { MockMedicationData, MedicationCategoryData, CategoryInfo, Medication, MedicationGroup } from '@/types/medication';
import { LucideIcon, Pill } from 'lucide-react';
import { slugify } from '@/lib/utils';
import { loadTsxMedications, hasTsxMedications, getCategoriesWithTsx } from './tsxMedicationLoader';

/**
 * Mapeamento de slugs para funções de carregamento dinâmico de JSON
 */
const dynamicCategoryImports: Record<string, () => Promise<any>> = {
  'antibioticos': async () => {
    const [fixed, updated, antimicrobianos] = await Promise.all([
      import('@/medications/Categorias/antibioticos_fixed.json'),
      import('@/medications/Categorias/antibioticos_updated.json'),
      import('@/medications/Categorias/antimicrobianos_fixed.json')
    ]);
    return [...fixed.default, ...updated.default, ...antimicrobianos.default];
  },
  'anticonvulsivantes': async () => {
    const [fixed, updated] = await Promise.all([
      import('@/medications/Categorias/anticonvulsivantes_fixed.json'),
      import('@/medications/Categorias/anticonvulsivantes_updated.json')
    ]);
    return [...fixed.default, ...updated.default];
  },
  'antivirais': async () => {
    const [fixed, updated] = await Promise.all([
      import('@/medications/Categorias/antivirais_fixed.json'),
      import('@/medications/Categorias/antivirais_updated.json')
    ]);
    return [...fixed.default, ...updated.default];
  },
  'corticoides-ev': async () => {
    const [fixed, updated] = await Promise.all([
      import('@/medications/Categorias/corticoides_ev_fixed.json'),
      import('@/medications/Categorias/corticoides-ev_updated.json')
    ]);
    return [...fixed.default, ...updated.default];
  },
  'anti-histaminicos': async () => (await import('@/medications/Categorias/anti-histaminicos_updated.json')).default,
  'antidotos': async () => (await import('@/medications/Categorias/antidotos_updated.json')).default,
  'antiparasitarios': async () => (await import('@/medications/Categorias/antiparasitarios_updated.json')).default,
  'antitussigenos': async () => (await import('@/medications/Categorias/antitussigenos_updated.json')).default,
  'expectorantes-mucoliticos': async () => (await import('@/medications/Categorias/expectorantes-mucoliticos_updated.json')).default,
  'gastrointestinal': async () => (await import('@/medications/Categorias/gastrointestinal_updated.json')).default,
  'antiemeticos': async () => (await import('@/medications/Categorias/antiemeticos_fixed.json')).default,
  'bloqueador-neuromuscular': async () => (await import('@/medications/Categorias/bloqueador_neuromuscular_fixed.json')).default,
  'carvao-ativado': async () => (await import('@/medications/Categorias/carvao_ativado_fixed.json')).default,
  'medicacao-bradicardia': async () => (await import('@/medications/Categorias/medicacao_bradicardia_fixed.json')).default,
  'nasais': async () => (await import('@/medications/Categorias/nasais_fixed.json')).default,
  'oftalmologicos-otologicos': async () => {
    const [oft, oto, combined] = await Promise.all([
      import('@/medications/Categorias/oftalmologicos_fixed.json'),
      import('@/medications/Categorias/otologicos_fixed.json'),
      import('@/medications/Categorias/oftalmologicos_otologicos_fixed.json')
    ]);
    return [...oft.default, ...oto.default, ...combined.default];
  },
  'pcr': async () => (await import('@/medications/Categorias/pcr_fixed.json')).default,
  'sedativos': async () => (await import('@/medications/Categorias/sedativos_fixed.json')).default,
  'xaropes-tosse': async () => (await import('@/medications/Categorias/xaropes_tosse_fixed.json')).default,
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

/**
 * Carrega medicamentos para uma categoria específica (TSX ou JSON)
 */
export async function loadMedicationsForCategory(slug: string): Promise<Medication[]> {
  let medications: Medication[] = [];

  if (hasTsxMedications(slug)) {
    medications = await loadTsxMedications(slug);
  } else if (dynamicCategoryImports[slug]) {
    medications = await dynamicCategoryImports[slug]();
  }

  // Remover duplicatas e gerar slugs únicos
  const seen = new Set<string>();
  return medications.filter(m => {
    const key = `${m.name}-${m.form || ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map(m => ({
    ...m,
    slug: m.slug || slugify(m.name)
  }));
}

/**
 * Carrega toda a estrutura de dados (Metadados apenas, para manter a compatibilidade síncrona onde possível)
 */
export function loadMedicationData(): MockMedicationData {
  const data: MockMedicationData = {};

  // Combinar slugs de JSON e TSX para criar os metadados
  const allCategorySlug = new Set([
    ...Object.keys(dynamicCategoryImports),
    ...getCategoriesWithTsx()
  ]);

  for (const slug of allCategorySlug) {
    const iconInfo = categoryIconMap[slug] || { icon: Pill, iconColorClass: 'text-gray-500', bgColorClass: 'bg-gray-100', description: 'Medicamentos diversos' };

    data[slug] = {
      slug,
      title: formatCategoryName(slug),
      description: iconInfo.description,
      icon: iconInfo.icon,
      iconColorClass: iconInfo.iconColorClass,
      bgColorClass: iconInfo.bgColorClass,
      medicationsCount: 0, // Será atualizado quando os dados forem carregados
      lastUpdated: getLastUpdatedDate(),
      medications: [], // Começa vazio para carregamento sob demanda
      medicationGroups: [],
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
