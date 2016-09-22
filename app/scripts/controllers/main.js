'use strict';

/**
 * @ngdoc function
 * @name gmatSwApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gmatSwApp
 */

angular.module('gmatSwApp')
  .controller('MainCtrl',['$timeout','$scope','timerService','questionService','$document','$rootScope',function($timeout,$scope,timerService,questionService,$document,$rootScope){
	this.minutes = 0;
	this.seconds = 0;
	this.countDownLimit;
	this.time;

	this.showQuestions = false;
	this.showInstructions = true;
	this.showResults = false;
	this.evaluateQuestions = false;

	this.questionData = {};
	this.questionNumber = 0;

//arrays to store answer keys and user answers
	this.answerKeyArray = [];
	this.answeredArray = [];
	this.diffLevelArray = [];
	this.typeArray = [];
	this.reviewResultsByQuestion = [];
	this.correctAnswerCount = 0;

	this.minShowAlert = false;
	this.maxShowAlert = false;

    var main = this;

//Service to get data
    questionService.success(function(data){
    	main.questionData = data.Questions;
    	console.log(main.questionData);
    	main.countDownLimit = data.timeToSolve;
    });

//Function to start test. Displays questions and starts timer
    this.takeTest = function(){
    	this.showQuestions = true;
    	this.showInstructions = false;
		timerService.timerTick(main.countDownLimit);
		main.toggleFullScreen();
    };

//function to end test 
	this.endTest = function(){
			main.evaluateQuestions = true;
			main.showResults  = true;
			main.showQuestions = true;
			main.questionNumber = 900900090909000;
			$rootScope.$broadcast("testEnded");

	};    

//listens for timer tick event and runs the timer
    $scope.$on("timerTick",function(event,data){
    	 if(data.time <= 0 && main.showQuestions){
    	 	alert('Time Up, Love!');
    	 	main.endTest();
    	 }
    	 else{
    	 main.time = data.time;
    	 main.minutes = data.min;
    	 main.seconds = data.sec;	
    	}
    });

//function to navigate to the next Question
	this.navigate = function(str,qstnNo){
		//Navigation 
		if(str == "Next"){
			if( qstnNo < main.questionData.length-1){
			qstnNo = qstnNo + 1;
			main.questionNumber = qstnNo;
		}
		else if(qstnNo = main.questionData.length-1){
			main.maxShowAlert = true;
			$timeout(function(){
				main.maxShowAlert = false;
			},3000);
		}

		}
		
		// else if(str == 'Prev'){
		// 	if(qstnNo != 0){
		// 	qstnNo = qstnNo - 1;
		// 	main.questionNumber = qstnNo;	
		// 	}
		// 	else if(qstnNo == 0){
		// 		main.minShowAlert = true;
		// 		$timeout(function(){
		// 		main.minShowAlert = false;
		// 	},2000);
		// 	}
		// }
		else{
			//do nothing
		}
	};

// function to store answer k
	this.makeArrays = function(val,level,type){
		main.answerKeyArray.push(val);	
		main.diffLevelArray.push(level);
		main.typeArray.push(type);
	};



// fullscreen Functionality
this.toggleFullScreen = function()
{
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
	    if (document.documentElement.requestFullScreen) {  
	      document.documentElement.requestFullScreen();  
	    } 
	    else if (document.documentElement.mozRequestFullScreen) {  
	      document.documentElement.mozRequestFullScreen();  
	    } 
	    else if (document.documentElement.webkitRequestFullScreen) {  
	      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
	    }  
  }   
};





  }]);

