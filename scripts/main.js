var app=angular.module("myapp",["ngRoute","ngExamTimer"]);
var service=angular.module("services",[]);
app.config(function($routeProvider){
	$routeProvider.when("/exam",{templateUrl:"view/exam.html"}).when("/home",{templateUrl:"view/home.html"}).otherwise({redirectTo:"/home"});
});
app.controller("knowledgeDigest",function(){ 
	
});
app.run(function($rootScope,QuestionsService,answerService,$timeout){

	$rootScope.index = null;
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
			//$("#home-top-bar").css("visibility","hidden");
		}else{
			//$("#home-top-bar").css("visibility","visible");
		}

	});	
});

/*
   $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
	console.log(currRoute);
	if (currRoute.authRequire && CONFIG.theme === 'kitaboo') Auth.check();
  }); */