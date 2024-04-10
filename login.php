<?php
// Подключение к базе данных
$servername = "localhost";
$username_db = "root";
$password_db = "admin";
$dbname = "login";

// Создание соединения с базой данных
$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Получение данных из формы логина
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Подготовка запроса для поиска пользователя в базе данных
    $stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // Проверка, найден ли пользователь
    if ($result->num_rows > 0) {
        // Получение данных пользователя
        $row = $result->fetch_assoc();
        // Проверка пароля
        if ($password == $row['password_hash']) {
            // Пароль верный, разрешаем доступ
            session_start(); // Начать сессию
            $_SESSION['username'] = $username; // Сохранить имя пользователя в сессии
            header("Location: index.php"); // Перенаправить на index.php
            exit(); // Завершить выполнение скрипта после перенаправления
        } else {
            // Пароль неверный
            echo "Неправильное имя пользователя или пароль!";
        }
    } else {
        // Пользователь не найден
        echo "Неправильное имя пользователя или пароль!";
    }

    // Закрытие соединения с базой данных
    $stmt->close();
}

$conn->close();
?>