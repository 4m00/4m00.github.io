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

let selectedItemId = null;

function updateQuantity(index) {
  selectedItemId = index + 1; // Установка selectedItemId здесь
  let item = items[index];
  let quantityDisplay = document.getElementById(`quantity${index + 1}`);
  let buyBtn = document.getElementById(`buy-btn${index + 1}`);
  let quantityControls = document.getElementById(`quantity-controls${index + 1}`);
  let minusBtn = document.getElementById(`minus-btn${index + 1}`);
  let plusBtn = document.getElementById(`plus-btn${index + 1}`);

  if (item.quantity > 0) {
    quantityDisplay.style.display = 'inline';
    buyBtn.style.display = 'none';
    quantityControls.style.display = 'flex';
    minusBtn.classList.add('show');
    plusBtn.classList.add('show');
  } else {
    quantityDisplay.style.display = 'none';
    buyBtn.style.display = 'inline';
    quantityControls.style.display = 'none';
    minusBtn.classList.remove('show');
    plusBtn.classList.remove('show');
  }

  quantityDisplay.textContent = item.quantity;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const tgButton = document.getElementById('tg-button');
  if (totalQuantity > 0) {
    tgButton.style.display = 'inline';
    tgButton.innerHTML = 'Приобрести'; // Установка текста кнопки в "Приобрести"
  } else {
    tgButton.style.display = 'none';
  }
}

for (let i = 0; i < items.length; i++) {
  document.getElementById(`buy-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity++;
    updateQuantity(i);
  });

  document.getElementById(`plus-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity++;
    updateQuantity(i);
  });

  document.getElementById(`minus-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity = Math.max(0, items[i].quantity - 1);
    updateQuantity(i);
  });
}

document.getElementById('tg-button').addEventListener('click', function () {
  let totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let data = {
    items: items,
    totalPrice: totalPrice,
    selectedItem: selectedItemId
  };

  let jsonData = JSON.stringify(data);

  // Отправляем данные через Telegram Web App
  let tg = window.Telegram.WebApp;
  tg.sendData(jsonData);

  // Закрываем веб-приложение
  tg.close();
});

// Проверка видимости кнопки Telegram и установка текста
Telegram.MainButton.onVisible(function () {
  if (selectedItemId !== null) {
    let tg = window.Telegram.WebApp;
    tg.MainButton.setText(`Приобрести`);
    tg.MainButton.show();
  }
});
