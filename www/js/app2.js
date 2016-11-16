// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.controller('AppCtrl', function($scope, $timeout) {

  $scope.data = {
    speechText: '';
  };
  $scope.recognizedText = '';
  $scope.speakText = function(text) {
    var lang = "pt-BR";//navigator.language || navigator.userLanguage;
    TTS.speak({
     text: text,
     locale: lang,
     rate: 1.5
   }, function () {
           // Do Something after success
         }, function (reason) {
           // Handle the error case
         });
  };
  $scope.speakTextColor = function(text, callback) {
    TTS.speak({
     text: text,
     locale: $scope.lang,
     rate: 1.5
   }, function () {
     callback();
   }, function (reason) {
           // Handle the error case
         });
  };

  $scope.record = function (callback){
    var recognition = new SpeechRecognition();
    recognition.lang = $scope.lang;

    callback(recognition);
  };

  $scope.onresult = function (event){

    $scope.recognizedText = event.results[0][0].transcript.toLowerCase().split(" ");
    $scope.recognizedText.map(function(p, index, array){

      if(p === "falar"){
        var fala = $scope.recognizedText.split("falar ")[1];
        $scope.speakText(fala);
        $scope.$apply();
      };

    });

    $scope.record(function(data){
      $scope.onresult(event);
      data.start();
    })


  };

});
