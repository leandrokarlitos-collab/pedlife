const fs = require('fs');
const path = require('path');

function normalize(name) {
    if (!name) return '';
    return name.toLowerCase()
        .replace(/[\n\r\t]/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/[,\(\)\.\-]/g, ' ')
        .replace(/mg\/ml/g, 'mg ml')
        .replace(/ml/g, 'ml')
        .trim();
}

function extractNameFromTsx(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const match = content.match(/nome:\s*['"](.+?)['"]/);
        return match ? match[1] : null;
    } catch (e) {
        return null;
    }
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

// 1. Get Excel Meds
const excelData = JSON.parse(fs.readFileSync('excel_data_full.json', 'utf8'));
const excelMedsOriginal = [];

Object.values(excelData).forEach(sheet => {
    if (sheet.sample) {
        sheet.sample.forEach(m => {
            const name = m.MEDICAMENTO;
            if (name && name !== name.toUpperCase() && name.length > 5) {
                excelMedsOriginal.push(name);
            }
        });
    }
});

const uniqueExcelMeds = [...new Set(excelMedsOriginal)];

// 2. Get Platform Meds (JSON)
const jsonPath = 'src/medications/banco_dosagens_medicas.json';
const platformNames = new Set();
if (fs.existsSync(jsonPath)) {
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    jsonData.forEach(m => platformNames.add(normalize(m.name)));
}

// 3. Get Platform Meds (TSX)
const medicationsDir = 'src/medications';
const allFiles = getAllFiles(medicationsDir);
allFiles.forEach(file => {
    if (file.endsWith('.tsx')) {
        const name = extractNameFromTsx(file);
        if (name) platformNames.add(normalize(name));
    }
});

// 4. Compare
const missing = [];
uniqueExcelMeds.forEach(excelName => {
    const normExcel = normalize(excelName);
    let found = false;

    // Direct match in normalized set
    if (platformNames.has(normExcel)) {
        found = true;
    } else {
        // Partial Match
        for (let platformName of platformNames) {
            if (platformName.includes(normExcel) || normExcel.includes(platformName)) {
                found = true;
                break;
            }
        }
    }

    if (!found) {
        missing.push(excelName);
    }
});

console.log('--- RELATORIO DE MEDICAMENTOS FALTANTES ---');
missing.sort().forEach((m, i) => {
    console.log(`${i + 1}. ${m.replace(/[\n\r]/g, ' ')}`);
});
console.log('\nTotal de medicamentos no Excel:', uniqueExcelMeds.length);
console.log('Total faltantes identificados:', missing.length);
