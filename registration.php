<?php
	$registerObject = $_POST["data"];
	$con = new mysqli("localhost", "abcde", "54321", "examcolors", 3306);
	if (!$con)
	{
	die('Could not connect: ' . mysql_error());
	}
	$enteredUserName = $registerObject["userName"];
	$enteredPassword = $registerObject["password"];
	$enteredDataOfBirth = $registerObject["dateOfBirth"];
	$enteredPhoneNumber = $registerObject["phoneNumber"];
	$con->query("CALL registeruser('$enteredUserName','$enteredPassword','$enteredDataOfBirth','$enteredPhoneNumber')");
	echo 'registration sucessfull';
?>