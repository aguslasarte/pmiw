let juego;
let estado = "inicio";
let botonJugar, botonInstrucciones, botonCreditos, botonReiniciar, botonVolver;
let imgInicio, imgIngame, imgVictoria, imgDerrota, imgDouglas, imgCuchillo, imgCristal;

function preload() {
  imgInicio = loadImage('data/pinicio.png');
  imgIngame = loadImage('data/pingame.png');
  imgVictoria = loadImage('data/pganar.png');
  imgDerrota = loadImage('data/pderrota.png');
  imgDouglas = loadImage('data/douglascuerpo.png');
  imgCuchillo = loadImage('data/imgcuchillos.png');
  imgCristal = loadImage('data/imgcristales.png');
}

function setup() {
  createCanvas(640, 480);
  juego = new Juego();
  crearBotones();
}

function draw() {
  background(20, 30, 50);
  
  if (estado === "inicio") {
    mostrarPantallaInicio();
  } else if (estado === "instrucciones") {
    mostrarInstrucciones();
  } else if (estado === "creditos") {
    mostrarCreditos();
  } else if (estado === "jugando") {
    juego.actualizar();
    juego.mostrar();
    mostrarHUD();
  } else if (estado === "ganaste") {
    mostrarPantallaGanaste();
  } else if (estado === "perdiste") {
    mostrarPantallaPerdiste();
  }
  
  gestionarBotones();
}

function mostrarPantallaInicio() {
  image(imgInicio, 0, 0, width, height);
  
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("DESCUBRE A KOBERMAN", width/2, 100);
  
  textSize(20);
  text("Basado en 'El hombre del piso de arriba'", width/2, 160);
  text("de Ray Bradbury", width/2, 190);
  
  textSize(16);
  fill(200);
  text("Ayuda a Douglas a descubrir", width/2, 280);
  text("la verdadera identidad de Koberman", width/2, 305);
  pop();
}

function mostrarInstrucciones() {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("INSTRUCCIONES", width/2, 60);
  
  textSize(18);
  textAlign(LEFT);
  text("• Usá A y D para moverte de izquierda a derecha", 80, 140);
  text("• Atrapá los CRISTALES de colores que caen", 80, 180);
  text("• Evitá los CUCHILLOS de madera de Koberman", 80, 220);
  text("• Necesitás 10 CRISTALES para ganar", 80, 260);
  text("• Si atrapás 3 CUCHILLOS, perdés", 80, 300);
  text("• ¡Descubrí quién es realmente Koberman!", 80, 340);
  pop();
}

function mostrarCreditos() {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CRÉDITOS", width/2, 80);
  
  textSize(24);
  text("Trabajo realizado por:", width/2, 160);
  
  textSize(20);
  text("Agustín Lasarte", width/2, 220);
  text("Pedro Ramella", width/2, 250);
  
  textSize(16);
  fill(200);
  text("Trabajo realizado en base al cuento de Ray Bradbury", width/2, 320);
  text("'El hombre del piso de arriba'", width/2, 345);
  pop();
}

function mostrarHUD() {
  push();
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text("Cristales: " + juego.cristalesAtrapados + "/10", 20, 30);
  text("Cuchillos: " + juego.cuchillosAtrapados + "/3", 20, 55);
  
  fill(100, 200, 255);
  for(let i = 0; i < juego.cristalesAtrapados; i++) {
    rect(150 + i * 25, 15, 20, 20);
  }
  
  fill(255, 50, 50);
  for(let i = 0; i < juego.cuchillosAtrapados; i++) {
    rect(200 + i * 30, 40, 20, 20);
  }
  pop();
}

function mostrarPantallaGanaste() {
  image(imgVictoria, 0, 0, width, height);
  
  push();
  fill(100, 255, 100);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("¡GANASTE!", width/2, 150);
  
  fill(255);
  textSize(20);
  text("Douglas descubrió la verdadera", width/2, 230);
  text("identidad sobrenatural de Koberman", width/2, 260);
  text("¡La familia está a salvo!", width/2, 290);
  pop();
}

function mostrarPantallaPerdiste() {
  image(imgDerrota, 0, 0, width, height);
  
  push();
  fill(255, 100, 100);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("PERDISTE", width/2, 150);
  
  fill(255);
  textSize(20);
  text("Los cuchillos de Koberman te detuvieron", width/2, 230);
  text("Su identidad permanece oculta", width/2, 260);
  text("¡Intentalo de nuevo!", width/2, 290);
  pop();
}

function crearBotones() {
  botonJugar = createButton('JUGAR');
  botonJugar.position(width/2 - 50, 350);
  botonJugar.mousePressed(() => {
    estado = "jugando";
    juego.reiniciar();
  });
  
  botonInstrucciones = createButton('INSTRUCCIONES');
  botonInstrucciones.position(width/2 - 70, 390);
  botonInstrucciones.mousePressed(() => estado = "instrucciones");
  
  botonCreditos = createButton('CRÉDITOS');
  botonCreditos.position(width/2 - 50, 430);
  botonCreditos.mousePressed(() => estado = "creditos");
  
  botonReiniciar = createButton('REINICIAR');
  botonReiniciar.position(width/2 - 50, 350);
  botonReiniciar.mousePressed(() => {
    estado = "jugando";
    juego.reiniciar();
  });
  
  botonVolver = createButton('VOLVER');
  botonVolver.position(width/2 - 40, 400);
  botonVolver.mousePressed(() => estado = "inicio");
}

function gestionarBotones() {
  botonJugar.hide();
  botonInstrucciones.hide();
  botonCreditos.hide();
  botonReiniciar.hide();
  botonVolver.hide();
  
  if (estado === "inicio") {
    botonJugar.show();
    botonInstrucciones.show();
    botonCreditos.show();
  } else if (estado === "instrucciones" || estado === "creditos") {
    botonVolver.show();
  } else if (estado === "ganaste" || estado === "perdiste") {
    botonReiniciar.show();
    botonVolver.show();
  }
}

function keyPressed() {
  if (estado === "jugando") {
    juego.controlarJugador(key);
  }
}

function verificarEstado() {
  if (juego.cristalesAtrapados >= 10) {
    estado = "ganaste";
  } else if (juego.cuchillosAtrapados >= 3) {
    estado = "perdiste";
  }
}
