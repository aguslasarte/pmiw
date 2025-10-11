/*

Comision 1
Agustin Lasarte ~ Pedro Ramella
link video: https://youtu.be/wy_Yu7F2xx0

*/

let imagen = [];
let textos = [];
let estado = 0;
let fuenteuno;
let fuentedos;
let fuentetres;
let click , musiquita;


function preload() {
  for (let i = 0; i < 18; i++) {
    imagen[i] = loadImage('data/file' + i + '.png');
  }
   fuenteuno = loadFont('data/longshot.ttf')
   fuentedos = loadFont('data/Decaydence.otf')
   fuentetres = loadFont('data/montserrat.ttf')
  
     click = loadSound('data/click.mp3');
     musiquita = loadSound('data/musiquita.mp3');
}

function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < 18; i++) {
    imagen[i].resize(640, 480);


  }
   textLeading(18)
  textSize(16);
   musiquita.loop();
  musiquita.setVolume(0.5);
   
  
  textos[0] = "El hombre del piso de arriba\n\nAgustin Lasarte & Pedro Ramella";
  textos[1] = "Douglas llega a la pension de sus abuelos,\n\n listo para pasar el verano.";
  textos[2] = "Douglas observa fascinado como prepara la comida su abuela.";
  textos[3] = "Un nuevo huesped llega: el señor Koberman. Silencioso y extraño.";
  textos[4] = "Douglas siente miedo y corre a contarle a la abuela lo que vio.";
  textos[5] = "La abuela lo escucha y decide echar de la pension al huesped";
  textos[6] = "Al dia siguiente, finalmente, echan al señor Koberman,\n\ terminando con la preocupacion de Douglas.";
  textos[7] = "Douglas nota que Koberman no come, no habla, no duerme.";
  textos[8] = "Encuentra marcas extrañas en el suelo y escucha ruidos por la noche.";
  textos[9] = "La abuela le advierte que no se meta en asuntos de adultos.";
  textos[10] = "Douglas ve a Koberman herido, pero sin sangre.";
  textos[11] = "Douglas descubre que Koberman podria no ser humano.";
  textos[12] = "La abuela prepara una comida especial, como si supiera algo.";
  textos[13] = "Douglas ve a Koberman herido.";
  textos[14] = "Douglas ataca a Koberman, y resulta que es un ser paranormal.";
  textos[15] = "Llega un forense quien confirma que\n\ no era un humano, no tenia organos.";
  textos[16] = "La abuela sigue cocinando. El abuelo tiembla. \n\Douglas no logra olvidar y el misterio permanece,\n\ pero algo ha cambiado para siempre.";
  textos[17] = "Koberman revela que no es humano\n\ y que huyo de quienes lo cazaban.";
  textos[18] = "Douglas lo ayuda a escapar en la noche.";
  textos[19] = "Antes de irse, Koberman le otorga un amuleto especial\n\ que conservara toda su vida.";
  textos[20] = "El abuelo no le cree y le dice que no moleste a los huespedes.";
}

function draw() {
  // ESTADO 0 - INICIO
 if (estado === 0) {
  image(imagen[0], 0, 0);
  fill(255);
  textFont(fuenteuno);
  
  // TITULO
  textSize(40);
  textAlign(CENTER, CENTER);
  text("El hombre del piso de arriba", width/2, height/2 - 80);
  
  // NUESTROS NOMBRES
  textFont(fuentetres);
  textSize(24);
  text("Agustin Lasarte & Pedro Ramella", width/2, height/2 - 20);
  
  boton(220, 350, 200, 50, "Comenzar");
  }
  // ESTADO 1 - P1 INTRODUCCION
  else if (estado === 1) {
    textSize(20);
    fondo(imagen[1], textos[1], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 2 - P2 COCINA
  else if (estado === 2) {
    fondo(imagen[2], textos[2], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 3 - P3 HUESPED
  else if (estado === 3) {
    fondo(imagen[3], textos[3], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 4 - DECISION 1
  else if (estado === 4) {
    image(imagen[4], 0, 0);
    fill(255);
    boton(100, 350, 200, 50, "Espiar al huesped");
    boton(340, 350, 200, 50, "Advertir a la abuela");
  }
  // ESTADO 5 - RAMA 1 ESPIAR
  else if (estado === 5) {
    fondo(imagen[4], textos[7], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 6 - RAMA 1 PREOCUPACION (FINAL)
  else if (estado === 6) {
    fondo(imagen[17], textos[6], 30, 30, 200, 400, 240, 40, "Volver al inicio");
  }
  // ESTADO 7 - RAMA 1 ABUELA
  else if (estado === 7) {
    fondo(imagen[16], textos[4], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 8 - MARCAS
  else if (estado === 8) {
    fondo(imagen[8], textos[8], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 9 - ADVERTENCIA
  else if (estado === 9) {
    fondo(imagen[5], textos[9], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 10 - DECISION 2
  else if (estado === 10) {
    image(imagen[6], 0, 0);
    fill(255);
    textFont(fuentetres)
    textSize(18)
    textAlign(CENTER, TOP);
    text(textos[10], 30, 30, 580, 250);
    boton(100, 350, 200, 50, "Investigar en secreto");
    boton(340, 350, 200, 50, "Contar todo al abuelo");
  }
  // ESTADO 11 - RAMA 2 INVESTIGAR
  else if (estado === 11) {
    fondo(imagen[7], textos[11], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 12 - COMIDA ESPECIAL
  else if (estado === 12) {
    fondo(imagen[2], textos[12], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 13 - DECISION 3
  else if (estado === 13) {
    image(imagen[6], 0, 0);
    fill(255);
    textFont(fuentetres)
    textSize(18)
    textAlign(CENTER, TOP);
    text(textos[13], 30, 30, 580, 250);
    boton(100, 350, 200, 50, "Enfrentarlo");
    boton(340, 350, 200, 50, "Hablar con el");
  }
  // ESTADO 14 - RAMA 3 ESTACA
  else if (estado === 14) {
    fondo(imagen[11], textos[14], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 15 - FORENSE
  else if (estado === 15) {
    fondo(imagen[15], textos[15], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 16 - FINAL ABUELA (FINAL)
  else if (estado === 16) {
    fondo(imagen[16], textos[16], 30, 30, 200, 400, 240, 40, "Volver al inicio");
  }
  // ESTADO 17 - RAMA 3 HABLAR
  else if (estado === 17) {
    fondo(imagen[12], textos[17], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 18 - ESCAPE
  else if (estado === 18) {
    fondo(imagen[12], textos[18], 30, 30, 250, 400, 140, 40, "Continuar");
  }
  // ESTADO 19 - AMULETO (FINAL)
  else if (estado === 19) {
    fondo(imagen[13], textos[19], 30, 30, 200, 400, 240, 40, "Volver al inicio");
  }
  // ESTADO 20 - RAMA 2 ABUELO (FINAL)
  else if (estado === 20) {
    fondo(imagen[15], textos[20], 30, 30, 200, 400, 240, 40, "Volver al inicio");
  }
}
      
function mousePressed() {
  // ESTADO 0 - INICIO
  if (estado === 0) {    
    if (overMouse(220, 350, 200, 50)) {
      estado = 1;
    if (click && click.isLoaded()) click.play();
    }
  }            
  // ESTADO 1 - P1
  else if (estado === 1) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 2;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 2 - P2
  else if (estado === 2) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 3;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 3 - P3
  else if (estado === 3) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 4;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 4 - DECISION 1
  else if (estado === 4) {
    if (overMouse(100, 350, 200, 50)) {
      estado = 5; // Espiar
       if (click && click.isLoaded()) click.play();
    } else if (overMouse(340, 350, 200, 50)) {
      estado = 7; // Abuela
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 5 - RAMA 1 ESPIAR
  else if (estado === 5) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 9;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 6 - FINAL (volver)
  else if (estado === 6) {
    if (overMouse(200, 400, 240, 40)) {
      estado = 0;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 7 - RAMA 1 ABUELA
  else if (estado === 7) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 6;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 8 - MARCAS
  else if (estado === 8) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 9;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 9 - ADVERTENCIA
  else if (estado === 9) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 10;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 10 - DECISION 2
  else if (estado === 10) {
    if (overMouse(100, 350, 200, 50)) {
      estado = 11; // Investigar
       if (click && click.isLoaded()) click.play();
    } else if (overMouse(340, 350, 200, 50)) {
      estado = 20; // Abuelo
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 11 - RAMA 2 INVESTIGAR
  else if (estado === 11) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 12;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 12 - COMIDA ESPECIAL
  else if (estado === 12) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 13;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 13 - DECISION 3
  else if (estado === 13) {
    if (overMouse(100, 350, 200, 50)) {
      estado = 14; // Estaca
       if (click && click.isLoaded()) click.play();
    } else if (overMouse(340, 350, 200, 50)) {
      estado = 17; // Hablar
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 14 - RAMA 3 ESTACA
  else if (estado === 14) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 15;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 15 - FORENSE
  else if (estado === 15) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 16;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 16 - FINAL ABUELA (volver)
  else if (estado === 16) {
    if (overMouse(200, 400, 240, 40)) {
      estado = 0;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 17 - RAMA 3 HABLAR
  else if (estado === 17) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 18;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 18 - ESCAPE
  else if (estado === 18) {
    if (overMouse(250, 400, 140, 40)) {
      estado = 19;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 19 - AMULETO (volver)
  else if (estado === 19) {
    if (overMouse(200, 400, 240, 40)) {
      estado = 0;
       if (click && click.isLoaded()) click.play();
    }
  }
  // ESTADO 20 - ABUELO (volver)
  else if (estado === 20) {
    if (overMouse(200, 400, 240, 40)) {
      estado = 0;
       if (click && click.isLoaded()) click.play();
    }
  }
}

function boton(posX, posY, tamX, tamY, textoB) {
  if (overMouse(posX, posY, tamX, tamY)) {
    fill(255, 0, 255);
  } else {
    fill(200, 120, 0, 100);
  }
  rect(posX, posY, tamX, tamY, tamY/4);
  fill(255);
  textSize(10)
   textFont(fuentedos)
  textAlign(CENTER, CENTER);
  text(textoB, posX+tamX/2, posY+tamY/2);
}

function overMouse(posX, posY, tamX, tamY) {
  return mouseX>posX && mouseX<posX+tamX && mouseY>posY && mouseY<posY+tamY;
}

function fondo(imagen, texto, posX, posY, posXB, posYB, tamXB, tamYB, textoB) {
  image(imagen, 0, 0);
  fill(255);
    textSize(18)
  textFont(fuentetres)
  textAlign(CENTER, TOP);
  text(texto, width/2, height/10);
  boton(posXB, posYB, tamXB, tamYB, textoB);
}
