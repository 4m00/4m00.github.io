let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let item = "";

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");

btn1.addEventListener("click", function() {
    tg.sendInvoiceData({ item_id: "1" }); // Send item data before closing
    tg.close(); // Close Web App immediately
});

btn2.addEventListener("click", function() {
    tg.sendInvoiceData({ item_id: "2" }); // Send item data before closing
    tg.close(); // Close Web App immediately
});
