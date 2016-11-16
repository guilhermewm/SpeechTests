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

  //Dicionário de cores
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

  var lang = navigator.language || navigator.userLanguage;

  $scope.speakText = function(text) {
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
     locale: lang,
     rate: 1.5
   }, function () {
     callback();
   }, function (reason) {
           // Handle the error case
         });
  };

  $scope.items = [];

  function reco(callback){
    var recognition = new SpeechRecognition();
    recognition.lang = lang;
    callback(recognition);
  };

  function results(event, data){

    var arr = event.results[0][0].transcript.toLowerCase().split(" ");
    var evt = event.results[0][0].transcript.toLowerCase();

    arr.forEach(function(item, index){

      switch(item){
        case 'falar':
          $scope.speakText(evt.split(item)[1]);
          $scope.$apply();
        break;
        case 'jarvis':
          $scope.speakText("Como posso ajudar?");
          $scope.$apply();
        break;
        case 'adicione':
          if((arr[index+1] ==="o" && arr[index+2] === "item") || (arr[index+1] === "item")){

            $scope.items.push({name: evt.split("adicione o item ")[1]});
            $scope.$apply();
          
          };
        break;
        case 'cor':
          var corEscolhida = arr[index+1];
          var hex = $scope.dic.cor[corEscolhida];
          $scope.color = hex;
          $scope.$apply();
          if(!hex){
            $scope.speakText("Não reconheço a cor {"+corEscolhida+"} , informe o hexadecimal?");
            
            if(data){
              data.onresult = function(events){
                var newColor = events.results[0][0].transcript;
                newColor = newColor.replace(/\s+/g, '');
                $scope.dic.cor[corEscolhida] = "#"+newColor;
                $scope.color = $scope.dic.cor[corEscolhida];
                $scope.$apply();
              };
              data.start();
            }
            
          }
          
          $scope.$apply();
        break;
        default:
          console.log(item);
        break;

      };

    });

  };

  $scope.record = function (){
    reco(function(data){
      data.onresult = function(event){
        console.log("Event:", JSON.stringify(event));
        results(event, data);
      };
      data.start();
    });
  };

  
});
