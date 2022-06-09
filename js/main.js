let pizzaArrayL = [{
    nombre: "napolitana",
    img: 'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/napolitana1_eqqqik.webp',
    precio: 900},

    {nombre: "margarita",
    img: 'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/margherita1_zdebmz.webp',
    precio: 700},
    
    {nombre: "cebolla",
    img: 'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139889/JS%20CoderHouse/onion1_silhwp.webp',
    precio: 700},
    
    {nombre: "pepperoni",
    img:'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139887/JS%20CoderHouse/pepperoni1_iwzt4a.webp',
    precio: 800},
        
    {nombre: "champignones",
    img: 'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/champ1_vhdqcx.webp',
    precio: 900},
    
    {nombre: "salchichas",
    img: 'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139887/JS%20CoderHouse/sausage1_zyjuqv.webp',
    precio: 800}]

    
let pizzaArrayR = [{
    nombre: "champi",
    img: 'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/champ2_hoy7ho.webp'},
    
    {nombre: "pepperoni",
    img:'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139887/JS%20CoderHouse/pepperoni2_zur7ra.webp'},
    
    {nombre: "napolitana",
    img: 'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139889/JS%20CoderHouse/napolitana2_manwdm.webp'},
    
    {nombre: "margarita",
    img: 'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/margherita2_srxmbc.webp'},
    
    {nombre: "salchichas",
    img: 'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/sausage2_lniueh.webp'},
    
    {nombre: "cebolla",
    img: 'https://res.cloudinary.com/digb4d0uf/image/upload/v1652139889/JS%20CoderHouse/onion2_m04yxb.webp'}]

// ------------------------------------------------------------ //

const containerPizzas = document.querySelector(".pizzasContainer")

// ------------------------------------------------------------ //

const pizzasVariedad = [{id: 1, nombre: "Pepperoni", descripcion: "Salsa, muzzarella, rodajas de pepperoni.", precio: 800, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139887/JS%20CoderHouse/pepperoni200_gpvvj6.webp"}, {id: 2, nombre: "Margarita", descripcion: "Salsa, muzzarella, albahaca.", precio: 700, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/margherita200_unlsey.webp"}, {id: 3, nombre: "Napolitana", descripcion: "Salsa, parmesano, albahaca.", precio: 900, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139889/JS%20CoderHouse/napolitana200_gyc07e.webp"}, {id: 4, nombre: "Champignones", descripcion: "Salsa, muzzarella, champignones, tomate, olivas negras.", precio: 900, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/champ200_wggmhk.webp"}, {id: 5, nombre: "Cebolla", descripcion: "Muzzarella, cebolla morada, olivas negras.", precio: 700, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139889/JS%20CoderHouse/onion200_zc6bmy.webp"}, {id: 6, nombre: "Salchichas", descripcion: "Salsa, muzzarella, champignones, salchichas, olivas negras.", precio: 800, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/sausage200_vtn9k0.webp"}]

// --------------------------   pizza aleatoria    -------------------------------- //

function randomImg(){ 
    //elige un valor aleatorio del array
    let randomArray = pizzaArrayL[Math.floor(Math.random() * pizzaArrayL.length)].img;
    let randomArray2 = pizzaArrayR[Math.floor(Math.random() * pizzaArrayR.length)].img;

    //ruta de donde se obtienen las imágenes
    document.getElementById('imgPizza').src = randomArray; 
    document.getElementById('imgPizza2').src = randomArray2;
}

// modal para elegir pizza aleatoria
function modalPizza(){
    Swal.fire({
        title: `<div class="pizzaRandom">
        <div class="imgContainer">
        <img id="imgPizza">
        <img id="imgPizza2">
        </div>
        <div class="pizzasRandomTexto"></div>`,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: true,
        showCloseButton: true,
        html: `<div class="p-4">
        <button class="btn btn-warning" onclick="randomImg()">Pizza aleatoria</button>
        <button class="btn btn-success" onclick="Swal.fire(
            'Pedido aceptado',
            '¡Estamos preparando tu pizza!',
            'success'
        )">Confirmar</button>
    </div>`
  })
  randomImg();
}


// ------------------- [cards de pizzas] ------------------- //

const productList = document.querySelector('.cardsContainer');


window.addEventListener('DOMContentLoaded', () => {
    loadJSON();
})



function loadJSON(){
    // fetch('https://raw.githubusercontent.com/hernandiazorrac/pizza/main/json/pizzas.json') // hace fetch al json hosteado en github
    fetch('./json/pizzas.json') // -> descomentar para usar live server
    .then(response => response.json())
    .then(data => {
        let html = ``;
        data.forEach(product => {
            html += `
            <div class="productItem card mb-3 mx-auto" style="max-width: 540px;">
            <div class="row g-0">
                <div class="productImg col-md-4 p-3">
                    <img src="${product.img}" class="img-fluid rounded-start" alt="Pizza de pepperoni">
                </div>
        <div class="col-md-8">
            <div class="productContent card-body mt-3">
                <h5 class="productName card-title">${product.nombre}</h5>
                <span class="productDescription card-text text-muted mt-3">${product.descripcion}</span>
                <p class="productPrice text-muted">$${product.precio}</p>
    </div>
  </div>
</div>
</div> `
        });
        productList.innerHTML = html;
    })
}

// ----------------------   [carrito]   ---------------------- //

let cart = []

//agregar al carrito
class Items {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.cantidad = parseInt(cantidad);
    }
}

function addToCart(nombre, precio, cantidad){

    //si existe el item, incrementar cantidad
    for (let i in cart){
        if (cart[i].nombre === nombre){
            cart[i].cantidad += 1;
            console.table(cart);
            console.log("El total es: $" + totalCart())
            return;
        }
    }

    //si no existe el item, agregarlo
    let item = new Items (nombre, precio, cantidad);
    cart.push(item);
    console.table(cart);
    console.log("El total es: $" + totalCart());
}

// ------------------------------------------------------------ //

//eliminar del carrito de a uno

function removeFromCart(nombre){
    for(let i in cart){
        if(cart[i].nombre === nombre){
            cart[i].cantidad -= 1;

            if(cart[i].cantidad === 0){
                cart.splice(i, 1);
            }
            console.table(cart);
            console.log("El total es: $" + totalCart());
            return;
        }
    }
}

// ------------------------------------------------------------ //

//eliminar del carrito

function removeAllFromCart(nombre){
    for(let i in cart){
        if(cart[i].nombre === nombre){
            cart.splice(i, 1);
            console.table(cart);
            console.log("El total es: $" + totalCart());
            return;
        }
    }
}

// ------------------------------------------------------------ //

//vaciar el carrito

function clearCart(){
    cart = [];
    console.table(cart);
}

// ------------------------------------------------------------ //

//calcular total del carrito

function totalCart(){
    let totalPrice = 0;
    for(let i in cart){
        totalPrice += cart[i].precio * cart[i].cantidad;
    }
    return totalPrice;
}
// ------------------------------------------------------------ //

// muestra la cantidad del mismo item

function countDisplay(){
    let cant = 0;
    for(let i in cart){
        cant += cart[i].cantidad ;
    }
    document.querySelector('.countDisplay').innerHTML = cant;
}

// ------------------------------------------------------------ //

// const buttons = document.querySelector('.cardButtons');

// (()=>{buttons.addEventListener('click', delegar)})();

// function delegar(evt){
//     evt.preventDefault();
//     console.log(evt.target.classList)
// }

const addToCartButton = document.querySelectorAll('.card');
addToCartButton.forEach((addToCartButton) =>{
    addToCartButton.addEventListener('click', addToCartClicked);
});

const cartItemsContainer = document.querySelector('.cartItemsContainer')

function addToCartClicked(evt){
    const button = evt.target;
    const item = button.closest('.card');

    const itemTitle = item.querySelector('.itemTitle').textContent;
    const itemPrice = item.querySelector('.itemPrice').textContent;
    const itemImg = item.querySelector('.itemImg').src;

    addItemToCart(itemTitle, itemPrice, itemImg);
}

function addItemToCart(itemTitle, itemPrice, itemImg){
 
    const elementsTitle = cartItemsContainer.getElementsByClassName('cartItemTitle');

    for (let i = 0; i < elementsTitle.length; i += 1){
        if(elementsTitle[i].innerText === itemTitle){
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.cartItemQuantity');
            elementQuantity.value++;
            updateTotal();
            return;
        }
    }

    const cartRow = document.createElement('div');
    const cartContent = `
    <div class="row cartItem">
    <div class="col-6 col-sm-6 ms-auto">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <img src=${itemImg} height="75" class="m-2 shopping-cart-image">
            <h6 class="shopping-cart-item-title cartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
        </div>
    </div>
    <div class="col-2 col-sm-1">
        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 cartItemPrice">${itemPrice}</p>
        </div>
    </div>
    <div class="container row col-4 ">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input cartItemQuantity" type="number" value="1">
            <button class="btn btn-danger ms-1 buttonDelete" onclick="removeAllFromCart('${pizzasVariedad[0].nombre}', '${pizzasVariedad[0].precio}', '${pizzasVariedad[0].cantidad}')" type="button">X</button>
        </div>
    </div>
</div>`;

    cartRow.innerHTML = cartContent;
    cartItemsContainer.append(cartRow)

    cartRow.querySelector('.buttonDelete').addEventListener('click', removeFromCart)

    cartRow.querySelector('.cartItemQuantity').addEventListener('change', quantityChanged)

    updateTotal();
}

function updateTotal(){
    let total = 0;
    const cartTotal = document.querySelector('.cartTotal')
    const cartItems = document.querySelectorAll('.cartItem')

    cartItems.forEach(cartItem => {
        const cartItemPriceElement = cartItem.querySelector('.cartItemPrice');
        const cartItemPrice = Number(cartItemPriceElement.textContent.replace('$', ''));
        const cartItemQuantityElement = cartItem.querySelector('.cartItemQuantity');
        const cartItemQuantity = Number(cartItemQuantityElement.value)
        
        total = total + cartItemPrice * cartItemQuantity;
    })
    cartTotal.innerHTML = `$${total}`;
}

function removeFromCart(evt){
    const buttonClicked = evt.target;
    buttonClicked.closest('.cartItem').remove();
    removeAllFromCart();
    updateTotal();
}

function quantityChanged(evt){
    const input = evt.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateTotal();
}