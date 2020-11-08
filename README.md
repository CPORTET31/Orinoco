# Projet Clement PORTET - ORINOCO

## Description projet

Ce projet consiste à produire le Front d'une application web de type e-commerce (4 pages).

* une page de vue sous forme de liste, montrant tous les articles disponibles à la vente.
* une page "produit" qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier.
* une page "panier" contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de texte dans les champs date.
* une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.

## Plan de test unitaire

Ces tests pourraient être fait manuellement ou être implémenté de manière automatisé à l'aide de fonction simulant un utilisateur et en vérifiant la sortie de celle ci (assertion).

### PAGE INDEX

* Cas n°1 - affichage produit (ours, caméras, meubles)

En tant que utilisateur de l'application.
Lorsque je me rend sur la page d'acceuil de l'application, je souhaite voir les produits affichés.
Quand je suis sur l'acceuil,
Et que je défile de haut en bas
ou que je clique sur le type de produit du menu gauche
Alors mes produits doivent être affichés par catégorie
et les champs image, nom, prix et description doivent etre renseigné pour chaque produit.

### PAGE PRODUIT OURS

* Cas n°1 - affichage produit

En tant que utilisateur de l'application.
Lorsque je me rend sur la page produit "peluche" de l'application, je souhaite voir les détails du produit en question : Image, nom, prix, couleurs et avis.

* Cas n°2 - Choix couleurs

En tant que utilisateur de l'application.
Lorsque je me rend sur la page produit "peluche" de l'application,
Et que je clique sur le champs couleur,
Je souhaite pouvoir choisir ma couleur
Et quelle s'affiche dans le champs

* Cas n°3 - Ajout panier

En tant que utilisateur de l'application.
Lorsque je me rend sur la page produit "peluche" de l'application,
Et après avoir choisis la couleur de la peluche
Et après avoir cliquer sur commander 
Je souhaite que ma selection s'affiche dans le panier en haut à gauche : panier(1)

### PAGE PANIER

* Cas n°1 - affichage panier ou erreur

En tant que utilisateur de l'application.
Lorsque que le panier comprend un ou plusieurs produits je souhaite que la page s'affiche 
Sinon je veux que la page affiche "Le panier est vide. Veuillez ajouter un produit avant de le consulter."

* Cas n°2 - affichage panier après sélection des produits

En tant que utilisateur de l'application.
Lorsque que je commande une sélection de produit(s) sur les pages produits
Alors je veux que le sélection s'enregistre dans la tableau de la page panier
Et qu'elle affiche l'image, le nom, le prix et le total.

* Cas n°3 - Formulaire mal renseigné - NOM DE FAMILLE / PRENOM /ADRESSE MAIL / VILLE

En tant que utilisateur de l'application.
Lorsque je veux valider mon panier on me demande de remplir un formulaire de commande.
Quand je suis sur le champ "nom de famille"
Et que je ne rentre pas mon nom
Et que je clique sur le boutton "commander"
Alors mon formulaire n'est pas validé
Et un message d'erreur s'affiche "veuillez vérifier ce champs"

En tant que utilisateur de l'application.
Lorsque je veux valider mon panier on me demande de remplir un formulaire de commande.
Quand je suis sur le champ "nom de famille"
Et que je rentre mon nom parmi ceux de la liste ci-dessous (Liste 1)
Et que je clique sur le boutton "commander"
Alors mon formulaire est validé
Liste 1 : Dupond, De la Cathedrale, Tôtô, DE SAINTE MARIE LA VENUSE

* Cas n°4 - Formulaire mal renseigné -  ADRESSE MAIL (page panier.html)

En tant que utilisateur de l'application.
Lorsque je veux valider mon panier on me demande de remplir un formulaire de commande.
Quand je suis sur le champ "adresse mail"
Et que je ne rentre pas mon mail
Ou que je rentre une adresse non valide (sans @)
Et que je clique sur le boutton "commander"
Alors mon formulaire n'est pas validé
Et un message d'erreur s'affiche "veuillez inclure "@" dans l'adresse mail. Il manque le symbole "@" dans l'adresse"

En tant que utilisateur de l'application.
Lorsque je veux valider mon panier on me demande de remplir un formulaire de commande.
Quand je suis sur le champ "adresse mail"
Et que je rentre mon adresse mail parmi ceux de la liste ci-dessous (Liste 1)
Et que je clique sur le boutton "commander"
Alors mon formulaire est validé
Liste 1 : b.dupond@hotmail.com, to-to@tt, dsmlv12@yahoo.fr

### PAGE confirmation

* Cas n°1 - affichage page de confirmation

En tant que utilisateur de l'application.
Lorsque que je confirme le formulaire et que je valide la commande,
Alors une page de confirmation qui comprend les coordonnées indiqué sur le formulaire s'ouvre
et un numéro de commande s'affiche.

Ces tests pourraient être fait manuellement ou être implémenté de manière automatisé à l'aide de fonction simulant un utilisateur et en vérifiant la sortie de celle ci (assertion).

## Pour exécuter l'application

* 1 : Dans un premier temps, installer et démarrer l'API (cf README.md dossier "BACK") localement sur le port 3000 (http://localhost:3000).
* 2 : Ouvrez le fichier "index.html" (dossier FRONT) dans un navigateur quelconque.
* 3 : Vous pouvez utiliser l'application.

## Remarques

Pour le moment, seules les peluches sont ajoutables au panier et commandable.
