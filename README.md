# Ionic Speech Test #

Ionic speech test

### Version: 1.0.0#

### What is this repository for? ###


* [Installation](#Installation)
* [Configuration](#Configuration)
* [Dependencies](#Dependencies)

### Installation 

To install the project follow this instructions:
```
$ git clone https://github.com/guilhermewm/SpeechTests.git
$ cd SpeechTests
$ npm install
$ bower install
$ npm install -g ionic cordova gulp
```

After this steps, the app is installed. To test if all dependencies were installed use:

```
$ionic serve
``` 

If the registration view appear it's work.


#Configuration 
To run your app you should add a platform for Android:

```
$ ionic platform add android
```

After this build and run:

``` 
$ionic build android
$ionic run android
```

#Dependencies

* Gulp - Tasks runner
* cordova-plugin-tts - used to translate string into audio
* https://github.com/macdonst/SpeechRecognitionPlugin - used to translate audio into string

