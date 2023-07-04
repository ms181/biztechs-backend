<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents('php://input'), true);
print_r($data);

if (isset($data["contact"])) {
  $from = "asad@biztechs.in";
  $to = "ms181181181@gmail.com";
  $subject = "New Contact Form Fillup from biztechs.in";
  $message = "Name: " . $data["name"] . "\n"
    . "Email: " . $data["email"] . "\n"
    . "Project: " . $data["phone"] . "\n"
    . "Budget: " . $data["subject"] . "\n"
    . "Message: " . $data["message"];

  $headers = "From: " . $from;
  if (mail($to, $subject, $message, $headers)) {
    echo "Message was successfully sent";
  } else {
    echo "Something went wrong! Try mailing me instead: asad@biztechs.in";
  }
} else {
  echo "none";
}
?>
