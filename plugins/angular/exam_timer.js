(function(window, angular, undefined) {'use strict';

angular.module('ngExamTimer', ['ng']).directive('examTimer', function() {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      var Hours, Minutes, Seconds, totalTime;
      scope.startProcess = function(hours, minutes, seconds) {
        $(element).html(scope.numberConvertion(hours) + ':' + scope.numberConvertion(minutes) + ':' + scope.numberConvertion(seconds));
        if(seconds === 0 && minutes === 0 && hours === 0) {
          scope.$eval(attrs.onEnd);
          return;
        }
        window.setTimeout(function() {
          if(seconds === 0) {
            seconds = 60;
            if(minutes === 0) {
              minutes = 60;
              hours--;
            }
            minutes--;
          }
          seconds--;
          scope.startProcess(hours,minutes,seconds);
        },1000);
      };

      scope.numberConvertion = function(number) {
        return number < 10 ? 0 + ''+ number : number
      }

      if(attrs.totalTime && attrs.totalTime.split(':').length === 3) {
        totalTime = attrs.totalTime.split(':');
        Hours = parseInt(totalTime[0]);
        Minutes = parseInt(totalTime [1]);
        Seconds = parseInt(totalTime[2]); 
        if(isNaN(Hours) || isNaN(Minutes) || isNaN(Seconds)) {
          scope.startProcess(1,0,0);
        } else if(Minutes > 60 || Minutes < 0 || Seconds > 60 || Seconds < 0) {
          scope.startProcess(1,0,0);
        } else {
          scope.startProcess(Hours, Minutes, Seconds);
        }
      } else {
        scope.startProcess(1,0,0);
      }
    },
  }
});
})(window, window.angular);