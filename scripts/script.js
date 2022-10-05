const Scene = require('Scene');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');

// Set initial variables
const orcScore = -10;
const dragonScore = 10;
const wizardScore = 5;
let score = 0;

(async function () {  // Enables async/await in JS [part 1]

  const [scoreText] = await Promise.all([
    Scene.root.findFirst('scoreText')
  ]);  

  // monitor() and subscribe() methods allows you yo "listen" variable changes in patch editor
  Patches.outputs.getBoolean('isDragon').then(function (dragonSignal) {
    dragonSignal.monitor().subscribe(function (dragonVal) {
      if (dragonVal.newValue == true) {
        score = score + dragonScore;
        displayScore();
      }
    });
  });

  Patches.outputs.getBoolean('isWizard').then(function (alphaSignal) {
    alphaSignal.monitor().subscribe(function (alphaVal2) {
      if (alphaVal2.newValue == true) {
        score = score + wizardScore;
        displayScore();
      }
    });
  });

  Patches.outputs.getBoolean('isOrc').then(function (alphaSignal) {
    alphaSignal.monitor().subscribe(function (alphaVal3) {
      if (alphaVal3.newValue == true) {
        score = score + orcScore;
        displayScore();
      }
    });
  });

  function displayScore() {    
    scoreText.text = "" + score.toString();
    Diagnostics.log('Score: ' + score) 
  }

})(); // Enables async/await in JS [part 2]
