var app = angular.module('app', ['ui.router']);

/*$rootScope的相关配置*/
app.run(['$rootScope', function($rootScope){
    $rootScope.version = '0.1';
    $rootScope.isNoLoaded = true;
    //当然这是个不好的做法，只因为APP太simple
    $rootScope.movieList = [];
    $rootScope.genres = [];
    $rootScope.keywordsObj = {
    	book: '',
    	music: '',
    	movie: ''
    };
}]);

/*服务的URL配置*/
app.constant('ServiceConfig', {
	
	movie_search: 'https://api.douban.com/v2/movie/search',
	movie_search_id: 'https://api.douban.com/v2/movie/subject/',
	movie_boxoffice: 'https://api.douban.com/v2/movie/us_box',
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	/*URL路由*/
	$urlRouterProvider.otherwise("/");
	
	/*状态配置*/
	$stateProvider
		//首页
        .state('index',{
        	url: '/',
        	views:{
        		header:{
        			templateUrl: '../html/views/list_header.html',
        			controller: 'SearchController'
        		},
        		container:{
        			templateUrl: '../html/views/list_movie.html',
        			controller: 'MovieListController'
        		},
        		footer:{
        			templateUrl: '../html/views/list_footer.html',
        			controller: ''
        		}
        	}
        })
        
        // movie list
        .state('movie_list',{
        	url: '/movie',
        	views:{
        		header:{
        			templateUrl: '../html/views/list_header.html',
        			controller: 'SearchController'
        		},
        		container:{
        			templateUrl: '../html/views/list_movie.html',
        			controller: 'MovieListController'
        		},
        		footer:{
        			templateUrl: '../html/views/list_footer.html',
        			controller: ''
        		}
        	}
        })
        
        .state('movie_detail', {
        	url: '/movie/:id',
        	views: {
        		header: {
        			templateUrl: '../html/views/list_header.html',
        			controller: 'SearchController'
        		},
        		container: {
        			templateUrl: '../html/views/detail_movie.html',
        			controller: 'MovieDetailController'
        		},
        		footer: {
        			templateUrl: '../html/views/list_footer.html',
        			controller: ''
        		}
        	}
        })
        
        .state('search',{
        	url: '/search/:type',
        	views:{
        		header:{
        			templateUrl: '../html/views/search.html',
        			controller: 'Search'
        		},
        		container:{
        			templateUrl: '',
        			controller: ''
        		},
        		footer:{
        			templateUrl: '',
        			controller: ''
        		}
        	}
        });
}]);
;

app.directive('loading', function(){
	
	var str = '<div id="loading" ng-show="isNoLoaded"><img src="../imgs/loading.gif" /></div>';
	return {
        restrict: 'AE',
        template: str,
        replace: true
    };
	
});

/*构建movieList服务*/
app.factory('movieList', ['$rootScope', '$http', 'ServiceConfig', function($rootScope, $http, ServiceConfig){
	$rootScope.isNoLoaded = true;
	var _MovieList = {		
		getData: function(keywords){
			$rootScope.isNoLoaded = true;
			//$http.jsonp(ServiceConfig.movie_search + '?callback=movieSearch&count=5&q=' + keywords);
			$http.jsonp(ServiceConfig.movie_boxoffice + '?callback=movieSearch');
			window.movieSearch = function(data){
				$rootScope.isNoLoaded = false;
				if(data.subjects && data.subjects.length) {
					$rootScope.movieList = data.subjects;
					angular.forEach(data.subjects, function(movie) {
						angular.forEach(movie.subject.genres, function(genre) {
							if ($rootScope.genres.indexOf(genre) == -1) {
								$rootScope.genres.push(genre);
							}
						})
					})
				}
			};
		}
	};
	
	return _MovieList;
}]);

app.controller('MenuController', ['$scope', '$location',function($scope, $location){
	
	$scope.movieSearch = function(){
		$location.path('/movie');
	};
	
}]);;/*初始化的结果*/
app.controller('MovieListController', ['$rootScope', 'movieList', function($rootScope, movieList){
	if(!$rootScope.keywordsObj.movie){
		$rootScope.keywordsObj.movie = '变形金刚';
	}
	movieList.getData($rootScope.keywordsObj.movie);
	$rootScope.selectedGenre = null;
	$rootScope.selectGenre = function(genre) {
		console.log(genre);
		$rootScope.selectedGenre = genre;
	}
	$rootScope.genreFilter = function (movie) {
		return $rootScope.selectedGenre == null || movie.subject.genres.indexOf($rootScope.selectedGenre) > -1;
	}
	$rootScope.getAtiveClass = function(genre) {
		return [genre, 'all'].indexOf($rootScope.selectedGenre) > -1 ? 'active' : '';
	}
}]);;

app.controller('MovieDetailController', ['$rootScope', '$http', '$scope', '$location', 'ServiceConfig',function($rootScope, $http, $scope, $location, ServiceConfig){
	var movieId = $location.path().split('/movie/')[1] || '';
	$rootScope.isNoLoaded = true;
	$http.jsonp(ServiceConfig.movie_search_id + '' + movieId + '?callback=showMovieDetail');
	window.showMovieDetail = function(data){
		$rootScope.isNoLoaded = false;
		$scope.data = data;
		console.log(data);
	};
}]);

;/*负责搜索结果的导向*/
var Search = function($scope, $rootScope, $location, bookList, musicList, movieList){
	var path = $location.path();
	$rootScope.isNoLoaded = false;
//	document.getElementById('search_input').focus();
	//跳回列表页
	$scope.search = function(){
		var keywords = $scope.keywords;
		if(path.indexOf('/movie') !== -1){
			if(keywords){
				$rootScope.keywordsObj.movie = keywords;
			}
			$location.path('/movie');
		}
	};
};
Search.$inject = ['$scope', '$rootScope', '$location', 'movieList'];
app.controller('Search', Search);;/*仅负责搜索页面的打开*/
var SearchController = function($scope, $rootScope, $location){
	var path = $location.path();	
	$scope.goToSearch = function(){
		if(path.indexOf('/movie') !== -1 || path === '/movie'){
			$location.path('/search/movie');
		}
	};
	
};

SearchController.$inject = ['$scope', '$rootScope', '$location'];
app.controller('SearchController', SearchController);
