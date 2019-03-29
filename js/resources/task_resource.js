(function(){
	'use strict';
	const app = angular.module('todo');
	
	function taskResource (){
	
		let tasks = [{name:'Task 1'},{name:'Task 2'},{name:'Task 3'},{name:'Task 4'}];
		
		getTasks = () => tasks;
		
		// return {
		// 	getTasks: getTasks
		// };
		
		return {getTasks};
			
	}
	
	app.service('taskResource', taskResource);
}());