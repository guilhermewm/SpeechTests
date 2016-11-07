// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.controller('AppCtrl', function($scope, $timeout) {


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
  $scope.speakText = function(text) {
    TTS.speak({
           text: text,
           locale: 'pt-BR',
           rate: 1.5
       }, function () {
           // Do Something after success
       }, function (reason) {
           // Handle the error case
       });
  };
  $scope.items = [];
  $scope.record = function() {
    var recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
            $scope.recognizedText = event.results[0][0].transcript;
            $scope.recognizedText = $scope.recognizedText.toLowerCase();
            $scope.split = $scope.recognizedText.split(" ");
            $scope.split.map(function(p,index, array){
              if(p === "jarvis"){
                $scope.data.speechText = "Como posso Ajudar?";
                  $scope.speakText($scope.data.speechText);
                $scope.$apply();
                
              }else{
              switch(p){
                case "cor":
                  var corEscolhida = array[index+1];
                  corEscolhida = $scope.dic.cor[corEscolhida];
                  if(corEscolhida === undefined){

                  }
                  $scope.$apply();
                break;
                case "falar":
                  var fala = $scope.recognizedText.split("falar ")[1];
                  $scope.data.speechText = fala;
                  $scope.speakText($scope.data.speechText);
                  $scope.$apply();
                break;
                case "jarvis":
                  $scope.data.speechText = "Como posso Ajudar?";
                  $scope.speakText($scope.data.speechText);
                  $scope.$apply();
                break;
                case "adicione" && array[index+1] ==="o" && array[index+2] === "item":
                  var name = $scope.recognizedText.split("adicione o item ")[1];
                  var item = {
                    name: name
                  }
                  $scope.items.push(item);
                  $scope.$apply();
                break;

              }
            }
            init();
            })

            // $scope.$apply();
        }
    };
    recognition.start();
  };
 var init = function() {
    $scope.record();
  };
  // init();
  $timeout(function(){init()}, 1500);
});
