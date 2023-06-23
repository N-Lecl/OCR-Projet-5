// Accueil - Affichage des différtents articles

// Recuperation des donnees de l'API - Methode FETCH
async function searchItems() {
    return fetch("http://localhost:3000/api/products") //URL de l'API
        .then(res => res.json()) //Obtention des reponses .json
        .then(data => data) //Conversion des reponses .json en donnees data
        .catch(function (error) { window.alert("Une erreur s'est produite ! Merci de réessayer plus tard") }); //Message d'alerte en cas de panne de l'API
}

function displayItems(listProducts) {
    const element = document.getElementById("items"); //Recuperation du 1er ID #items du HTML

    for (let i in listProducts) {
        const product = listProducts[i];
        let urlItems = document.createElement("a"); //Creation de l'élément <a> dans le HTML
        urlItems.href = `./product.html?id=${product._id}`; // Lien de l'url

        //Creation des enfants de <a>
        urlItems.innerHTML = `<article>
<img src=${product.imageUrl} alt=${product.altTxt}>
<h3 class="productName">${product.name}</h3>
<p class="productDescription">${product.description}</p>
</article>`;
        element.appendChild(urlItems);
    }
}

//Fonction "main" pour appeler mes fonctions API et DOM
async function main() {
    const listProducts = await searchItems();
    displayItems(listProducts);
}

//Appel de la fonction "main"
main();
