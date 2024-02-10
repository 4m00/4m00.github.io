let items = [
  {
    name: 'AirPods Pro 2',
    price: 9000,
    quantity: 0,
    selected: false
  },
  {
    name: 'AirPods 3',
    price: 8000,
    quantity: 0,
    selected: false
  }
];

function updateQuantity(index, increment) {
  if (increment) {
    items[index].quantity++;
  } else {
    items[index].quantity = Math.max(0, items[index].quantity - 1);
  }

  let selectedItem = items[index];

  let quantityDisplay = document.getElementById(`quantity${index + 1}`);
  let buyBtn = document.getElementById(`buy-btn${index + 1}`);
  let quantityControls = document.getElementById(`quantity-controls${index + 1}`);
  let minusBtn = document.getElementById(`minus-btn${index + 1}`);
  let plusBtn = document.getElementById(`plus-btn${index + 1}`);
  let tgButton = document.getElementById('tg-button');

  if (selectedItem.quantity > 0) {
    selectedItem.selected = true;
    quantityDisplay.style.display = 'inline';
    buyBtn.style.display = 'none';
    quantityControls.style.display = 'flex';
    minusBtn.classList.add('show');
    plusBtn.classList.add('show');
  } else {
    selectedItem.selected = false;
    quantityDisplay.style.display = 'none';
    buyBtn.style.display = 'inline';
    quantityControls.style.display = 'none';
    minusBtn.classList.remove('show');
    plusBtn.classList.remove('show');
  }

  quantityDisplay.textContent = selectedItem.quantity;
}

// Добавление обработчиков событий для кнопок для обновления количества
for (let i = 0; i < items.length; i++) {
  document.getElementById(`buy-btn${i + 1}`).addEventListener('click', () => {
    updateQuantity(i, true);
  });

  document.getElementById(`plus-btn${i + 1}`).addEventListener('click', () => {
    updateQuantity(i, true);
  });

  document.getElementById(`minus-btn${i + 1}`).addEventListener('click', () => {
    updateQuantity(i, false);
  });
}

// Обработчик события для клика на кнопку Telegram
document.getElementById('tg-button').addEventListener('click', function () {
  let selectedItems = items.filter(item => item.selected);
  if (selectedItems.length > 0) {
    let totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let data = {
      items: selectedItems,
      totalPrice: totalPrice
    };
    let jsonData = JSON.stringify(data);
    let tg = window.Telegram.WebApp;

    tg.MainButton.enable();
    tg.MainButton.setVisible(true); // Устанавливаем флаг видимости кнопки в true
    tg.MainButton.setText('Приобрести');
    tg.MainButton.setColor('#2cab37');
    tg.MainButton.setTextColor('#FFFFFF');

    tg.MainButton.onClick(function() {
      tg.sendData(jsonData); // Отправляем данные
      tg.MainButton.disable(); // Отключаем кнопку после нажатия
      tg.close(); // Закрываем веб-приложение
    });

    tg.MainButton.show(); // Показываем кнопку

  } else {
    // Отобразить сообщение о том, что нужно выбрать товар
    console.log("Выберите товар перед тем, как нажать на кнопку 'Приобрести'.");
  }
});

// Показываем кнопку Telegram при загрузке страницы
let tgButton = document.getElementById('tg-button');
tgButton.style.display = 'inline';
