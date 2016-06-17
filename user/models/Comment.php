<?php

class Comment {
    
    public function getComments() {
        $query = "SELECT * FROM comment JOIN user WHERE comment.user_id = user.id";
        $query_result = mysql_query($query) or die(mysql_error());
        $comments = array();
        while ($comment = mysql_fetch_assoc($query_result)) {
            $comments[] = $comment;
        }
        return $comments;
    }
    
    public function addComment($user_id, $content) {
        $current_timestamp = date("Y-m-d H:i:s");
        $query = "INSERT INTO comment (user_id, content, date_submit) VALUES('$user_id', '$content', '$current_timestamp')";
        $query_result = mysql_query($query) or die(mysql_error());
        return $query_result;
    }
    
}

?>