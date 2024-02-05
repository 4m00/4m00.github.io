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

let selectedItem = null;

function updateQuantity(index) {
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
    tg.MainButton.setParams({
      text: 'Приобрести',
      explicitelyAllowedUpdates: ['main_button']
    });
  } else {
    tgButton.style.display = 'none';
  }
}

for (let i = 0; i < items.length; i++) {
  document.getElementById(`buy-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity++;
    selectedItem = i + 1;
    updateQuantity(i);
  });

  document.getElementById(`plus-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity++;
    selectedItem = i + 1;
    updateQuantity(i);
  });

  document.getElementById(`minus-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity = Math.max(0, items[i].quantity - 1);
    selectedItem = i + 1;
    updateQuantity(i);
  });
}

// Telegram button event listener using tg.MainButton
tg.MainButton.onVisible(function () {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const tgButton = document.getElementById('tg-button');
  if (totalQuantity > 0) {
    tgButton.style.display = 'inline';
    tg.MainButton.setParams({
      text: 'Приобрести',
      explicitelyAllowedUpdates: ['main_button']
    });
  } else {
    tgButton.style.display = 'none';
  }
});

document.getElementById('tg-button').addEventListener('click', function () {
  let totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  tg.sendData(JSON.stringify({
    items: items,
    totalPrice: totalPrice,
    selectedItem: selectedItem
  }));

  tg.close();
});
