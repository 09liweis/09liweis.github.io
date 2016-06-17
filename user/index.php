<?php

include("models/User.php");
include("models/Comment.php");

$dbhost = 'localhost';
$dbuser = 'a09liweis';
$dbpass = '';
$dbname = 'c9';
$conn = mysql_connect($dbhost, $dbuser, $dbpass);

if(! $conn ) {
   die('Could not connect: ' . mysql_error());
}


mysql_select_db($dbname) or die(mysql_error());

$name = $_POST["name"];
$email = $_POST["email"];
$password = md5($_POST["password"]);
$action = $_POST["action"];

// var_dump($name);
// var_dump($email);
// var_dump($password);
// var_dump($action);
session_start();
$user = new User();

if ($action == "register") {
   $userExist = $user->checkUser($email);
   if ($userExist) {
      echo json_encode("Email Exist");
   } else {
      $addUser = $user->addUser($email, $password);
      echo json_encode($addUser);
   }
} else if ($action == "login") {
   $userLogin = $user->loginUser($email, $password);
   if ($userLogin) {
      $_SESSION["user_id"] = $userLogin->id;
      $_SESSION["user_email"] = $userLogin->email;
      echo json_encode($userLogin);
   }
} else if ($action == "logout") {
   session_destroy();
   echo json_encode($_SESSION);
} else if ($action == "addComment") {
   $userId = $_POST["user_id"];
   $content = $_POST["content"];
   $comment = new Comment();
   $comment = $comment->addComment($userId, $content);
   echo json_encode($comment);
} else if ($action == "getComments") {
   $comment = new Comment();
   echo json_encode($comment->getComments());
}

mysql_close($conn);
   
?>