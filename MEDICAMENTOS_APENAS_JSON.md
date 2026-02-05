# Medicamentos que Existem APENAS em JSON

**Data:** 02/02/2026 | **Total:** 82 medicamentos únicos

---

## 🔴 PRIORIDADE 1 - URGÊNCIA/UTI (18 medicamentos)

### PCR - Parada Cardiorrespiratória (9)
1. Adrenalina 1mg/ml (EV em Bolus)
2. Amiodarona 50mg/ml (EV em Bolus)
3. Adenosina injetável 3mg/mL (EV em Bolus)
4. Cálcio injetável 10% (100mg/ml)
5. Lidocaína 20mg/ml (Sem vasoconstritor)
6. Bicarbonato de sódio 8,4% (84mg/ml)
7. Glicose 10% (Ampola 10 mL)
8. Glicose 25% (Ampola 10 mL)
9. Glicose 50% (Ampola 10 mL)

### Sedativos - Intubação/Procedimentos (5)
10. Ketamina 50 mg/ml (EV)
11. Propofol 10 mg/ml (EV)
12. Etomidato 2 mg/ml (EV)
13. Fentanil 50 mcg/ml (EV)
14. Midazolam 15 mg/3ml (IM ou EV) - *verificar se difere do existente*

### Bloqueadores Neuromusculares (2)
15. Brometo de Rocurônio 10mg/ml (EV)
16. Succinilcolina 100mg/Pó (EV)

### Outros Emergência (2)
17. Atropina 0,25mg/ml (EV) - *para bradicardia*
18. Carvão Ativado (Pó/Suspensão) - *intoxicações*

---

## 🟡 PRIORIDADE 2 - USO TÓPICO (26 medicamentos)

### Nasais (5)
1. Budesonida 32 mcg (Noex) Aerossol
2. Budesonida 50 mcg (Noex) Aerossol
3. Budesonida 64 mcg (Noex) Aerossol
4. Cromoglicato 4% (Rilan) Solução
5. Fluticasona 27,5 mcg (Avamys) Spray Nasal

### Oftalmológicos (14)
6. Lacrfilm (Solução Oftálmica)
7. Cloridrato de Olopatadina (Patanol S) 1 mg/mL
8. Systane Ultra / Hyabak
9. Tobramicina 3 mg/mL (Tobrex) Colírio
10. Tobramicina 3 mg/g Pomada Oftálmica
11. Moxifloxacino (VIGAMOX)
12. Ciprofloxacino colírio 0,3%

### Otológicos (7)
13. Biamotil (Ciprofloxacino + Dexametasona) Otológico
14. Cerumin (Solução Otológica)
15. Otociriax (Ciprofloxacino + Hidrocortisona)
16. Otosporin (Hidrocortisona + Neomicina + Polimixina B)
17. Oto-xilodase (Lidocaína + Neomicina + Hialuronidase)
18. Otomixyn/Otosylase/Elotin (Fluocinolona + Polimixina + Neomicina + Lidocaína)
19. Miconazol 2% Loção

---

## 🟢 PRIORIDADE 3 - COMPLEMENTAÇÃO (variantes)

### Anticonvulsivantes
- Lorazepam 2mg/ml (EV)
- *+ variantes adicionais em JSON*

### Antiparasitários
- *Verificar variantes específicas em antiparasitarios_updated.json*

### Antieméticos
- *A maioria já tem TSX, verificar se há variantes faltando*

### Xaropes Tosse (verificar duplicatas)
- Acebrofilina 25 mg/5 mL
- ~~Hedera helix~~ (já existe em antitussigenos)
- ~~Levodropropizina~~ (já existe em antitussigenos)
- ~~Carbocisteína~~ (já existe em antitussigenos)

---

## 📊 Resumo Quantitativo

| Prioridade | Categoria | Quantidade | Status |
|------------|-----------|------------|--------|
| 🔴 **P1** | **Urgência/UTI** | **18** | **Crítico** |
| 🟡 **P2** | **Uso Tópico** | **26** | **Alta** |
| 🟢 **P3** | **Variantes** | **~38** | **Média** |
| **TOTAL** | | **~82** | |

---

## ✅ Ação Recomendada

**Para usar TSX imediatamente:**
1. Implementar loader híbrido (TSX primeiro, JSON fallback)
2. Migrar as 13 categorias que já estão 100% em TSX
3. Criar os 18 medicamentos de urgência/UTI (Prioridade 1)
4. Gradualmente criar medicamentos tópicos conforme necessidade

**Resultado esperado:**
- **Cobertura imediata:** 228 medicamentos em TSX (61.5%)
- **Após P1:** 246 medicamentos (66.3%)
- **Após P1+P2:** 272 medicamentos (73.3%)

---

**Gerado em:** 02/02/2026
