# AgriMétéo Sénégal

## Présentation du projet

AgriMétéo Sénégal est une application web de monitoring climatique destinée au secteur agricole sénégalais.

L'objectif du projet est de transformer des données météorologiques en informations utiles à la prise de décision pour les agriculteurs, coopératives et acteurs locaux. La plateforme permet de visualiser les conditions météorologiques des différentes régions du Sénégal grâce à une carte interactive et un tableau de bord dynamique.

L'application récupère les données météo en temps réel depuis une API externe, affiche les informations essentielles d'une région sélectionnée et propose une analyse du risque climatique basée sur des règles métier.

Le projet a été développé avec Angular en suivant une architecture modulaire séparant la logique métier, les services de récupération de données et les composants d'affichage.

---

# Fonctionnalités principales

## Carte interactive du Sénégal

L'application intègre une carte SVG interactive représentant les 14 régions du Sénégal.

Fonctionnalités disponibles :

* Affichage responsive de la carte SVG
* Détection des régions via les attributs `name` présents dans le fichier SVG
* Normalisation automatique des noms de régions pour correspondre aux données internes
* Effet visuel au survol d'une région
* Affichage du nom de la région survolée avec un tooltip
* Sélection d'une région au clic
* Conservation de la couleur de la région sélectionnée
* Changement automatique de sélection lorsqu'une autre région est choisie

Le fichier SVG utilisé est placé dans :

```
public/maps/senegal.svg
```

---

# Intégration météo

L'application utilise l'API OpenWeatherMap afin de récupérer les données météorologiques en temps réel.

Pour chaque région sélectionnée, les informations affichées sont :

* Nom de la région
* Température actuelle en degrés Celsius
* Humidité
* Description des conditions météo
* Icône météo dynamique fournie par l'API

Les coordonnées des régions sont centralisées dans :

```
src/app/constants/regions.ts
```

Chaque région possède une latitude et une longitude utilisées pour interroger l'API météo.

---

# Géolocalisation utilisateur

Au lancement de l'application, une tentative de récupération de la position utilisateur est effectuée.

Le fonctionnement est le suivant :

1. Demande d'autorisation de localisation au navigateur
2. Récupération des coordonnées GPS
3. Comparaison avec les coordonnées des régions sénégalaises
4. Sélection automatique de la région la plus proche

En cas de refus ou d'erreur :

* L'application utilise Dakar comme région par défaut.

Cette logique est gérée dans :

```
src/app/services/geolocalisation.ts
```

---

# Tableau de bord météo

Le tableau de bord affiche les données liées à la région sélectionnée.

Il comprend :

* Etat de chargement pendant la récupération des données
* Gestion des erreurs API
* Informations météo principales
* Graphique d'évolution de température
* Indicateur de risque climatique

Le panneau s'actualise automatiquement lorsqu'une nouvelle région est sélectionnée depuis la carte.

---

# Analyse prédictive

Les API météo gratuites ne fournissant pas toujours un historique complet, une simulation des 7 derniers jours a été mise en place.

Le fonctionnement :

* La température actuelle récupérée depuis l'API sert de référence
* Des variations aléatoires cohérentes sont générées
* Une série temporelle sur 7 jours est créée

Exemple :

```
Température actuelle : 32°C

Historique généré :

Lun : 31.5°C
Mar : 33.2°C
Mer : 30.8°C
...
```

Cette fonctionnalité permet d'afficher une tendance climatique sous forme de graphique.

La visualisation utilise :

```
Chart.js
```

---

# Algorithme d'indice de risque climatique

Une fonction métier permet de calculer un niveau de risque selon la température et l'humidité.

Fonction utilisée :

```
calculateRisk(temp, humidity)
```

Elle retourne :

```ts
{
 score: number,
 libelle: string,
 couleur: string
}
```

Exemple de règle :

Si :

```
température > 38°C
ET
humidité > 60%
```

Alors :

```ts
{
 score: 85,
 libelle: "Risque canicule élevé",
 couleur: "#FF4500"
}
```

Les niveaux possibles sont :

* Risque faible
* Risque modéré
* Risque canicule élevé

Le résultat est affiché sous forme de badge coloré dans le dashboard.

---

# Gestion des erreurs et états

L'application gère plusieurs états :

## Chargement

Pendant l'appel API :

```
loading: true
```

Un message de chargement est affiché.

## Succès

Les données météo sont affichées normalement.

## Erreur

En cas d'échec :

```
Impossible de récupérer les données météo
```

est affiché sans bloquer l'application.

---

# Navigation

Une barre de navigation permet de naviguer entre les pages.

Pages disponibles :

## Accueil

Route :

```
/
```

Contient :

* Carte interactive du Sénégal
* Dashboard météo

## Tableau de bord

Route :

```
/dashboard
```

Contient :

* Informations météo
* Graphique
* Indicateur de risque

---

# Technologies utilisées

## Frontend

* Angular
* TypeScript
* HTML
* CSS

## Bibliothèques

* Chart.js pour les graphiques
* Angular Router pour la navigation

## API

* OpenWeatherMap API

---

# Architecture du projet

L'organisation du projet suit une séparation claire entre composants, services, modèles et constantes.

Structure :

```
src/app/

├── components/
│
│   ├── accueil/
│   │
│   ├── carte-senegal/
│   │   ├── carte-senegal.ts
│   │   ├── carte-senegal.html
│   │   └── carte-senegal.css
│   │
│   ├── graphique-meteo/
│   │   ├── graphique-meteo.ts
│   │   ├── graphique-meteo.html
│   │   └── graphique-meteo.css
│   │
│   ├── indicateur-risque/
│   │   ├── indicateur-risque.ts
│   │   ├── indicateur-risque.html
│   │   └── indicateur-risque.css
│   │
│   ├── tableau-bord/
│   │   ├── tableau-bord.ts
│   │   ├── tableau-bord.html
│   │   └── tableau-bord.css
│   │
│   └── navbar/
│       ├── navbar.ts
│       ├── navbar.html
│       └── navbar.css
│
├── pages/
│
│   └── accueil/
│       ├── accueil.ts
│       ├── accueil.html
│       └── accueil.css
│
├── constants/
│
│   └── regions.ts
│
├── modeles/
│
│   ├── donnees-meteo.model.ts
│   ├── donnee-graphique.model.ts
│   ├── etat-meteo.model.ts
│   ├── indice-risque.model.ts
│   └── weather-api-response.model.ts
│
├── services/
│
│   ├── meteo.ts
│   └── geolocalisation.ts
│
├── app.ts
├── app.html
└── app.routes.ts
```

---

# Rôle des différents dossiers

## components

Contient les éléments d'interface réutilisables.

Exemples :

* Carte SVG
* Dashboard
* Graphique
* Navbar
* Indicateur de risque

## pages

Contient les pages accessibles par le système de routing Angular.

Actuellement :

* Accueil

## services

Contient la logique métier et les appels externes.

### meteo.ts

Responsable de :

* Appel OpenWeatherMap
* Transformation des données API
* Génération historique
* Calcul du risque climatique

### geolocalisation.ts

Responsable de :

* Récupération GPS utilisateur
* Conversion coordonnées vers région

## modeles

Contient les interfaces TypeScript utilisées dans l'application.

Exemples :

* Données météo
* Historique graphique
* Etat du dashboard
* Réponse API météo

## constants

Contient les données fixes de l'application.

Exemple :

* Coordonnées GPS des régions sénégalaises

---

# Installation du projet

Cloner le repository :

```bash
git clone URL_DU_REPOSITORY
```

Installer les dépendances :

```bash
npm install
```

Lancer le serveur Angular :

```bash
ng serve
```

L'application sera disponible sur :

```
http://localhost:4200
```

---

# Configuration API

La clé OpenWeatherMap doit être ajoutée dans un fichier d'environnement local non versionné.

Créer :

src/environments/environment.local.ts

Puis ajouter :

export const environment = {
  apiKey: "VOTRE_CLE_API",
  apiUrl: "https://api.openweathermap.org/data/2.5/weather"
};

Ce fichier doit rester privé et ne doit pas être envoyé dans le repository.

---

# Déploiement

Le projet peut être compilé avec :

```bash
ng build
```

Le dossier généré pourra ensuite être déployé sur une plateforme comme :

* Firebase Hosting
* Netlify
* Vercel
* GitHub Pages


## Lien déploiement

https://agri-meteo.netlify.app/
---

# Conclusion

AgriMétéo Sénégal est une application de visualisation climatique permettant de centraliser les informations météo régionales et d'aider à anticiper les risques agricoles.

Le projet met en œuvre une architecture Angular moderne basée sur des composants indépendants, des services métiers séparés et une gestion dynamique des données.
