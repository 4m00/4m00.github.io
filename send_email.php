<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $message = htmlspecialchars(trim($_POST['message']));

    $to = "eczhvu@gmail.com"; // Замените на ваш email
    $subject = "Новая заявка на ремонт от $name";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_message = "Имя: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Телефон: $phone\n";
    $email_message .= "Сообщение:\n$message\n";

    if (mail($to, $subject, $email_message, $headers)) {
        echo "Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.";
        echo "<script>setTimeout(function(){ window.location.href = 'index.html'; }, 3000);</script>";
    } else {
        echo "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.";
        echo "<script>setTimeout(function(){ window.location.href = 'index.html'; }, 3000);</script>";
    }
}
?>
