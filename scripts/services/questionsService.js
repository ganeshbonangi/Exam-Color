app.factory("QuestionsService",function($rootScope,$sce){

	return {
		setQestionData:function(){
			$rootScope.total_questions=$($rootScope.xmlData).find("section[name='"+$rootScope.section+"'] questioninfo").length;
			var questionNode=$($rootScope.xmlData).find("section[name='"+$rootScope.section+"'] questioninfo")[$rootScope.index];
			$rootScope.question_information=$sce.trustAsHtml($(questionNode).find("info").html());
			$rootScope.question=$sce.trustAsHtml($(questionNode).find("question").html());
			var options=$(questionNode).find("option");
			$rootScope.options=new Array();
			$rootScope.ans=$(questionNode).find("answer").text();
			for(var i=0;i<options.length;i++){
				$rootScope.options.push($sce.trustAsHtml($(options[i]).html()));
			}	
		},
		getNextSection:function(){
			var i=0;
			while($rootScope.sections[i]!=$rootScope.section)
				i++;
			return $rootScope.sections[i+1];
		}	
	};

}).factory("answerService",function($rootScope){
	return{
			updateJSON:function(class_name,user_ans){
				$rootScope.questionState[$rootScope.section][$rootScope.index] = {"class_name":class_name,"user_ans":user_ans};
			},
			getQuestionJSON:function(){
				return $rootScope.questionState[$rootScope.section][$rootScope.index];
			},
			getSectionJSON:function(){
				return $rootScope.questionState[$rootScope.section];
			},
			setActualAns:function(){
				$rootScope.questionState[$rootScope.section][$rootScope.index+"_ans"]=$rootScope.ans;
			}
	};	
});
