// -----------------------------------------------------DECLARATION DES VARIABLES GLOBAL---------------------------------------------------------------------------------
let a = 0;
let b = 0;
let basket;
let idproduct;
let colorproduct;
let quantityproduct
let element;
let addquantity;
let input;
let totalQuantity;
let totalPrice;
// ---------------------------------------------------------------FONCTIONS--------------------------------------------------------------------------------------
function viewBasket(data, element) {
    // getNumberProduct(data)
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
    a = 0
    b = 0
    c =  fetch(`http://localhost:3000/api/products`)
    .then((rep) => rep.json())
    .then((data) => {
        console.log(data)
    for(let p = 0; p <  basket.length; p++){
        let s = 0
        while(data[s]._id != basket[p]._id){
            s++
        }
        b += Number(basket[p].quantity) * Number(data[s].price)
        console.log(b)
    }
    for(let q = 0;q < basket.length; q++){
        a += Number(basket[q].quantity)
        console.log(a)
    }
    document.getElementById('totalQuantity').innerHTML = a;
    document.getElementById('totalPrice').innerHTML = b;
    })
    .catch((error) => console.log(error));

}

getBasket()


