angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  
})

.controller('PlaylistsCtrl', function($scope,$http,$q) {
      $scope.fitbitClick = function() {
          var deferred = $q.defer();
          if(window.cordova) {
              var redirect_uri = "http://localhost";
              var clientId="22CJJ7"
              // if(options !== undefined) {
              //   if(options.hasOwnProperty("redirect_uri")) {
              //  //   redirect_uri = options.redirect_uri;
              //   }
              // }
              var flowUrl = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id="+clientId+"&redirect_uri="+ encodeURI(redirect_uri)+"&expires_in=31536000&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight";
    
              console.log(flowUrl);
              var browserRef = window.cordova.InAppBrowser.open(flowUrl, '_blank');
              browserRef.addEventListener('loadstart', function(event) {
    
              if (event.url.indexOf("https://www.fitbit.com")> -1){
                console.log('auth is open');
              }
    
              else if(event.url.indexOf(redirect_uri) > -1){
    
                 console.log('in the if url');
                  browserRef.removeEventListener("exit",function(event){});
                  browserRef.close();
                  var callbackResponse = (event.url).split("#")[1];
                  var responseParameters = (callbackResponse).split("&");
                  var parameterMap = [];
                  for(var i = 0; i < responseParameters.length; i++) {
                    parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                  }
                  console.log(JSON.stringify(parameterMap));
    
                  if(parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                    console.log('got to resolve');
                    console.log(parameterMap);
                    deferred.resolve({ access_token: parameterMap.access_token, expires_in: parameterMap.expires_in });
                  } else {
                    if ((event.url).indexOf("error_code=100") !== 0) {
                      deferred.reject("fitbit returned error_code=100: Invalid permissions");
                    } else {
                      deferred.reject("Problem authenticating");
                    }
                  }
                }
                else{
                    console.log('redirect url is diff ' + event.url);
                     browserRef.removeEventListener("exit",function(event){});
                     browserRef.close();
                }
              });
              browserRef.addEventListener('exit', function(event) {
                deferred.reject("The sign in flow was canceled");
              });
            }
           else {
            deferred.reject("Cannot authenticate via a web browser");
          }
          return deferred.promise;
        } 
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
