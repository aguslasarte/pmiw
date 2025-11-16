class Jugador {
  constructor(p) {
    this.p = p;
    this.x = p.width / 2;
    this.y = p.height - 80;
    this.ancho = 120;
    this.alto = 100;
    this.vel = 8;
  }

  actualizar() {
    if (this.x < this.ancho / 2) this.x = this.ancho / 2;
    if (this.x > this.p.width - this.ancho / 2) this.x = this.p.width - this.ancho / 2;
  }

  dibujar() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.image(this.p.imgJugador, this.x, this.y, this.ancho, this.alto);
    this.p.pop();
  }

  moverIzquierda() {
    this.x -= this.vel * 3;
  }

  moverDerecha() {
    this.x += this.vel * 3;
  }

  obtenerLimites() {
    return {
      x: this.x,
      y: this.y,
      ancho: this.ancho * 0.7,
      alto: this.alto * 0.7
    };
  }

  reset() {
    this.x = this.p.width / 2;
    this.y = this.p.height - 80;
  }
}
