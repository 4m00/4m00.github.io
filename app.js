let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let item = "";

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");

btn1.addEventListener("click", function () {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
        // Send message to bot with selected item information
        tg.sendMessage({ web_app_data: { data: "1" } });
        // Close the Web App
        tg.close();
    } else {
        tg.MainButton.setText("Купить AirPods Pro 2");
        item = "1";
        tg.MainButton.show();
    }
});

btn2.addEventListener("click", function () {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
        // Send message to bot with selected item information
        tg.sendMessage({ web_app_data: { data: "2" } });
        // Close the Web App
        tg.close();
    } else {
        tg.MainButton.setText("Купить AirPods 3");
        item = "2";
        tg.MainButton.show();
    }
});
