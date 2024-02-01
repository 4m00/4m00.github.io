let items = [
  {
    name: 'AirPods Pro 2',
    price: 9000,
    quantity: 0
  },
  {
    name: 'AirPods 3',
    price: 8000,
    quantity: 0
  }
];

// Обновление количества товара
function updateQuantity(index) {
  let item = items[index];

  let quantityDisplay = document.getElementById(`quantity${index + 1}`);
  let buyBtn = document.getElementById(`buy-btn${index + 1}`);
  let quantityControls = document.getElementById(`quantity-controls${index + 1}`);
  let minusBtn = document.getElementById(`minus-btn${index + 1}`);
  let plusBtn = document.getElementById(`plus-btn${index + 1}`);

  if (item.quantity > 0) {
    quantityDisplay.style.display = 'inline'; // Show quantity
    buyBtn.style.display = 'none';
    quantityControls.style.display = 'flex'; // Show buttons
    minusBtn.classList.add('show'); // Show minus button
    plusBtn.classList.add('show'); // Show plus button
  } else {
    quantityDisplay.style.display = 'none'; // Hide quantity
    buyBtn.style.display = 'inline';
    quantityControls.style.display = 'none'; // Hide buttons
    minusBtn.classList.remove('show'); // Hide minus button
    plusBtn.classList.remove('show'); // Hide plus button
  }

  quantityDisplay.textContent = item.quantity;
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
