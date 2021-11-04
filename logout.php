<?php
session_start();

//clear session variables
// $_SESSION['id'] = null;
// $_SESSION['username'] = null;
// $_SESSION['permission'] = null;

session_destroy();
setcookie("userID", "", time() - 3600);

header('Location: https://playground.overlandmissions.com/GRIZZLY/');
exit
?>