<?php

  $exam_name=$_GET["exam_name"];

$con = new mysqli("localhost", "abcde", "54321", "examcolors", 3306);
if ($con->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$data = $con->query("SELECT * FROM pattern where pattern_name='$exam_name'") ;
$dataJSON=mysqli_fetch_assoc($data);
$pattern=$dataJSON["pattern"];
//var_dump($pattern);
 $pattern= json_decode($pattern);
//var_dump($pattern) ;
$xml = new SimpleXMLElement('<xml/>');//or $dom = new DOMDocument('1.0', 'utf-8');
$examination=$xml->addChild('examination');
$settings=$examination->addChild('settings');
$settings->addChild('timer'); 
$settings->addChild('theme'); 
//echo 'xml';
$sections=$examination->addChild('sections');
foreach($pattern as $x=>$x_value){//will traversing all sections
//echo "coming..".$x;
$section=$sections->addChild('section');
$section->addAttribute('name', $x);


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
			$questioninfo=$section->addChild("questioninfo");
			$questioninfo->addChild("info",$info["question_info"]);
			$questioninfo->addChild("question",$info["question"]);
			$options=$questioninfo->addChild("options");
			$opts=$info["options"];			
			$token = strtok($opts, "$$");  
			$count=0;
			while ($token != false){
				//$date = "04/30/1973";
				$arr = explode('__', $token);
				$first=$arr[0];
				$second=$arr[1];
				//echo "Month:  $second; Day: $first<br />\n";
				$options->addChild("option",$first);
				if($second=="true"){
					$questioninfo->addChild("answer",$count);
				}
				$count++;
				$token = strtok("$$");
			}
			//var_dump($info);
			// array_push($temp,$info['question_type_name']);
		}
		//var_dump($data);
		//echo "\nsubsection:".$subsection."\nsubsection-id:".$subsection_id;
		
	}
}
//$xml = new SimpleXMLElement('<xml/>');//will create xml doc this var should at start point of the php file.
//for ($i = 1; $i <= 8; ++$i) {
	//$track = $xml->addChild('track');
	//$track->addChild('path', "song$i.mp3");
	//$track->addChild('title', "Track $i - Track Title");
//}
//Header('Content-type: text/xml');
print($xml->asXML());

//echo $xml->asXML();
?>