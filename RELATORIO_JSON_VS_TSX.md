# Relatório: Medicamentos JSON vs TSX

**Data da Análise:** 02/02/2026

---

## 📊 Resumo Executivo

| Métrica | Valor |
|---------|-------|
| **Total de medicamentos em JSON** | 371 |
| **Total de arquivos TSX criados** | 228 |
| **Medicamentos apenas em JSON** | ~143 |
| **Taxa de cobertura TSX** | **61.5%** |

---

## 📁 Análise por Categoria

### Categorias com TSX Criado ✅

| Categoria | Medicamentos JSON | Arquivos TSX | Status |
|-----------|-------------------|--------------|--------|
| **Antibióticos** | 83 | 87 | ✅ TSX > JSON |
| **Analgésicos** | 0 | 29 | ✅ 100% TSX |
| **Gastrointestinal** | 20 | 26 | ✅ TSX > JSON |
| **Anti-histamínicos** | 19 | 16 | ⚠️ JSON > TSX |
| **Anticonvulsivantes** | 58 | 7 | ⚠️ JSON >> TSX |
| **Antifúngicos** | 0 | 7 | ✅ 100% TSX |
| **Antiparasitários** | 48 | 9 | ⚠️ JSON >> TSX |
| **Antivirais** | 8 | 3 | ⚠️ JSON > TSX |
| **Corticoides** | 19 | 8 | ⚠️ JSON > TSX |
| **Inalatórios** | 0 | 7 | ✅ 100% TSX |
| **Antitussígenos** | 10 | 20 | ✅ TSX > JSON |
| **Vitaminas** | 0 | 5 | ✅ 100% TSX |
| **Antídotos** | 5 | 4 | ⚠️ JSON > TSX |

---

## ⚠️ Categorias APENAS em JSON (Sem TSX)

As seguintes categorias existem exclusivamente em JSON e **precisam ser criadas em TSX**:

### 🚨 Alta Prioridade - Urgências/UTI (26 medicamentos)

#### 1. PCR (Parada Cardiorrespiratória) - 9 medicamentos
- Adrenalina 1mg/ml (EV em Bolus)
- Amiodarona 50mg/ml (EV em Bolus)
- Cálcio injetável 10% (100mg/ml)
- Lidocaína 20mg/ml (Sem vasoconstritor)
- Bicarbonato de sódio injetável 8,4% (84mg/ml)
- Glicose 10% (Ampola 10 mL)
- Glicose 25% (Ampola 10 mL)
- Glicose 50% (Ampola 10 mL)
- Adenosina injetável 3mg/mL (EV em Bolus)

#### 2. Sedativos - 5 medicamentos
- Ketamina 50 mg/ml (EV)
- Midazolam 15 mg/3ml (IM ou EV) *[nota: já existe midazolam-ev.tsx, pode ser variante]*
- Propofol 10 mg/ml (EV)
- Etomidato 2 mg/ml (EV)
- Fentanil 50 mcg/ml (EV)

#### 3. Bloqueador Neuromuscular - 2 medicamentos
- Brometo de Rocurônio 10mg/ml (EV)
- Succinilcolina 100mg/Pó (EV)

#### 4. Medicação Bradicardia - 1 medicamento
- Atropina 0,25mg/ml (EV)

#### 5. Antieméticos - 13 medicamentos
*Nota: A maioria já tem TSX correspondente, verificar duplicatas*

### 🏥 Uso Tópico (48 medicamentos)

#### 6. Nasais - 5 medicamentos
- Budesonida 32/50/64 mcg (Noex) Aerossol
- Cromoglicato 4% (Rilan) Solução
- Fluticasona 27,5 mcg (Avamys) Spray Nasal

#### 7. Oftalmológicos - ~14 medicamentos únicos
- Lacrfilm (Solução Oftálmica)
- Olopatadina (Patanol S) 1 mg/mL
- Systane Ultra / Hyabak
- Tobramicina 3 mg/mL (Tobrex)
- Tobramicina 3 mg/g Pomada
- Moxifloxacino (VIGAMOX)
- Ciprofloxacino colírio 0,3%

#### 8. Otológicos - ~7 medicamentos únicos
- Biamotil (Ciprofloxacino + Dexametasona)
- Cerumin (Solução Otológica)
- Otociriax (Ciprofloxacino + Hidrocortisona)
- Otosporin (Hidrocortisona + Neomicina + Polimixina B)
- Oto-xilodase (Lidocaína + Neomicina + Hialuronidase)
- Otomixyn/Otosylase/Elotin (Fluocinolona + Polimixina B + Neomicina + Lidocaína)
- Miconazol 2% Loção

### 📋 Outros (5 medicamentos)

#### 9. Carvão Ativado - 1 medicamento
- Carvão Ativado (Pó ou Suspensão) - Oral/SNG

#### 10. Xaropes Tosse - 4 medicamentos
*Nota: Verificar se há overlap com antitussígenos*
- Acebrofilina 25 mg/5 mL
- Hedera helix (Extrato Seco de Hera) *[já existe em antitussigenos]*
- Levodropropizina 30 mg/5 mL *[já existe em antitussigenos]*
- Carbocisteína 20 mg/mL *[já existe em antitussigenos]*

**Total Real: ~82 medicamentos únicos que não têm TSX** (considerando duplicatas)

---

## 🔍 Categorias com Discrepância

### Anticonvulsivantes
- **JSON**: 58 medicamentos
- **TSX**: 7 medicamentos
- **Diferença**: 51 medicamentos em JSON sem TSX correspondente

### Antiparasitários
- **JSON**: 48 medicamentos
- **TSX**: 9 medicamentos  
- **Diferença**: 39 medicamentos em JSON sem TSX correspondente

### Corticoides
- **JSON**: 19 medicamentos
- **TSX**: 8 medicamentos
- **Diferença**: 11 medicamentos em JSON sem TSX correspondente

### Antivirais
- **JSON**: 8 medicamentos
- **TSX**: 3 medicamentos
- **Diferença**: 5 medicamentos em JSON sem TSX correspondente

---

## ✅ Categorias 100% em TSX (Sem JSON)

Estas categorias foram criadas diretamente em TSX e **não dependem de JSON**:

1. ✅ **Analgésicos** - 29 medicamentos TSX
2. ✅ **Antifúngicos** - 7 medicamentos TSX
3. ✅ **Inalatórios** - 7 medicamentos TSX
4. ✅ **Vitaminas** - 5 medicamentos TSX

---

## 💡 Recomendações

### 1. Migração Prioritária

**Categorias que podem migrar 100% para TSX imediatamente:**
- ✅ Analgésicos (já 100% TSX)
- ✅ Antifúngicos (já 100% TSX)
- ✅ Inalatórios (já 100% TSX)
- ✅ Vitaminas (já 100% TSX)
- ✅ Antitussígenos (TSX > JSON)
- ✅ Antibióticos (TSX > JSON)

### 2. Criação de TSX Necessária

**Categorias críticas que precisam de TSX:**
- 🚨 **PCR (Parada Cardiorrespiratória)** - 9 medicamentos
- 🚨 **Bloqueador Neuromuscular** - 2 medicamentos
- 🚨 **Sedativos** - 5 medicamentos
- 🚨 **Medicação Bradicardia** - 1 medicamento
- 🚨 **Antieméticos** - 31 medicamentos (13 + 18)
- 📋 **Nasais** - 5 medicamentos
- 📋 **Oftalmológicos** - 21 medicamentos (7 + 14)
- 📋 **Otológicos** - 7 medicamentos
- 📋 **Carvão Ativado** - 1 medicamento
- 📋 **Xaropes Tosse** - 4 medicamentos

### 3. Complementar Categorias Parciais

**Categorias que têm TSX mas faltam medicamentos:**
- ⚠️ **Anticonvulsivantes** - Criar mais 51 medicamentos
- ⚠️ **Antiparasitários** - Criar mais 39 medicamentos
- ⚠️ **Corticoides** - Criar mais 11 medicamentos
- ⚠️ **Antivirais** - Criar mais 5 medicamentos
- ⚠️ **Anti-histamínicos** - Criar mais 3 medicamentos
- ⚠️ **Antídotos** - Criar mais 1 medicamento

---

## 🎯 Plano de Ação Sugerido

### Fase 1: Configurar Sistema Híbrido ⚙️
Modificar `categoryLoader.ts` para:
1. ✅ Criar loader dinâmico de arquivos TSX
2. ✅ Tentar carregar medicamentos de arquivos TSX primeiro
3. ✅ Usar JSON como fallback se TSX não existir

**Benefício:** Permite usar TSX imediatamente onde existe, mantendo compatibilidade com JSON legado.

### Fase 2: Migração Imediata (228 medicamentos já prontos!) ✅
Categorias já 100% em TSX e prontas para migração:
- ✅ **Antibióticos** - 87 TSX (migrar imediatamente)
- ✅ **Analgésicos** - 29 TSX (migrar imediatamente)
- ✅ **Gastrointestinal** - 26 TSX (migrar imediatamente)
- ✅ **Anti-histamínicos** - 16 TSX (migrar imediatamente)
- ✅ **Antifúngicos** - 7 TSX (migrar imediatamente)
- ✅ **Inalatórios** - 7 TSX (migrar imediatamente)
- ✅ **Antitussígenos** - 20 TSX (migrar imediatamente)
- ✅ **Vitaminas** - 5 TSX (migrar imediatamente)
- ✅ **Antiparasitários** - 9 TSX (cobrir os principais)
- ✅ **Antivirais** - 3 TSX (cobrir os principais)
- ✅ **Corticoides** - 8 TSX (cobrir os principais)
- ✅ **Anticonvulsivantes** - 7 TSX (cobrir os principais)
- ✅ **Antídotos** - 4 TSX (cobrir os principais)

### Fase 3: Criação de Categorias Críticas (26 medicamentos) 🚨

**Prioridade MÁXIMA - Urgência/UTI:**

#### 3.1 PCR (9 medicamentos) - CRÍTICO
- Adrenalina, Amiodarona, Adenosina
- Cálcio, Bicarbonato de sódio
- Glicose 10%, 25%, 50%
- Lidocaína

#### 3.2 Sedativos (5 medicamentos) - CRÍTICO
- Ketamina, Propofol, Etomidato, Fentanil
- Midazolam 15mg/3ml (verificar se difere do existente)

#### 3.3 Bloqueador Neuromuscular (2 medicamentos) - CRÍTICO
- Rocurônio, Succinilcolina

#### 3.4 Medicação Bradicardia (1 medicamento)
- Atropina

#### 3.5 Carvão Ativado (1 medicamento)
- Carvão Ativado (intoxicações)

### Fase 4: Uso Tópico (48 medicamentos) 👁️👂

#### 4.1 Nasais (5 medicamentos)
- Budesonida nasal (3 concentrações)
- Cromoglicato nasal
- Fluticasona nasal

#### 4.2 Oftalmológicos (~14 medicamentos)
- Lubrificantes oculares
- Antibióticos tópicos
- Anti-alérgicos

#### 4.3 Otológicos (~7 medicamentos)
- Antibióticos otológicos
- Combinações para otite

### Fase 5: Complementação Opcional (variantes adicionais)
Complementar categorias que já têm TSX mas têm variantes extras em JSON:
- Anticonvulsivantes (verificar variantes)
- Antiparasitários (verificar variantes)
- Corticoides (verificar variantes)
- Antivirais (verificar variantes)

---

## 📝 Notas Técnicas

### Arquivos JSON Encontrados
Total: 30 arquivos JSON em `src/medications/Categorias/`

### Estrutura Atual
- JSONs organizados por categoria com sufixos `_fixed`, `_updated`
- TSX organizados por categoria e via de administração (vo, ev, im)
- Alguns medicamentos duplicados entre `_fixed` e `_updated`

### Observações
- Há mais arquivos TSX de antibióticos do que entradas JSON (87 vs 83), indicando que alguns TSX são exclusivos
- Categorias como anticonvulsivantes têm 58 em JSON mas apenas 7 em TSX, sugerindo que os JSONs têm mais variantes ou dosagens
- Algumas categorias clínicas importantes (PCR, sedativos, bloqueadores) existem apenas em JSON

---

## 🎯 LISTA PRIORIZADA DE CRIAÇÃO

### 🔴 Prioridade 1 - URGENTE (18 medicamentos)
**Medicamentos de emergência/UTI que salvam vidas:**

1. **PCR** (9): Adrenalina, Amiodarona, Adenosina, Cálcio, Bicarbonato, Glicoses, Lidocaína
2. **Sedativos** (5): Ketamina, Propofol, Etomidato, Fentanil, Midazolam variante
3. **Bloqueadores** (2): Rocurônio, Succinilcolina
4. **Bradicardia** (1): Atropina
5. **Intoxicação** (1): Carvão Ativado

### 🟡 Prioridade 2 - ALTA (48 medicamentos)
**Medicamentos de uso tópico frequente:**

1. **Oftalmológicos** (~14): Colírios antibióticos, lubrificantes, anti-alérgicos
2. **Otológicos** (~7): Gotas otológicas para otite
3. **Nasais** (5): Corticoides nasais, antialérgicos

### 🟢 Prioridade 3 - MÉDIA (variantes adicionais)
**Complementar categorias existentes com variantes:**

1. Anticonvulsivantes - variantes adicionais
2. Antiparasitários - variantes adicionais  
3. Corticoides - variantes adicionais
4. Xaropes tosse - medicamentos adicionais

---

## 💻 Próximos Passos Técnicos

### 1. Implementar Loader Híbrido
```typescript
// Exemplo de implementação sugerida
import * as tsxMedications from '@/medications';

function loadMedication(category: string, medicationId: string) {
  // Tentar TSX primeiro
  const tsxMed = tsxMedications[category]?.[medicationId];
  if (tsxMed) return tsxMed;
  
  // Fallback para JSON
  return loadFromJson(category, medicationId);
}
```

### 2. Migrar Categorias 100% TSX
Remover imports de JSON para categorias que já têm 100% TSX:
- Analgésicos
- Antifúngicos
- Inalatórios
- Vitaminas

### 3. Documentar Medicamentos Restantes
Manter este relatório atualizado conforme novos TSX são criados.

---

**Gerado automaticamente em:** 02/02/2026  
**Última atualização:** 02/02/2026
