var app = angular.module('sampleForm', []);

app.service('FBService', function($rootScope, $q) {

    var instance = {
        auth: {},
        init: function() {
            FB.init({
                appId: '1804630876527972',
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.4'
            });

            FB.Event.subscribe('auth.statusChange', instance.login);
        },
        login: function(response) {
            if(response.status == 'connected') {
                instance.auth = response.authResponse;
                $rootScope.$broadcast('fb:connected');
            }
        }
    };

    return instance;
});

app.controller('appController', function($scope, $http, FBService) {

        FBService.init();

        $scope.FBLogin = function() {
            if(FBService.auth.length == 0) return;
            FB.login(function() {}, { scope : '' });
        };

        $scope.FBConnected = false;
        $scope.$on('fb:connected', function() {
            $scope.FBConnected = true;
            $scope.$digest();
        });

        $scope.loading = false;
        $scope.complete = false;
        $scope.send = function(form) {
            if($scope.loading) return;

            if(form.$invalid) {
                form.$setDirty();
                return;
            }

            $scope.loading = true;

            var data = {
                name: form.name,
                surname: form.surname,
                email: form.email
            };

            if(FBService.auth.length != 0) {
                data.token = FBService.auth.accessToken;
            }

            $http.post('/send', data).then(function() {
                $scope.loading = false;
                $scope.complete = true;
            });
        }

});