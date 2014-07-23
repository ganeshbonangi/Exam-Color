app.factory("QuestionsService",function($rootScope,$sce){

	return {
		setQestionData:function(){
			$rootScope.total_questions=$($rootScope.xmlData).find("section[name='"+$rootScope.section+"'] questioninfo").length;
			var questionNode=$($rootScope.xmlData).find("section[name='"+$rootScope.section+"'] questioninfo")[$rootScope.index];
			if($.parseHTML($(questionNode).find("info").html()))
				$rootScope.question_information=$sce.trustAsHtml($.parseHTML($(questionNode).find("info").html())[0].nodeValue);
			else
				$rootScope.question_information="";
			if($.parseHTML($(questionNode).find("question").html()))
				$rootScope.question=$sce.trustAsHtml($.parseHTML($(questionNode).find("question").html())[0].nodeValue);
			else
				$rootScope.question="";
			var options=$(questionNode).find("option");
			$rootScope.options=new Array();
			$rootScope.ans=$(questionNode).find("answer").text();
			for(var i=0;i<options.length;i++){
				if($.parseHTML($(options[i]).html()))
					$rootScope.options.push($sce.trustAsHtml($.parseHTML($(options[i]).html())[0].nodeValue));
				else
					$rootScope.options.push("");
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
