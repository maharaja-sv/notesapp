notesApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){ 
	$stateProvider.state("login", {
			url : '/login',
			templateUrl : 'templates/login.html',
			controller : 'LoginCtrl'
	}).state("label",{
			url : '/labels',
			templateUrl : 'templates/header.html',
			controller : 'LabelCtrl',
			resolve: {
				labelList: ["$notesRequest", function($notesRequest){
					return $notesRequest.getLabelList();
				}]
			}
	}).state("label.notes",{
			url : '/notes/:labelid',
			templateUrl : 'templates/notes.html',
			controller : 'NotesCtrl',
			resolve: {
				noteList: ["$notesRequest", function($notesRequest){
					return $notesRequest.getNoteList();
				}]
			}
	});

	$urlRouterProvider.otherwise('/labels');
	
}]);
