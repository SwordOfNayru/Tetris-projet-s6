# Tetris-projet-s6
Projet pour l'ue Projet du S6 2020 UPJV

Le projet se repose sur cette article : https://hal.inria.fr/inria-00418922/document

## Installation 
### Les builds
Vous pouvez dezipper un build téléchargeable à cette adresse :
[Google Drive](https://drive.google.com/drive/folders/178UD6ULYxCTisP_5C1yO9bKpO1aWaag_?usp=sharing)

darwin pour MacOS.

Linux pour Linux.

win32 pour Windows.

Attention la build n'a pas été testé pour Mac et Linux.

### Le code

#### pré-requis
Il faut avoir téléchargé sur son PC : 
 - Node.JS
 - npm (fournis avec node.js)
 - Installez le package Typescript avec la commande :
```
    npm install -g typescript
```
#### Démarche
pour installer le programme sans une build il faut passer par ces étapes :
1. Télécharger le code
2. Ce placer à la racine du projet 
3. installer les paquets ```npm install```
4. compiler le projet ```tsc```

Pour l'exécuter il faut taper :
```npm start```

## Découpage du projet
A la racine se trouve : 
 - index.html le fichier ou est afficher le jeu
 - start.html le premier menu du jeu
 - main.js le point d'entré du programme
Dans src se trouve tout les fichiers de code lié au jeu
Dans src/class/TS se trouve tout les classes du jeu
Dans src/script_windows se trouve les scripts qui permet l'affichage du jeu

## Ce qui n'est pas fonctionnel
- Les decisions de l'ia
- La génération de l'ia