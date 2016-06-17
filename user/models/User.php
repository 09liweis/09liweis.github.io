<?php
class User {
    
    private $_name;
    
    private $_email;
    
    private $_password;
    
    
    public function checkUser($email) {
       $query = "SELECT * FROM user WHERE email = '$email'";
       $query_result = mysql_query($query) or die(mysql_error());
       $result = mysql_fetch_assoc($query_result);
       return $result;
   }
   
    public function loginUser($email, $password) {
        $query = "SELECT * FROM user WHERE email = '$email' AND password = '$password'";
        $query_result = mysql_query($query) or die(mysql_error());
        $result = mysql_fetch_assoc($query_result);
        if ($result) {
            $current_timestamp = date("Y-m-d H:i:s");
            $update_last_login_query = "UPDATE user SET last_login = '$current_timestamp' WHERE email = '$email'";
            mysql_query($update_last_login_query);
        }
        return $result;
   }
   
   public function addUser($email, $password) {
       $current_timestamp = date("Y-m-d H:i:s");
       $query = "INSERT INTO user (name, email, password, last_login, signup_date) VALUES('', '$email', '$password', '$current_timestamp', '$current_timestamp')";
       $query_result = mysql_query($query) or die(mysql_error());
       return $this->checkUser($email);
   }
}
?>