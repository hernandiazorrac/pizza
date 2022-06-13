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
</div> `
        });
        productList.innerHTML = html;
    })
}


// ------------------------------------------------------------ //

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const addToCartButton = document.querySelectorAll('.addToCart');

addToCartButton.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked)
});

const cartItemsContainer = document.querySelector('.cartItemsContainer')

// function addToCart(e){
//     const button =e.target;
//     const item = button.closest('.addToCart')
// }

// const cartItemsContainer = document.querySelector('.cartItemsContainer')

function addToCartClicked(e){
    const button = e.target;
    
    const item = button.closest('.productItem');
    
    const itemTitle = item.querySelector('.productName').textContent;
    const itemPrice = item.querySelector('.productPrice').textContent;
    const itemImg = item.querySelector('.imgClass').src;

    addItemToCart(itemTitle, itemPrice, itemImg);
}


function addItemToCart(itemTitle, itemPrice, itemImg){

    const elementsTitle = cartItemsContainer.getElementsByClassName('cartItemTitle')
    
    for(let i = 0; i < elementsTitle.length; i += 1){
        if (elementsTitle[i].innerText === itemTitle){
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.cartItemQuantity')
            elementQuantity.value++;
            updateCartTotal();
            return;
        }
    }

    const cartRow = document.createElement('div');
    const cartContent = `
        <div class="row shoppingCartItem">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src='${itemImg}' class="cartImg img-fluid h-50">
                    <h6 class="cartItemTitle text-truncate ms-3">${itemTitle}
                    </h6>
                </div>
            </div>
            <div class="col-2">
                <div class="cartPrice d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="mb-0 cartItemPrice">${itemPrice}</p>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="cartQuantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="cartItemQuantity col-2" type="number"
                        value="1" min="1">
                    <button class="btn btn-danger buttonDelete" type="button">X</button>
                </div>
            </div>
        </div> `;

        cartRow.innerHTML = cartContent;
        cartItemsContainer.append(cartRow)

        cartRow.querySelector('.buttonDelete').addEventListener('click', removeCartItem)

        cartRow.querySelector('.cartItemQuantity').addEventListener('change', quantityChanged)

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
}

function removeCartItem(e){
    const buttonClicked = e.target;
    buttonClicked.closest('.shoppingCartItem').remove()
    updateCartTotal();
}

function quantityChanged(){
    updateCartTotal();
}

function comprarButtonClicked(){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })

    cartItemsContainer.innerHTML = '';
    updateCartTotal()
}

// function comprarButtonClicked() {
//     cartItemsContainer.innerHTML = '';
//     updateCartTotal();
//   }

//     const elementsTitle = cartItemsContainer.getElementsByClassName('cartItemTitle');

//     for (let i = 0; i < elementsTitle.length; i += 1){
//         if(elementsTitle[i].innerText === itemTitle){
//             let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.cartItemQuantity');
//             elementQuantity.value++;
//             updateTotal();
//             return;
//         }
//     }

//     const cartRow = document.createElement('div');
//     const cartContent = `
//     <div class="row cartItem">
//     <div class="col-6 col-sm-6 ms-auto">
//         <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
//             <img src=${itemImg} height="75" class="m-2 shopping-cart-image">
//             <h6 class="shopping-cart-item-title cartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
//         </div>
//     </div>
//     <div class="col-2 col-sm-1">
//         <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
//             <p class="item-price mb-0 cartItemPrice">${itemPrice}</p>
//         </div>
//     </div>
//     <div class="container row col-4 ">
//         <div
//             class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
//             <input class="shopping-cart-quantity-input cartItemQuantity" type="number" value="1" min="1">
//             <button class="btn btn-danger ms-1 buttonDelete" onclick="removeAllFromCart('${pizzasVariedad[0].nombre}', '${pizzasVariedad[0].precio}', '${pizzasVariedad[0].cantidad}')" type="button">X</button>
//         </div>
//     </div>
// </div>`;

//     cartRow.innerHTML = cartContent;
//     cartItemsContainer.append(cartRow)

//     cartRow.querySelector('.buttonDelete').addEventListener('click', removeFromCart)

//     cartRow.querySelector('.cartItemQuantity').addEventListener('change', quantityChanged)

//     updateTotal();
// }

// function updateTotal(){
//     let total = 0;
//     const cartTotal = document.querySelector('.cartTotal')
//     const cartItems = document.querySelectorAll('.cartItem')

//     cartItems.forEach(cartItem => {
//         const cartItemPriceElement = cartItem.querySelector('.cartItemPrice');
//         const cartItemPrice = Number(cartItemPriceElement.textContent.replace('$', ''));
//         const cartItemQuantityElement = cartItem.querySelector('.cartItemQuantity');
//         const cartItemQuantity = Number(cartItemQuantityElement.value)
        
//         total = total + cartItemPrice * cartItemQuantity;
//     })
//     cartTotal.innerHTML = `$${total}`;
// }

// function removeFromCart(evt){
//     const buttonClicked = evt.target;
//     buttonClicked.closest('.cartItem').remove();
//     removeAllFromCart();
//     updateTotal();
// }

// function quantityChanged(evt){
//     const input = evt.target;
//     input.value <= 0 ? (input.value = 1) : null;
//     updateTotal();
// }