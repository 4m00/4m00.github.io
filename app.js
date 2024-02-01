let items = [
  {
    name: 'Товар 1',
    price: 100,
    quantity: 0
  },
  {
    name: 'Товар 2',
    price: 200,
    quantity: 0
  }
];

// Обновление количества товара
function updateQuantity(index) {
  let item = items[index];

  document.getElementById(`quantity${index + 1}`).textContent = item.quantity;

  let buyBtn = document.getElementById(`buy-btn${index + 1}`);
  let quantityControls = document.getElementById(`quantity-controls${index + 1}`);

  if (item.quantity > 0) {
    buyBtn.style.display = 'none';
    quantityControls.style.display = 'flex';
  } else {
    buyBtn.style.display = 'inline';
    quantityControls.style.display = 'none';
  }
}

// Обработка кнопок Купить, + и -
for (let i = 0; i < items.length; i++) {
  document.getElementById(`buy-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity++;
    updateQuantity(i);
    sendPurchaseData();
  });

  document.getElementById(`plus-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity++;
    updateQuantity(i);
    sendPurchaseData();
  });

  document.getElementById(`minus-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity = Math.max(0, items[i].quantity - 1);
    updateQuantity(i);
    sendPurchaseData();
  });
}

// Отправка данных в бот
function sendPurchaseData() {
  let totalPrice = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  tg.sendData(JSON.stringify({
    items: items,
    totalPrice: totalPrice
  }));
}
