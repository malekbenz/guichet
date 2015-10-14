var app = angular.module("awemApp", []);
app.controller("myController", function ($scope, $http) {

    $scope.hello = "Welcome to AngularJs";

    $http.get("/api/developer")
     .success(function (response) {
         $scope.developers = response;
     });

    $scope.removeDev = function (index) {
        console.log(index);
        $http.delete("/api/developer/" + index)
             .success(function (response) {
                 $scope.developers = response;
             });
    }
    $scope.addDev = function (developer) {
        
        $http.post("/api/developer/", developer)
            .success(function (response) {
                $scope.developers = response;
            });

    }

});