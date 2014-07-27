<?php

$exam_name=$_GET["exam_name"];

$con = new mysqli("localhost", "abcde", "54321", "examcolors", 3306);
if ($con->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$data = $con->query("SELECT * FROM pattern where pattern_name='$exam_name'") ;
$dataJSON=mysqli_fetch_assoc($data);
$pattern=$dataJSON["pattern"];
$pattern= json_decode($pattern);
$examination1 = array(
										'settings' => array('timer'=>12,'theme'=>'sbi_clearks'),

										'sections' => array()
									);

foreach($pattern as $x=>$x_value){//will traversing all sections
	array_push($examination1["sections"],array('name'=>$x,'questioninfo'=>array()));
	foreach ($x_value as $subsection => $total_quest) {//will traverse all subsection in the section
	
		$subsection_id=$con->query("SELECT subsection_id FROM subsections where subsection_name='$subsection'") ;
		//var_dump($subsection_id);
		$subsection_id=mysqli_fetch_assoc($subsection_id);
		$subsection_id=$subsection_id["subsection_id"];
		//echo "subsection_id".$subsection_id."total_quest".$total_quest;
		$subsection=$con->query("SELECT * FROM  subsections where subsection_id=$subsection_id");
		$subsection=mysqli_fetch_assoc($subsection);
		$isGroupedSection = $subsection["grouped"];
		if($isGroupedSection){
			$query1="SELECT * FROM questions where subsection_id=$subsection_id ORDER BY RAND() LIMIT 1";
			$data = $con->query($query1);
			$data = mysqli_fetch_assoc($data);
			$group_id = $data["group_id"];
			$query1="SELECT * FROM questions where group_id=$group_id ORDER BY RAND() LIMIT $total_quest";
		}else{
			$query1="SELECT * FROM questions where subsection_id=$subsection_id ORDER BY RAND() LIMIT $total_quest";
		}		
		$data = $con->query($query1);
		//echo ".......";

		while($info = mysqli_fetch_array( $data )) 
		{ 
			$options = array();
			$opts=$info["options"];			
			$token = strtok($opts, "$$");  
			$count=0;$stor;
			while ($token != false){
				//$date = "04/30/1973";
				$arr = explode('__', $token);
				$first=$arr[0];
				$second=$arr[1];
				array_push($options,$first);
				if($second=="true"){
					$stor=$count;
				}
				$count++;
				$token = strtok("$$");
			}
			$len=count($examination1["sections"])-1;
			array_push($examination1["sections"][$len]["questioninfo"],array(
							"info"=>$info["question_info"],
							"question"=>$info["question"],
							"options"=>$options,
							"answer"=>$stor
							));
		}		
	}
}

print(json_encode($examination1));

?>