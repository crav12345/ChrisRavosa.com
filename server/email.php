<?php
    echo $_POST['subject']
    mail('christopher.ravosa99@gmail.com', $_POST['subject'], $_POST['message']);
?>
<p style="color:green;">Your email has been sent.</p>
