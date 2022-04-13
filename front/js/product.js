const selectedId = new URLSearchParams(location.search).get(`id`)




function fetchApi() {
    fetch(`http://localhost:3000/api/products/${selectedId}`)
        .then((rep) => rep.json())
        .then((data) => {
            displayProduct(data)
        })
        .catch((error) => console.log(error));
}


fetchApi();

function displayProduct(canap) {
    // Creation de l'element
    console.log(canap)
    const divImage = document.getElementsByClassName('item__img')
    const image = document.createElement(`img`)
    // On va chercher l'element dans le DOM
    const title = document.getElementById('title')
    const price = document.getElementById('price')
    const description = document.getElementById('description')
    // Création des attributs des éléments 
    image.src = canap.imageUrl
    image.alt = canap.altTxt
    title.textContent = canap.name
    price.textContent = canap.price
    description.textContent = canap.description
    // On lie la classe a la balise image
    divImage[0].appendChild(image)

}