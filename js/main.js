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

//genera imagen aleatoria

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

// --------------------------- leer JSON de productos y mostrar cards dinámicamente ---------------------------//

const productList = document.querySelector('.cardsContainer');


window.addEventListener('DOMContentLoaded', () => {
    loadJSON();
    loadCart();
})



function loadJSON(){
    fetch('https://raw.githubusercontent.com/hernandiazorrac/pizza/main/json/pizzas.json') // hace fetch al json hosteado en github
    //fetch('./json/pizzas.json')  -> descomentar para usar live server
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
      <div class="cardButtons">
      <button class="addToCart btn btn-warning mt-2">Agregar</button>
        </div>
    </div>
  </div>
</div>
</div> `
        });
        productList.innerHTML = html;
    })
}

productList.addEventListener('click', purchaseProduct);

// --------------------------- mostrar / ocultar carrito ---------------------------//

const cartContainer = document.querySelector('.cartContainer');
const cartList = document.querySelector('.cartList');
const cartTotalValue = document.getElementById('cartTotalValue');
const cartCountInfo = document.getElementById('cartCountInfo');

let cartItemID = 1;

document.getElementById('cartBtn').addEventListener('click', () => {
    cartContainer.classList.toggle('showCartContainer');
});

// --------------------------- comprar productos ---------------------------//

function purchaseProduct(e){
    if(e.target.classList.contains('addToCart')){
        let product = e.target.parentElement.parentElement.parentElement.parentElement;
        getProductInfo(product)
    }
}

// --------------------------- info de producto después de agregar ---------------------------//

function getProductInfo(product){
    let productInfo = {
        id: cartItemID,
        img: product.querySelector('.productImg img').src,
        name: product.querySelector('.productName').textContent,
        description: product.querySelector('.productDescription').textContent,
        price: product.querySelector('.productPrice').textContent
    }
    cartItemID += 1;
    addToCartList(productInfo);
    saveCart(productInfo);
}

// --------------------------- agregar producto al carrito ---------------------------//

function addToCartList(product){
    const cartItem = document.createElement('div');
    cartItem.classList.add('cartItem');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
    <img src="${product.img}" alt="Imagen del producto">
            <div class="cartItemInfo">
              <h3 class="cartItemName">${product.name}</h3>
              <p class="cartItemDescription text-truncate" style="max-width: 300px;">${product.description}</p>
              
              <input class="cartItemQuantity" type="number" value="1" min="1">
              <span class="cartItemPrice">${product.price}</span>
            </div>
                
            <button type="button" class="cartItemDeleteBtn">
              <i class="fas fa-times"></i>
            </button>
    `;
    cartList.appendChild(cartItem);
    // cartItem.querySelector('.cartItemQuantity').addEventListener('change', quantityChanged)
}

//guardar el carrito en localStorage

function saveCart(item){
    let products = getProductFromStorage();
    products.push(item)
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
}

//cargar carrito de localStorage

function loadCart(){
    let products = getProductFromStorage();
    if(products.length < 1){
        cartItemID = 1;
    }else{
        cartItemID = products[products.length - 1].id
        cartItemID += 1;
    }
    products.forEach(product => addToCartList(product))
    updateCartInfo();
}

function findCartInfo(){
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) =>{
        let price = parseInt(product.price.substr(1))
        return acc += price;
    }, 0)
    return{
        total: total.toFixed(0),
        productCount: products.length
    }
}

findCartInfo();

function updateCartInfo(){
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = '$' + cartInfo.total;
}


//eliminar del carrito

cartList.addEventListener('click', deleteProduct);

function deleteProduct(e){
    let cartItem;
    if(e.target.tagName === "BUTTON"){
        cartItem = e.target.parentElement;
        cartItem.remove(); //sólo lo elimina del DOM
    } else if(e.target.tagName === "I"){
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove(); //sólo lo elimina del DOM
    }
    
    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });

    localStorage.setItem('products', JSON.stringify(updatedProducts));
    updateCartInfo();
}

//cambiar cantidad del item

// function quantityChanged(e){
//     const input = e.target;
//     input.value <= 0 ? (input.value = 1) : null;

// }