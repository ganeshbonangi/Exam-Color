app.factory("QuestionsService",function($rootScope,$sce){

		var QuestionsService={};
		QuestionsService.setQestionData = function(){

			$rootScope.total_questions=$rootScope.dataObj["sections"][$rootScope.tab_index]["questioninfo"].length;
			var questionNode=$rootScope.dataObj["sections"][$rootScope.tab_index]["questioninfo"][$rootScope.index];
			if(questionNode["info"])
				$rootScope.question_information=$sce.trustAsHtml(questionNode["info"]);
			else
				$rootScope.question_information="";
			if(questionNode["question"])
				$rootScope.question=$sce.trustAsHtml(questionNode["question"]);
			else
				$rootScope.question="";
			$rootScope.options=new Array();
			$rootScope.ans=questionNode["answer"];//$(questionNode).find("answer").text();
			var options=questionNode["options"];
			for(var i=0;i<options.length;i++){
				if(options[i])
					$rootScope.options.push($sce.trustAsHtml(options[i]));
				else
					$rootScope.options.push("");
			}	
		},
		QuestionsService.getNextSection = function(){
			var i=0;
			while($rootScope.sections[i]!=$rootScope.section)
				i++;
			return $rootScope.sections[i+1];
		}	
		return QuestionsService;

}).factory("answerService",function($rootScope){
	return{
			updateJSON:function(class_name,user_ans,ans){
				$rootScope.questionState[$rootScope.section][$rootScope.index] = {"class_name":class_name,"user_ans":user_ans,"ans":ans};
			},
			getQuestionJSON:function(){
				try{
					return $rootScope.questionState[$rootScope.section][$rootScope.index];
				}catch(e){
					console.log("error in getQuestionJSON")
				}
			},
			getSectionJSON:function(){
				return $rootScope.questionState[$rootScope.section];
			},
			setActualAns:function(){
				
			}
	};	
});
