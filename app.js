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
jazisms = [
  "Stick it in an iframe",
  "Maaaaaate",
  "MAAAAAATTTEEEE",
  "Ajax it in",
  "Job done",
  "Why havent you guys job-done'd this yet?"
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

  //Get Random Jazism from array
  var generatedJazism = jazisms[Math.floor(Math.random()*jazisms.length)];

  //Assemble Options
  const options = {
    pageTitle:title,
    jazism:fuckItUp(generatedJazism)
  };

  //Compile Pug template with options
  const page = compilationFunction(options);

  //return page, close request
  res.end(page)
}

//Listen for dodgy request, for whatever reason
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

//listen on port
server.listen(process)

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
  var letters = string.split("")
  for(var i=0;i<letters.length;i++){
    letters[i] = `<span style="color:`+getRandomColor()+`">`+letters[i]+`</span>`;
  }
  return letters.join("");
}
