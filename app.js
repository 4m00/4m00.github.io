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

  document.getElementById(`quantity${index+1}`).textContent = item.quantity;

  let buyBtn = document.getElementById(`buy-btn${index+1}`);
  if(item.quantity > 0) {
    buyBtn.style.display = 'none';

    document.getElementById(`minus-btn${index+1}`).style.display = 'inline';
    document.getElementById(`plus-btn${index+1}`).style.display = 'inline';
    document.getElementById(`quantity-controls${index+1}`).style.display = 'block';
  } else {
    buyBtn.style.display = 'inline';

    document.getElementById(`minus-btn${index+1}`).style.display = 'none';
    document.getElementById(`plus-btn${index+1}`).style.display = 'none';
    document.getElementById(`quantity-controls${index+1}`).style.display = 'none';
  }
}

// Обработка кнопок Купить
document.getElementById('buy-btn1').addEventListener('click', () => {
  items[0].quantity++;
  updateQuantity(0);
});

document.getElementById('buy-btn2').addEventListener('click', () => {
  items[1].quantity++;
  updateQuantity(1); 
});

// Обработка кнопок + и -
document.getElementById('plus-btn1').addEventListener('click', () => {
  items[0].quantity++;
  updateQuantity(0);
});

document.getElementById('minus-btn1').addEventListener('click', () => {
  items[0].quantity = Math.max(0, items[0].quantity - 1);
  updateQuantity(0);
});

document.getElementById('plus-btn2').addEventListener('click', () => {
  items[1].quantity++;
  updateQuantity(1);
});

document.getElementById('minus-btn2').addEventListener('click', () => {
  items[1].quantity = Math.max(0, items[1].quantity - 1);
  updateQuantity(1);
});

// Отправка данных в бот
let totalPrice = items.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

tg.sendData(JSON.stringify({
  items: items,
  totalPrice: totalPrice
}));