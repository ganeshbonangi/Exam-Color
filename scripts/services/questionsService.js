app.factory("QuestionsService",function($rootScope,$sce){

		var QuestionsService={};
	//return {
		QuestionsService.setQestionData = function(){

			$rootScope.total_questions=$rootScope.dataObj["sections"][$rootScope.tab_index]["questioninfo"].length;
			var questionNode=$rootScope.dataObj["sections"][$rootScope.tab_index]["questioninfo"][$rootScope.index];
			if($.parseHTML(questionNode["info"]))
				$rootScope.question_information=$sce.trustAsHtml($.parseHTML(questionNode["info"])[0].nodeValue);
			else
				$rootScope.question_information="";
			if($.parseHTML(questionNode["question"]))
				$rootScope.question=$sce.trustAsHtml($.parseHTML(questionNode["question"])[0].nodeValue);
			else
				$rootScope.question="";
			$rootScope.options=new Array();
			$rootScope.ans=questionNode["answer"];//$(questionNode).find("answer").text();
			var options=questionNode["options"];
			for(var i=0;i<options.length;i++){
				if(options[i])
					$rootScope.options.push($sce.trustAsHtml($.parseHTML(options[i])[0].nodeValue));
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
	//};

}).factory("answerService",function($rootScope){
	return{
			updateJSON:function(class_name,user_ans){
				$rootScope.questionState[$rootScope.section][$rootScope.index] = {"class_name":class_name,"user_ans":user_ans};
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
