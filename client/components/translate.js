angular.module('eportfolioApp')
  .config(function($translateProvider) {
    // Our translations will go in here
    $translateProvider.translations('en', {
        HEADLINE: 'Welcome',
        SIGNUP_TITLE:'Please Sign In',
        SIGNUP_MESSAGE:'Default account is test@test.com / test',
        EMAIL: 'e-mail',
        PASSWORD: 'password',
        REMEMBER_ME: 'remember me',
        LOGIN_BTN: 'login',
        NEWS: 'News',
        FROM: 'from',
        AT: 'at',
        OBSERVE:'Observe',
        PLAN: 'Plan',
        EVALUATE: 'Evaluate',
        SEARCH: 'search'
      });

    $translateProvider.translations('fr', {
          HEADLINE: 'Bienvenue',
          SIGNUP_TITLE: 'Veuillez vous loguer',
          SIGNUP_MESSAGE: 'Le compte par défaut est test@test.com / test',
          EMAIL: 'e-mail',
          PASSWORD: 'mot de passe',
          REMEMBER_ME: 'sauvegarder la session',
          LOGIN_BTN: 'valider',
          NEWS: 'Actualités',
          FROM: 'de',
          AT: 'à',
          OBSERVE: 'Observer',
          PLAN: 'Planifier',
          EVALUATE: 'Evaluer',
          SEARCH: 'rechercher'
        });
    $translateProvider.preferredLanguage('fr');
})
.controller('TranslateController', function($translate, $scope) {
  $scope.changeLanguage = function (langKey) {
    if(!langKey)
      $translate.use($scope.selectLang.value);
    else
      $translate.use(langKey);
  };

  $scope.LANG = [
      {
        name: 'français',
        value: 'fr'
      },
      {
        name: 'english',
        value: 'en'
      }
    ];

  $scope.selectLang = $scope.LANG[0];
});
