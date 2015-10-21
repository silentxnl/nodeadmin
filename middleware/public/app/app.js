angular.module('nodeadmin', [
  // 'nodeadmin.home',
  // 'nodeadmin.system',
  // 'nodeadmin.settings',
  // 'nodeadmin.db',
  'nodeadmin.services',
  'nodeadmin.home',
  'nodeadmin.auth',
  'nodeadmin.main',
  'ui.router',
  'ui.bootstrap'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('setup', {
      url: '/setup',
      templateUrl: './app/auth/setup.html',
      controller: 'AuthController',

      data: {
        doesNotRequireLogin: true
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: '',
      controller: '',

      data: {
        doesNotRequireLogin: true
      }
    })
    .state('main', {
      url: '/',
      templateUrl: './app/main/main.html',
      controller: 'MainController'
    })

    .state('main.home', {
      url: '/home',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })

    .state('main.settings', {
      url: '/settings',
      templateUrl: '',
      controller: ''
    })
    .state('main.settings.users', {
      url: '/settings/users',
      templateUrl: '',
      controller: ''
    })
    .state('main.settings.notifications', {
      url: '/settings/notifications',
      templateUrl: '',
      controller: ''
    })
    .state('main.settings.advanced', {
      url: '/settings/advanced',
      templateUrl: '',
      controller: ''
    })

    .state('main.system', {
      url: '/system',
      templateUrl: '',
      controller: ''
    })
    .state('main.system.logs', {
      url: '/system/logs',
      templateUrl: '',
      controller: ''
    })
    .state('main.system.fs', {
      url: '/system/fs',
      templateUrl: '',
      controller: ' '
    })

    .state('main.db', {
      url: '/db',
      templateUrl: '',
      controller: ''
    })
    .state('main.db.tables', {
      url: '/db/tables',
      templateUrl: '',
      controller: ''
    })
    .state('main.db.createTable', {
      url: '/db/createTable',
      templateUrl: '',
      controller: ''
    })
    .state('main.db.records', {
      url: '/db/records',
      templateUrl: '',
      controller: ''
    });
   
   $urlRouterProvider.otherwise('/setup');
})
// Hidden for dev
// .run(function($rootScope, $state, Auth) {
// // Check for token on each state change
//   $rootScope.$on('stateChangeStart', function(event, toState) {
//     // Check if state requires login 
//     if (!toState.data.doesNotRequireLogin && !Auth.isAuth()) {
//       // User isn't authenticated so prevent state change
//       event.preventDefault();
//       $state.transitionTo('login');
//     }
//   });
// });
