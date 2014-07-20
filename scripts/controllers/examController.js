app.controller("examController",function($scope,$rootScope,QuestionsService,answerService,$timeout,$location){
	if(local_server){
	
		$.ajax({
			url:"content/content.xml",
			type:"GET",
			success:function(data){
						$rootScope.xmlData=data;
						var sections=$(data).find("section");
						$rootScope.sections=new Array();
						for(var i=0;i<sections.length;i++){
							var section_name = $(sections[i]).attr("name");
							$rootScope.sections.push(section_name);
							$rootScope.questionState[section_name]={};	
						}
						$rootScope.time=$(data).find("timer").text();
						$rootScope.theme=$(data).find("theme").text();
						$rootScope.section=$rootScope.sections[0];
						$timeout(function(){
							$rootScope.index=0;
						});
						
					}
		});	
	}else{	

		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
						
						var data=$.parseXML(xmlhttp.responseText);
											$rootScope.xmlData=data;
					var sections=$(data).find("section");
					$rootScope.sections=new Array();
					for(var i=0;i<sections.length;i++){
						var section_name = $(sections[i]).attr("name");
						$rootScope.sections.push(section_name);
						$rootScope.questionState[section_name]={};	
					}
					$rootScope.time=$(data).find("timer").text();
					$rootScope.theme=$(data).find("theme").text();
					$rootScope.section=$rootScope.sections[0];
					$timeout(function(){
						$rootScope.index=0;
					});
						
		    	//document.getElementById("render").innerHTML="<b style='color:red'>Database Updated</b>";
			//	$scope.question="";
			//	$timeout(function(){document.getElementById("render").innerHTML="";},2000)
		    }
		  }
		  var ex_name=$location.search()['exam_name'];
		  console.log(ex_name);
		xmlhttp.open("GET","getXML.php?exam_name="+ex_name,true);
		xmlhttp.send();

	
	}

$scope.validateQuestions = function(){
	$scope.scoreObj = {};
	Object.keys($rootScope.questionState).forEach(function(section){
		$scope.scoreObj[section]={};
		$scope.scoreObj[section].correctAnswered=0;
		$scope.scoreObj[section].answered=0;
		$scope.scoreObj[section].notAnswered=0;
		$scope.scoreObj[section].noOfQuestions=40;
		var currentSection = $rootScope.questionState[section];
		if(currentSection) {
			//scoreObj["score"]=0;
			if(Object.keys(currentSection).length > 0) {
				var stateofQuestions = Object.keys(currentSection);
				stateofQuestions.forEach(function(status){	
				  if(!isNaN(status)) {				  	
				  	$scope.scoreObj[section].answered+=1;
				  	if(currentSection[status]['user_ans'] == currentSection[status+'_ans']){
				  		//$scope.scoreObj[section]={};
				  		$scope.scoreObj[section].correctAnswered+=1;//$scope.scoreObj[section]+1;//score ++;
				  	}else if(typeof currentSection[status]['user_ans']=="undefined"){
				  		$scope.scoreObj[section].notAnswered+=1;
				  	}
				  }
				});
			}
		};
		//$(".popup").append("<div></div>")
		//$scope.scoreObj[section].notAnswered=$scope.scoreObj[section].noOfQuestions-
	});

	//console.log($scope.scoreObj);
	//$(".popup").css("display","block");
	
};
$scope.closePopup=function(){

	$rootScope.index=null;
	$rootScope.questionState={};
	//$('#myModal').modal('hide');
	$timeout(function(){
		$location.path("/home");
	},500);
	
	
}

	$scope.clearResponse=function(){
		$("input[type='radio']").prop("checked",false);
	}
	$scope.saveNreview=function( status ){
		var class_name=status=="save"?"btn-success":"btn-warning";
		var userAns=$scope.getCheckedIndex();
		answerService.updateJSON(class_name,userAns);
				answerService.setActualAns();
		$scope.updateButtonStatus();
		if($rootScope.index == $rootScope.total_questions-1){
			var section=QuestionsService.getNextSection();
			if(!section) {alert("sections completed"); return;}
			else{
				$rootScope.section=section;
				$rootScope.index=0;	
				$(".questionButton button").removeClass("btn-success").removeClass("btn-warning");
			}
		}else{
			$rootScope.index++;
		}
		
	};
	$scope.getCheckedIndex=function(){
		var radioBoxes=$("input[type='radio']");
		for(var i=0;i<radioBoxes.length;i++){
			if($(radioBoxes[i]).prop("checked")) return i;
		}
	}
	$scope.updateSection=function(section_name){
		$rootScope.index=null;
		$rootScope.section=	section_name;
		$rootScope.total_questions=$($rootScope.xmlData).find("section[name='"+$rootScope.section+"'] questioninfo").length;
		$scope.updateButtonStatus("all");
		$timeout(function(){
			$rootScope.index=0;
		});
	};
	
	$scope.updateQuestion=function(question_no){
		
		$scope.updateButtonStatus();
		$rootScope.index=question_no;
	};	
	$scope.updateButtonStatus=function(type){
		$timeout(function(){
				var buttonJson=answerService.getSectionJSON();
				if(type="all")
					$(".questionButton button").removeClass("btn-success").removeClass("btn-warning");
				var length=$(".questionButton button").length;
				for(i=0;i<length;i++){
					if(buttonJson[i])
						$($(".questionButton button")[i]).addClass(buttonJson[i]["class_name"]);
				}
		});
	};
    $scope.range = function(num) {
        return new Array(num);
    };
});