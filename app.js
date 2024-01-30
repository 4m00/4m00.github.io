let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let item = "";

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");

btn1.addEventListener("click", function() {
    tg.sendInvoiceData({ item_id: "1" }).then(() => {
        tg.close(); // Close Web App after sending invoice data
    });
});

btn2.addEventListener("click", function() {
    tg.sendInvoiceData({ item_id: "2" }).then(() => {
        tg.close(); // Close Web App after sending invoice data
    });
});
