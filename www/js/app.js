// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.controller('AppCtrl', function($scope) {

  $scope.data = {
    speechText: ''
  };
  $scope.recognizedText = '';
  $scope.dic = {
    cor:{
      preto:"#000",
      branco:"#fff",
      vermelho:"#ff0000",
      verde:"#00ff00",
      azul:"#00f"
    }
  };
  $scope.speakText = function() {
    TTS.speak({
           text: $scope.data.speechText,
           locale: 'pt-BR',
           rate: 1.5
       }, function () {
           // Do Something after success
       }, function (reason) {
           // Handle the error case
       });
  };
  $scope.record = function() {
    var recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
            $scope.recognizedText = event.results[0][0].transcript;
            $scope.split = $scope.recognizedText.split(" ");
            $scope.split.map(function(p,index, array){
                if(p === "cor"){
                  var corEscolhida = array[index+1];
                  alert(corEscolhida);
                  $scope.color = $scope.dic.cor[corEscolhida];
                }
                if(p==="falar"){
                  var fala =   $scope.recognizedText.split("falar ")[1];
                  $scope.data.speechText = fala;
                  $scope.speakText();
                }
                if(p==="Jarvis"){
                  $scope.data.speechText = "Como posso ajudá-lo João O Todo Poderoso?";
                  $scope.speakText();
                }
            })
            $scope.$apply();
        }
    };
    recognition.start();
  };
});
