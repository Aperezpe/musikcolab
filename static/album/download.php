<?php 
$file_url = strval($_GET['url']);
//$file_url = 'https://musikcolab.s3.amazonaws.com/01_Heroe+(feat.+Sesi).mp3';
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary"); 
 header('Content-type: application/mp3');  
header("Content-disposition: attachment; filename=\"" . basename($file_url) . "\""); 
readfile($file_url); //
  
?> 