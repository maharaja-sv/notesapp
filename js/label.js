notesApp.controller('LabelCtrl', ['$scope', 'labelList', '$mdSidenav', '$timeout', '$notesRequest', function($scope, labelList, $mdSidenav, $timeout, notesRequest){
	$scope.labelList = labelList.data;
	$scope.labelList.unshift({id: 0, name: "Dashboard"});
	$scope.label = {name: ''};

	$scope.toggleNav = function(){
		$mdSidenav('left').toggle();
	};

	$scope.addLabel = function(label, index){
		if(!label){
			notesRequest.addOrEditLabel($scope.label.name).then(function(promise){
				$scope.createLabel = false;
				$scope.labelList.push(promise.data);
			});
		}
		else{
			notesRequest.addOrEditLabel(label.name, label.id).then(function(promise){
				$scope.labelList[index].editLabel = false;
				$scope.labelList[index].name = promise.data.name;
			});
		}
	};

	$scope.deleteLabel = function(index){
		notesRequest.deleteLabel($scope.labelList[index].id).then(function(promise){
			console.log(promise.data);
			$scope.labelList.splice(index, 1);
		});
	};

	$scope.getLabelList = function(){
		notesRequest.getLabelList().then(function(promise){
			$scope.labelList = promise.data;
		});
	};

	$scope.selectLabel = function(label){
		if(window.location.hash.endsWith(label.id)){
			window.location.hash = "#/labels/notes/0";
		}
		else{
			window.location.hash = "#/labels/notes/" + label.id;
		}
	};
	
	$timeout(function(){
		setHeight('sideNavContent');
	},0);
	window.onresize = function(){
		setHeight('sideNavContent');// No I18N
	};
	if(window.location.hash.split("/").length === 2){
		window.location.hash += "/notes/0";
	}
}]);