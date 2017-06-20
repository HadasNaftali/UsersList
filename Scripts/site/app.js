var app = angular.module('app', ['ngRoute', 'ngMap']);

app.config(function ($routeProvider) {
    $routeProvider.when('/list', { templateUrl: '/Pages/UsersList.html' })
                    .when('/user', { templateUrl: '/Pages/UserDetailes.html' })
                    .when('/newuser', { templateUrl: '/Pages/NewUser.html' })
                    .otherwise({ redirectTo: '/list' });
});

app.controller('usersconteroller', function ($scope, $http, $location) {
   
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
  
    $http.get('https://jsonplaceholder.typicode.com/users').success(function (users) {
        $scope.users = users;
    });
   
    $scope.openDetailes = function (user) {
        $scope.user = user;
        $location.path("/user");
        debugger;
    };

    $scope.addNewUser = function (newuser) {
        debugger;
        newuser.id = $scope.users.length + 1;
        $scope.users.push(newuser);
    };

    $scope.openMap = function (lat, lng) {
        debugger;
        $scope.latlng = [lat, lng];
        $scope.showgooglemap = true;
    };
 
});

//אם הכניסו בשם המשתמש רווח
app.directive('spanDr', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (/\s/.test(value)) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});
app.directive('tooltip', function () {
    return {
        link: function (scope, elem) {
            $(elem).tooltip();
        }
    };
});