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

let selectedItems = [];

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
    tg.MainButton.hide(); // Hide the Telegram button explicitly
  }
}

function updateSelectedItems() {
  selectedItems = items.filter(item => item.quantity > 0).map(item => ({ name: item.name, quantity: item.quantity }));
}

for (let i = 0; i < items.length; i++) {
  document.getElementById(`buy-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity++;
    updateSelectedItems();
    updateQuantity(i);
  });

  document.getElementById(`plus-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity++;
    updateSelectedItems();
    updateQuantity(i);
  });

  document.getElementById(`minus-btn${i + 1}`).addEventListener('click', () => {
    items[i].quantity = Math.max(0, items[i].quantity - 1);
    updateSelectedItems();
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
    tg.MainButton.hide(); // Hide the Telegram button explicitly
  }
});

document.getElementById('tg-button').addEventListener('click', function () {
  updateSelectedItems();
  let totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  tg.sendData(JSON.stringify({
    items: selectedItems,
    totalPrice: totalPrice,
    selectedItems: selectedItems
  }));

  tg.close();
});
