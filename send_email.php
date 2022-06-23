<?php
  // the message
  $sbj = $_GET["subject"];

  // the message
  $msg = $_GET["email"] . '\n' . $_GET["tel"] . '\n' . $_GET["message"];

  // use wordwrap() if lines are longer than 70 characters
  $msg = wordwrap($msg,70);

  // send email
  mail(
    "christopher.ravosa99@gmail.com",
    $sbj,
    $msg
  );
?>
