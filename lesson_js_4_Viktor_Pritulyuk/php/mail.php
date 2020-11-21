<?php
$name = filter_var($_POST["user-name"], FILTER_SANITIZE_STRING);
$phone = filter_var($_POST["user-telephone"], FILTER_SANITIZE_STRING);
$email = filter_var($_POST["user-email"], FILTER_SANITIZE_EMAIL);
$select = filter_var($_POST["user-select"], FILTER_SANITIZE_STRING);
$message = filter_var($_POST["user-message"], FILTER_SANITIZE_STRING);
$errors;

if(empty($name)) {
  $errors .= "Заполните поле ИМЯ";
} else {
  $user_name = $name;
}

if (empty($phone)) {
  $errors .= "Поле телефон пустое";
} else {
  $user_phone = $phone;
}

if (empty($email)) {
  $errors .= "Поле email пустое";
} else {
  $user_email = $email;
}

$to = "hiddy@inbox.ru";
$mailBody = "Новая заявка на сайте\n";
$mailBody .= "\n";
$mailBody .= "Имя: " . $user_name . "\n";
$mailBody .= "Номер телефона: " . $user_phone . "\n";
$mailBody .= "Email: " . $user_email . "\n";
// $mailBody .= "Выбрано: " . $select . "\n";
$mailBody .= "Сообщение пользователя: " . $message . "\n";

if(mail($to, 'Новая заявка на сайте!', $mailBody)) {
  $output = "ok";
  die($output);
} else {
  $output = $errors;
  die($output);
}
?>