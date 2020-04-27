var  xem; //globalen em top
var yem; //globalen em left
var music = new Audio('zvoki/FortunateSon.mp3');
var musicMode="STOP";
var war=new Audio('zvoki/backgroundfx.mp3');
music.volume=0.5;
var choppasound = new Audio('zvoki/dachoppa.mp3');
var choppasoundMode="START";
var xc;
var yc;
var sideL="url(slike/runnerL.png);";
var sideR="url(slike/runner.png);";
let userInteracted = false;
window.addEventListener('click', (event) => {
	if (!userInteracted) {
		userInteracted = true;
	meme();
	}
 });
window.addEventListener('load', (event) => {
  meme();
});
function reset(){
  location.reload();
}
function meme(){
  if(musicMode=="PLAY" && userInteracted){
    music.pause();
    musicMode="STOP";
    document.getElementById("am").innerHTML = "No music";
  }
  else if(musicMode=="STOP" && userInteracted){
    music.play();
    musicMode="PLAY";
    document.getElementById("am").innerHTML = "Meme music";
    music.addEventListener('ended', function(){
      this.currentTime=0;
      this.play();
    },false);
  }
}
var mazeDirections=["L1","D1","L2","U1","L3","D2","R1","D1","L2","U1","L1","D1","L2","D1","L1","U1","L1","D1","L1","D1","L1","D2","R1","U1","R1","D4","R1","D1","R1","U3","L1","U2","R2","U2","R1","D1","R1","U1","R2","D2","R1","U1","R1","U1","R1","U1","R1","D2","L1","D4","R2","D1","L1","D1","R1","D1","L2","D1","L1","D2","L1","D2","R1","D2","R1","U2","R1","D3","L2","D1","R3","U2","R3","D2","R2","D1","L1","D2","L2","D1","R1","D1","R1","D1","L2","U1","L2","U3","L1","U1","L1","D1","L1","D2","R1","D1","R1","D1","R2","D1","R1","D1","L1","D1"] //u=gor D=dol L=levo R=desno
function sled(){
  music.volume=1.0;
  music.currentTime=0;
  war.volume=0;
  war.currentTime=0;
  war.play();
  choppasound.currentTime=0;
  choppasoundMode="START";
  document.getElementById("char").style.visibility="visible";
	document.getElementById("char").style.left=14.2+"em";
  document.getElementById("char").style.top=0.2+"em";
  document.getElementById("choppa").style.backgroundImage="url(slike/choppa.gif)";
  var ctx = document.getElementById("can");
  var ctx = ctx.getContext("2d");
  ctx.beginPath();
  ctx.clearRect(0, 0, 480, 480);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#937f5c";
  ctx.moveTo(232,0);
  ctx.lineTo(232,13);
  ctx.stroke();
  ctx.moveTo(232,8);
  var i;
  xc=232;
  yc=8;
  const element = document.querySelector('#char') //element se veže na figuro
    const stil = getComputedStyle(element); //style se veže na css elementa
    const pozl=stil.left; //left je dejanski left stil figure
    var lint = parseInt(pozl); //spremeni iz px v int ali celo stevilo
    var l = (lint / 16).toFixed(1); // zaokrozi na 1 decimalko
    const pozt=stil.top; //top stil
    var tint = parseInt(pozt); //spremeni iz px v int ali celo stevilo
    var t = (tint / 16).toFixed(1); // zaokrozi na 1 decimalko
    var delay=0;
    xem=t;
    yem=l;
  for(i=0;i<mazeDirections.length;i++){
    decodeSled(mazeDirections[i], xem, yem, xc, yc, delay);
    var tabd=mazeDirections[i].split("");
    narisiSled(mazeDirections[i],xc, yc, delay+200*parseInt(tabd[1]), i);
    xc=updatex(xc,mazeDirections[i]);
    yc=updatey(yc,mazeDirections[i]);
    delay=delay+200*tabd[1];
    yem=updateYem(yem,i);
    xem=updateXem(xem,i);
    switch(i){
      case 40:{
        choppaMod(choppasoundMode);
        choppasoundMode="ARRIVAL";
        break;
      }
      case 80:{
        
      }
      case 103:{
        choppaMod(choppasoundMode);
        break;

      }
    }
  }
}
function decodeSled(niz, x, y, xc, yc, d){
  var ctx = document.getElementById("can");
  var ctx = ctx.getContext("2d");
  ctx.moveTo(xc, yc);
  var tab = niz.split("");
  switch(tab[0]){
    case "U":{
      setTimeout(function(){
        var elem = document.getElementById('char');
        var pos = x;
        var id = setInterval(frame, 20);
        function frame() {
          if (pos < (x-parseInt(tab[1]))+0.1){
            clearInterval(id);
          } 
          else {
            pos=pos-0.1;
            elem.style.top = pos + 'em';
          }
        }
      },d);
      break;
    }
    case "D":{
      setTimeout(function(){
        var elem = document.getElementById('char');
        var pos = x;
        var id = setInterval(frame, 20);
        function frame() {
          if (pos > (x-parseInt(-tab[1]))-0.05){
            clearInterval(id);
          } 
          else {
            pos=pos-(-0.1);
            elem.style.top = pos + 'em';
          }
        }
      }, d);
      break;
    }
    case "R":{
      setTimeout(function(){
        document.getElementById('char').style.backgroundImage="url(slike/soldierR.png)";
        var elem = document.getElementById('char');
        var pos = y;
        var id = setInterval(frame, 20);
        function frame() {
          if (pos > (y-parseInt(-tab[1]))-0.1){
            clearInterval(id);
          } 
          else {
            pos=pos-(-0.1);
            elem.style.left = pos + 'em';
          }
        }
      },d);
      break;
    }
    case "L":{
      setTimeout(function(){
        document.getElementById('char').style.backgroundImage="url(slike/soldierL.png)";
        var elem = document.getElementById('char');
        var pos = y;
        var id = setInterval(frame, 20);
        function frame() {
          if (pos < (y-parseInt(tab[1]))+0.1){
            clearInterval(id);
          } 
          else {
            pos=pos-0.1;
            elem.style.left = pos + 'em';
          }
        }
        }, d);
      break;
    }
  }
}
function narisiSled(niz, xc, yc, d, i){
  var ctx = document.getElementById("can");
  var ctx = ctx.getContext("2d");
  ctx.moveTo(xc, yc);
  var tab=niz.split("");
  setTimeout(function(){
  switch(tab[0]){
    case "L":{
      if(i==0){
        ctx.moveTo(232,8);
        ctx.lineTo(xc-parseInt(tab[1])*16, yc);
        ctx.stroke();
      }
      ctx.lineTo(xc-parseInt(tab[1])*16, yc);
      ctx.stroke();
      break;
    }
    case "R":{
      ctx.lineTo(xc-(-parseInt(tab[1])*16), yc);
      ctx.stroke();
      break;
    }
    case "U":{
      ctx.lineTo(xc, yc-parseInt(tab[1])*16);
      ctx.stroke();
      break;
    }
    case "D":{
      ctx.lineTo(xc, yc-(-parseInt(tab[1])*16));
      ctx.stroke();
      break;
    }
  }
},d);
}
function updatex(xc, niz){
  var tab = niz.split("");
  switch(tab[0]){
    case "R":{
      xc=xc-(-parseInt(niz[1])*16);
      break;
    }
    case "L":{      
      xc=xc-(parseInt(niz[1])*16);
      break;
    }
  }
  return xc;
}
function updatey(yc, niz){
  var tab = niz.split("");
  switch(tab[0]){
    case "D":{
      yc=yc-(-parseInt(niz[1])*16);
      break;
    }
    case "U":{      
      yc=yc-(parseInt(niz[1])*16);
      break;
    }
  }
  return yc;
}
function brezSled(){
  music.volume=1.0;
  music.currentTime=0;
  war.volume=0;
  war.currentTime=0;
  war.play();
  choppasound.currentTime=0;
  choppasoundMode="START";
  document.getElementById("char").style.visibility="visible";
	document.getElementById("char").style.left=14.2+"em";
  document.getElementById("char").style.top=0.2+"em";
  document.getElementById("choppa").style.backgroundImage="url(slike/choppa.gif)";
	var ctx = document.getElementById("can");
	var ctx = ctx.getContext("2d");
	ctx.beginPath();
	ctx.clearRect(0, 0, 480, 480);
  const element = document.querySelector('#char') //element se veže na figuro
  const stil = getComputedStyle(element); //style se veže na css elementa
  const pozl=stil.left; //left je dejanski left stil figure
  var lint = parseInt(pozl); //spremeni iz px v int ali celo stevilo
  var l = (lint / 16).toFixed(1); // zaokrozi na 1 decimalko
  const pozt=stil.top; //top stil
  var tint = parseInt(pozt); //spremeni iz px v int ali celo stevilo
  var t = (tint / 16).toFixed(1); // zaokrozi na 1 decimalko
  var delay=0;
  xem=t;
  yem=l;
  var i;
  for(i=0;i<mazeDirections.length;i++){
    var tabd=mazeDirections[i].split(""); 
    decode(mazeDirections[i], xem, yem, delay);
    delay=delay+200*tabd[1];
    yem=updateYem(yem,i);
    xem=updateXem(xem,i);
    switch(i){
      case 40:{
        choppaMod(choppasoundMode);
        choppasoundMode="ARRIVAL";
        break;
      }
      case 80:{
        
      }
      case 103:{
        choppaMod(choppasoundMode);
        break;

      }
    }
  }
}
function decode(niz, x, y, d){
    var tab = niz.split("");
    switch(tab[0]){
      case "U":{
        setTimeout(function(){
        var elem = document.getElementById('char');
        var pos = x;
        var id = setInterval(frame, 20);
        function frame() {
          if (pos < (x-parseInt(tab[1]))+0.1){
            clearInterval(id);
          } 
          else {
            pos=pos-0.1;
            elem.style.top = pos + 'em';
          }
        }
      },d);
        break;
      }
      case "D":{
        setTimeout(function(){
        var elem = document.getElementById('char');
        var pos = x;
        var id = setInterval(frame, 20);
        function frame() {
          if (pos > (x-parseInt(-tab[1]))-0.05){
            clearInterval(id);
          } 
          else {
            pos=pos-(-0.1);
            elem.style.top = pos + 'em';
          }
        }
      }, d);
        break;
      }
      case "R":{
        setTimeout(function(){
          document.getElementById('char').style.backgroundImage="url(slike/soldierR.png)";
        var elem = document.getElementById('char');
        var pos = y;
        var id = setInterval(frame, 20);
        function frame() {
          if (pos > (y-parseInt(-tab[1]))-0.1){
            clearInterval(id);
          } 
          else {
            pos=pos-(-0.1);
            elem.style.left = pos + 'em';
          }
        }
      },d);
        break;
      }
      case "L":{
        setTimeout(function(){
          document.getElementById('char').style.backgroundImage="url(slike/soldierL.png)";
        var elem = document.getElementById('char');
        var pos = y;
        var id = setInterval(frame, 20);
        function frame() {
          if (pos < (y-parseInt(tab[1]))+0.1){
            clearInterval(id);
          } 
          else {
            pos=pos-0.1;
            elem.style.left = pos + 'em';
          }
        }
        }, d);
        break;
      }
    }
  }
function updateYem(yem, i){
  var tab=mazeDirections[i].split("");
  switch(tab[0]){
    case "R":{
      yem = (yem-parseInt(-tab[1]));
      break;
    }
    case "L":{
      yem = (yem-parseInt(tab[1]));
      break;
    }
  }
  return yem;
}
function updateXem(xem, i){
  var tab=mazeDirections[i].split("");
  switch(tab[0]){
    case "U":{
      xem = (xem-parseInt(tab[1]));
      break;
    }
    case "D":{
      xem = (xem-parseInt(-tab[1]));
      break;
    }
  }
  return xem;
}
function choppaMod(choppasoundMode){
  switch(choppasoundMode){
    case "START":{
      choppasound.volume=0.0;
      v=0.0
      choppasound.play();
      for(d=0;d<10000;d=d+1000){
        setTimeout(function(){
          choppasound.volume=v
          war.volume=v;
          v=v+0.01;
        }, d)
      }
      setTimeout(function(){
        war.volume=0.6;
      }, 10000);
      setTimeout(function(){
        choppasound.volume=0.3;
        war.volume=0.7;
      }, 25000);
      setTimeout(function(){
        choppasound.volume=0.4;
      }, 26000);
      setTimeout(function(){
        choppasound.volume=0.5;
        war.volume=0.8;
      }, 27000);
      setTimeout(function(){
        choppasound.volume=0.6;
      }, 28000);
      setTimeout(function(){
        choppasound.volume=0.65;
      }, 29000);
      break;
    }
    case "ARRIVAL":{
      poz=-16.0;
      setTimeout(function() {
        choppasound.volume=0.7;
        var inter = setInterval(frame, 50);
      function frame() {
        if (poz==50.0) {
          clearInterval(inter);
        } else {
          poz++; 
          document.getElementById("choppa").style.left=poz+"em"; 
        }
      }
      }, 30000);
      break;
    }
  }
  setTimeout(function(){
    document.getElementById("choppa").style.backgroundImage="url(slike/choppaL.gif)";
    document.getElementById("char").style.visibility="hidden";
    var inter2 = setInterval(frame, 50);
    function frame() {
      if (poz==-16.0) {
        clearInterval(inter2);
      } else {
        poz--; 
        document.getElementById("choppa").style.left=poz+"em"; 
      }
    }
    music.volume=0.95;
    setTimeout(function(){
      music.volume=0.9;
    }, 500);
  }, 32000);
  setTimeout(function(){
    choppasound.volume=0.6;
    war.volume=0.6;
    music.volume=0.85;
    setTimeout(function(){
      music.volume=0.8;
    }, 500);
  }, 33000);
  setTimeout(function(){
    choppasound.volume=0.5;
    war.volume=0.5;
    music.volume=0.75;
    setTimeout(function(){
      music.volume=0.7;
    }, 500);
  }, 34000);
  setTimeout(function(){
    choppasound.volume=0.4;
    war.volume=0.4;
    music.volume=0.65;
    setTimeout(function(){
      music.volume=0.6;
    }, 500);
  }, 35000);
  setTimeout(function(){
    choppasound.volume=0.3;
    war.volume=0.3;
    music.volume=0.55;
    setTimeout(function(){
      music.volume=0.5;
    }, 500);
  }, 36000);
  setTimeout(function(){
    choppasound.volume=0.2;
    war.volume=0.2;
    music.volume=0.45;
    setTimeout(function(){
      music.volume=0.4;
    }, 500);
  }, 37000);
  setTimeout(function(){
    choppasound.volume=0.1;
    war.volume=0.1;
    music.volume=0.35;
    setTimeout(function(){
      music.volume=0.3;
    }, 500);
  }, 38000);
  setTimeout(function(){
    choppasound.volume=0.0;
    war.volume=0.0;
    music.volume=0.25;
    setTimeout(function(){
      music.volume=0.2;
    }, 500);
  }, 39000);
  setTimeout(function(){
    music.volume=0.15;
    setTimeout(function(){
      music.volume=0.1;
    }, 500);
  }, 40000);
  setTimeout(function(){
    music.volume=0.05;
    setTimeout(function(){
      music.volume=0.0;
    }, 500);
  }, 41000);
}