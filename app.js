let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let item1Quantity = 0;
let item2Quantity = 0;

let btnMinus1 = document.getElementById("btn-minus1");
let btnPlus1 = document.getElementById("btn-plus1");
let quantityDisplay1 = document.getElementById("quantity-display1");

let btnMinus2 = document.getElementById("btn-minus2");
let btnPlus2 = document.getElementById("btn-plus2");
let quantityDisplay2 = document.getElementById("quantity-display2");

let buyBtn = document.getElementById("buy-btn");

btnMinus1.addEventListener("click", function () {
  item1Quantity = Math.max(0, item1Quantity - 1);
  updateQuantityDisplay(quantityDisplay1, item1Quantity);
});

btnPlus1.addEventListener("click", function () {
  item1Quantity++;
  updateQuantityDisplay(quantityDisplay1, item1Quantity);
});

btnMinus2.addEventListener("click", function () {
  item2Quantity = Math.max(0, item2Quantity - 1);
  updateQuantityDisplay(quantityDisplay2, item2Quantity);
});

btnPlus2.addEventListener("click", function () {
  item2Quantity++;
  updateQuantityDisplay(quantityDisplay2, item2Quantity);
});

buyBtn.addEventListener("click", function () {
  let totalQuantity = item1Quantity + item2Quantity;
  if (totalQuantity > 0) {
    // Send data to the bot
    tg.sendData(`buy_${item1Quantity}_1_${item2Quantity}_2`);
  } else {
    // Handle case when no items are selected
    tg.sendData('buy_0');
  }
});

function updateQuantityDisplay(element, quantity) {
  element.innerText = quantity;
}

Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(item);
});

let usercard = document.getElementById("usercard");

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name}
${tg.initDataUnsafe.user.last_name}`;

usercard.appendChild(p);

