notesApp.controller('LoginCtrl', ['$scope', '$notesRequest', function($scope, $notesRequest){
	$scope.username = "";
	$scope.password = "";
	$scope.login = function(){
		$notesRequest.login($scope.username, $scope.password).then(function(promise){
			
		});
	};
}]);