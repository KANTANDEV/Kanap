
// Je fait une requete global a mon api 
function fetchApi() {
    fetch(`http://localhost:3000/api/products`)
        .then((rep) => rep.json())
        .then((data) => {
            displayCart(data)
        })
        .catch((error) => console.log(error));
}

 function displayCart(tabrep) {
    

    for (const canap of tabrep) { //Pour chaque articles de mon tableau de mon api :
        //         // Déclartaion des const de création d'élements
        const link = document.createElement('a')
        const image = document.createElement('img')
        const name = document.createElement('h3')
        const desc = document.createElement('p')
        const art = document.createElement('article')

        // On va chercher l'element dans le DOM
        const items = document.getElementById('items')

        // Création des attributs des éléments 

        link.href = "./product.html?id=" + canap._id
        image.src = canap.imageUrl
        image.alt = canap.altTxt
        name.classList.add('productName')
        name.textContent = canap.name
        desc.classList.add('productDescription')
        desc.textContent = canap.description

        // Injection JS en HTML

        items.appendChild(link)
        link.appendChild(art)
        art.appendChild(image)
        art.appendChild(name)
        art.appendChild(desc)
    }

}
fetchApi();