<?php
	
	$loginObject = $_POST["data"];
	$con = new mysqli("localhost", "abcde", "54321", "examcolors", 3306); 
	$username = $loginObject["userName"];
	$password = $loginObject["password"];
	$data = $con->query("SELECT * FROM registration where username = '$username' and password = '$password'");
  	foreach ($data as $value) {
	    echo 'authorizeduser';
		//var_dump($value);
	}  
?>