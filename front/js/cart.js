// -----------------------------------------------------DECLARATION DES VARIABLES GLOBAL---------------------------------------------------------------------------------
let price = 0;
let quantity = 0;
let basket;
let idproduct;
let colorproduct;
let quantityproduct
let element;
let addquantity;
let input;
let totalQuantity;
let totalPrice;
// Variables formulaire
let testfirstName;
let firstNameInput;

let testlastName;
let lastNameInput;

let testadresse;
let adresseInput;

let testcity;
let cityInput;

let testemail;
let emailInput;

// ---------------------------------------------------------------FONCTIONS--------------------------------------------------------------------------------------
function viewBasket(data, element) {
    // On va chercher des elements dans le DOM
    const section = document.getElementById('cart__items')
    totalQuantity = document.getElementById('totalQuantity')
    totalPrice = document.getElementById('totalPrice')
    // Creation de l'elements
    const article = document.createElement('article')
    const cartItemImg = document.createElement('div')
    let img = document.createElement('img')
    const cardItemContent = document.createElement('div')
    const cardItemContentDescription = document.createElement('div')
    let name = document.createElement('h2')
    let color = document.createElement('p')
    let price = document.createElement('p')
    const cardItemContentSettings = document.createElement('div')
    const cartItemcontentSettingsQuantity = document.createElement('div')
    let quantity = document.createElement('p')
    input = document.createElement('input')
    const CartItemContentSettingsDelete = document.createElement('div')
    const deleteItem = document.createElement('p')
    // Création des attributs des éléments
    article.className = 'cart__item'
    cartItemImg.className = 'cart__item__img'
    cardItemContent.className = 'cart__item__content'
    cardItemContentDescription.className = 'cart__item__content__description'
    cardItemContentSettings.className = 'cart__item__content__settings'
    cartItemcontentSettingsQuantity.className = 'cart__item__content__settings__quantity'
    input.type = 'number'
    input.className = 'itemQuantity'
    input.name = "itemQuantity"
    input.min = 1
    input.max = 100
    input.value = quantity
    CartItemContentSettingsDelete.className = 'cart__item__content__settings__delete'
    deleteItem.textContent = 'Supprimer'
    deleteItem.className = 'deleteItem'
    // Création des attributs des éléments
    name.textContent = data.name
    price.textContent = data.price + '€'
    img.src = data.imageUrl
    img.alt = data.altTxt
    colorproduct = element.color
    quantityproduct = element.quantity
    color.textContent = colorproduct
    quantity.textContent = 'Qté :  '
    input.value = quantityproduct
    // Injection JS en HTML
    section.appendChild(article)
    article.appendChild(cartItemImg)
    cartItemImg.appendChild(img)
    article.appendChild(cardItemContent)
    cardItemContent.appendChild(cardItemContentDescription)
    cardItemContentDescription.appendChild(name)
    cardItemContentDescription.appendChild(color)
    cardItemContentDescription.appendChild(price)
    article.appendChild(cardItemContentSettings)
    cardItemContentSettings.appendChild(cartItemcontentSettingsQuantity)
    cartItemcontentSettingsQuantity.appendChild(quantity)
    cartItemcontentSettingsQuantity.appendChild(input)
    article.appendChild(CartItemContentSettingsDelete)
    CartItemContentSettingsDelete.appendChild(deleteItem)
    // Evenement qui change la qte des articles dans le panier 
    input.addEventListener('input', (e) => {
        basket = JSON.parse(localStorage.getItem('Basket'));
        addquantity = Number(e.target.value)
        let addprice = 0
        basket.forEach(product => {
            if (product._id === element._id && product.color === element.color) {
                product.quantity = addquantity
                saveBasket(basket)
                getNumberProduct(element)
            }
        })
    })

    // Evenement qui supprime un article 
    deleteItem.addEventListener('click', (e) => {

        basket = JSON.parse(localStorage.getItem('Basket'));
        for (let i = 0; i < basket.length; i++) {
            if (basket[i]._id === element._id) {
                let del = basket.splice(i, 1)
                article.remove(cartItemImg)
                cardItemContentDescription.remove(name)
                cardItemContentDescription.remove(color)
                cardItemContentDescription.remove(price)
                cartItemImg.remove(img)
                cartItemcontentSettingsQuantity.remove(quantity)
                cartItemcontentSettingsQuantity.remove(input)
                CartItemContentSettingsDelete.remove(deleteItem)
                saveBasket(basket)
                getNumberProduct(element)

            }
        }
    })
}
// Fonction qui fait une requet au local storage et a l'api 
function getBasket() {
    basket = JSON.parse(localStorage.getItem('Basket'));
    basket.forEach(element => {
        idproduct = element._id
        fetch(`http://localhost:3000/api/products/${idproduct}`)
            .then((rep) => rep.json())
            .then((data) => {
                viewBasket(data, element)
            })
            .catch((error) => console.log(error));
    });
    getNumberProduct()
}
// Fonction qui sauvegarde la panier dans le local storage
function saveBasket(basket) {
    localStorage.setItem("Basket", JSON.stringify(basket));
}
// Fonction qui effectue le calcul de la quantite et du montant 
function getNumberProduct() {
    price = 0
    quantity = 0
    c = fetch(`http://localhost:3000/api/products`)
        .then((rep) => rep.json())
        .then((data) => {
            for (let p = 0; p < basket.length; p++) {
                let s = 0
                while (data[s]._id != basket[p]._id) {
                    s++
                }
                price += Number(basket[p].quantity) * Number(data[s].price)
            }
            for (let q = 0; q < basket.length; q++) {
                quantity += Number(basket[q].quantity)
            }
            document.getElementById('totalQuantity').innerHTML = quantity;
            document.getElementById('totalPrice').innerHTML = price;
        })
        .catch((error) => console.log(error));

}
// Fonction qui sera appeler quand l'utilisateur passera se commande
function confirmation(basket){
    // Ont recupere le panier
    if (basket === null) {
        return [];
    } else {
        return JSON.parse(basket);
    }

}



getBasket()

// On va chercher des elements dans le DOM
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");
const order = document.getElementById("order");
// on cree des variables contenant nos regex afin de controler les information saiais par l'utilisateur 
const regexName = /[a-zA-Z ][a-zA-Z ][a-zA-Z]{1,20}/g;
const regexOther = /[a-z0-9]{1,20}/g;
const regexMail = /[A-z0-9-.]{1,}[@][A-z-]{2,}[.][A-z]{2,}/g;

    // on cree des evenement pour recuperer et controle les donnees saisis par l'utilisateur 
    firstName.addEventListener('input', (e) => {
        firstNameInput = e.target.value
        testfirstName = regexName.test(firstNameInput)
        return;
    });

    lastName.addEventListener('input', (e) => {
        lastNameInput = e.target.value;
        testlastName = regexName.test(lastNameInput);
        return;
    });

    address.addEventListener('input', (e) => {
        adresseInput = e.target.value;
        testadresse = regexOther.test(adresseInput);
        return;
    });

    city.addEventListener('input', (e) => {
        cityInput = e.target.value;
        testcity = regexOther.test(cityInput);
        return;
    });

    email.addEventListener('input', (e) => {
        emailInput = e.target.value;
        testemail = regexMail.test(emailInput);
        return;
    });
    // on verifie le panier
    order.addEventListener('click', (e) => {
        e.preventDefault()
    if (basket.length === 0) {
        alert('Votre Panier est vide !')
        // on verifie les informations entree par l'utilisateur
    } else if (testfirstName == null || testlastName == null || testadresse == null || testcity == null || testemail == null) {
        alert('Merci de remplir les champs requis')
        firstNameErrorMsg.textContent = 'Veuillez renseigner votre prenom';
        lastNameErrorMsg.textContent = 'Veuillez renseignez votre nom'
        addressErrorMsg.textContent = 'Veuillez renseignez votre adresse'
        cityErrorMsg.textContent = 'Veuillez renseignez votre ville'
        emailErrorMsg.textContent = 'Veuillez renseignez votre adresse email et respecter le format (exemple@domaine.fr)'
    } else if (testfirstName === false) {
        firstNameErrorMsg.textContent = 'Veuillez renseigner votre prenom';
    } else if (testlastName === false) {
        lastNameErrorMsg.textContent = 'Veuillez renseignez votre nom'
    } else if (testadresse === false) {
        addressErrorMsg.textContent = 'Veuillez renseignez votre adresse'
    } else if (testcity === false) {
        cityErrorMsg.textContent = 'Veuillez renseignez votre ville'
    } else if (testemail === false) {
        emailErrorMsg.textContent = 'Veuillez renseignez votre adresse email et respecter le format (exemple@domaine.fr)'
    } else {
        // on cree un objet regroupant les informations de l'utilisateur et le panier 
        contact = { "firstName": firstNameInput, "lastName": lastNameInput, "address": adresseInput, "city": cityInput, "email": emailInput }
        let products = []
        let sendBasket = {contact, products}
        // on pousse les produits de notre panier dans customerBasket
        for (let e = 0; e < basket.length; e++) {
            products.push(basket[e]._id)
            console.log(products)
        }
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendBasket)
        })

            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })

            .then((commandId) => {
                location.href = `confirmation.html?id=${commandId.orderId}`;
            })


            .catch(function (err) {
                console.error(err)
                alert("souci avec le serveur : réessayez ultérieurement")
            })

    }

});