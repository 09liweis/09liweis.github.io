//to do angular app
var tiko3d = angular.module('tiko3d', []);
tiko3d.controller('todoController', function($scope) {
    $scope.todos = ['3D Printing'];
    $scope.addTodo = function() {
        $scope.todos.push($scope.newTodo);
        $scope.newTodo = '';
    }
    $scope.removeTodo = function(index) {
        $scope.todos.splice(index, 1);
    }
});


//page navigation
$(document).ready(function() {
    $('.menu .link').click(function() {
        var section = $(this).attr('data-target');
        $('html,body').animate({
        scrollTop: $("#"+section).offset().top},
        'slow');
        if (section == 'page3') {
            $('.menu .link').css('color', '#ffffff');
        } else {
            $('.menu .link').css('color', '#0163f9');
        }
    });

})