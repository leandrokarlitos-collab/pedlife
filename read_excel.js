import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
import fs from 'fs';
import path from 'path';

const files = [
    'xls/BANCO_DE_DADOS_MEDICAÇÕES (version 1).xlsb.xlsx',
    'xls/BANCO_DE_DADOS_MEDICAÇÕES.xlsx'
];

const output = {};

files.forEach(file => {
    if (fs.existsSync(file)) {
        const workbook = XLSX.readFile(file);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        output[file] = {
            count: data.length,
            columns: Object.keys(data[0] || {}),
            sample: data.slice(0, 100)
        };
    }
});

fs.writeFileSync('excel_data.json', JSON.stringify(output, null, 2));
console.log('Data saved to excel_data.json');
