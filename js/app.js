var notesApp = angular.module('notes', ['ngMaterial', 'ui.router', 'ngAnimate', 'ngSanitize']);
notesApp.config(["$httpProvider", function($httpProvider){
	var token;
	$httpProvider.interceptors.push(["$location", "$q", function($location, $q){
		return {
			'request' : function(config){ 
				if(config.url.endsWith(".html")){
					return config;
				}
				if(config.url !== "/auth/login/"){
					config.headers["Authorization"] = "Token " + token;
				}
				config.url = "http://54.199.244.49" + config.url;
				return config;
			},
			'response' : function(response){
				if(response.config.url === "http://54.199.244.49/auth/login/"){
					token = response.data.Token;
					$location.replace().path("/labels");
				}
				return response;
			},
			'responseError' : function(rejection){
				if(rejection.status === 401){
					window.location.hash = "#/login";
				}
				
				return $q.reject(rejection);
			} 
		};
	}]);
}]);

function setHeight(className){
	if($('.' + className + ":visible").length > 0){
		var t = $('.' + className + ":visible").offset().top; // No I18N
		$('.' + className).css("max-height", $(window).height() - t + "px"); // No I18N
		$('.' + className).css("height", $(window).height() - t + "px"); // No I18N
	}
}
			
