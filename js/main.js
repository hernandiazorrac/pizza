let pizzaArrayL = ['napolitana1.png', 'margherita1.png', 'onion1.png', 'pepperoni1.png', 'champ1.png', 'sausage1.png'] //array de imágenes de pizzas
let pizzaArrayR = ['champ2.png', 'pepperoni2.png', 'napolitana2.png', 'margherita2.png', 'sausage2.png', 'onion2.png']

// ------------------------------------------------------------ //

const pizzasVariedad = [{nombre: "Pepperoni", precio: 800, cantidad: 1, img: "../assets/img/pepperoni200.png"}, {nombre: "Margarita", precio: 700, cantidad: 1, img: "../assets/img/margherita200.png"}, {nombre: "Napolitana", descripcion: "Salsa, parmesano, albahaca.", precio: 900, cantidad: 1, img: "../assets/img/napolitana200.png"}, {nombre: "Champignones", precio: 900, cantidad: 1, img: "../assets/img/champ200.png"}, {nombre: "Cebolla", precio: 700, cantidad: 1, img: "../assets/img/onion200.png"}, {nombre: "Salchichas", precio: 800, cantidad: 1, img: "../assets/img/sausage200.png"}]

// --------------------------   pizza aleatoria    -------------------------------- //

randomImg();

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

//pop up de confirmar pedido

const btnConfirm = document.querySelector(".confirmPizza")

btnConfirm.addEventListener("click", () => {
    let confirmar = confirm("\n¿Querés confirmar tu pedido?");
        if(confirmar){
            console.log("¡Muchas gracias por tu compra!");
            alert("¡Muchas gracias por tu compra!");
        }else{
        }
})

// ----------------------   carrito    ------------------------------- //

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
    console.log("El total es: $" + totalCart())
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
            console.log("El total es: $" + totalCart())
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
            console.log("El total es: $" + totalCart())
            return;
        }
    }
}

// ------------------------------------------------------------ //

//vaciar el carrito

// function clearCart(){
//     cart = [];
//     console.table(cart)
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
// ------------------------------------------------------------ //

// muestra la cantidad del mismo item

function countDisplay(){
    let cant = 0;
    for(let i in cart){
        cant += cart[i].cantidad
    }
    document.querySelector('#countDisplay').innerHTML = cant;       
}

