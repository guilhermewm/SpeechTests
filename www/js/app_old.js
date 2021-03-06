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
            $scope.color="#fff";
            $scope.lang = "pt-BR";//navigator.language || navigator.userLanguage;
  $scope.speakText = function(text) {
    var lang = "pt-BR"//navigator.language || navigator.userLanguage;
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
  $scope.items = [];
  $scope.record = function() {
    var recognition = new SpeechRecognition();
    recognition.lang = $scope.lang;
    recognition.onresult = function(event) {
            console.log("Event:", JSON.stringify(event));
        if (event.results.length > 0) {
            $scope.recognizedText = event.results[0][0].transcript;
            $scope.recognizedText = $scope.recognizedText.toLowerCase();
            
            console.log("Result 11111111", $scope.recognizedText);
            $scope.split = $scope.recognizedText.split(" ");
            $scope.split.map(function(p,index, array){
                             console.log("Ta no mappappppppppppp");
                             
              if(p === "google"){
                             alert("AQui");
                $scope.data.speechText = "Como posso Ajudar?";
                  $scope.speakText($scope.data.speechText);
                $scope.$apply();

              }else{
              switch(p){
                case "cor":
                  var corEscolhida = array[index+1];
                  var hex = $scope.dic.cor[corEscolhida];
                  if(hex === undefined){
                    $scope.speakTextColor("Não reconheço a cor "+corEscolhida
                    +", qual seria seu valor em hexadecimal? ",function(){
                      var newColorRecognition = new SpeechRecognition();
                      newColorRecognition.lang= $scope.lang;
                      newColorRecognition.onresult = function(event){
                        var newColor = event.results[0][0].transcript;
                        newColor = newColor.replace(/\s+/g, '');
                        $scope.dic.cor[corEscolhida] = "#"+newColor;
                        $scope.color = $scope.dic.cor[corEscolhida];
                        $scope.$apply();

                      }
                      newColorRecognition.start();
                    });
                  }else{
                    $scope.color = $scope.dic.cor[corEscolhida];
                             alert($scope.color);
                             $scope.$apply();
                  }
                             
                  $scope.$apply();
                break;
                case "falar":
                  var fala = $scope.recognizedText.split("falar ")[1];
                  $scope.speakText(fala);
                  $scope.$apply();
                break;
                case "jarvis":
                  $scope.data.speechText = "Como posso Ajudar?";
                  $scope.speakText($scope.data.speechText);
                  $scope.$apply();
                break;
                case "adicione":
                  if((array[index+1] ==="o" && array[index+2] === "item")||(array[index+1]==="item")){
                    var name = $scope.recognizedText.split("adicione o item ")[1];
                    var item = {
                      name: name
                    }
                    $scope.items.push(item);
                    $scope.$apply();
                  }
                break;
                default:
                             console.log(p);
                break;

              }
            }
                             return true;
            })
        }
    };
    recognition.start();
  };
// var init = function() {
  //  $scope.record();
  //};
  //$timeout(function(){init()}, 1500);
});
