const fs = require('fs');
const path = require('path');

// Função para converter texto em slug
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Função para determinar via de administração
function determineApplication(viaAdministracao) {
  if (!viaAdministracao) return 'VO';
  
  const via = viaAdministracao.toLowerCase();
  if (via.includes('oral') || via.includes('vo')) return 'VO';
  if (via.includes('endovenosa') || via.includes('ev')) return 'EV';
  if (via.includes('intramuscular') || via.includes('im')) return 'IM';
  if (via.includes('retal')) return 'Retal';
  if (via.includes('nasal')) return 'Nasal';
  if (via.includes('inalatória') || via.includes('nebulização')) return 'Inalatória';
  if (via.includes('subcutânea') || via.includes('sc')) return 'SC';
  if (via.includes('tópica')) return 'Tópica';
  
  return 'VO';
}

// Função para determinar forma farmacêutica
function determineForm(medicamento, viaAdministracao, reconstituicao) {
  const med = medicamento.toLowerCase();
  const via = (viaAdministracao || '').toLowerCase();
  
  if (med.includes('xarope') || med.includes('suspensão')) return 'Suspensão Oral';
  if (med.includes('gotas')) return 'Solução Oral em Gotas';
  if (med.includes('comprimido')) return 'Comprimido';
  if (med.includes('cápsula')) return 'Cápsula';
  if (med.includes('ampola') || med.includes('injetável') || med.includes('solução injetável')) return 'Solução Injetável';
  if (med.includes('pó') || reconstituicao === 'Sim') return 'Pó para Reconstituição';
  if (med.includes('pomada')) return 'Pomada';
  if (med.includes('creme')) return 'Creme';
  if (med.includes('supositório')) return 'Supositório';
  if (med.includes('filme')) return 'Filme Orodispersível';
  if (via.includes('nebulização')) return 'Solução para Nebulização';
  if (via.includes('nasal')) return 'Suspensão Nasal';
  
  return 'Suspensão Oral';
}

// Função para extrair concentração
function extractConcentration(medicamento) {
  const patterns = [
    /(\d+(?:\.\d+)?)\s*mg\/(\d+(?:\.\d+)?)\s*ml/i,
    /(\d+(?:\.\d+)?)\s*mg\/ml/i,
    /(\d+(?:\.\d+)?)\s*mg/i,
    /(\d+(?:\.\d+)?)\s*mcg/i,
    /(\d+(?:\.\d+)?)\s*UI/i,
    /(\d+(?:\.\d+)?)\s*g/i
  ];
  
  for (const pattern of patterns) {
    const match = medicamento.match(pattern);
    if (match) {
      return match[0];
    }
  }
  
  return 'Ver fórmula';
}

// Função para criar lógica de cálculo JavaScript
function createCalculationLogic(macete, doseUsual, medicamento) {
  if (!macete || macete === 'null' || !macete.trim() || macete.includes('Não se aplica')) {
    return null;
  }
  
  const cleanMacete = macete.replace(/\n/g, ' ').trim();
  
  // Padrão específico para Amoxicilina
  if (medicamento.includes('Amoxicilina') && (cleanMacete.includes('0.5') || cleanMacete.includes('0,5'))) {
    if (medicamento.includes('250')) {
      return '"Tomar " + Math.round((peso*50<=1750 ? (peso*50/2)/(250/5) : (1750/2)/(250/5)) * 10) / 10 + " mL por via oral de 12/12 horas por 7 a 10 dias."';
    } else if (medicamento.includes('400')) {
      return '"Tomar " + Math.round((peso*50<=1750 ? (peso*50/2)/(400/5) : (1750/2)/(400/5)) * 10) / 10 + " mL por via oral de 12/12 horas por 7 a 10 dias."';
    }
  }
  
  // Padrão: Peso (kg) × X mL
  const pesoMlPattern = /peso.*?×.*?(\d+(?:[,.]?\d+)?)\s*ml/i;
  const pesoMlMatch = cleanMacete.match(pesoMlPattern);
  
  if (pesoMlMatch) {
    const fator = parseFloat(pesoMlMatch[1].replace(',', '.'));
    return `"Administrar " + Math.round(peso * ${fator} * 10) / 10 + " mL conforme orientação médica"`;
  }
  
  // Padrão: X gotas por kg
  const gotasKgPattern = /(\d+(?:[,.]?\d+)?)\s*gotas?\s*(?:por|\/)\s*kg/i;
  const gotasKgMatch = cleanMacete.match(gotasKgPattern);
  
  if (gotasKgMatch) {
    const gotasPorKg = parseFloat(gotasKgMatch[1].replace(',', '.'));
    return `"Administrar " + Math.round(peso * ${gotasPorKg}) + " gotas conforme orientação médica"`;
  }
  
  // Padrão: X mL/kg
  const mlKgPattern = /(\d+(?:[,.]?\d+)?)\s*ml\/kg/i;
  const mlKgMatch = cleanMacete.match(mlKgPattern);
  
  if (mlKgMatch) {
    const mlPorKg = parseFloat(mlKgMatch[1].replace(',', '.'));
    return `"Administrar " + Math.round(peso * ${mlPorKg} * 10) / 10 + " mL conforme orientação médica"`;
  }
  
  // Se contém dose fixa
  if (cleanMacete.includes('dose fixa') || cleanMacete.includes('não se aplica')) {
    return '"Dose fixa conforme idade - consulte orientação médica"';
  }
  
  // Fallback: usar o macete como orientação
  const safeMacete = cleanMacete.replace(/"/g, '\\"');
  return `"${safeMacete}"`;
}

// Função para extrair intervalo de dose
function extractDoseInterval(doseUsual) {
  if (!doseUsual) return 'Conforme prescrição';
  
  const intervalPatterns = [
    /(\d+\/\d+\s*h)/i,
    /(\d+\/\d+\s*horas?)/i,
    /(\d+\s*x\/dia)/i,
    /(\d+x\/dia)/i,
    /(uma vez ao dia)/i,
    /(dose única)/i
  ];
  
  for (const pattern of intervalPatterns) {
    const match = doseUsual.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return 'Conforme prescrição';
}

// Mapeamento de categorias para nomes de arquivo
const categoryFileMapping = {
  'ANTIBIÓTICOS': 'antibioticos',
  'ANTIVIRAL': 'antivirais',
  'ANTI-HISTAMINICO': 'anti-histaminicos',
  'CORTICOIDE': 'corticoides-ev',
  'GASTROINTESTINAL': 'gastrointestinal',
  'ANALGESICO E ANTIINFLAMATORIO': 'analgesicos-antiinflamatorios',
  'ANTICONVULSIVANTES': 'anticonvulsivantes',
  'ANTIPARASITARIOS': 'antiparasitarios',
  'ANTIDOTOS': 'antidotos',
  'TOSSE (antitussígenos/supressores)': 'antitussigenos',
  'TOSSE (expectorantes/mucolíticos)': 'expectorantes-mucoliticos',
  'INALATORIOS': 'inalatorios'
};

// Função principal para processar todos os arquivos
function integrateNewMedications() {
  try {
    console.log('🚀 Iniciando integração dos novos medicamentos...\n');
    
    // Ler todos os arquivos JSON da pasta docs
    const docsPath = 'docs';
    const files = fs.readdirSync(docsPath).filter(file => file.endsWith('.json'));
    
    console.log(`📁 Encontrados ${files.length} arquivos JSON para processar:\n`);
    files.forEach(file => console.log(`   - ${file}`));
    console.log('');
    
    const allCategories = {};
    
    // Processar cada arquivo
    files.forEach(file => {
      try {
        console.log(`📄 Processando ${file}...`);
        const filePath = path.join(docsPath, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        if (!Array.isArray(data)) {
          console.log(`   ⚠️  Arquivo ${file} não contém um array válido, pulando...`);
          return;
        }
        
        // Agrupar por categoria
        data.forEach(item => {
          if (!item.CATEGORIA || !item.MEDICAMENTO) return;
          
          const categoria = item.CATEGORIA;
          if (!allCategories[categoria]) {
            allCategories[categoria] = [];
          }
          
          // Filtrar medicamentos válidos
          if (item.MEDICAMENTO && 
              !Object.keys(categoryFileMapping).includes(item.MEDICAMENTO) &&
              item.MEDICAMENTO.trim() !== '') {
            allCategories[categoria].push(item);
          }
        });
        
        console.log(`   ✅ Processado com sucesso`);
        
      } catch (error) {
        console.log(`   ❌ Erro ao processar ${file}: ${error.message}`);
      }
    });
    
    console.log(`\n📊 Resumo das categorias encontradas:`);
    Object.entries(allCategories).forEach(([categoria, medicamentos]) => {
      console.log(`   - ${categoria}: ${medicamentos.length} medicamentos`);
    });
    console.log('');
    
    // Converter cada categoria
    Object.entries(allCategories).forEach(([categoria, medicamentos]) => {
      if (medicamentos.length === 0) return;
      
      console.log(`🔄 Convertendo categoria: ${categoria} (${medicamentos.length} medicamentos)`);
      
      const convertedMedications = medicamentos.map(item => {
        const medicamento = item.MEDICAMENTO;
        const viaAdministracao = item['VIA DE ADMINISTRAÇÃO'];
        
        return {
          name: medicamento,
          slug: slugify(medicamento),
          form: determineForm(medicamento, viaAdministracao, item.RECONSTITUIÇÃO),
          application: determineApplication(viaAdministracao),
          description: `Medicamento da categoria ${categoria}${item['DOSE USUAL (EM EXIBIÇÃO)'] ? ' - ' + item['DOSE USUAL (EM EXIBIÇÃO)'].substring(0, 100) + '...' : ''}`,
          alerts: item.OBSERVAÇÕES ? [item.OBSERVAÇÕES.substring(0, 150) + (item.OBSERVAÇÕES.length > 150 ? '...' : '')] : ["Seguir orientação médica"],
          commonBrandNames: "Consulte farmácia",
          dosageInformation: {
            concentration: extractConcentration(medicamento),
            usualDose: item['DOSE USUAL (EM EXIBIÇÃO)'] || 'Consulte orientação médica',
            doseInterval: extractDoseInterval(item['DOSE USUAL (EM EXIBIÇÃO)']),
            treatmentDuration: 'Conforme orientação médica',
            administrationNotes: item.OBSERVAÇÕES || 'Seguir orientação médica'
          },
          calculationParams: {
            type: slugify(medicamento),
            logica_js: createCalculationLogic(
              item['MACETE DE CÁLCULO'], 
              item['DOSE USUAL (EM EXIBIÇÃO)'], 
              medicamento
            ),
            doseMinima: item['DOSE MÍNIMA'],
            doseMaxima: item['DOSE MÁXIMA'],
            reconstituicao: item.RECONSTITUIÇÃO,
            diluicao: item.DILUIÇÃO,
            observacoes: item.OBSERVAÇÕES,
            idadeMinima: item['IDADE MÍNIMA'],
            classe: item.CLASSE
          }
        };
      });
      
      // Determinar nome do arquivo
      let fileName = categoryFileMapping[categoria] || slugify(categoria);
      
      // Criar diretório se não existir
      const outputDir = 'src/medications/Categorias';
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputPath = path.join(outputDir, `${fileName}_updated.json`);
      fs.writeFileSync(outputPath, JSON.stringify(convertedMedications, null, 2), 'utf8');
      
      console.log(`   ✅ Salvos ${convertedMedications.length} medicamentos em ${outputPath}`);
    });
    
    console.log('\n🎉 Integração concluída com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Revisar os arquivos gerados em src/medications/Categorias/');
    console.log('2. Atualizar o categoryLoader.ts para incluir as novas categorias');
    console.log('3. Testar a aplicação para verificar se tudo está funcionando');
    
    return true;
    
  } catch (error) {
    console.error('❌ Erro na integração:', error);
    return false;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  integrateNewMedications();
}

module.exports = { integrateNewMedications };