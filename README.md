# Analytics

##Pour lancer le projet :

 - docker-compose up -d

###  Lancement de l'api
    - docker compose exec back npm i
    - docker compose exec back npm run seed
    - docker compose exec back npm run start:dev

###  Lancement du front
    - docker compose exec front npm i
    - docker compose exec front npm run dev

## Utiliser l'analytics 

Compte Admin qui permet la validation des comptes clients: 
user : admin@admin.com
mdp  : admin

L'analytics est connecté peut être connecté à n'importe quel site en utilisant des events dans ceux-ci qui vont permettront d'alimenter la base de donnée analytics.
Celui-ci dispose d'un système d'authentification avec des droits admin/user.
Il y a un envoi de mail lors de la validation du compte des clients par les admins. 

Pour cela, nous disposon du site j'irais bruler chez vous,
  - Cloner le projet, puis lancer le projet
  - Après le docker-compose up -d, vous pourrez lancer le npm install et lancer le nx serve pour user, gateway et authentication avec la commande qui suit :
     - nx serve api-<nom_api>


## Se servir du SDK

Il vous suffira simplement de faire un 
```sh

npm i raidalytics

```
 puis dans votre code d'importer les 2 fonctions (l'une permet l'envoi de data plus ou moins customisé et l'autre l'envoi des données de mouseTracking ) : 


import { sendEvent, initMouseTracking } from "raidalytics";

La fonction sendEvent prend en paramètre : 
- un type d'event
- un objet personnalisé selon les besoins que l'on a 
- et une apiKey (que nous n'avons pas réussi à faire fonctionner donc toutes les requetes passent sans qu'elle ne soit renseigner)

// envoyer un event si l'inscription est réussie
sendEvent('RegistrationSuccess', { tag: 'Inscription', message: 'Inscription Réussie.' }, apiKey);


La fonction initMouseTracking elle sera à lancer chargement d'une nouvelle page et se chargera de récolter toutes les données de déplacements de la souris passivement


Nous n'offrons pas la possibilité sur notre application de customiser ses kpi donc nous avons exporter les données de test que nous utilisions afin que tu puisse tout de même voir les graphes contenant les data obtenu d'une application. 
Le fichier est à la racine du projet et est à importer dans mongo-express localhost:8080.
Tu peux aussi trouver le fichier sur https://we.tl/t-OGHuKAI7UW