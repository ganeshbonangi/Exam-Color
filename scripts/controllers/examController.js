app.controller("examController",function($scope,$modal,$rootScope,QuestionsService,answerService,$timeout,$location,$sce){
	if(local_server){
		$.ajax({
			url:"content/content.json",
			type:"GET",
			success:function(data){
					
					$rootScope.dataObj=data;
					$rootScope.showPreloader=false;
					$rootScope.section=$rootScope.dataObj.sections[0].name;
					for(var i=0;i<$rootScope.dataObj.sections.length;i++){
						
						$rootScope.questionState[$rootScope.dataObj.sections[i].name]={};	
					}
					$rootScope.dataObj.section=$rootScope.dataObj.sections[0];
					$timeout(function(){
						$rootScope.index=0;
					});
					layOutChanger();
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
					
					var data=JSON.parse(xmlhttp.responseText);
					$rootScope.dataObj=data;
					$rootScope.showPreloader=false;
					$rootScope.section=$rootScope.dataObj.sections[0].name;
					for(var i=0;i<$rootScope.dataObj.sections.length;i++){
						
						$rootScope.questionState[$rootScope.dataObj.sections[i].name]={};	
					}
					$rootScope.dataObj.section=$rootScope.dataObj.sections[0];
					$timeout(function(){
						$rootScope.index=0;
					});
					layOutChanger();
		    }
		  }
		$rootScope.showPreloader=true;
		var ex_name=$location.search()['exam_name'];
		if(authorizedUser){
			xmlhttp.open("GET","getXML.php?exam_name="+ex_name,true);
		}else{
			xmlhttp.open("GET","getXML.php?exam_name="+ex_name,true);
		}
		
		xmlhttp.send();	
	}

  $scope.open = function (size) {
  	$scope.validateQuestions();
    $modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      scope: $scope,
      size: size
    });
  };

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

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
				  	if( typeof currentSection[status]['user_ans'] != undefined	&& currentSection[status]['user_ans'] == currentSection[status]['ans']){
				  		//$scope.scoreObj[section]={};
				  		$scope.scoreObj[section].correctAnswered+=1;//$scope.scoreObj[section]+1;//score ++;
				  	}else if(typeof currentSection[status]['user_ans']=="undefined"){
				  		$scope.scoreObj[section].notAnswered+=1;
				  	}
				  }
				});
			}
		};
		
	});

	//return $scope.scoreObj;
};
$scope.closePopup=function(){

	$rootScope.index=null;
	$rootScope.questionState={};
	$modalInstance.dismiss('cancel');
	$timeout(function(){
		$location.path("/home");
		$location.search("exam_name",null);
	},500);
}
$scope.viewAns=function(){
	$modalInstance.dismiss('cancel');
	$timeout(function(){
		$location.path("/ansers");
		$location.search("exam_name",null);
	},500);
	debugger;
}
	$scope.clearResponse=function(){
		$("input[type='radio']").prop("checked",false);
	}
	$scope.saveNreview=function( status ){
		var class_name=status=="save"?"btn-success":"btn-warning";
		var userAns=$scope.getCheckedIndex();
		answerService.updateJSON(class_name,userAns,$rootScope.ans);
				//answerService.setActualAns();
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
		for(var i=0; i<radioBoxes.length; i++){
			if($(radioBoxes[i]).prop("checked")) return i;
		}
	}
	$scope.updateSection=function(section_name,tab_index){
		$rootScope.index=null;
		$rootScope.tab_index=tab_index;
		$rootScope.section=	section_name;
		$rootScope.total_questions=$rootScope.dataObj["sections"][$rootScope.tab_index]["questioninfo"].length;
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
