# Analytics

##Pour lancer le projet :

 - docker-compose up -d

###  Lancement de l'api
    - docker compose exec back npm i
    - docker compose exec back npm run start:dev

###  Lancement du front
    - docker compose exec front npm i
    - docker compose exec front npm run dev

## Utiliser l'analytics 

L'analytics est connecté peut être connecté à n'importe quel site en utilisant des events dans ceux-ci qui vont permettront d'alimenter la base de donnée analytics.
Celui-ci dispose d'un système d'authentification avec des droits admin/user.
Il y a un envoi de mail lors de la validation du compte des clients par les admins. 

Pour cela, nous disposon du site j'irais bruler chez vous,
  - Cloner le projet, puis lancer le projet
  - Après le docker-compose up -d, vous pourrez lancer le npm install et lancer le nx serve pour user, gateway et authentication avec la commande qui suit :
     - nx serve api-<nom_api>


