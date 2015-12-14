// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var rs = angular.module('rs', ['ionic']);

rs.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});

rs.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
        cache: true,
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MainCtrl'
    })

    .state('app.main', {
        cache: true,
        url: '/main',
        views: {
            'menuContent': {
                templateUrl: 'templates/main.html',
                // controller: 'MainCtrl'
            }
        }
    })
    .state('app.restorans', {
        cache: true,
        url: '/restorans',
        views: {
            'menuContent': {
                templateUrl: 'templates/restorans.html',
                // controller: 'MainCtrl'
            }
        }
    })
    .state('app.cafe', {
        cache: true,
        url: '/cafe',
        views: {
            'menuContent': {
                templateUrl: 'templates/cafe.html',
                // controller: 'MainCtrl'
            }
        }
    })
    .state('app.nightclub', {
        cache: true,
        url: '/nightclub',
        views: {
            'menuContent': {
                templateUrl: 'templates/nightClub.html',
                // controller: 'MainCtrl'
            }
        }
    })
    .state('app.restwithchildren', {
        cache: true,
        url: '/restwithchildren',
        views: {
            'menuContent': {
                templateUrl: 'templates/restWithChildren.html',
                // controller: 'MainCtrl'
            }
        }
    })
    .state('app.entertainmentcenter', {
        cache: true,
        url: '/entertainmentcenter',
        views: {
            'menuContent': {
                templateUrl: 'templates/entertainmentCenter.html',
                // controller: 'MainCtrl'
            }
        }
    })
    .state('app.personalarea', {
        cache: true,
        url: '/personalarea',
        views: {
            'menuContent': {
                templateUrl: 'templates/personalArea.html',
                // controller: 'MainCtrl'
            }
        }
    })
    .state('app.info', {
        cache: true,
        url: '/info',
        views: {
            'menuContent': {
                templateUrl: 'templates/info.html',
                // controller: 'MainCtrl'
            }
        }
    })

// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/app/main');
});
