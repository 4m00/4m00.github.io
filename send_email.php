<?php
// Получаем значения переменных из пришедших данных
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

// Формируем сообщение для отправки, в нём мы соберём всё, что ввели в форме
$mes = "Имя: $name \nE-mail: $email \nТелефон: $phone \nОписание: $message";

// Пытаемся отправить письмо по заданному адресу
$to = 'eczhvu@gmail.com'; // адрес, на который будет отправлено письмо
$subject = 'Новое сообщение с сайта'; // тема письма
$headers = "Content-type:text/plain; charset = UTF-8\r\nFrom:$email";

$send = mail($to, $subject, $mes, $headers);

// Если отправка прошла успешно — так и пишем
if ($send == true) {
    echo "Сообщение отправлено";
} else {
    echo "Ой, что-то пошло не так";
}
?>