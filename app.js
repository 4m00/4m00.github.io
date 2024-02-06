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

function updateQuantity(index) {
    items[index].quantity++;
    items[index].selected = true;

    let selectedItem = items[index];

    let quantityDisplay = document.getElementById(`quantity${index + 1}`);
    let buyBtn = document.getElementById(`buy-btn${index + 1}`);
    let quantityControls = document.getElementById(`quantity-controls${index + 1}`);
    let minusBtn = document.getElementById(`minus-btn${index + 1}`);
    let plusBtn = document.getElementById(`plus-btn${index + 1}`);
    let tgButton = document.getElementById('tg-button');

    if (selectedItem.quantity > 0) {
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

    quantityDisplay.textContent = selectedItem.quantity;
}

// Добавление обработчиков событий для кнопок для обновления количества
for (let i = 0; i < items.length; i++) {
    document.getElementById(`buy-btn${i + 1}`).addEventListener('click', () => {
        updateQuantity(i);
    });

    document.getElementById(`plus-btn${i + 1}`).addEventListener('click', () => {
        updateQuantity(i);
    });

    document.getElementById(`minus-btn${i + 1}`).addEventListener('click', () => {
        items[i].quantity = Math.max(0, items[i].quantity - 1);
        updateQuantity(i);
    });
}

// Обработчик события для клика на кнопку Telegram
document.getElementById('tg-button').addEventListener('click', function () {
    let selectedItem = items.find(item => item.selected);

    if (selectedItem) {
        let totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let data = {
            items: items,
            totalPrice: totalPrice,
            selectedItem: selectedItem.name // передаем имя выбранного товара, а не его индекс
        };
        let jsonData = JSON.stringify(data);

        let tg = window.Telegram.WebApp;

        tg.MainButton.setText(`Приобрести`);
        tg.MainButton.setColor('#2cab37'); // Устанавливаем цвет кнопки
        tg.MainButton.setTextColor('#FFFFFF'); // Устанавливаем цвет текста на кнопке
        tg.MainButton.show();

        tg.MainButton.onClick(function() {
            tg.sendData(jsonData); // Отправляем данные
            tg.MainButton.hide(); // Скрываем кнопку после нажатия
            tg.close(); // Закрываем веб-приложение
        });
    } else {
        // Отобразить сообщение о том, что нужно выбрать товар
        console.log("Выберите товар перед тем, как нажать на кнопку 'Приобрести'.");
    }
});

// Проверка видимости кнопки Telegram
let selectedItems = items.filter(item => item.selected);

if (selectedItems.length > 0) {
    let tg = window.Telegram.WebApp;
    tg.MainButton.show();
} else {
    let tg = window.Telegram.WebApp;
    tg.MainButton.hide();
}
