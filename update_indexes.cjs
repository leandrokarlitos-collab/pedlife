const fs = require('fs');
const path = require('path');

function toCamelCase(str) {
    return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase()).replace(/\.tsx$/, '');
}

function processCategory(categoryDir) {
    const indexFile = path.join(categoryDir, 'index.ts');
    if (!fs.existsSync(indexFile)) return;

    const content = fs.readFileSync(indexFile, 'utf8');
    // Extract categoryInfo
    const categoryInfoMatch = content.match(/export const categoriaInfo = {[\s\S]*?};/);
    if (!categoryInfoMatch) return;
    const categoryInfo = categoryInfoMatch[0];

    const subDirs = ['vo', 'ev', 'im', 'inalatorio'];
    const imports = [];
    const entries = [];

    subDirs.forEach(sub => {
        const subPath = path.join(categoryDir, sub);
        if (fs.existsSync(subPath)) {
            const files = fs.readdirSync(subPath).filter(f => f.endsWith('.tsx'));
            files.forEach(file => {
                const name = toCamelCase(file);
                const importPath = `./${sub}/${file.replace('.tsx', '')}`;
                imports.push(`import ${name}Data from '${importPath}';`);
                entries.push(`  ${name}Data,`);
            });
        }
    });

    const newContent = `/**
 * Categoria: ${path.basename(categoryDir)}
 * Gerado automaticamente para incluir todos os medicamentos
 */

import { MedicamentoExport } from '../types';

${categoryInfo}

${imports.join('\n')}

export const medicamentos: MedicamentoExport[] = [
${entries.join('\n')}
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
`;

    fs.writeFileSync(indexFile, newContent);
    console.log(`Updated ${indexFile}`);
}

const medicationsDir = 'src/medications';
const categories = fs.readdirSync(medicationsDir).filter(f => fs.statSync(path.join(medicationsDir, f)).isDirectory() && f !== 'Categorias' && f !== 'types');

categories.forEach(cat => {
    processCategory(path.join(medicationsDir, cat));
});
