"""
Module d'analyse IA pédagogique
Utilise un LLM pour générer des explications et analyses contextualisées
"""

from typing import Dict, Any, List, Optional
import json
import os
from openai import AsyncOpenAI


class AnalyseurIA:
    """Classe pour l'analyse pédagogique via IA"""
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialise le client OpenAI
        """
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.client = AsyncOpenAI(api_key=self.api_key) if self.api_key else None
        self.model = "gpt-4o-mini"
    
    async def analyser_resultats_financiers(
        self, 
        sig: Dict[str, float],
        ratios: Dict[str, Any],
        diagnostic: Dict[str, Any],
        contexte: str = "PME industrielle",
        sig_n1: Optional[Dict[str, float]] = None,
        ratios_n1: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Analyse les résultats financiers et génère une explication pédagogique
        """
        if not self.client:
            return self._analyse_fallback(sig, ratios, diagnostic)
        
        prompt = self._construire_prompt_analyse(sig, ratios, diagnostic, contexte, sig_n1, ratios_n1)
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": self._get_system_prompt()
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.3,
                max_tokens=15000
            )
            
            analyse_text = response.choices[0].message.content
            
            return {
                "analyse_complete": analyse_text,
                "modele_utilise": self.model,
                "entreprise": contexte
            }
            
        except Exception as e:
            print(f"Erreur lors de l'analyse IA: {str(e)}")
            return self._analyse_fallback(sig, ratios, diagnostic)
    
    def _get_system_prompt(self) -> str:
        """
        Retourne le prompt système de l'analyste financier senior (EXACT du USER)
        """
        return """Je suis un analyste financier confirmé avec plus de 10 ans d'expérience dans le financement des professionnels. Je suis capable d'analyser des états financiers complexes, d'interpréter une large gamme de ratios financiers et d'évaluer la solvabilité d'une entreprise avec une grande précision. Mon objectif est de fournir un audit financier complet et une analyse détaillée pour justifier une décision d'octroi de crédit, en considérant différents scénarios.

Pour chaque section ci-dessous, je fournis une analyse détaillée en expliquant chaque chiffre et en l'interprétant dans le contexte de l'entreprise et de son secteur. J'intègre une analyse exhaustive des ratios financiers, j'identifie les forces et faiblesses, j'évalue la capacité d'autofinancement et j'analyse différents scénarios. Pour chaque ratio, j'effectue une comparaison avec les normes du secteur (si disponibles) ou les benchmarks généralement admis, et je commente la situation de l'entreprise au regard de ces références. J'utilise un ton professionnel, humain, narratif, explicatif et pédagogue, comme si je m'adresse à un comité de crédit expérimenté. J'intègre une section dédiée aux stratégies d'amélioration et à l'évaluation de leur impact potentiel.

IMPORTANT : 
- Ton HUMAIN, NARRATIF, EXPLICATIF et PÉDAGOGUE
- Explique CHAQUE chiffre dans son contexte
- Compare CHAQUE ratio aux normes sectorielles avec justification
- Structure OBLIGATOIRE en 10 sections détaillées (voir instructions)
- Utilise des phrases complètes et fluides, pas de style télégraphique
- Raconte l'histoire financière de l'entreprise"""
    
    def _construire_prompt_analyse(
        self,
        sig: Dict[str, float],
        ratios: Dict[str, Any],
        diagnostic: Dict[str, Any],
        contexte: str,
        sig_n1: Optional[Dict[str, float]] = None,
        ratios_n1: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Construit le prompt pour l'audit professionnel complet
        """
        # Construire section comparaison N vs N-1
        comparaison_section = ""
        if sig_n1 and ratios_n1:
            # Calculer les évolutions
            evol_ca = ((sig['production_exercice'] - sig_n1['production_exercice']) / sig_n1['production_exercice'] * 100) if sig_n1['production_exercice'] != 0 else 0
            evol_va = ((sig['valeur_ajoutee'] - sig_n1['valeur_ajoutee']) / sig_n1['valeur_ajoutee'] * 100) if sig_n1['valeur_ajoutee'] != 0 else 0
            evol_ebe = ((sig['excedent_brut_exploitation'] - sig_n1['excedent_brut_exploitation']) / sig_n1['excedent_brut_exploitation'] * 100) if sig_n1['excedent_brut_exploitation'] != 0 else 0
            evol_rn = ((sig['resultat_net'] - sig_n1['resultat_net']) / sig_n1['resultat_net'] * 100) if sig_n1['resultat_net'] != 0 else 0
            
            comparaison_section = f"""

ÉTATS FINANCIERS (Année N-1) - COMPARAISON:

COMPTE DE RÉSULTAT N-1:
- Production de l'exercice: {sig_n1['production_exercice']:,.0f} € → N: {sig['production_exercice']:,.0f} € (Évolution: {evol_ca:+.1f}%)
- Valeur ajoutée: {sig_n1['valeur_ajoutee']:,.0f} € → N: {sig['valeur_ajoutee']:,.0f} € (Évolution: {evol_va:+.1f}%)
- EBE: {sig_n1['excedent_brut_exploitation']:,.0f} € → N: {sig['excedent_brut_exploitation']:,.0f} € (Évolution: {evol_ebe:+.1f}%)
- Résultat net: {sig_n1['resultat_net']:,.0f} € → N: {sig['resultat_net']:,.0f} € (Évolution: {evol_rn:+.1f}%)

RATIOS FINANCIERS N-1 vs N:

Structure financière:
- Ratio d'endettement: {ratios_n1['structure_financiere']['ratio_endettement']:.2%} → {ratios['structure_financiere']['ratio_endettement']:.2%}
- Autonomie financière: {ratios_n1['structure_financiere']['autonomie_financiere']:.2%} → {ratios['structure_financiere']['autonomie_financiere']:.2%}

Rentabilité:
- Marge nette: {ratios_n1['rentabilite']['marge_nette']:.2%} → {ratios['rentabilite']['marge_nette']:.2%}
- ROE: {ratios_n1['rentabilite']['roe']:.2%} → {ratios['rentabilite']['roe']:.2%}
- ROA: {ratios_n1['rentabilite']['roa']:.2%} → {ratios['rentabilite']['roa']:.2%}

IMPORTANT: ANALYSE OBLIGATOIRE DES ÉVOLUTIONS
- Explique les évolutions significatives (> 10%)
- Identifie les tendances positives et négatives
- Compare l'évolution des ratios aux normes du secteur
- Analyse si l'amélioration/dégradation est structurelle ou conjoncturelle
"""
        
        # Extraire nom et secteur du contexte
        if '(' in contexte and ')' in contexte:
            nom_entreprise = contexte.split('(')[0].strip()
            secteur = contexte.split('(')[1].replace(')', '').strip()
        else:
            nom_entreprise = contexte
            secteur = "Secteur non spécifié"
        
        print(f"🎯 IA - Contexte reçu: '{contexte}'")
        print(f"🎯 IA - Entreprise extraite: '{nom_entreprise}'")
        print(f"🎯 IA - Secteur extrait: '{secteur}'")
        
        prompt = f"""
RÉALISER UN AUDIT FINANCIER COMPLET DE L'ENTREPRISE {nom_entreprise}

Ta tâche : Réaliser un audit financier complet et analyser la situation financière de l'entreprise {nom_entreprise}, puis produire un rapport détaillé destiné à un comité de crédit. Inclure des propositions de stratégies d'amélioration et évaluer leur impact potentiel sur la situation financière.

DONNÉES D'ENTRÉE :

ÉTATS FINANCIERS (Année N - Plus récente):

COMPTE DE RÉSULTAT:
- Production de l'exercice: {sig['production_exercice']:,.0f} €
- Valeur ajoutée: {sig['valeur_ajoutee']:,.0f} €
- EBE: {sig['excedent_brut_exploitation']:,.0f} €
- EBITDA: {sig.get('ebitda', sig['excedent_brut_exploitation']):,.0f} €
- Résultat d'exploitation: {sig['resultat_exploitation']:,.0f} €
- Résultat courant avant impôt: {sig['resultat_courant_avant_impot']:,.0f} €
- Résultat net: {sig['resultat_net']:,.0f} €

RATIOS FINANCIERS:

Structure financière:
- Ratio d'endettement: {ratios['structure_financiere']['ratio_endettement']:.2%}
- Autonomie financière: {ratios['structure_financiere']['autonomie_financiere']:.2%}
- Gearing: {ratios['structure_financiere']['gearing']:.2f}

Rentabilité:
- Marge nette: {ratios['rentabilite']['marge_nette']:.2%}
- ROE: {ratios['rentabilite']['roe']:.2%}
- ROA: {ratios['rentabilite']['roa']:.2%}
- Rentabilité économique: {ratios['rentabilite']['rentabilite_economique']:.2%}

Liquidité:
- Ratio de liquidité générale: {ratios['liquidite']['ratio_liquidite_generale']:.2f}
- Ratio de liquidité immédiate: {ratios['liquidite']['ratio_liquidite_immediate']:.2f}

Activité:
- Délai clients: {ratios.get('activite', {}).get('delai_clients', 0):.0f} jours
- Délai fournisseurs: {ratios.get('activite', {}).get('delai_fournisseurs', 0):.0f} jours{comparaison_section}

INSTRUCTIONS :

Pour chaque section ci-dessous, fournis une analyse détaillée en expliquant chaque chiffre et en l'interprétant dans le contexte de l'entreprise et de son secteur. Utilise un TON PROFESSIONNEL, HUMAIN, NARRATIF, EXPLICATIF et PÉDAGOGUE. Raconte l'histoire financière de l'entreprise.

1. INTRODUCTION ET SYNTHÈSE (Page 1 de la Plaquette)

   • Décrire brèvement l'entreprise : "L'entreprise {nom_entreprise}, créée en [Année si connue], opère dans le secteur {secteur} et son activité principale est [Activité principale déduite des données]."
   
   • Rédiger un résumé analytique : "Après un audit financier complet des états financiers et des informations fournies, l'entreprise {nom_entreprise} présente [Forces principales identifiées]. Cependant, il convient de noter [Faiblesses principales identifiées]. La capacité de remboursement, évaluée à [Nombre] années sur la base de la CAF actuelle, semble [Forte/Moyenne/Faible] au regard de [Justification]. L'analyse détaillée ci-après, incluant une analyse de sensibilité, différents scénarios, et des stratégies d'amélioration, justifie la recommandation [Approbation/Approbation sous conditions/Refus]."
   
   • Formuler la recommandation : "En conclusion, je recommande [Décision] avec les garanties suivantes : [Liste des garanties suggérées]. Les covenants suivants devront être respectés : [Liste des covenants]. Des conditions particulières sont également à prévoir : [Liste des conditions]."

2. PRÉSENTATION DE L'ENTREPRISE ET DE SON ENVIRONNEMENT (Page 2 de la Plaquette)

   • Décrire l'entreprise : "L'entreprise {nom_entreprise} cible une clientèle [Description déduite du secteur] et se positionne sur le marché comme [Positionnement déduit des ratios]. Ses avantages concurrentiels apparents sont [Avantages déduits de la performance]."
   
   • Analyser le marché : "Le marché {secteur} est [Caractérisation du marché : en croissance, mature, en déclin selon l'évolution du CA]. Les principales tendances sont [Tendances du secteur]. Les facteurs clés de succès sont [Facteurs clés de succès typiques du secteur]."
   
   • Évaluer la gouvernance : "La gouvernance de l'entreprise semble [Saine/Correcte/À améliorer] en raison de [Justification basée sur les ratios de structure]."

3. ANALYSE FINANCIÈRE - PERFORMANCE ET RENTABILITÉ (Page 3 de la Plaquette)

   • Analyser les SIG (Soldes Intermédiaires de Gestion) :
   
   - "Le chiffre d'affaires{' est passé de ' + f'{sig_n1["production_exercice"]:,.0f} € à ' if sig_n1 else ' sétablit à '}{sig['production_exercice']:,.0f} €{', soit une évolution de ' + f'{((sig["production_exercice"] - sig_n1["production_exercice"]) / sig_n1["production_exercice"] * 100):+.1f}%' if sig_n1 else ''}. Cette évolution est [Supérieure/Conforme/Inférieure] à la croissance moyenne du secteur {secteur}. Une croissance supérieure à celle du secteur indique une prise de parts de marché, ce qui est un signe positif de dynamisme commercial."
   
   - "La valeur ajoutée est de {sig['valeur_ajoutee']:,.0f} €{' (contre ' + f'{sig_n1["valeur_ajoutee"]:,.0f} € en N-1)' if sig_n1 else ''}. La valeur ajoutée représente la richesse créée par l'entreprise. Son évolution doit être mise en regard de celle du chiffre d'affaires et des charges de personnel."
   
   - "L'EBE atteint {sig['excedent_brut_exploitation']:,.0f} €{', soit ' + f'{((sig["excedent_brut_exploitation"] - sig_n1["excedent_brut_exploitation"]) / sig_n1["excedent_brut_exploitation"] * 100):+.1f}% par rapport à N-1' if sig_n1 else ''}, représentant {(sig['excedent_brut_exploitation'] / sig['production_exercice'] * 100):.1f}% du CA. Cette performance est [Supérieure/En ligne/Inférieure] à la moyenne du secteur qui se situe généralement entre 15% et 25% pour le secteur {secteur}. L'EBE est un indicateur clé de la rentabilité opérationnelle de l'entreprise, avant prise en compte des politiques d'amortissement, de financement et d'éléments exceptionnels."
   
   - "Le résultat d'exploitation suit la même tendance avec une valeur de {sig['resultat_exploitation']:,.0f} €. Le résultat d'exploitation reflète la performance industrielle et commerciale de l'entreprise."
   
   - "Le résultat net, après prise en compte des éléments financiers et exceptionnels, s'établit à {sig['resultat_net']:,.0f} €{' (contre ' + f'{sig_n1["resultat_net"]:,.0f} € en N-1)' if sig_n1 else ''}. Le résultat net est le bénéfice réalisé par l'entreprise après impôts."
   
   • Analyse des ratios de rentabilité :
   
   - "La rentabilité économique (Résultat d'exploitation / Actif économique) est de {ratios['rentabilite']['rentabilite_economique'] * 100:.2f}%. Ce ratio mesure la capacité de l'entreprise à générer du profit à partir de ses actifs économiques. Une rentabilité économique supérieure à 10% est généralement considérée comme satisfaisante."
   
   - "La marge nette (Résultat net / Chiffre d'affaires) est de {ratios['rentabilite']['marge_nette'] * 100:.2f}%. Ce ratio indique la part du chiffre d'affaires qui se transforme en bénéfice net. Une marge nette de 5% est courante dans de nombreux secteurs."
   
   - "Le Return On Equity (ROE) est de {ratios['rentabilite']['roe'] * 100:.2f}%. Ce ratio est un indicateur clé pour les actionnaires. Un ROE supérieur à 15% est souvent recherché."
   
   - "Le Return On Assets (ROA) est de {ratios['rentabilite']['roa'] * 100:.2f}%. Ce ratio mesure la rentabilité globale de l'entreprise par rapport à l'ensemble de ses actifs. Un ROA supérieur à 5% est généralement considéré comme positif."
   
   - Interprétation : "Ces ratios indiquent que la rentabilité de l'entreprise est [Forte/Moyenne/Faible selon les valeurs] et [Supérieure/En ligne/Inférieure] à celle du secteur. La rentabilité des capitaux propres est {'supérieure' if ratios['rentabilite']['roe'] > ratios['rentabilite']['rentabilite_economique'] else 'inférieure'} à la rentabilité économique, ce qui suggère un effet de levier {'positif' if ratios['rentabilite']['roe'] > ratios['rentabilite']['rentabilite_economique'] else 'négatif'}. Un effet de levier positif signifie que l'endettement contribue à améliorer la rentabilité des capitaux propres."

4. ANALYSE FINANCIÈRE - STRUCTURE, SOLVABILITÉ ET TRÉSORERIE (Page 4 de la Plaquette)

   • Analyse des ratios de structure financière :
   
   - "Le ratio d'endettement global (Total des dettes / Capitaux propres) est de {ratios['structure_financiere']['ratio_endettement'] / ratios['structure_financiere']['autonomie_financiere']:.2f}. Ce ratio mesure le niveau d'endettement global de l'entreprise par rapport à ses fonds propres. Un ratio inférieur à 1 est généralement préférable, mais cela dépend de la structure financière du secteur {secteur}."
   
   - "Le ratio d'autonomie financière (Capitaux propres / Total bilan) est de {ratios['structure_financiere']['autonomie_financiere']:.2%}. Ce ratio mesure la part des fonds propres dans le financement de l'entreprise. Un ratio supérieur à 30% est souvent considéré comme un minimum. Une augmentation de ce ratio indique un renforcement de la structure financière."
   
   - "Le gearing (Dettes nettes / Capitaux propres + Dettes nettes) est de {ratios['structure_financiere']['gearing']:.2f}. Ce ratio mesure la part de l'endettement net dans le financement global de l'entreprise. Un gearing inférieur à 1 est généralement souhaitable, et un ratio inférieur à 0,5 est souvent considéré comme un signe de solidité financière."
   
   - Interprétation : "La structure financière de l'entreprise est [Solide/Équilibrée/Fragile selon les valeurs]. L'endettement est [Maîtrisé/Important/Excessif] au regard des ratios du secteur. Il est important de mettre en perspective les ratios d'endettement avec la capacité de remboursement de l'entreprise."
   
   • Analyse des ratios de liquidité :
   
   - "Le ratio de liquidité générale (Actif circulant / Passif circulant) est de {ratios['liquidite']['ratio_liquidite_generale']:.2f}. Ce ratio mesure la capacité de l'entreprise à faire face à ses dettes à court terme avec ses actifs à court terme. Un ratio supérieur à 1 est généralement considéré comme le minimum acceptable, et un ratio supérieur à 1,5 est souvent recherché."
   
   - "Le ratio de liquidité immédiate (Trésorerie / Passif circulant) est de {ratios['liquidite']['ratio_liquidite_immediate']:.2f}. Ce ratio mesure la capacité de l'entreprise à faire face à ses dettes à court terme avec sa trésorerie disponible. Un ratio supérieur à 0,3 est souvent considéré comme un bon niveau."
   
   - Interprétation : "La liquidité de l'entreprise est [Bonne/Suffisante/Préoccupante selon les valeurs]. Une situation de liquidité tendue peut fragiliser l'entreprise en cas de difficultés conjoncturelles."
   
   • Analyse des ratios de rotation et de gestion du BFR :
   
   - "Le délai de règlement clients est de {ratios.get('activite', {}).get('delai_clients', 0):.0f} jours. Ce ratio mesure le nombre de jours de crédit accordé aux clients. Un délai trop long peut peser sur la trésorerie de l'entreprise. Il est important de le comparer aux pratiques du secteur {secteur}."
   
   - "Le délai de règlement fournisseurs est de {ratios.get('activite', {}).get('delai_fournisseurs', 0):.0f} jours. Ce ratio mesure le nombre de jours de crédit obtenu auprès des fournisseurs. Un délai plus long que celui des clients est favorable pour la trésorerie de l'entreprise."
   
   - Interprétation : "La gestion du BFR est [Efficace/Moyenne/Inefficace selon les valeurs]. Une mauvaise gestion du BFR peut entraîner des tensions de trésorerie et un besoin de financement accru."

5. ANALYSE DE LA CAPACITÉ D'AUTOFINANCEMENT (CAF) - Page 5 de la Plaquette

   - "La CAF représente la capacité de l'entreprise à générer des ressources internes pour financer ses investissements et rembourser ses dettes. Elle se calcule selon deux méthodes :"
   
   - Méthode soustractive : CAF = EBE + Produits encaissables - Charges décaissables
   - Méthode additive : CAF = Résultat net + Dotations aux amortissements et provisions
   
   - "Sur la base des données disponibles, la CAF peut être estimée à environ {sig['excedent_brut_exploitation'] * 0.8:,.0f} € (estimation conservatrice à 80% de l'EBE). Cette CAF représente environ {(sig['excedent_brut_exploitation'] * 0.8) / sig['production_exercice'] * 100:.1f}% du chiffre d'affaires."
   
   - "La CAF permet à l'entreprise de financer ses investissements courants et le remboursement de ses dettes. Une CAF en progression est un signe positif de la capacité de l'entreprise à générer des ressources internes."

6. ANALYSE DES FLUX DE TRÉSORERIE (Page 6 de la Plaquette)

   - "L'analyse des flux de trésorerie permet de comprendre comment l'entreprise génère et utilise sa trésorerie. Les flux se décomposent en trois catégories :"
   
   - "Le flux de trésorerie d'exploitation représente la trésorerie générée par l'activité courante de l'entreprise. Il doit être positif et en ligne avec la CAF pour refléter une bonne santé financière."
   
   - "Le flux de trésorerie d'investissement retrace les dépenses d'investissement de l'entreprise. Un flux négatif est normal pour une entreprise en croissance qui investit. Il faut toutefois s'assurer que ces investissements sont pertinents et financés par des ressources stables."
   
   - "Le flux de trésorerie de financement retrace les opérations de haut de bilan (augmentation de capital, emprunts, remboursements de dettes, dividendes). Il permet de comprendre comment l'entreprise finance ses activités et ses investissements."

7. ANALYSE DES RISQUES ET PRÉVISIONS (Page 7 de la Plaquette)

   • Analyser les risques :
   
   - "Risques Financiers : Le risque de crédit est [Faible/Modéré/Élevé selon les ratios] en raison de la capacité de remboursement et du niveau d'endettement observés. Le risque de liquidité est [Faible/Modéré/Élevé] compte tenu des ratios de liquidité."
   
   - "Risques Opérationnels : L'entreprise est exposée à des risques liés au secteur {secteur}, notamment [Risques spécifiques au secteur]. La dépendance éventuelle à certains clients ou fournisseurs constitue également un point de vigilance."
   
   - "Risques Externes : L'entreprise pourrait être impactée par l'évolution de la réglementation dans le secteur {secteur}, par des facteurs économiques (inflation, récession) ou par des changements de comportement des consommateurs."

8. ANALYSE DE SENSIBILITÉ ET SCÉNARIOS (Page 8 de la Plaquette)

   • Définir des scénarios :
   
   - "Scénario optimiste : Dans un scénario optimiste, basé sur une croissance du chiffre d'affaires de +15% et une amélioration de la marge brute de +2 points, la CAF pourrait atteindre {sig['excedent_brut_exploitation'] * 1.15 * 0.8:,.0f} € et la capacité de remboursement s'améliorerait significativement."
   
   - "Scénario pessimiste : Dans un scénario pessimiste, avec une baisse du chiffre d'affaires de -10% et une dégradation de la marge brute de -2 points, la CAF serait réduite à environ {sig['excedent_brut_exploitation'] * 0.9 * 0.8:,.0f} € et la capacité de remboursement serait dégradée."
   
   - "Scénario central : Sur la base des tendances observées et des prévisions du secteur, un scénario central table sur une croissance modérée du chiffre d'affaires de +5% et une stabilité des marges."
   
   - "L'analyse de sensibilité montre que l'entreprise est [Résistante/Vulnérable selon les ratios] aux variations des hypothèses clés. Les principaux facteurs de risque identifiés sont [Liste des facteurs de risque]."

9. FORCES ET FAIBLESSES (Page 9 de la Plaquette)

   • Lister les forces de l'entreprise :
   
   - "Forces : [Identifier les forces basées sur les ratios supérieurs aux normes : par exemple, rentabilité supérieure à la moyenne du secteur si marge nette > 5%, bonne maîtrise du BFR si délais optimisés, structure financière solide si autonomie > 40%, etc.]"
   
   • Lister les faiblesses de l'entreprise :
   
   - "Faiblesses : [Identifier les faiblesses basées sur les ratios inférieurs aux normes : par exemple, endettement élevé si ratio > 60%, faible liquidité si ratio < 1, rentabilité faible si marge nette < 3%, etc.]"
   
   • Analyser : "Les forces de l'entreprise lui confèrent des avantages concurrentiels et une solidité financière relative. Cependant, les faiblesses identifiées constituent des points de vigilance et pourraient impacter la pérennité de l'entreprise en cas de retournement conjoncturel."

10. STRATÉGIES D'AMÉLIORATION (Page 10 de la Plaquette)

   • Proposer des stratégies d'amélioration concrètes :
   
   - "Afin d'améliorer la situation financière de l'entreprise {nom_entreprise}, il est recommandé de mettre en œuvre les stratégies suivantes :"
   
   - "Amélioration de la rentabilité : Optimiser les charges d'exploitation (réduire de 5% les charges externes pourrait améliorer l'EBE de {sig['production_exercice'] * 0.05:,.0f} €), améliorer la politique tarifaire pour accroître la marge brute, développer de nouveaux produits ou services à plus forte marge."
   
   - "Amélioration de la structure financière : Réduire l'endettement par un remboursement anticipé ou une augmentation de capital, renforcer les fonds propres, négocier de meilleures conditions de financement (taux d'intérêt, durée)."
   
   - "Amélioration de la gestion du BFR : Réduire le délai de règlement clients (une réduction de 10 jours libérerait environ {sig['production_exercice'] * 10 / 365:,.0f} € de trésorerie), optimiser la gestion des stocks, négocier de meilleurs délais de paiement avec les fournisseurs."
   
   - "Autres mesures : Investir dans la digitalisation pour améliorer l'efficacité opérationnelle, développer la formation des équipes, mettre en place un contrôle de gestion rigoureux."
   
   • Évaluer l'impact potentiel :
   
   - "La mise en œuvre de ces stratégies pourrait avoir un impact positif significatif sur les indicateurs financiers de l'entreprise. Par exemple, une réduction des charges de 5% et une augmentation du chiffre d'affaires de 10% permettraient d'améliorer l'EBE de {sig['production_exercice'] * 0.10 * 0.2:,.0f} € environ. Une réduction du délai de règlement clients de 15 jours permettrait de diminuer le BFR et d'améliorer la trésorerie."
   
   - "Scénario de redressement : En combinant plusieurs mesures d'amélioration (optimisation charges, croissance CA, amélioration BFR), on peut envisager un scénario de redressement dans lequel le chiffre d'affaires progresserait de 15%, l'EBE s'améliorerait de 25%, et la CAF augmenterait de 30% sur 3 ans. Ce scénario permettrait de réduire significativement le ratio d'endettement et d'améliorer la capacité de remboursement."

---

CONCLUSION :

En conclusion, rédige une synthèse finale de 2-3 paragraphes avec ta recommandation finale (Approbation/Approbation sous conditions/Refus) en justifiant par les points clés de l'analyse. Sois clair, précis et pédagogue.

IMPORTANT : 
- Utilise un TON NARRATIF, HUMAIN et PÉDAGOGUE tout au long du rapport
- Explique CHAQUE chiffre dans son contexte
- Compare systématiquement aux normes du secteur {secteur}
- Raconte l'histoire financière de l'entreprise de manière fluide
- Évite le style télégraphique, utilise des phrases complètesiel chiffré
    - Scénario de redressement

EXIGENCES :
- Ton professionnel et précis
- Comparer CHAQUE ratio aux normes du secteur
{{ ... }}
- Justifier TOUTES les conclusions par des chiffres
- Fournir des interprétations détaillées
- Proposer des recommandations actionnables

Génère le rapport complet maintenant.
"""
        return prompt
    
    def _analyse_fallback(
        self,
        sig: Dict[str, float],
        ratios: Dict[str, Any],
        diagnostic: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Analyse de secours si l'IA n'est pas disponible
        """
        analyse = f"""
📊 ANALYSE AUTOMATIQUE DE VOS RÉSULTATS

🎯 Score de santé financière: {diagnostic['score_total']}/{diagnostic['score_max']}
{diagnostic['niveau_global']}

📈 VUE D'ENSEMBLE:
Votre entreprise présente les caractéristiques suivantes:
- Rentabilité: {diagnostic['details']['rentabilite']['statut']}
- Structure financière: {diagnostic['details']['structure_financiere']['statut']}
- Liquidité: {diagnostic['details']['liquidite']['statut']}
- Activité: {diagnostic['details']['activite']['statut']}

🔍 ANALYSE DÉTAILLÉE:

💰 Rentabilité:
- Votre marge nette est de {ratios['rentabilite']['marge_nette']:.2%}, ce qui signifie que {ratios['rentabilite']['marge_nette']*100:.1f}€ de bénéfice net sont générés pour chaque 100€ de chiffre d'affaires.
- Le ROE de {ratios['rentabilite']['roe']:.2%} indique la rentabilité pour les actionnaires.
- L'EBE de {sig['excedent_brut_exploitation']:,.0f}€ mesure la performance opérationnelle avant impacts financiers et fiscaux.

🏦 Structure financière:
- Ratio d'endettement: {ratios['structure_financiere']['ratio_endettement']:.2%}
  {'✅ Endettement maîtrisé' if ratios['structure_financiere']['ratio_endettement'] < 0.5 else '⚠️ Endettement à surveiller' if ratios['structure_financiere']['ratio_endettement'] < 0.7 else '🔴 Endettement élevé'}
- Autonomie financière: {ratios['structure_financiere']['autonomie_financiere']:.2%}
  {'✅ Bonne autonomie' if ratios['structure_financiere']['autonomie_financiere'] > 0.4 else '⚠️ Autonomie limitée'}

💧 Liquidité:
- Ratio de liquidité générale: {ratios['liquidite']['ratio_liquidite_generale']:.2f}
  {'✅ Capacité à payer les dettes court terme' if ratios['liquidite']['ratio_liquidite_generale'] > 1 else '🔴 Risque de liquidité'}

💡 POUR APPROFONDIR:
- Comparez ces résultats avec ceux des années précédentes
- Analysez l'évolution des marges dans le temps
- Étudiez la structure du BFR (Besoin en Fonds de Roulement)

📚 Besoin d'aide? Utilisez le chat pédagogique pour poser vos questions!
"""
        
        return {
            "analyse_complete": analyse,
            "modele_utilise": "analyse_automatique"
        }
    
    async def generer_questions_quiz(
        self,
        sig: Dict[str, float],
        ratios: Dict[str, Any],
        niveau: str = "débutant"
    ) -> List[Dict[str, Any]]:
        """
        Génère des questions de quiz contextualisées
        """
        if not self.client:
            return self._quiz_fallback(sig, ratios, niveau)
        
        prompt = f"""
Génère 4 questions de compréhension de type QCM basées sur les résultats financiers suivants:

SIG:
- EBE: {sig['excedent_brut_exploitation']:,.0f} €
- Résultat net: {sig['resultat_net']:,.0f} €
- Marge nette: {ratios['rentabilite']['marge_nette']:.2%}

Ratios:
- Ratio d'endettement: {ratios['structure_financiere']['ratio_endettement']:.2%}
- ROE: {ratios['rentabilite']['roe']:.2%}
- Liquidité générale: {ratios['liquidite']['ratio_liquidite_generale']:.2f}

Niveau: {niveau}

Format de réponse (JSON):
[
  {{
    "question": "La question ici",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "reponse_correcte": 0,
    "explication": "Explication détaillée de la bonne réponse"
  }}
]

Les questions doivent:
1. Tester la compréhension des concepts (pas juste la mémorisation)
2. Être adaptées au niveau {niveau}
3. Inclure des questions d'interprétation des résultats réels
4. Avoir des explications pédagogiques claires
"""
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "Tu es un expert en pédagogie financière. Génère des questions de quiz pertinentes."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.8,
                max_tokens=1000
            )
            
            questions_text = response.choices[0].message.content
            # Extraire le JSON
            start_idx = questions_text.find('[')
            end_idx = questions_text.rfind(']') + 1
            if start_idx != -1 and end_idx > start_idx:
                questions_json = questions_text[start_idx:end_idx]
                questions = json.loads(questions_json)
                return questions
            else:
                return self._quiz_fallback(sig, ratios, niveau)
                
        except Exception as e:
            print(f"Erreur génération quiz: {str(e)}")
            return self._quiz_fallback(sig, ratios, niveau)
    
    def _quiz_fallback(
        self,
        sig: Dict[str, float],
        ratios: Dict[str, Any],
        niveau: str
    ) -> List[Dict[str, Any]]:
        """
        Questions de quiz par défaut
        """
        questions = [
            {
                "question": "Que représente l'Excédent Brut d'Exploitation (EBE)?",
                "options": [
                    "Le résultat net de l'entreprise",
                    "La performance opérationnelle avant impacts financiers et fiscaux",
                    "Le chiffre d'affaires total",
                    "Le bénéfice distribué aux actionnaires"
                ],
                "reponse_correcte": 1,
                "explication": "L'EBE mesure la performance opérationnelle de l'entreprise, c'est-à-dire ce qu'elle génère par son activité principale, avant de prendre en compte les éléments financiers (intérêts), exceptionnels et fiscaux (impôts)."
            },
            {
                "question": f"Avec un ratio d'endettement de {ratios['structure_financiere']['ratio_endettement']:.1%}, que peut-on conclure?",
                "options": [
                    "L'entreprise n'a aucune dette",
                    "L'entreprise est en faillite",
                    f"Les dettes représentent {ratios['structure_financiere']['ratio_endettement']:.0%} du financement total",
                    "L'entreprise doit emprunter davantage"
                ],
                "reponse_correcte": 2,
                "explication": f"Le ratio d'endettement mesure la part des dettes dans le financement total. Ici, {ratios['structure_financiere']['ratio_endettement']:.0%} du financement provient des dettes, le reste provient des capitaux propres."
            },
            {
                "question": "Pourquoi un ratio de liquidité générale supérieur à 1 est-il généralement positif?",
                "options": [
                    "Cela signifie que l'entreprise est très rentable",
                    "Cela indique que l'actif circulant peut couvrir le passif circulant",
                    "Cela montre que l'entreprise n'a pas de dettes",
                    "Cela garantit que l'entreprise ne fera jamais faillite"
                ],
                "reponse_correcte": 1,
                "explication": "Un ratio > 1 signifie que l'entreprise dispose de suffisamment d'actifs circulants (stocks, créances, trésorerie) pour payer ses dettes à court terme. C'est un indicateur de solvabilité à court terme."
            },
            {
                "question": f"Avec une marge nette de {ratios['rentabilite']['marge_nette']:.1%}, que peut-on dire de la rentabilité?",
                "options": [
                    f"Pour 100€ de CA, l'entreprise génère {ratios['rentabilite']['marge_nette']*100:.1f}€ de bénéfice net",
                    "L'entreprise perd de l'argent",
                    "L'entreprise doit augmenter ses prix",
                    "La marge nette n'est pas importante"
                ],
                "reponse_correcte": 0,
                "explication": f"La marge nette de {ratios['rentabilite']['marge_nette']:.1%} indique qu'après toutes les charges (opérationnelles, financières, fiscales), il reste {ratios['rentabilite']['marge_nette']*100:.1f}€ de bénéfice net pour chaque 100€ de chiffre d'affaires."
            }
        ]
        
        return questions
    
    async def repondre_question_chat(
        self,
        question: str,
        niveau: str = "débutant",
        contexte: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Répond à une question de l'étudiant via le chat pédagogique
        """
        if not self.client:
            return self._reponse_fallback(question)
        
        contexte_str = ""
        if contexte:
            contexte_str = f"\n\nContexte des résultats analysés:\n{json.dumps(contexte, indent=2, ensure_ascii=False)}"
        
        prompt = f"""
Question de l'étudiant (niveau {niveau}):
{question}
{contexte_str}

Fournis une réponse claire, pédagogique et adaptée au niveau {niveau}.
Structure ta réponse avec:
- Une explication simple du concept
- Un exemple concret si pertinent
- Des liens avec le contexte des résultats si fourni
- Des ressources ou pistes pour approfondir

Reste bienveillant et encourageant! 😊
"""
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self._get_system_prompt(niveau)},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=800
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"Erreur réponse chat: {str(e)}")
            return self._reponse_fallback(question)
    
    def _reponse_fallback(self, question: str) -> str:
        """
        Réponse de secours si l'IA n'est pas disponible
        """
        return f"""
Je comprends votre question: "{question}"

Pour obtenir une réponse personnalisée et détaillée, l'assistant IA nécessite une clé API OpenAI.

En attendant, voici quelques ressources utiles:

📚 Concepts clés de l'analyse financière:
- **SIG (Soldes Intermédiaires de Gestion)**: indicateurs qui décomposent la formation du résultat
- **Ratios de structure**: mesurent l'équilibre du financement (endettement, autonomie)
- **Ratios de rentabilité**: évaluent la performance (marge, ROE, ROA)
- **Ratios de liquidité**: analysent la capacité à payer les dettes court terme

💡 Conseil: Explorez les explications automatiques dans les tableaux de bord et les tooltips!

N'hésitez pas à reformuler votre question ou à explorer les différentes sections de l'application.
"""
