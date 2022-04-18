let pizzaArrayL = ['napolitana1.png', 'margherita1.png', 'onion1.png', 'pepperoni1.png', 'champ1.png', 'sausage1.png']
let pizzaArrayR = ['champ2.png', 'pepperoni2.png', 'napolitana2.png', 'margherita2.png', 'sausage2.png', 'onion2.png']
randomImg();

alert("\n¿No te decidís qué pizza pedir? \nNosotros nos encargamos de eso.")

function randomImg(){
    let randomArray = Math.floor(Math.random() * pizzaArrayL.length);
    let randomArray2 = Math.floor(Math.random() * pizzaArrayR.length);

    let selectImg = pizzaArrayL[randomArray]
    let selectImg2 = pizzaArrayR[randomArray2]

    document.getElementById('imgPizza').src = `./assets/img/${selectImg}`;
    document.getElementById('imgPizza2').src = `./assets/img/${selectImg2}`;
}

function confirmPizza(){
    alert("\n¡Su pedido ha sido aceptado!")
}