app.controller("sectionController", function($scope, questionsService) {
	$scope.buttons = [{
		"name" : "button1"
	}, {
		"name" : "button2"
	}, {
		"name" : "button3"
	}];
	$scope.sectionClick = function(section) {
		console.log(section);
		questionsService.getQuestions(section);
	};
});
