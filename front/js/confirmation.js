//On recupere l'id dans url
const myUrl = window.location.href;
const searchUrl = new URL(myUrl);
const myId = searchUrl.searchParams.get("id");

// on l'injecte dans la page:
const orderId = document.getElementById("orderId")
orderId.innerHTML = myId

//on vide le panier
let Basket = localStorage.getItem("Basket");
Basket = []
localStorage.setItem("Basket", JSON.stringify(Basket));