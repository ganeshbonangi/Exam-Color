var app=angular.module("myapp",["ngRoute","ngExamTimer","ui.bootstrap"]);
var service=angular.module("services",[]);
app.config(function($routeProvider){
	$routeProvider.when("/exam",{templateUrl:"view/exam.html"}).when("/ansers",{templateUrl:"view/ansers.html"}).when("/home",{templateUrl:"view/home.html"}).otherwise({redirectTo:"/home"});
});
app.controller("knowledgeDigest",function(){ 
	
});
app.run(function($rootScope,QuestionsService,answerService,$timeout){

	$rootScope.index = null;
	$rootScope.tab_index=0;
	$rootScope.questionState={};
	$rootScope.$watch("index",function(newval,oldval){
		
		if( newval == 0|| newval){
			QuestionsService.setQestionData();
			answerService.setActualAns();
			$("input[type='radio']").prop("checked",false);
			$timeout(function(){
				var question_data=answerService.getQuestionJSON();	
				if(question_data){
					var index=parseInt(question_data.user_ans);
					$($("input[type='radio']")[index]).prop("checked",true);
				}			
			});
		}else{

		}

	});	
});
window.addEventListener('resize', layOutChanger);
function layOutChanger(evt){
try{
	if( window.innerWidth <= 800 ){//have to change the label size small
		document.getElementById("review").innerHTML="Review & Next";
		document.getElementById("clear").innerHTML="Clear";
		document.getElementById("save").innerHTML="Save & Next";
	}else{//have to change the lable as it is.
		document.getElementById("review").innerHTML="Make for Review & Next";
		document.getElementById("clear").innerHTML="Clear Response";
		document.getElementById("save").innerHTML="Save & Next";
	}
}catch(e){}
}