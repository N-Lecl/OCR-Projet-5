async function searchItems() {
    return fetch("http://localhost:3000/api/products") //URL de l'API
      .then(res => res.json()) //Obtention des reponses .json
      .then(data => data) //Conversion des reponses .json en donnees data
      .catch(function (error) { window.alert("Une erreur s'est produite ! Merci de réessayer plus tard") }); //Message d'alerte en cas de panne de l'API
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
  
  // Masquer formulaire si le panier client est vide
  async function emptyBasket() {
    const spanQtt = document.getElementById("totalQuantity");
    let form = document.querySelector(".cart__order__form");
    const cartContainer = document.getElementById("cartAndFormContainer");
    if (spanQtt.textContent == 0) {
      form.style.display = "none";
      cartContainer.innerHTML = `<h1>Votre panier est vide</h1>
      <section class="cart">
        <section id="cart__items">
        </section>
        <div class="cart__price">
                <p>Total (<span id="totalQuantity">0</span> articles) : <span id="totalPrice">0</span> €</p>
              </div>
        </section>`
    }
  }
  
  