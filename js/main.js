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
            '',
            'success'
        )">Confirmar</button>
    </div>`
  })
  randomImg();
}


// --------------------------- leer JSON de productos y mostrar cards dinámicamente ---------------------------//

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
            <div class="productItem card border-light mb-3 mx-auto" style="max-width: 540px;">
            <div class="row g-0">
                <div class="productImg col-md-4 p-3">
                    <img src="${product.img}" id="imgId" class="imgClass img-fluid rounded-start" alt="">
                </div>
        <div class="col-md-8">
            <div class="productContent card-body mt-3">
                <h5 class="productName card-title">${product.nombre}</h5>
                <span class="productDescription card-text text-muted mt-3">${product.descripcion}</span>
                <p class="productPrice text-muted">$${product.precio}</p>
    </div>
  </div>
</div>
</div> 

`
        });
        productList.innerHTML = html;
    })
}


// ------------------------------------------------------------ //

let cartContent = document.querySelector('.cartItemsContainer');
let cart = [];
const comprarButton = document.querySelector('.comprarButton');
// comprarButton.addEventListener('click', comprarButtonClicked);
const addToCartButton = document.querySelectorAll('.addToCart');
const cartItemsContainer = document.querySelector('.cartItemsContainer')

document.getElementById("purchaseButton").onclick = function () {
    location.href = "./pages/payment.html";
    cartItemsContainer.innerHTML = ''
    const storage = JSON.parse(localStorage.getItem('cart'));
    if(storage){
        cart = [];
        showCart();
    }
};


addToCartButton.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked)
});


function addToCartClicked(e){
    const button = e.target;
    
    const item = button.closest('.card');
    
    const itemTitle = item.querySelector('.productName').textContent;
    const itemPrice = item.querySelector('.productPrice').textContent;
    const itemImg = item.querySelector('.imgClass').src;

    

    const newItem = {
        title: itemTitle,
        price: itemPrice,
        img: itemImg,
        quantity: 1
    }

    addToCart(newItem);
}

function addToCart(newItem){
    
    const inputElement = document.getElementsByClassName('cartItemQuantity')
    
    for(let i = 0; i < cart.length; i++){
        if(cart[i].title.trim() === newItem.title.trim()){
            cart[i].quantity++;
            const inputValue = inputElement[i]
            inputValue.value++;
            updateCartTotal();
            return;
        }
    }
    cart.push(newItem)
    showCart();
    
}

function showCart(){

    cartItemsContainer.innerHTML = ''
    
    cart.map(item => {
    const cartRow = document.createElement('div');
    cartRow.classList.add('itemCart')

    const cartContent = `
        <div class="row shoppingCartItem">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src='${item.img}' class="cartImg img-fluid h-50">
                    <h6 class="cartItemTitle text-truncate ms-3">${item.title}
                    </h6>
                </div>
            </div>
            <div class="col-2">
                <div class="cartPrice d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="mb-0 cartItemPrice">${item.price}</p>
                </div>
            </div>
            <div class="col-4">
                <div class="cartQuantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="cartItemQuantity col-2" id="num" type="number" value="${item.quantity}" min="1">
                    <button class="btn btn-danger buttonDelete" type="button">X</button>
                </div>
            </div>
        </div> `;

        cartRow.innerHTML = cartContent;
        cartItemsContainer.append(cartRow)

        cartRow.querySelector('.buttonDelete').addEventListener('click', removeCartItem)
        cartRow.querySelector('.cartItemQuantity').addEventListener('change', quantityChanged)
    })
        updateCartTotal();
}

function updateCartTotal(){

    let total = 0;
    const cartTotal = document.querySelector('.shoppingCartTotal')

    const cartItems = document.querySelectorAll('.shoppingCartItem')

    cartItems.forEach(shoppingCartItem => {
        const cartItemPriceElement = shoppingCartItem.querySelector('.cartItemPrice')
        const cartItemPrice = Number(cartItemPriceElement.textContent.replace('$', ''));
        const cartItemQuantityElement = shoppingCartItem.querySelector('.cartItemQuantity')
        
        const cartItemQuantity = Number(cartItemQuantityElement.value);

        total = total + cartItemPrice * cartItemQuantity;
    })

    cartTotal.innerHTML = `Total: $${total}`
    addToLocalStorage()
}


function removeCartItem(e){
    const buttonClicked = e.target;
    const itemCart = buttonClicked.closest('.itemCart')
    const title = itemCart.querySelector('.cartItemTitle').textContent

    for(let i = 0; i < cart.length; i += 1){
        if(cart[i].title.trim() === title.trim()){
            cart.splice(i,1)
        }
    }

    buttonClicked.closest('.shoppingCartItem').remove()
    updateCartTotal();
}

function quantityChanged(e){
    const inputQuantity = e.target;
    const itemCart = inputQuantity.closest('.itemCart')
    const title = itemCart.querySelector('.cartItemTitle').innerText;

    cart.forEach(item => {
        if(item.title === title){
            inputQuantity.value < 1 ? (inputQuantity.value = 1) : inputQuantity.value;
            item.quantity = inputQuantity.value;
            updateCartTotal();
        }
    })
}



function addToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('cart'));
    if(storage){
        cart = storage;
        showCart();
    }
}