let obra;
let filas = 30;
let cantidadBase = 6;
let modoOscuro = false;

function preload() {
  obra = loadImage("data/obra.jpg");
}

function setup() {
  createCanvas(800, 400);
  stroke(255);
}

function draw() {
  if (modoOscuro) {
    background(0);
    fill(255);
    noStroke();
  } else {
    background(255);
    fill(0);
    stroke(255);
  }

  image(obra, 0, 0, 400, 400);

  let posY = 400;
  for (let fila = 0; fila < filas; fila++) {
    let cantidad = cantidadBase + fila * 3;
    let espaciado = 400.0 / cantidad;
    let diametroBase = espaciado;
    posY -= diametroBase;
    let anchoTotal = cantidad * espaciado;
    let posX = 400 + (400 - anchoTotal) / 2 + espaciado / 2;


    filaDeCirculos(posX, posY, diametroBase, cantidad, espaciado, mouseX);
  }
}


function filaDeCirculos(xInicial, y, diametroBase, cantidad, espaciado, mousePosX) {
  for (let i = 0; i < cantidad; i++) {
    let x = xInicial + i * espaciado;
    let diametro;

    if (mousePosX > 400) {
      let aumento = map(mousePosX, 400, 800, 0, 10);
      diametro = diametroBase + aumento;
    } else {
      diametro = diametroBase;
    }

    circle(x, y, diametro);
  }
}

function mousePressed() {
  modoOscuro = !modoOscuro;
}
