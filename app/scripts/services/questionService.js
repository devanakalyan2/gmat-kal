'use strict';

/*



*/
(function(){

angular.module('gmatSwApp').factory('questionService', ['$http', function($http){
	return $http.get('Data/questions.json').success(function(data){
			return data;
			})
			.error(function(){
				return;
			});
		
	}]);
	
})();
