function saveBasket(basket){
    localStorage.setItem('basket', JSON.stringify(basket));
}

function getBasket() {
    let basket = localStorage.getItem('basket');
    if(basket === null){
        return [];
    }else{
        return JSON.parse(basket);
    }
}

// Ajout d'un produit au panier avec possibilite de modifie la quantite 
function addBasket(products){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity++;
    }else{
        product.quantity = 1;
    }
    basket.push(products);
    saveBasket(basket);
}

// Retirer un produit du panier 
function removeFromeBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id);
    saveBasket(basket);
}



function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){
            removeFromeBasket(foundProduct);
        }else{
            saveBasket(basket);
        }
    }
}

// calcul de la quantite 

function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for(let product of basket){
        number += product.quantity;
    }
    return number;
}
