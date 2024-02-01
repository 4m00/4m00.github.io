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
let purchaseBtn = document.getElementById("purchase-btn");

btnMinus1.addEventListener("click", function () {
  item1Quantity = Math.max(0, item1Quantity - 1);
  updateQuantityDisplay(quantityDisplay1, item1Quantity);
  updatePurchaseButtonVisibility();
});

btnPlus1.addEventListener("click", function () {
  item1Quantity++;
  updateQuantityDisplay(quantityDisplay1, item1Quantity);
  updatePurchaseButtonVisibility();
});

btnMinus2.addEventListener("click", function () {
  item2Quantity = Math.max(0, item2Quantity - 1);
  updateQuantityDisplay(quantityDisplay2, item2Quantity);
  updatePurchaseButtonVisibility();
});

btnPlus2.addEventListener("click", function () {
  item2Quantity++;
  updateQuantityDisplay(quantityDisplay2, item2Quantity);
  updatePurchaseButtonVisibility();
});

buyBtn.addEventListener("click", function () {
  showItems();
  updatePurchaseButtonVisibility();
});

purchaseBtn.addEventListener("click", function () {
  sendPurchaseData();
});

function updateQuantityDisplay(element, quantity) {
  element.innerText = quantity;
}

function showItems() {
  document.getElementById("item1").style.display = "block";
  document.getElementById("item2").style.display = "block";
  buyBtn.style.display = "none";
}

function updatePurchaseButtonVisibility() {
  if (item1Quantity > 0 || item2Quantity > 0) {
    purchaseBtn.style.display = "block";
  } else {
    purchaseBtn.style.display = "none";
  }
}

function sendPurchaseData() {
  let totalQuantity = item1Quantity + item2Quantity;
  if (totalQuantity > 0) {
    // Send data to the bot directly
    tg.sendData(`buy_${item1Quantity}_1_${item2Quantity}_2`);
  } else {
    // Handle case when no items are selected
    tg.sendData('buy_0');
  }
}

let usercard = document.getElementById("usercard");
let p = document.createElement("p");
p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
usercard.appendChild(p);
