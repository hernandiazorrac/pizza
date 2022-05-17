let pizzaArrayL = ['napolitana1.png', 'margherita1.png', 'onion1.png', 'pepperoni1.png', 'champ1.png', 'sausage1.png'] //array de imágenes de pizzas
let pizzaArrayR = ['champ2.png', 'pepperoni2.png', 'napolitana2.png', 'margherita2.png', 'sausage2.png', 'onion2.png']

// ------------------------------------------------------------ //

const containerPizzas = document.querySelector(".pizzasContainer")

// ------------------------------------------------------------ //

const pizzasVariedad = [{id: 1, nombre: "Pepperoni", descripcion: "Salsa, muzzarella, rodajas de pepperoni.", precio: 800, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139887/JS%20CoderHouse/pepperoni200_gpvvj6.webp"}, {id: 2, nombre: "Margarita", descripcion: "Salsa, muzzarella, albahaca.", precio: 700, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/margherita200_unlsey.webp"}, {id: 3, nombre: "Napolitana", descripcion: "Salsa, parmesano, albahaca.", precio: 900, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139889/JS%20CoderHouse/napolitana200_gyc07e.webp"}, {id: 4, nombre: "Champignones", descripcion: "Salsa, muzzarella, champignones, tomate, olivas negras.", precio: 900, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/champ200_wggmhk.webp"}, {id: 5, nombre: "Cebolla", descripcion: "Muzzarella, cebolla morada, olivas negras.", precio: 700, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139889/JS%20CoderHouse/onion200_zc6bmy.webp"}, {id: 6, nombre: "Salchichas", descripcion: "Salsa, muzzarella, champignones, salchichas, olivas negras.", precio: 800, cantidad: 1, img: "https://res.cloudinary.com/digb4d0uf/image/upload/v1652139888/JS%20CoderHouse/sausage200_vtn9k0.webp"}]

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
    saveCart()
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
    saveCart()
}

// ------------------------------------------------------------ //

//vaciar el carrito

function clearCart(){
    cart = [];
    console.table(cart)
    saveCart()
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

// function countDisplay(){
//     let cant = 0;
//     for(let i in cart){
//         cant += cart[i].cantidad 
//     }
//     document.querySelector('.countDisplay').innerHTML = cant;
// }

// ------------------------------------------------------------ //

// const buttons = document.querySelector('.cardButtons');

// (()=>{buttons.addEventListener('click', delegar)})();

// function delegar(evt){
//     evt.preventDefault();
//     console.log(evt.target.classList)
// }

// --------------------------- guardar carrito ---------------------------//



function saveCart(){
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function loadCart(){
    carrito = JSON.parse(localStorage.getItem("shoppingCart"));
    console.table(carrito)
}

loadCart();