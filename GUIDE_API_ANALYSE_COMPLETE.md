# 📚 Guide API - Analyse Complète Pédagogique

## 🎯 Nouvelle API : `/api/analyse-complete`

Analyse financière **révolutionnaire** avec BFR, CAF, Flux de trésorerie, Benchmark sectoriel et Analyse IA structurée.

---

## 🚀 Fonctionnalités

### Calculs Financiers Complets

1. **SIG** (Soldes Intermédiaires de Gestion)
   - Production de l'exercice
   - Valeur ajoutée
   - EBE (EBITDA)
   - Résultat d'exploitation
   - Résultat net

2. **BFR** (Besoin en Fonds de Roulement)
   - BFR en euros
   - BFR en jours de CA
   - Décomposition (stocks, créances, dettes)
   - Explications pédagogiques

3. **CAF** (Capacité d'Autofinancement)
   - CAF calculée
   - Ratio CAF/CA
   - Détail du calcul

4. **Flux de Trésorerie**
   - Flux opérationnels
   - Flux d'investissement
   - Flux de financement
   - Storytelling automatique

5. **32 Ratios Financiers**
   - Structure financière (7 ratios)
   - Rentabilité (7 ratios)
   - Liquidité (2 ratios)
   - Activité (4 ratios)
   - Délais (4 ratios)
   - Valorisation (2 ratios)

6. **Benchmark Sectoriel**
   - Comparaison vs 7 secteurs
   - Position (score/100)
   - Forces vs secteur
   - Faiblesses vs secteur

7. **Analyse IA Pédagogique Structurée**
   - Résumé exécutif (note/10)
   - Analyses détaillées par thème
   - Storytelling financier
   - Métaphores accessibles
   - Plan d'apprentissage
   - Exercices suggérés

---

## 📡 Endpoint

```http
POST /api/analyse-complete
Content-Type: application/json
```

### Requête Minimale

```json
{
  "chiffre_affaires": 2500000,
  "achats_consommes": 1200000,
  "charges_personnel": 700000,
  "total_actif": 1800000,
  "capitaux_propres": 750000,
  "creances_clients": 320000,
  "dettes_fournisseurs": 240000,
  "secteur": "industrie"
}
```

### Requête Complète

```json
{
  "chiffre_affaires": 2500000,
  "autres_produits_exploitation": 50000,
  "achats_consommes": 1200000,
  "autres_charges_externes": 350000,
  "impots_taxes": 45000,
  "charges_personnel": 700000,
  "dotations_amortissements": 150000,
  "autres_charges_exploitation": 25000,
  "produits_financiers": 5000,
  "charges_financieres": 35000,
  "produits_exceptionnels": 10000,
  "charges_exceptionnelles": 8000,
  "impot_benefices": 65000,
  
  "total_actif": 1800000,
  "capitaux_propres": 750000,
  "immobilisations_corporelles": 800000,
  "immobilisations_incorporelles": 50000,
  "stocks_matieres_premieres": 100000,
  "stocks_produits_finis": 180000,
  "creances_clients": 320000,
  "disponibilites": 150000,
  "capital_social": 500000,
  "reserves": 200000,
  "dettes_financieres": 600000,
  "emprunts_long_terme": 400000,
  "emprunts_court_terme": 200000,
  "dettes_fournisseurs": 240000,
  "dettes_fiscales_sociales": 95000,
  
  "investissements_annee": 100000,
  "cessions_immobilisations": 20000,
  "nouveaux_emprunts": 150000,
  "remboursements_emprunts": 80000,
  "dividendes_verses": 30000,
  
  "secteur": "industrie",
  "niveau": "débutant"
}
```

### Champs Optionnels

| Champ | Description | Défaut |
|-------|-------------|--------|
| `secteur` | commerce, industrie, services, btp, restauration, technologie, agriculture, sante, autre | `"autre"` |
| `niveau` | débutant, intermédiaire, avancé | `"débutant"` |
| `effectif` | Nombre de salariés | `null` |

---

## 📤 Réponse

### Structure JSON

```json
{
  "success": true,
  "timestamp": "2025-10-22T06:45:18.709871",
  
  "analyse_pedagogique": {
    "resume_executif": {
      "synthese_1_phrase": "Description en 1 phrase",
      "note_globale": 7.5,
      "niveau_sante_financiere": "🟢 Bonne santé",
      "forces_principales": ["Force 1", "Force 2", "Force 3"],
      "faiblesses_principales": ["Faiblesse 1", "Faiblesse 2"],
      "actions_urgentes": ["Action 1"]
    },
    
    "analyse_activite": {
      "constat_chiffre": "Observation factuelle",
      "explication_simple": "Explication accessible",
      "interpretation": "🟢/🟡/🔴 Jugement",
      "points_cles": ["Point 1", "Point 2"],
      "pour_approfondir": "Suggestion"
    },
    
    "analyse_rentabilite": {
      "constat_chiffre": "Marges observées",
      "explication_simple": "Sur 100€ vendus...",
      "schema_simplifie": {
        "ca_base_100": 100,
        "moins_couts_variables": -48,
        "marge_brute": 52,
        "moins_couts_fixes": -45,
        "resultat_net": 7
      },
      "interpretation": "🟢 Bonne rentabilité",
      "comparaison_sectorielle": "Position vs secteur",
      "levier_amelioration": "Comment améliorer"
    },
    
    "analyse_tresorerie_bfr": {
      "constat_bfr": "BFR en jours et montant",
      "explication_cycle": "Cycle d'exploitation expliqué",
      "visualisation_cycle": {
        "jour_0": "Achat matières",
        "jour_X": "Production",
        "jour_Y": "Vente",
        "jour_Z": "Encaissement",
        "probleme_identifie": "Écart identifié"
      },
      "impact_concret": "Montant immobilisé",
      "interpretation": "🟡 Attention",
      "actions_concretes": ["Action 1", "Action 2", "Action 3"]
    },
    
    "analyse_structure_financiere": {
      "constat_equilibre": "Répartition CP vs Dettes",
      "metaphore_accessible": "Comme acheter une maison...",
      "interpretation": "🟢 Structure saine",
      "capacite_remboursement": "X années",
      "recommandation": "Maintenir/améliorer"
    },
    
    "flux_tresorerie_storytelling": {
      "histoire_complete": "Récit des flux",
      "probleme_principal": "Point de tension",
      "solution_proposee": "Comment résoudre",
      "scenario_impact": "Impact chiffré"
    },
    
    "storytelling_financier": {
      "metaphore_generale": "Métaphore globale",
      "scenario_actuel": "Situation présente",
      "risque_si_rien": "Risque statu quo",
      "opportunite_si_action": "Gain potentiel"
    },
    
    "apprentissage_cible": {
      "concepts_a_comprendre": ["Concept 1", "Concept 2"],
      "exercices_pratiques": ["Exercice 1", "Exercice 2"],
      "ressources_suggerees": ["Ressource 1", "Ressource 2"]
    },
    
    "plan_action_pedagogique": {
      "court_terme": ["Action immédiate 1", "Action 2"],
      "moyen_terme": ["Objectif 3-6 mois"],
      "long_terme": ["Vision stratégique"]
    }
  },
  
  "calculs_detailles": {
    "sig": {
      "production_exercice": 2500000,
      "valeur_ajoutee": 950000,
      "excedent_brut_exploitation": 205000,
      "ebitda": 205000,
      "resultat_exploitation": 55000,
      "resultat_courant_avant_impot": 20000,
      "resultat_exceptionnel": 0,
      "resultat_net": 20000
    },
    
    "ratios_base": {
      "structure_financiere": {
        "ratio_endettement": 0.4444,
        "autonomie_financiere": 0.5556,
        "gearing": 0.8
      },
      "rentabilite": {
        "marge_nette": 0.008,
        "roe": 0.0267,
        "roa": 0.0111,
        "rentabilite_economique": 0.0306
      },
      "liquidite": {
        "ratio_liquidite_generale": 2.7083,
        "ratio_liquidite_immediate": 1.9583
      },
      "activite": {
        "rotation_stocks": 8.9286,
        "delai_clients": 46.08,
        "delai_fournisseurs": 34.56
      }
    },
    
    "bfr": {
      "composantes": {
        "stocks": 280000,
        "creances_exploitation": 320000,
        "total_actif_exploitation": 600000,
        "dettes_fournisseurs": 240000,
        "dettes_fiscales_sociales": 95000,
        "total_passif_exploitation": 335000
      },
      "bfr": 265000,
      "bfr_jours_ca": 38.2,
      "explication_pedagogique": {
        "formule": "BFR = (Stocks + Créances) - Dettes fournisseurs",
        "interpretation": "L'entreprise a besoin de 265,000€ pour financer son cycle",
        "en_jours": "38 jours de CA immobilisés"
      }
    },
    
    "caf": {
      "calcul": {
        "resultat_net": 20000,
        "plus_dotations_amortissements": 150000,
        "egale_caf": 170000
      },
      "caf": 170000,
      "caf_ratio_ca": 0.068,
      "explication_pedagogique": {
        "definition": "La CAF mesure les ressources générées",
        "interpretation": "L'entreprise génère 170,000€ de cash",
        "ratio_ca": "6.8% du CA transformé en trésorerie"
      }
    },
    
    "flux_tresorerie": {
      "flux_operationnels": {
        "caf": 170000,
        "variation_bfr": 0,
        "total": 170000,
        "explication": "Cash généré par l'activité"
      },
      "flux_investissement": {
        "acquisitions": 0,
        "cessions": 0,
        "total": 0,
        "explication": "Cash investi dans l'outil de production"
      },
      "flux_financement": {
        "emprunts_nouveaux": 0,
        "remboursements": 0,
        "dividendes": 0,
        "total": 0,
        "explication": "Cash levé ou remboursé"
      },
      "variation_tresorerie": 170000,
      "storytelling": "✅ L'activité génère 170,000€ | Résultat: trésorerie en hausse"
    },
    
    "ratios_etendus": {
      "structure_financiere": {
        "fonds_roulement": 750000,
        "fonds_roulement_net": 485000,
        "capacite_remboursement_annees": 3.53,
        "couverture_interets": 1.57
      },
      "rentabilite": {
        "marge_brute": 0.52,
        "taux_valeur_ajoutee": 0.38,
        "taux_marge_ebe": 0.082,
        "marge_ebitda": 0.082,
        "marge_ebit": 0.022,
        "roce": 0.0407
      },
      "activite": {
        "rotation_actif_total": 1.39,
        "rotation_actif_circulant": 4.17,
        "productivite_personnel": 1357
      },
      "delais_jours": {
        "rotation_stocks": 40.3,
        "delai_clients": 46.1,
        "delai_fournisseurs": 34.6,
        "cycle_exploitation_total": 51.8
      }
    }
  },
  
  "benchmark_sectoriel": {
    "secteur": "Industrie manufacturière",
    "position_globale": "Bon - Médiane du secteur",
    "score_global": 55.5,
    "comparaisons_detaillees": {
      "marge_nette": {
        "votre_valeur": 0.008,
        "mediane_secteur": 0.05,
        "ecart_pourcent": -84,
        "interpretation": "🔴 Inférieur"
      },
      "roe": {
        "votre_valeur": 0.0267,
        "mediane_secteur": 0.12,
        "ecart_pourcent": -77.8,
        "interpretation": "🔴 Inférieur"
      },
      "bfr_jours_ca": {
        "votre_valeur": 38.2,
        "mediane_secteur": 70,
        "ecart_pourcent": -45.4,
        "interpretation": "🟢 Meilleur"
      }
    },
    "conseils_sectoriels": [
      "Investir dans productivité",
      "Maîtriser BFR élevé",
      "Surveiller capacité remboursement"
    ]
  },
  
  "forces_vs_secteur": [
    "bfr_jours_ca: 38.2 vs 70 (médiane)",
    "autonomie_financiere: 0.556 vs 0.45 (médiane)"
  ],
  
  "faiblesses_vs_secteur": [
    "marge_nette: 0.008 vs 0.05 (médiane)",
    "roe: 0.027 vs 0.12 (médiane)"
  ],
  
  "stats": {
    "nb_ratios_calcules": 32,
    "bfr_jours_ca": 38.2,
    "caf_ratio_ca": 6.8,
    "flux_tresorerie_total": 170000,
    "score_benchmark": 55.5
  }
}
```

---

## 🎨 Secteurs Disponibles

| Secteur | Nom Complet | Ratios Médians |
|---------|-------------|----------------|
| `commerce` | Commerce de détail | Marge 2.5%, ROE 10%, BFR 5j |
| `industrie` | Industrie manufacturière | Marge 5%, ROE 12%, BFR 70j |
| `services` | Services aux entreprises | Marge 8%, ROE 15%, BFR 45j |
| `btp` | Bâtiment et Travaux Publics | Marge 3%, ROE 10%, BFR 60j |
| `restauration` | Restauration | Marge 4%, ROE 12%, BFR -20j |
| `technologie` | Technologies et Numérique | Marge 10%, ROE 18%, BFR 20j |
| `agriculture` | Agriculture | Marge 4%, ROE 8%, BFR 90j |
| `sante` | Santé | Marge 7%, ROE 14%, BFR 35j |
| `autre` | Autres secteurs | Valeurs moyennes |

---

## 📊 Exemples d'Utilisation

### Test Simple

```bash
curl -X POST http://localhost:8000/api/analyse-complete \
  -H "Content-Type: application/json" \
  -d '{
    "chiffre_affaires": 1000000,
    "achats_consommes": 500000,
    "charges_personnel": 300000,
    "total_actif": 800000,
    "capitaux_propres": 400000,
    "creances_clients": 150000,
    "dettes_fournisseurs": 100000,
    "secteur": "services"
  }'
```

### Test Complet avec JavaScript

```javascript
const analyser = async () => {
  const response = await fetch('http://localhost:8000/api/analyse-complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chiffre_affaires: 2500000,
      achats_consommes: 1200000,
      charges_personnel: 700000,
      dotations_amortissements: 150000,
      total_actif: 1800000,
      capitaux_propres: 750000,
      stocks_matieres_premieres: 100000,
      stocks_produits_finis: 180000,
      creances_clients: 320000,
      disponibilites: 150000,
      dettes_financieres: 600000,
      dettes_fournisseurs: 240000,
      secteur: 'industrie',
      niveau: 'débutant'
    })
  });
  
  const data = await response.json();
  
  console.log('Note globale:', data.analyse_pedagogique.resume_executif.note_globale);
  console.log('BFR (jours):', data.stats.bfr_jours_ca);
  console.log('Score benchmark:', data.stats.score_benchmark);
};
```

---

## 🚦 Codes Retour

| Code | Description |
|------|-------------|
| 200 | Succès - Analyse complète retournée |
| 400 | Requête invalide - Champs manquants |
| 500 | Erreur serveur - Voir détail |
| 503 | Modules non chargés |

---

## 💡 Bonnes Pratiques

1. **Données Minimales** : Fournir au minimum CA, achats, charges personnel, actif, capitaux propres
2. **Secteur** : Toujours spécifier le secteur pour benchmark pertinent
3. **Niveau** : Adapter au public (débutant par défaut)
4. **Données Complètes** : Plus de données = analyse plus précise
5. **BFR** : Fournir stocks, créances, dettes pour calcul précis

---

## 🔧 Dépannage

### Erreur: "Modules non chargés"
- Vérifier que tous les modules Python sont importés
- Relancer le backend

### Analyse IA vide ou basique
- Vérifier que `OPENAI_API_KEY` est dans `.env`
- L'IA retourne une analyse fallback sans clé

### BFR = 0
- Fournir `stocks_matieres_premieres`, `stocks_produits_finis`, `creances_clients`, `dettes_fournisseurs`

---

## 📈 Performance

- **Temps réponse moyen** : 2-4 secondes avec IA
- **Temps réponse fallback** : < 1 seconde sans IA
- **Coût IA par analyse** : ~0.003€ (GPT-4o-mini)
- **Ratios calculés** : 32
- **Lignes d'analyse** : 500-1500 (selon niveau)

---

**API prête pour production ! 🚀**
