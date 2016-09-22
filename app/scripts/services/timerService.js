'use strict';

/*


*/
angular.module('gmatSwApp').service('timerService',['$timeout','$rootScope',function($timeout,$rootScope){

	var service = this;

		this.time = 0;
		this.minutes = 0;
		this.seconds = 0;
		this.testEnded = false;

		//send the timer values. Get the values on you controller by having a $on function in your controller.
		this.sendObject = function(time,minutes,seconds){
			$rootScope.$broadcast("timerTick", {
				"time":time,
				"min":minutes,
				"sec":seconds
			});			
			
		};
		//stop the timer when the test ends. Activate this by having a $broadcast on your controller.
		$rootScope.$on("testEnded",function(){
			service.testEnded = true;
		});

		//main function of this service to call from controller is you need timer functionality on a page.
	 	this.timerTick = function(timeval){

			service.time = timeval;

			if(service.time > 0){
				$timeout(function(){	//calls itself after every second and updates minutes and seconds accordingly.
					if(service.testEnded){
						return;	
					}
					else{
					service.time = service.time - 1;
					service.minutes = Math.floor(service.time / 60);		
					service.seconds = Math.floor(service.time % 60);
					service.sendObject(service.time,service.minutes,service.seconds);
					service.timerTick(service.time);						
					}	
				},1000);
			}

			else{
				return ;
			}
		};
}]);