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

  // Check if any item has a quantity greater than 0
  const hasSelectedItems = items.some(item => item.quantity > 0);

  // Display or hide Telegram button based on the condition
  const tgButton = document.getElementById('tg-button');
  if (hasSelectedItems) {
    tgButton.style.display = 'inline';
    tgButton.addEventListener('click', sendAndClose);
  } else {
    tgButton.style.display = 'none';
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

// Создание и добавление кнопки Telegram
const tgButton = document.createElement('button');
tgButton.textContent = 'Отправить в Telegram и закрыть';
tgButton.id = 'tg-button';
tgButton.classList.add('buy-btn');
document.getElementById('usercard').appendChild(tgButton);

// Отправка данных в бот
function sendPurchaseData() {
  let totalPrice = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // Mocking tg.sendData function, replace it with your actual implementation
  tg.sendData(JSON.stringify({
    items: items,
    totalPrice: totalPrice
  }));
}

// Функция для отправки данных и закрытия Web App
function sendAndClose() {
  sendPurchaseData();
  tg.close();
}

// Assuming you have a button with id 'custom-btn'
let customBtn = document.getElementById('custom-btn');

customBtn.addEventListener('click', function () {
  // Check if the Telegram button is visible
  if (tgButton.style.display === 'inline') {
    tgButton.style.display = 'none';  // Hide Telegram button
  } else {
    // Show Telegram button and set its text
    tgButton.style.display = 'inline';
    tgButton.addEventListener('click', sendAndClose);
  }
  // Additional logic for your custom button if needed
});
