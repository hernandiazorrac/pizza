let pizzaArrayL = ['napolitana1.png', 'margherita1.png', 'onion1.png', 'pepperoni1.png', 'champ1.png', 'sausage1.png'] //array de imágenes de pizzas
let pizzaArrayR = ['champ2.png', 'pepperoni2.png', 'napolitana2.png', 'margherita2.png', 'sausage2.png', 'onion2.png']

// ------------------------------------------------------------ //

const pizzasVariedad = [{nombre: "Pepperoni", precio: 700, img: "../assets/img/pepperoni200.png"}, {nombre: "Margarita", precio: 700, img: "../assets/img/margherita200.png"}, {nombre: "Napolitana", descripcion: "Salsa, parmesano, albahaca.", precio: 900, img: "../assets/img/napolitana200.png"}, {nombre: "Champignones", precio: 700, img: "../assets/img/champ200.png"}, {nombre: "Cebolla", precio: 800, img: "../assets/img/onion200.png"}, {nombre: "Salchicha", precio: 700, img: "../assets/img/sausage200.png"}, ]

// ------------------------------------------------------------ //
let cart = []

// ------------------------------------------------------------ //

//alert("\n¿No te decidís qué pizza pedir? \nNosotros nos encargamos de eso.")

// for(let pizzas of pizzasVariedad){
//     pizzaCard.innerHTML += `<div class="card text-center p-3" style="width: 18rem;">
//     <img src="${pizzas.img}" class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">${pizzas.nombre}</h5>
//       <p class="card-text">$${pizzas.precio}</p>
//       <button type="button" class="btn btn-warning" onclick="addToCart()">Agregar al carrito</button>
//     </div>
//     </div>`
//     }

randomImg();

function randomImg(){ //genera imagen aleatoria
    let randomArray = Math.floor(Math.random() * pizzaArrayL.length); //elige un valor aleatorio del array
    let randomArray2 = Math.floor(Math.random() * pizzaArrayR.length);

    let selectImg = pizzaArrayL[randomArray]
    let selectImg2 = pizzaArrayR[randomArray2]

    document.getElementById('imgPizza').src = `./assets/img/${selectImg}`; //dirección de donde se obtienen las imágenes
    document.getElementById('imgPizza2').src = `./assets/img/${selectImg2}`;
}

function confirmPizza(){ //pop up de confirmar pedido
    let confirmar = confirm("\n¿Querés confirmar tu pedido?")
        if(confirmar){
            console.log("¡Muchas gracias por tu compra!")
            alert("¡Muchas gracias por tu compra!")
        }else{
        }
}

function addToCart(item){
    cart.push(item);
    console.log(cart);
}

