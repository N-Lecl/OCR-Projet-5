// Utilisation de searchParams pour recherché l'ID de commande
const numberOrder = new URL(location.href).searchParams.get("orderId")

// Injection de orderId récupérer avec searchParams dans le code HTML
function displayOrderId() {
    document.getElementById("orderId").textContent = `${numberOrder}`;
}

// Remove du localStorage
function clearBasket() {
    localStorage.removeItem("basket");
}

displayOrderId();
clearBasket();