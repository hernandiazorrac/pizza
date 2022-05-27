let pizzaArrayL = ['napolitana1.png', 'margherita1.png', 'onion1.png', 'pepperoni1.png', 'champ1.png', 'sausage1.png'] //array de imágenes de pizzas
let pizzaArrayR = ['champ2.png', 'pepperoni2.png', 'napolitana2.png', 'margherita2.png', 'sausage2.png', 'onion2.png']

// ------------------------------------------------------------ //

const containerPizzas = document.querySelector(".pizzasContainer")

// --------------------------   pizza aleatoria    -------------------------------- //

//genera imagen aleatoria

function randomImg(){ 
    //elige un valor aleatorio del array
    let randomArray = Math.floor(Math.random() * pizzaArrayL.length);
    let randomArray2 = Math.floor(Math.random() * pizzaArrayR.length);

    let selectImg = pizzaArrayL[randomArray]
    let selectImg2 = pizzaArrayR[randomArray2]

    //ruta de donde se obtienen las imágenes
    document.getElementById('imgPizza').src = `./assets/img/${selectImg}`; 
    document.getElementById('imgPizza2').src = `./assets/img/${selectImg2}`;
}

// modal para elegir pizza aleatoria
function modalPizza(){
    Swal.fire({
        title: `<div class="pizzaRandom">
        <div class="imgContainer">
        <img id="imgPizza">
        <img id="imgPizza2">
        </div>`,
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
            saveCart()
            return;
        }
    }

    //si no existe el item, agregarlo
    let item = new Items (nombre, precio, cantidad);
    cart.push(item);
    console.table(cart);
    console.log("El total es: $" + totalCart())
    saveCart()
}

// ------------------------------------------------------------ //

//eliminar del carrito de a uno

function removeFromCart(nombre){
    for(let i in cart){
        cart[i].nombre === nombre && (cart[i].cantidad -= 1) + (cart[i].cantidad === 0 && cart.splice(i,1)) + (console.table(cart)) + (console.log("El total es: $" + totalCart()) + saveCart())
        }
    }
    
// ------------------------------------------------------------ //

//eliminar del carrito

function removeAllFromCart(nombre){
    for(let i in cart){
        cart[i].nombre === nombre && (cart.splice(i, 1)) + (console.table(cart)) + (console.log("El total es: $" + totalCart())) + (saveCart())
        }
    }

// ------------------------------------------------------------ //

//vaciar el carrito

// function clearCart(){
//     cart = [];
//     console.table(cart)
//     saveCart()
// }

// ------------------------------------------------------------ //

//calcular total del carrito

function totalCart(){
    let totalPrice = 0;
    for(let i in cart){
        totalPrice += cart[i].precio * cart[i].cantidad;
    }
    return totalPrice;
}

// --------------------------- guardar carrito ---------------------------//

function saveCart(){
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function loadCart(){
    let carritoStorage = JSON.parse(localStorage.getItem("shoppingCart"));
    console.table(carritoStorage)

    carritoStorage ? ((cart = carritoStorage) + (console.log("El total es: $" + totalCart()))) : (cart = [])
}

loadCart();

// --------------------------- leer datos de productos ---------------------------//

const productList = document.querySelector('.cardsContainer')

window.addEventListener('DOMContentLoaded', () => {
    loadJSON();
})

function loadJSON(){
    fetch('https://hernandiazorrac.github.io/json/pizzas.json') // hace fetch al json hosteado en github
    //fetch('./json/pizzas.json') -> descomentar para usar live server
    .then(response => response.json())
    .then(data => {
        let html = ``;
        data.forEach(product => {
            html += `
            <div class="card mb-3 mx-auto" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4 p-3">
                        <img src="${product.img}" class="img-fluid rounded-start" alt="Pizza de pepperoni">
                    </div>
            <div class="col-md-8">
                <div class="card-body mt-3">
                    <h5 class="card-title">${product.nombre}</h5>
                    <p class="card-text text-muted mt-3">Salsa, muzzarella, rodajas de pepperoni. — ${product.precio}</p>
          <div class="cardButtons">
          <button class="btn col-3 btn-warning mt-2" onclick="addToCart('${product.nombre}', '${product.precio}', '${product.cantidad}')">+</button>
          <button class="btn col-3 btn-warning mt-2" onclick="removeFromCart('${product.nombre}', '${product.precio}', ${product.cantidad})">-</button>
          <button class="btn col-3 btn-warning mt-2" onclick="removeAllFromCart('${product.nombre}', '${product.precio}', '${product.cantidad}')"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg></button>
            </div>
        </div>
      </div>
    </div>
  </div>
            `
        });
        productList.innerHTML = html;
    })
}