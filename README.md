
                                                         ///////////////////////////////////////////
                                                        ///////////////// Projet N# 5 //////////////
                                                        //////////////// Kanap /////////////////////
                                                        ///////////////////////////////////////////





![Capture](https://user-images.githubusercontent.com/94462048/172205480-944f6151-fbc1-443b-a0aa-e95b6bf09cd2.PNG)







-------------------------------------------------------------------------------------------------------------------------------------------------------------

<h2>Scénario</h2>

Vous êtes en poste dans une agence de développement web depuis quelques semaines maintenant.

Après avoir réalisé avec succès l’intégration de quelques sites web (HTML/CSS), on vous confie une nouvelle mission.

Votre client est Kanap, une marque de canapés qui vend ses produits depuis sa boutique exclusivement.

Aujourd’hui, celle-ci souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.

--------------------------------------------------------------------------------------------------------------------------------------------------------------

<h2>Architecture générale</h2>

<h3>L’application web sera composée de 4 pages :</h3>

● Une page d’accueil montrant (de manière dynamique) tous les articles disponibles à
la vente.

● Une page “produit” qui affiche (de manière dynamique) les détails du produit sur
lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur
peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.

● Une page “panier”. Celle-ci contient plusieurs parties :

  ○ Un résumé des produits dans le panier, le prix total et la possibilité de
  modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.
  
  ○ Un formulaire permettant de passer une commande. Les données du
  formulaire doivent être correctes et bien formatées avant d'être renvoyées au
  back-end. Par exemple, pas de chiffre dans un champ prénom.
  
● Une page “confirmation” :

  ○ Un message de confirmation de commande, remerciant l'utilisateur pour sa
    commande, et indiquant l'identifiant de commande envoyé par l’API.
    
    
 ------------------------------------------------------------------------------------------------------------------------------------------------------------
 
 <h2>Informations complémentaires</h2>
 
  <h3>La page d’accueil</h3>
  
  Cette page présente l’ensemble des produits retournés par l’API.
  Pour chaque produit, il faudra afficher l’image de celui-ci, ainsi que son nom et le début de
  sa description.
  
  En cliquant sur le produit, l’utilisateur sera redirigé sur la page du produit pour consulter
  celui-ci plus en détail.
  
  <h3>La page Produit</h3>

  Cette page présente un seul produit ; elle aura un menu déroulant permettant à l'utilisateur
  de choisir une option de personnalisation, ainsi qu’un input pour saisir la quantité. Ces
  éléments doivent être pris en compte dans le panier.
