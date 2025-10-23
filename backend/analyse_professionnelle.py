"""
Module d'analyse financière professionnelle avec prompt analyste senior
Génère un audit financier complet sur 10 pages avec tous les ratios et analyses
"""

import os
from typing import Dict, Any, Optional
from openai import AsyncOpenAI
from dotenv import load_dotenv
from modeles_entreprise import DonneesAuditComplet, EtatFinancierAnnuel

load_dotenv()


class AnalyseurProfessionnel:
    """
    Analyseur financier professionnel utilisant GPT-4o-mini
    Génère des audits financiers complets de niveau expert
    """
    
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        self.has_openai = api_key is not None and api_key != ""
        
        if self.has_openai:
            self.client = AsyncOpenAI(api_key=api_key)
            print("✓ AnalyseurProfessionnel initialisé avec OpenAI")
        else:
            self.client = None
            print("⚠️ AnalyseurProfessionnel sans clé OpenAI - mode fallback")
    
    def _construire_prompt_systeme(self) -> str:
        """Prompt système pour définir le rôle de l'analyste"""
        return """Tu es un analyste financier confirmé avec plus de 10 ans d'expérience dans le financement des professionnels. 
Tu es capable d'analyser des états financiers complexes, d'interpréter une large gamme de ratios financiers et d'évaluer la solvabilité d'une entreprise avec une grande précision.

Ton objectif est de fournir un audit financier complet et une analyse détaillée pour justifier une décision d'octroi de crédit, en considérant différents scénarios.

IMPORTANT :
- Analyse TOUS les ratios financiers mentionnés dans les instructions
- Compare TOUJOURS aux normes du secteur
- Fournis des interprétations précises et professionnelles
- Utilise un ton professionnel adapté à un comité de crédit
- Structure ta réponse en 10 sections claires
- Justifie chaque conclusion par des chiffres
"""
    
    def _construire_prompt_utilisateur(self, donnees: DonneesAuditComplet, calculs: Dict[str, Any]) -> str:
        """Construit le prompt utilisateur avec toutes les données"""
        
        entreprise = donnees.entreprise
        n = donnees.annee_n
        n1 = donnees.annee_n1
        n2 = donnees.annee_n2
        
        # Données de base
        prompt = f"""AUDIT FINANCIER COMPLET

ENTREPRISE : {entreprise.nom}
Forme juridique : {entreprise.forme_juridique}
Capital : {n.capital_social:,.0f} €
Secteur : {entreprise.secteur_activite}
Activité : {entreprise.activite_principale or 'Non précisée'}
Année de création : {entreprise.annee_creation or 'Non précisée'}
"""
        
        # Demande de crédit
        if donnees.demande_credit:
            credit = donnees.demande_credit
            prompt += f"""
DEMANDE DE CRÉDIT :
Montant : {credit.montant:,.0f} €
Durée : {credit.duree_mois} mois
Objet : {credit.objet}
"""
        
        # États financiers
        prompt += f"""

ÉTATS FINANCIERS :
"""
        
        # Fonction helper pour formatter les états
        def format_etat(annee: Optional[EtatFinancierAnnuel], label: str) -> str:
            if not annee:
                return f"{label} : Non disponible\n"
            
            return f"""
{label} (Année {annee.annee}) :

COMPTE DE RÉSULTAT :
- Chiffre d'affaires : {annee.chiffre_affaires:,.0f} €
- Autres produits exploitation : {annee.autres_produits_exploitation:,.0f} €
- Achats marchandises : {annee.achats_marchandises:,.0f} €
- Achats matières premières : {annee.achats_matieres_premieres:,.0f} €
- Autres charges externes : {annee.autres_achats_charges_externes:,.0f} €
- Impôts et taxes : {annee.impots_taxes:,.0f} €
- Rémunérations personnel : {annee.remunerations_personnel:,.0f} €
- Charges sociales : {annee.charges_sociales:,.0f} €
- Dotations amortissements : {annee.dotations_amortissements:,.0f} €
- Dotations provisions : {annee.dotations_provisions:,.0f} €
- Autres charges exploitation : {annee.autres_charges_exploitation:,.0f} €
- Produits financiers : {annee.produits_financiers:,.0f} €
- Charges financières : {annee.charges_financieres:,.0f} €
- Produits exceptionnels : {annee.produits_exceptionnels:,.0f} €
- Charges exceptionnelles : {annee.charges_exceptionnelles:,.0f} €
- Impôt sur bénéfices : {annee.impot_benefices:,.0f} €

BILAN - ACTIF :
- Immobilisations incorporelles : {annee.immobilisations_incorporelles:,.0f} €
- Immobilisations corporelles : {annee.immobilisations_corporelles:,.0f} €
- Immobilisations financières : {annee.immobilisations_financieres:,.0f} €
- Stocks matières premières : {annee.stocks_matieres_premieres:,.0f} €
- Stocks produits finis : {annee.stocks_produits_finis:,.0f} €
- Stocks marchandises : {annee.stocks_marchandises:,.0f} €
- Stocks en cours : {annee.stocks_en_cours:,.0f} €
- Créances clients : {annee.creances_clients:,.0f} €
- Créances autres : {annee.creances_autres:,.0f} €
- Disponibilités : {annee.disponibilites:,.0f} €
Total Actif : {annee.total_actif:,.0f} €

BILAN - PASSIF :
- Capital social : {annee.capital_social:,.0f} €
- Réserves : {annee.reserves:,.0f} €
- Résultat exercice : {annee.resultat_exercice:,.0f} €
Capitaux propres : {annee.capitaux_propres:,.0f} €
- Emprunts long terme : {annee.emprunts_long_terme:,.0f} €
- Emprunts court terme : {annee.emprunts_court_terme:,.0f} €
Dettes financières : {annee.dettes_financieres:,.0f} €
- Dettes fournisseurs : {annee.dettes_fournisseurs:,.0f} €
- Dettes fiscales/sociales : {annee.dettes_fiscales_sociales:,.0f} €
- Autres dettes : {annee.dettes_autres:,.0f} €

FLUX COMPLÉMENTAIRES :
- Investissements : {annee.investissements_annee:,.0f} €
- Cessions : {annee.cessions_immobilisations:,.0f} €
- Nouveaux emprunts : {annee.nouveaux_emprunts:,.0f} €
- Remboursements : {annee.remboursements_emprunts:,.0f} €
- Dividendes versés : {annee.dividendes_verses:,.0f} €
"""
        
        # Ajouter les 3 années si disponibles
        prompt += format_etat(n2, "N-2")
        prompt += format_etat(n1, "N-1")
        prompt += format_etat(n, "N (Année actuelle)")
        
        # Calculs déjà effectués (SIG, ratios, etc.)
        if calculs:
            prompt += f"""

CALCULS DÉJÀ EFFECTUÉS (pour référence) :
"""
            if 'sig_n' in calculs:
                sig = calculs['sig_n']
                prompt += f"""
SIG Année N :
- Valeur ajoutée : {sig.get('valeur_ajoutee', 0):,.0f} €
- EBE : {sig.get('excedent_brut_exploitation', 0):,.0f} €
- EBITDA : {sig.get('ebitda', 0):,.0f} €
- Résultat exploitation : {sig.get('resultat_exploitation', 0):,.0f} €
- Résultat net : {sig.get('resultat_net', 0):,.0f} €
"""
            
            if 'caf_n' in calculs:
                caf = calculs['caf_n']
                prompt += f"""
CAF Année N : {caf.get('caf', 0):,.0f} € (soit {caf.get('caf_ratio_ca', 0)*100:.1f}% du CA)
"""
            
            if 'bfr_n' in calculs:
                bfr = calculs['bfr_n']
                prompt += f"""
BFR Année N : {bfr.get('bfr', 0):,.0f} € (soit {bfr.get('bfr_jours_ca', 0):.0f} jours de CA)
"""
        
        # Informations complémentaires
        if entreprise.effectif:
            prompt += f"\nEffectif : {entreprise.effectif} personnes\n"
        
        if entreprise.dirigeants:
            prompt += f"Dirigeants : {', '.join(entreprise.dirigeants)}\n"
        
        # Instructions complètes
        prompt += """

INSTRUCTIONS :

Réalise un audit financier complet selon la structure suivante (10 pages) :

1. INTRODUCTION ET SYNTHÈSE (Page 1)
   - Description brève de l'entreprise
   - Objet du crédit (si applicable)
   - Résumé analytique avec forces/faiblesses principales
   - Recommandation finale (Approbation/Approbation sous conditions/Refus)
   - Garanties et covenants recommandés

2. PRÉSENTATION ENTREPRISE ET ENVIRONNEMENT (Page 2)
   - Direction et actionnariat
   - Clientèle et positionnement marché
   - Analyse du marché (taille, tendances, concurrence)
   - Évaluation de la gouvernance

3. ANALYSE PERFORMANCE ET RENTABILITÉ (Page 3)
   - Analyse complète des SIG (CA, Marge brute, VA, EBE, RE, RN)
   - Évolution sur 3 ans avec taux de croissance
   - Comparaison secteur
   - Tous les ratios de rentabilité :
     * Rentabilité économique, Rentabilité financière
     * Marge nette, Marge brute d'exploitation
     * Taux VA, Taux profitabilité
     * ROE, ROA, ROCE
   - Interprétation et effet de levier

4. STRUCTURE, SOLVABILITÉ ET TRÉSORERIE (Page 4)
   - Ratios de structure financière :
     * Endettement global, Endettement net
     * Levier financier, Autonomie financière
     * Poids charges financières, Gearing
   - Ratios de liquidité :
     * Liquidité générale, réduite, immédiate
     * FRNG
   - Ratios de rotation et BFR :
     * Délais stocks, clients, fournisseurs
     * BFR en € et jours CA
     * Rotation actif circulant et BFR
   - Capacité de remboursement :
     * Capacité remboursement (années)
     * Couverture intérêts
     * DSCR
   - Comparer tous les ratios aux normes secteur

5. ANALYSE CAF (Page 5)
   - Calcul CAF méthode soustractive et additive
   - Évolution sur 3 ans
   - Décomposition de la CAF
   - Qualité de la CAF
   - Interprétation

6. ANALYSE FLUX DE TRÉSORERIE (Page 6)
   - Flux exploitation, investissement, financement
   - Variation trésorerie
   - Interprétation des flux

7. ANALYSE RISQUES ET PRÉVISIONS (Page 7)
   - Risques financiers (crédit, liquidité, taux, change)
   - Risques opérationnels
   - Risques externes
   - Analyse prévisions financières (si disponibles)

8. SENSIBILITÉ ET SCÉNARIOS (Page 8)
   - Scénario optimiste
   - Scénario pessimiste
   - Scénario central
   - Scénario personnalisé (perte client, hausse coûts)
   - Impact sur CAF, capacité remboursement, DSCR

9. FORCES ET FAIBLESSES (Page 9)
   - Liste détaillée des forces (5+)
   - Liste détaillée des faiblesses (5+)
   - Analyse des impacts

10. STRATÉGIES D'AMÉLIORATION (Page 10)
    - Mesures d'amélioration rentabilité
    - Mesures d'amélioration structure financière
    - Mesures d'amélioration BFR
    - Évaluation impact potentiel chiffré
    - Scénario de redressement

EXIGENCES :
- Ton professionnel et précis
- Comparer CHAQUE ratio aux normes du secteur
- Justifier TOUTES les conclusions par des chiffres
- Fournir des interprétations détaillées
- Analyser les évolutions sur 3 ans
- Proposer des recommandations actionnables

Génère le rapport complet maintenant."""
        
        return prompt
    
    async def generer_audit_complet(
        self, 
        donnees: DonneesAuditComplet,
        calculs_preparatoires: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Génère un audit financier professionnel complet
        
        Args:
            donnees: Données complètes de l'entreprise
            calculs_preparatoires: Calculs SIG, CAF, BFR déjà effectués (optionnel)
        
        Returns:
            Dict avec le rapport d'audit complet
        """
        
        # Validation des données
        is_valid, erreurs = donnees.valider()
        if not is_valid:
            return {
                "success": False,
                "erreurs": erreurs,
                "message": "Données invalides pour l'audit"
            }
        
        # Vérifier si OpenAI est disponible
        if not self.has_openai:
            return self._generer_audit_fallback(donnees, calculs_preparatoires)
        
        try:
            print(f"\n{'='*70}")
            print(f"GÉNÉRATION AUDIT PROFESSIONNEL - {donnees.entreprise.nom}")
            print(f"{'='*70}")
            
            # Construire les prompts
            system_prompt = self._construire_prompt_systeme()
            user_prompt = self._construire_prompt_utilisateur(donnees, calculs_preparatoires or {})
            
            print(f"→ Taille prompt utilisateur: {len(user_prompt)} caractères")
            print(f"→ Appel OpenAI GPT-4o-mini...")
            
            # Appel à l'IA
            response = await self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.3,  # Plus précis pour analyse professionnelle
                max_tokens=15000  # Permet rapport très détaillé
            )
            
            rapport = response.choices[0].message.content.strip()
            tokens_utilises = response.usage.total_tokens if response.usage else 0
            
            print(f"✓ Rapport généré: {len(rapport)} caractères")
            print(f"✓ Tokens utilisés: {tokens_utilises:,}")
            print(f"✓ Coût estimé: ${tokens_utilises * 0.00075 / 1000:.4f}")
            print(f"{'='*70}\n")
            
            return {
                "success": True,
                "rapport_complet": rapport,
                "entreprise": donnees.entreprise.nom,
                "date_analyse": donnees.date_analyse.isoformat(),
                "annees_analysees": donnees.get_annees_disponibles(),
                "has_historique_complet": donnees.has_historique_complet(),
                "demande_credit": {
                    "montant": donnees.demande_credit.montant if donnees.demande_credit else None,
                    "objet": donnees.demande_credit.objet if donnees.demande_credit else None
                } if donnees.demande_credit else None,
                "metadata": {
                    "tokens_utilises": tokens_utilises,
                    "cout_estime_euros": tokens_utilises * 0.00075 / 1000,
                    "taille_rapport": len(rapport),
                    "analyste": donnees.analyste
                }
            }
            
        except Exception as e:
            print(f"❌ Erreur génération audit: {e}")
            import traceback
            traceback.print_exc()
            
            return {
                "success": False,
                "erreur": str(e),
                "message": "Erreur lors de la génération de l'audit"
            }
    
    def _generer_audit_fallback(
        self, 
        donnees: DonneesAuditComplet,
        calculs: Optional[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Version fallback sans IA"""
        
        n = donnees.annee_n
        entreprise = donnees.entreprise
        
        rapport = f"""AUDIT FINANCIER - {entreprise.nom}
(Version simplifiée - OpenAI non disponible)

1. SYNTHÈSE
Entreprise : {entreprise.nom}
Secteur : {entreprise.secteur_activite}
Chiffre d'affaires N : {n.chiffre_affaires:,.0f} €
Total actif : {n.total_actif:,.0f} €
Capitaux propres : {n.capitaux_propres:,.0f} €

Pour un audit complet, veuillez configurer la clé OpenAI.
"""
        
        return {
            "success": True,
            "rapport_complet": rapport,
            "entreprise": entreprise.nom,
            "mode": "fallback",
            "message": "Rapport simplifié généré sans IA"
        }
