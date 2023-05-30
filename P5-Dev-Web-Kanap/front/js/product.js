let product = new URLSearchParams(document.location.search);
let productId = product.get("id")


async function configProduct() {
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .then(res => res.json()) //Obtention des reponses .json
        .then(data => data) //Conversion des reponses .json en donnees data
        .catch(function (error) { window.alert("Une erreur s'est produite ! Merci de réessayer plus tard") }); //Message d'alerte en cas de panne de l'API
}

//Integration des elements de l'API grace au DOM
function watchProduct(displayProduct) {
    document.querySelector(".item__img").innerHTML = `<img src=${displayProduct.imageUrl} alt=${displayProduct.altTxt}>`;
    document.querySelector("title").textContent = `${displayProduct.name}`;
    document.getElementById("title").textContent = `${displayProduct.name}`;
    document.getElementById("price").textContent = `${displayProduct.price}`;
    document.getElementById("description").textContent = `${displayProduct.description}`;

    // boucle for...in pour intégrer le choix des couleurs dans l'id HTML color et creation d'une balise option
    for (let i in displayProduct.colors) {
        const colors = displayProduct.colors[i];
        let colorId = document.getElementById("colors");
        let itemColor = document.createElement("option");

        // Attribution d'une value pour la balise option créé précédemment dans le HTML
        itemColor.value = colors;
        itemColor.textContent = colors;

        colorId.appendChild(itemColor)
    }


    // Attribution de la valeur minimale pour passer de 0 à 1 dans id quantity value du HTML et afficher 1 article de base
    let minArticle = document.getElementById("quantity");
    minArticle.value = 1;
}

// Creation de l'evenement au clic du button d'ajout au panier
function createEvents() {
    const pushToBasket = document.getElementById("addToCart")
    pushToBasket.addEventListener("click", function (e) {
        e.preventDefault();
        let idProduct = productId;
        // parseInt de la fonction quantityProduct pour analyser ma chaine de caractère en nombre entier
        let quantityProduct = parseInt(document.getElementById("quantity").value);
        let colorProduct = document.getElementById("colors").value;

        // Creation d'un objet type à envoyer dans localStorage
        const objectProduct = {
            id: idProduct,
            quantity: quantityProduct, 
            colors: colorProduct
        };


        // Confirmation d'envoi au panier si une couleur a été sélectionnée
        if (colorProduct) {
            if (window.confirm("Voulez-vous ajouter cet article au panier ?")) {
                addToBasket(objectProduct);
                window.alert(`${quantityProduct} ${document.getElementById("title").textContent} ${colorProduct} ajouté(s) au panier 🛒`)
            }
        } else {
            window.alert("Veuillez choisir une couleur !")
        }

    })
}

// fonction set pour envoyer l'objet au local Storage
function setBasket(basket) {
    // Transformation des données en string
    localStorage.setItem("basket", JSON.stringify(basket));
}

// Fonction get pour récupérer les objets présents dans le localStorage
function getBasket() {
    let basket = localStorage.getItem("basket");
    // Si un objet null est envoyé au localStorage alors il retourne un tableau vide
    if (basket == null) {
        return [];
    } else {
        // Sinon il retourne les données en parse au paramètre basket
        return JSON.parse(basket);
    }
}

// Envoi des données du set vers le get
function addToBasket(objectProduct) {
    let basket = getBasket();
    // Creation d'une boucle et d'une condition pour incrémenter un article de === id && === couleur
    // pour ne pas créer de doublon et ajouter +n à la quantity !
    for (let i in basket) {
        const presentInBasket = basket[i];
        if (objectProduct.id === presentInBasket.id && objectProduct.colors === presentInBasket.colors) {
            presentInBasket.quantity = objectProduct.quantity + presentInBasket.quantity;
            // On sauvegarde les données dans le set et on les retourne si la condition est acceptée
            setBasket(basket);
            return;
        }
    }
    // On sauvegarde les données dans le set et on les retourne si la condition de la fonction est acceptée
    basket.push(objectProduct);
    setBasket(basket);
    return;
}

//Fonction "main" pour rassembler mes différentes fonctions utilisées
async function main() {
    const displayProduct = await configProduct();
    watchProduct(displayProduct);
    createEvents();
}

//Appel de la fonction "main" généralisée
main();