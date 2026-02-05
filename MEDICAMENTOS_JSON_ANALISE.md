# Análise: Medicamentos JSON da Plataforma

**Data:** 02/02/2026  
**Total JSON:** 371 medicamentos em 30 arquivos

---

## 📊 Resumo Executivo

| Métrica | Quantidade | % |
|---------|------------|---|
| **Total medicamentos JSON** | 371 | 100% |
| **Tem no Excel Dr. Arthur** | 137 | 37% |
| **NÃO tem no Excel** | 234 | 63% |

---

## 📁 Categorias JSON por Cobertura no Excel

### ✅ 100% no Excel (Podem Migrar para TSX Priority)

| Categoria | Medicamentos | No Excel |
|-----------|--------------|----------|
| **antiemeticos_fixed** | 13 | 13 (100%) |
| **antiemético** | 18 | 18 (100%) |
| **corticoides_ev_fixed** | 10 | 10 (100%) |
| **pcr_fixed** | 9 | 9 (100%) |
| **oftalmologicos_fixed** | 7 | 7 (100%) |
| **nasais_fixed** | 5 | 5 (100%) |
| **xaropes_tosse_fixed** | 4 | 4 (100%) |
| **carvao_ativado_fixed** | 1 | 1 (100%) |
| **medicacao_bradicardia_fixed** | 1 | 1 (100%) |
| **antimicrobianos_fixed** | 1 | 1 (100%) |

**Total:** 69 medicamentos confirmados pelo Excel ✅

---

### 🟡 Alta Cobertura (>70%)

| Categoria | Medicamentos | No Excel | % |
|-----------|--------------|----------|---|
| oftalmologicos_otologicos_fixed | 14 | 13 | 93% |
| otologicos_fixed | 7 | 6 | 86% |
| antibioticos_vo_fixed | 6 | 5 | 83% |
| antibioticos_ev_fixed | 17 | 13 | 76% |
| antibioticos_fixed | 25 | 18 | 72% |

---

### 🔴 Sem Cobertura no Excel (0%)

| Categoria | Medicamentos | Status |
|-----------|--------------|--------|
| anti-histaminicos_updated | 19 | ⚠️ Verificar se são duplicatas do _fixed |
| antibioticos_updated | 33 | ⚠️ Verificar se são duplicatas |
| anticonvulsivantes_updated | 48 | ⚠️ Muitos, verificar |
| antiparasitarios_updated | 48 | ⚠️ TSX tem 9, revisar |
| antitussigenos_updated | 10 | ⚠️ TSX tem 20, revisar |
| corticoides-ev_updated | 9 | ⚠️ _fixed tem cobertura |
| expectorantes-mucoliticos_updated | 14 | ⚠️ TSX tem vários |
| gastrointestinal_updated | 20 | ⚠️ TSX tem 26 |
| antivirais_updated | 4 | ⚠️ Excel tem Oseltamivir |
| antidotos_updated | 5 | ⚠️ TSX tem 4 |
| antibioticos_im_fixed | 2 | ⚠️ Excel tem Penicilina Benzatina |
| sedativos_fixed | 5 | 60% no Excel |
| bloqueador_neuromuscular_fixed | 2 | 50% no Excel |

---

## 🎯 Categorias JSON que DEVEM Migrar para TSX

### 🔴 Prioridade MÁXIMA (Excel confirma, críticas)

#### 1. PCR (9 medicamentos) - 100% validado ✅
- Adrenalina, Amiodarona, Adenosina
- Cálcio, Lidocaína, Bicarbonato
- Glicose 10%, 25%, 50%

#### 2. Antieméticos (31 medicamentos) - 100% validado ✅
- Ondansetrona, Bromoprida, Metoclopramida, Domperidona
- Omeprazol, Ranitidina, Simeticona

#### 3. Sedativos (5 medicamentos) - 60% validado
- Ketamina, Propofol, Midazolam, Etomidato, Fentanil

#### 4. Corticoides EV _fixed (10 medicamentos) - 100% validado ✅
- Hidrocortisona, Metilprednisolona, Dexametasona, Sulfato de Magnésio

#### 5. Bloqueadores (2 medicamentos) - 50% validado
- Rocurônio, Succinilcolina

---

### 🟡 Prioridade MÉDIA (Uso Tópico)

#### 6. Oftalmológicos + Otológicos (28 medicamentos) - ~93% validado
- Colírios, pomadas, gotas otológicas

#### 7. Nasais (5 medicamentos) - 100% validado
- Budesonida nasal, Cromoglicato, Fluticasona

---

### 🟢 Prioridade BAIXA (Revisar Duplicatas)

Categorias `_updated` que provavelmente são **duplicatas** dos `_fixed`:
- anticonvulsivantes_updated (48) - Revisar se não são duplicatas
- antiparasitarios_updated (48) - TSX já tem 9, revisar resto
- antibioticos_updated (33) - Revisar variantes

---

## 💡 Recomendação de Migração

### Fase 1: Criar TSX para Categorias Críticas (57 medicamentos)
1. ✅ PCR (9) - **URGENTE**
2. ✅ Antieméticos (31) - **ALTA PRIORIDADE**
3. ✅ Sedativos (5) - **URGENTE**
4. ✅ Corticoides EV _fixed (10) - **Já tem TSX parcial (8), complementar**
5. ✅ Bloqueadores (2) - **URGENTE**

### Fase 2: Uso Tópico (33 medicamentos)
6. Oftalmológicos-Otológicos (28)
7. Nasais (5)

### Fase 3: Limpar Duplicatas
- Revisar arquivos `_updated` vs `_fixed`
- Consolidar e remover duplicatas
- Atualizar apenas os que são realmente diferentes

---

## 📈 Status Atual

| Tipo | Quantidade | Status |
|------|------------|--------|
| **TSX** | 228 | ✅ Funcionando |
| **JSON Validado (Excel)** | 137 | ⚠️ Aguardando migração |
| **JSON Não Validado** | 234 | ⚠️ Revisar se são duplicatas |
| **TOTAL** | 599 | |

---

## 🎊 Conclusão

1. **69 medicamentos JSON** estão 100% validados pelo Excel e devem ser migrados para TSX (prioridade máxima)
2. **68 medicamentos JSON** têm boa cobertura no Excel (70%+)
3. **234 medicamentos JSON** não têm no Excel, mas podem ser duplicatas ou variantes

**Ação recomendada:** Criar TSX para os 69 medicamentos validados (PCR, Antieméticos, Sedativos, Tópicos)

---

**Gerado em:** 02/02/2026
