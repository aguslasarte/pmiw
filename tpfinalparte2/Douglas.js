class Douglas {
  constructor() {
    this.x = width / 2;
    this.y = height - 80;
    this.ancho = 120;
    this.alto = 100;
    this.velocidad = 8;
  }

  actualizar() {
    if (this.x < this.ancho/2) {
      this.x = this.ancho/2;
    }
    if (this.x > width - this.ancho/2) {
      this.x = width - this.ancho/2;
    }
  }

  mostrar() {
    push();
    imageMode(CENTER);
    image(imgDouglas, this.x, this.y, this.ancho, this.alto);
    pop();
  }

  moverIzquierda() {
    this.x -= this.velocidad * 3;
  }

  moverDerecha() {
    this.x += this.velocidad * 3;
  }

  obtenerLimites() {
    return {
    x:
      this.x,
      y:
      this.y,
      ancho:
      this.ancho * 0.7,
      alto:
      this.alto * 0.7
    };
  }
}
