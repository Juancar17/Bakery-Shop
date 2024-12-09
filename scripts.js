// Array con las rutas de las imágenes que se usarán en el slider



const images = [
    'img/local/pre2-4567.jpg',
    'img/local/Celicioso-Bakery-Madrid-Sin-Gluten-Cupcakes-1024x682.jpg',
    'img/local/celicioso-3.jpg',
    'img/local/3.jpg',
    'img/local/2.jpg',
    
];


let currentImageIndex = 0;
const backgroundSlider = document.getElementById('background-slider');

// Función para cambiar las imágenes de fondo
function changeBackgroundImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length; // Va cambiando entre las 5 imágenes
    backgroundSlider.style.backgroundImage = `url(${images[currentImageIndex]})`;
}

// Cambia la imagen cada 4 segundos
setInterval(changeBackgroundImage, 3000);


let textBuscar = document.querySelector('input[type="text"]');
let btnBuscar = document.getElementById("buscarBTN");
let btn = document.querySelectorAll(".buscador-btn")

function buscador() {
    let direccion = textBuscar.value.trim(); // Quita espacios innecesarios
    if (direccion) {
        // Codifica la dirección para que sea válida en una URL
        let url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
        window.open(url, '_blank'); // Abre Google Maps en una nueva pestaña
    } else {
        alert("Debes escribir un código postal o dirección válido.");
    }
}

btnBuscar.addEventListener("click", buscador)
let dir = "https://www.google.com/maps/search/?api=1&query="
btn.forEach(function(e) {
    e.addEventListener("click", function() {
        window.open(dir, '_blank')
    })
})


/*-------Agregar pedidos al carrito---------*/

// Variables
let cart = [];
const cartModal = document.getElementById('cart-modal');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');

// Mostrar modal
document.querySelectorAll('.buttonComprar').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
        cartModal.style.display = 'flex';
    });
});

// Actualizar el carrito
function updateCart() {
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (€${item.price.toFixed(2)})</span>
                <input type="number" value="${item.quantity}" class="quantity-input" data-index="${index}">
                <button class="update-quantity" data-index="${index}">Actualizar</button>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            </div>
        `;
    });

    cartTotalSpan.innerText = total.toFixed(2);
}

// Eliminar productos
cartItemsDiv.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        updateCart();
    }
});

// Actualizar cantidad de productos
cartItemsDiv.addEventListener('click', function(e) {
    if (e.target.classList.contains('update-quantity')) {
        const index = e.target.getAttribute('data-index');
        const newQuantity = parseInt(document.querySelector(`input[data-index="${index}"]`).value);

        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            updateCart();
        }
    }
});

// Vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', function() {
    cartModal.style.display = 'none';
});

// Cerrar modal
document.querySelector('.close').addEventListener('click', function() {
    cartModal.style.display = 'none';
});

