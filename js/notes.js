notesApp.controller('NotesCtrl', ['$scope', 'noteList', '$notesRequest', '$stateParams', function($scope, noteList, notesRequest, $stateParams){
	$scope.$parent.selectedLabelID = $stateParams.labelid;
	
	$scope.note = {name: '', body: ''};
	$scope.addNote = function(note, index){
		if(!note){
			notesRequest.createOrEditNote($scope.note.name, $scope.note.body).then(function(promise){
				$scope.note = {name: '', body: ''};
				$scope.noteList.push(promise.data);
			});
		}
		else{
			notesRequest.createOrEditNote(note.name, note.body, note.id).then(function(promise){
				$scope.noteList[index].editNote = false;
				$scope.noteList[index].name = promise.data.name;
				$scope.noteList[index].body = promise.data.body;
				$scope.note = {name: '', body: ''};
			});
		}
	};

	$scope.deleteNote = function(noteID, index){
		notesRequest.deleteNote(noteID).then(function(promise){
			console.log(promise.data);
			$scope.noteList.splice(index, 1);
		});
	};

	$scope.loadNoteLabelList = function($mdOpenMenu, $event, note){
		$scope.addLabel = [];
		$scope.removeLabel = [];
		var labelList = angular.copy($scope.labelList);
		var selectedLabelList = angular.copy(note.labels);
		labelList.shift();
		labelList.every(function(item){
			delete item.$$hashKey;
		});
		var selectedLabelIDList = [];
		for(i in selectedLabelList){
			selectedLabelIDList.push(selectedLabelList[i].id);
		}
		for(i in labelList){
			labelList[i].check = (selectedLabelIDList.indexOf(labelList[i].id) !== -1);
		}
		note.selectedLabelList = labelList;
		$mdOpenMenu($event);
	};

	$scope.toggle = function(label){
		if(label.check){
			$scope.addLabel.push(label);
		}
		else{
			$scope.removeLabel.push(label);
		}
	};

	$scope.addOrEditLabel = function(noteID){
		var addLabelIdList = [], removeLabelIdList = [];
		for(i in $scope.addLabel){
			addLabelIdList.push($scope.addLabel[i].id);
		}
		for(i in $scope.removeLabel){
			removeLabelIdList.push($scope.removeLabel[i].id);
		}
		notesRequest.addLabelToNode(noteID, addLabelIdList.filter(function (x) { return removeLabelIdList.indexOf(x) === -1;}), removeLabelIdList.filter(function (x) { return addLabelIdList.indexOf(x) === -1;})).then(function(promise){
			$scope.getNoteList(promise.data);
		});	
	};

	$scope.getNoteList = function(message){
		notesRequest.getNoteList().then(function(promise){
			$scope.noteList = $scope.selectLabelledNotes(promise.data);
			console.log(message);
		});
	};

	$scope.selectLabelledNotes = function(result){
		if($scope.selectedLabelID == 0){
			return result;
		}
		var noteList = result, selectedLabelNoteList = [];
		for(i in noteList){
			for(j in noteList[i].labels){
				if(noteList[i].labels[j].id == $scope.selectedLabelID){
					selectedLabelNoteList.push(noteList[i]);
				}
			}
		}
		return selectedLabelNoteList;
	};

	$scope.noteList = $scope.selectLabelledNotes(noteList.data);
}]);