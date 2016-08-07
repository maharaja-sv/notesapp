notesApp.service('$notesRequest', ['$http', function($http){
	this.login = function(username, password){
		return $http.post("/auth/login/",{"username": username, "password": password});
	},
	this.getLabelList = function(){
		return $http.get("/todo/label/");
	},
	this.addOrEditLabel = function(labelName, labelID){
		var param = {name: labelName};
		return $http.post("/todo/label/" + (labelID ? labelID + "/" : ""), param);
	},
	this.deleteLabel = function(labelID){
		return $http.delete("/todo/label/" + labelID + "/");
	},
	this.getNoteList = function(){
		return $http.get("/todo/note/");
	},
	this.createOrEditNote = function(noteName, noteBody, noteID){
		var param = {name: noteName, body: noteBody};
		return $http.post("/todo/note/" + (noteID ? noteID + "/" : ""), param);
	},
	this.deleteNote = function(noteID){
		return $http.delete("/todo/note/" + noteID + "/");
	},
	this.addLabelToNode = function(noteID, addLabels, removeLabels){
		var param = {add: addLabels.join(','), remove: removeLabels.join(',')};
		return $http.post("/todo/note/" + noteID + "/label/", param);
	}
}]);
