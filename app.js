let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let item = "";

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");

btn1.addEventListener("click", function(){
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
        tg.openPaymentForm({
            payload: '1',  // Pass the item identifier as payload
        });
    }
    else {
        tg.MainButton.setText("Купить AirPods Pro 2");
        item = "1";
        tg.MainButton.show();
        // Send item data to bot after displaying the payment form
        tg.sendInvoiceData({
            item_id: item
        });
    }
});

btn2.addEventListener("click", function(){
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
        tg.openPaymentForm({
            payload: '2',  // Pass the item identifier as payload
        });
    }
    else {
        tg.MainButton.setText("Купить AirPods 3");
        item = "2";
        tg.MainButton.show();
        // Send item data to bot after displaying the payment form
        tg.sendInvoiceData({
            item_id: item
        });
    }
});

// Add an event listener for successful payment
tg.PaymentForm.onSuccess(function() {
    tg.close();
});
