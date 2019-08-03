console.log("Add to Home Screen Script inserted");

function addToHomeScreen() { 
  console.log("addToHomeScreen Called");
  var a2hsBtn = document.querySelector("#a2hs");
  a2hsBtn.style.display = "none";
  deferredPrompt.prompt()
    // .then(
    //   result => alert(result), 
    //   error => alert(error)
    // );
  deferredPrompt.userChoice
    .then(function(choiceResult){
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the A2HS prompt');
  } else {
    console.log('User dismissed the A2HS prompt');
  }
  deferredPrompt = null;
});}

var deferredPrompt;

window.addEventListener('beforeinstallprompt', function (e) {
  console.log("Event Fired");
  e.preventDefault();
  deferredPrompt = e;
  
  var a2hsBtn = document.querySelector("#a2hs");
  a2hsBtn.style.display = "block";
  a2hsBtn.addEventListener("click", addToHomeScreen);
});