/*
* Smooth Jaz Rides Again
by Joss Manger
Original Concept by Lawrence Glen and Joss Manger
====================================================*/

/*
* Constants and Includes
==================================*/
const http = require("http"),
pug = require("pug"),
title = "Smooth Jaz Rides Again",
port = process.env.PORT || 8000,

//List of messages
jazisms = [
  "Maaaaaate",
  "MAAAAAATTTEEEE",
  "Job Done",
  "AJAX it in",
  "Stick it in an iFrame",
  "Job Done...",
  "Stick it in a WebView",
  "Job Done.",
  "...job done",
  "J O B D O N E",
  "Job done?",
  "Why haven't you guys job done'd this yet?",
  "Have you turned it on and off again?",
  "Don't forget to clear the cache",
  "MAAAAAAAAAAATTTTTEEEEEEEE",
  "Stick it on heroku",
  "Chromecast it.",
  "I've made it to Dubai"
],

//List of entrance animations from animate.css
animations = [
  `bounce`,
  `flash`,
  `pulse`,
  `rubberBand`,
  `shake`,
  `headShake`,
  `swing`,
  `tada`,
  `wobble`,
  `jello`,
  `bounceIn`,
  `bounceInDown`,
  `bounceInLeft`,
  `bounceInRight`,
  `bounceInUp`,
  `fadeIn`,
  `fadeInDown`,
  `fadeInDownBig`,
  `fadeInLeft`,
  `fadeInLeftBig`,
  `fadeInRight`,
  `fadeInRightBig`,
  `fadeInUp`,
  `fadeInUpBig`,
  `flipInX`,
  `flipInY`,
  `lightSpeedIn`,
  `rotateIn`,
  `rotateInDownLeft`,
  `rotateInDownRight`,
  `rotateInUpLeft`,
  `rotateInUpRight`,
  `rollIn`,
  `zoomIn`,
  `zoomInDown`,
  `zoomInLeft`,
  `zoomInRight`,
  `zoomInUp`,
  `slideInDown`,
  `slideInLeft`,
  `slideInRight`,
  `slideInUp`
]

/*
* Pug Compilation function
==================================*/
var compilationFunction = pug.compileFile('page.pug')

/*
* The Server
==================================*/

//Create Server
var server = http.createServer(handleRequest);

//Handle Request
function handleRequest(req,res){

  //Do process for root request, ignore for
  if(req.url==="/"){
  //Get Random Jazism from array
  var generatedJazism = jazisms[Math.floor(Math.random()*jazisms.length)];

    //Log to server console
    console.log(`Request received, Jazism generated: ${generatedJazism}`)

    //Assemble Options
    const options = {
      pageTitle:title,
      jazism:fuckItUp(generatedJazism)
    };

    //Compile Pug template with options
    const page = compilationFunction(options);

    //return page, close request
    res.end(page)

  } else {
    //return empty request for non-root requests
    res.end();
  }
}

//Listen for dodgy request, for whatever reason
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

//listen on port
server.listen(port)

/*
* HELPER FUNCTIONS
==================================*/

//Generate random hex color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Wrap letters in span, attach inline color, return string
function fuckItUp(string){

  var letters = string.split("");

  for(var i=0;i<letters.length;i++){

    //Substitute non-breaking space for whitespace char
    letters[i] = (letters[i] === " ") ? "&nbsp;" : letters[i];

    var randomanimation = animations[Math.floor(Math.random()*animations.length)];
    letters[i] = `<span class="animated `+randomanimation+`" style="display:inline-block;color:`+getRandomColor()+`">`+letters[i]+`</span>`;

  }

  //return reassembled string
  return letters.join("");

}
