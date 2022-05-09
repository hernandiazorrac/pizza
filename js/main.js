let pizzaArrayL = ['napolitana1.png', 'margherita1.png', 'onion1.png', 'pepperoni1.png', 'champ1.png', 'sausage1.png'] //array de imágenes de pizzas
let pizzaArrayR = ['champ2.png', 'pepperoni2.png', 'napolitana2.png', 'margherita2.png', 'sausage2.png', 'onion2.png']

// ------------------------------------------------------------ //

const containerPizzas = document.querySelector(".pizzasContainer")

// ------------------------------------------------------------ //

const pizzasVariedad = [{id: 1, nombre: "Pepperoni", descripcion: "Salsa, muzzarella, rodajas de pepperoni.", precio: 800, cantidad: 1, img: "../assets/img/pepperoni200.png"}, {id: 2, nombre: "Margarita", descripcion: "Salsa, muzzarella, albahaca.", precio: 700, cantidad: 1, img: "../assets/img/margherita200.png"}, {id: 3, nombre: "Napolitana", descripcion: "Salsa, parmesano, albahaca.", precio: 900, cantidad: 1, img: "../assets/img/napolitana200.png"}, {id: 4, nombre: "Champignones", descripcion: "Salsa, muzzarella, champignones, tomate, olivas negras.", precio: 900, cantidad: 1, img: "../assets/img/champ200.png"}, {id: 5, nombre: "Cebolla", descripcion: "Muzzarella, cebolla morada, olivas negras.", precio: 700, cantidad: 1, img: "../assets/img/onion200.png"}, {id: 6, nombre: "Salchichas", descripcion: "Salsa, muzzarella, champignones, salchichas, olivas negras.", precio: 800, cantidad: 1, img: "../assets/img/sausage200.png"}]

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



// ------------------- [cards de pizzas] ------------------- //

document.addEventListener('DOMContentLoaded', () => {
    pizzaCards();
})

function pizzaCards(){
    for(const pizza of pizzasVariedad){

        //contenedor de las cards
        const divCardsContainer = document.createElement('div')
        divCardsContainer.classList.add("cardsContainer", "row", "col-5", "col-sm-6", "col-md-10", "col-lg-12", "mx-auto")
        
        //card
        const divCard = document.createElement('div')
        divCard.classList.add("card", "mb-3", "mx-auto")
        divCard.style.cssText = "max-width: 540px;"
        
        //filas
        const divRow = document.createElement('div')
        divRow.classList.add("row", "g-0")
        
        //columna de imagen
        const divColImg = document.createElement('div')
        divColImg.classList.add("col-md-4", "col-sm-12", "p-3")

        //imagen
        const img = document.createElement('img')
        img.classList.add("img-fluid", "rounded-start")
        img.src = pizza.img;

        //columna del card-body
        const divColCard = document.createElement('div')
        divColCard.classList.add("col-md-8")
        
        //body de la card
        const divCardBody = document.createElement('div')
        divCardBody.classList.add("card-body", "mt-3")

        //título
        const h5Title = document.createElement('h5')
        h5Title.classList.add("card-title")
        h5Title.textContent = pizza.nombre;

        //texto
        const pText = document.createElement('p')
        pText.classList.add("card-text", "text-muted", "mt-3")
        pText.textContent = pizza.descripcion + " -$" + pizza.precio;
       
        //botones
        //añadir
        const addButton = document.createElement('button')
        addButton.classList.add("botonAgregar", "btn", "col-3", "btn-warning")
        addButton.textContent = "+"

        //restar
        const removeButton = document.createElement('button')
        removeButton.classList.add("botonEliminar", "btn", "col-3", "btn-warning", "m-1")
        removeButton.textContent = "-"

        //borrar todo
        const removeAllButton = document.createElement('button')
        removeAllButton.classList.add("btn", "col-3", "btn-warning")    
        removeAllButton.textContent = "❌"        
       
        
        divCardsContainer.appendChild(divCard)
        divCard.appendChild(divRow)
        divRow.appendChild(divColImg)
        divColImg.appendChild(img)
        
        divRow.appendChild(divColCard)
        divColCard.appendChild(divCardBody)
        divCardBody.appendChild(h5Title)
        divCardBody.appendChild(pText)

        divCardBody.appendChild(addButton)
        divCardBody.appendChild(removeButton)
        divCardBody.appendChild(removeAllButton)

        containerPizzas.appendChild(divCardsContainer)

        addButton.onclick = () => {
            addToCart(pizza.nombre, pizza.precio, pizza.cantidad)
        }

        removeButton.onclick = () => {
            removeFromCart(pizza.nombre)
        }

        removeAllButton.onclick = () => {
            removeAllFromCart(pizza.nombre)
        }        
    }
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

function clearCart(){
    cart = [];
    console.table(cart)
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
        cant += cart[i].cantidad 
    }
    document.querySelector('.countDisplay').innerHTML = cant;
}