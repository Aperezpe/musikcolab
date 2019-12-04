<?php 
$file_url = strval($_GET['url']);
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary"); 
 header('Content-type: application/mp3');  
header("Content-disposition: attachment; filename=\"" . basename($file_url) . "\""); 
readfile($file_url); //
  
?> 