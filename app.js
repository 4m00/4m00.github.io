let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let cart = [];
let item = "";

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let cartBtn = document.getElementById("cartBtn");
let cartCounter = document.getElementById("cartCounter");

btn1.addEventListener("click", function(){
    toggleCartItem("AirPods Pro 2", 9000);
});

btn2.addEventListener("click", function(){
    toggleCartItem("AirPods 3", 8000);
});

cartBtn.addEventListener("click", function(){
    console.log(cart);
});

function toggleCartItem(productName, price) {
    let existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    updateCartCounter();
}

function updateCartCounter() {
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCounter.innerText = totalItems > 0 ? totalItems : "";
}

Telegram.WebApp.onEvent("mainButtonClicked", function(){
    tg.sendData(item);
});

let usercard = document.getElementById("usercard");
let p = document.createElement("p");
p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
usercard.appendChild(p);
