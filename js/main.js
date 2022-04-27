let pizzaArrayL = ['napolitana1.png', 'margherita1.png', 'onion1.png', 'pepperoni1.png', 'champ1.png', 'sausage1.png'] //array de imágenes de pizzas
let pizzaArrayR = ['champ2.png', 'pepperoni2.png', 'napolitana2.png', 'margherita2.png', 'sausage2.png', 'onion2.png']

// ------------------------------------------------------------ //

const pizzasVariedad = [{nombre: "Pepperoni", precio: 800, img: "../assets/img/pepperoni200.png"}, {nombre: "Margarita", precio: 700, img: "../assets/img/margherita200.png"}, {nombre: "Napolitana", descripcion: "Salsa, parmesano, albahaca.", precio: 900, img: "../assets/img/napolitana200.png"}, {nombre: "Champignones", precio: 900, img: "../assets/img/champ200.png"}, {nombre: "Cebolla", precio: 700, img: "../assets/img/onion200.png"}, {nombre: "Salchichas", precio: 800, img: "../assets/img/sausage200.png"}, ]

// ------------------------------------------------------------ //
let cart = []
// ------------------------------------------------------------ //

randomImg();

//genera imagen aleatoria
function randomImg(){ 
    //elige un valor aleatorio del array
    let randomArray = Math.floor(Math.random() * pizzaArrayL.length);
    let randomArray2 = Math.floor(Math.random() * pizzaArrayR.length);

    let selectImg = pizzaArrayL[randomArray]
    let selectImg2 = pizzaArrayR[randomArray2]

    //dirección de donde se obtienen las imágenes
    document.getElementById('imgPizza').src = `./assets/img/${selectImg}`; 
    document.getElementById('imgPizza2').src = `./assets/img/${selectImg2}`;
}

//pop up de confirmar pedido
function confirmPizza(){
    let confirmar = confirm("\n¿Querés confirmar tu pedido?")
        if(confirmar){
            console.log("¡Muchas gracias por tu compra!")
            alert("¡Muchas gracias por tu compra!")
        }else{
        }
}

//agregar al carrito
function addToCart(item){
    cart.push(item);
    console.table(cart);
}