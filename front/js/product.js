// -----------------------------------------------------DECLARATION DES VARIABLES---------------------------------------------------------------------------------


let colorValue = '';
let numberOfArticles = 0;
// Declaration d'une constante qui va chercher l'id du produit dans la barre de recherche 
const selectedId = new URLSearchParams(location.search).get(`id`)

// --------------------------------------------------------------------------DOM---------------------------------------------------------------------------------

// On va chercher l'element dans le DOM
const getcolor = document.getElementById('colors')
const quantity = document.getElementById('quantity')
const addToCart = document.getElementById('addToCart')



// ---------------------------------------------------------------FONCTIONS--------------------------------------------------------------------------------------
// Fonction aui fait une requete a mon api 
function fetchApi() {
    fetch(`http://localhost:3000/api/products/${selectedId}`)
        .then((rep) => rep.json())
        .then((data) => {
            displayProduct(data)
        })
        .catch((error) => console.log(error));
}


fetchApi();

// Fonction qui affiche les informations de mon produit renvoye par mon api 
function displayProduct(canap) {


    // On va chercher l'element dans le DOM dans ma fonction
    const title = document.getElementById('title')
    const price = document.getElementById('price')
    const description = document.getElementById('description')
    const divImage = document.getElementsByClassName('item__img')
    const getcolor = document.getElementById(`colors`)
    // Creation de l'element
    const image = document.createElement(`img`)
    // Création des attributs des éléments 
    image.src = canap.imageUrl
    image.alt = canap.altTxt
    title.textContent = canap.name
    price.textContent = canap.price
    description.textContent = canap.description
    // On lie la classe a la balise image
    divImage[0].appendChild(image)




    for (const color of canap.colors) {
        // on cree une balise option pour chaque couleur de mon tableau
        const addcolor = document.createElement(`option`)
        // Création des attributs des éléments 
        addcolor.textContent = color
        addcolor.value = color
        // Injection JS en HTML
        getcolor.appendChild(addcolor)

    }
}
// Fonction qui verifie si les informations entree par l'utilisateur ne sonts pas nul
function verif(colorValue, numberOfArticles) {
    if (colorValue != null && numberOfArticles != 0) {
        verifInput = true
    } else {
        alert('Merci de sélectionner une couleur et une quantité')
        verifInput = false
    }
}
// Fonction qui enregistre mon panier
function saveBasket(Selectedproduct) {
    localStorage.setItem("Basket", JSON.stringify(Selectedproduct));
}
// Fonction qui me permet de recuperer un panier existant dans mon localstorage
function getBasket() {
    let basket = localStorage.getItem('Basket');
    if (basket === null) {
        return [];
    } else {
        return JSON.parse(basket);
    }
}
// Fonction qui ajoute un article a mon panier 
function addBasket(Selectedproduct) {
    let Basket = getBasket();
    let foundProduct = Basket.find(i => i._id == Selectedproduct._id && i.color == Selectedproduct.color )
    if (foundProduct != undefined) {
        foundProduct.quantity = (foundProduct.quantity + Number(Selectedproduct.quantity))
    } else {
        Selectedproduct.quantity = Number(numberOfArticles);
        Basket.push(Selectedproduct);
    }
    saveBasket(Basket);
}

// ---------------------------------------------------------------EVENTS LISTENER--------------------------------------------------------------------------------------
// Je recupere le couleur choisis par l'utilisateur
getcolor.addEventListener('input', (c) => {
    colorValue = c.target.value
})
// Je recupere le quantite choisis par l'utilisateur
quantity.addEventListener('input', (q) => {
    numberOfArticles = q.target.value
})
// J'ajoute une evenement qui attend que l'utilisateur click sur "ajouter au panier" pour envoyer les informatiom dans le localstorage
addToCart.addEventListener('click', () => {
    // Je definie les options de mon produit dans une variable appeler Selectedproduct
    const Selectedproduct = {
        _id: selectedId,
        color: colorValue,
        quantity: numberOfArticles
    }
    verif(colorValue, numberOfArticles);
    if (verifInput === true) {
        addBasket(Selectedproduct);
    }

})