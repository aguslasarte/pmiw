class ObjetoBueno {
  constructor(p) {
    this.p = p;
    this.x = p.random(50, p.width - 50);
    this.y = -p.random(20, 100);
    this.tam = p.random(30, 40);
    this.vel = p.random(2, 4);
  }

  mover() {
    this.y += this.vel;
  }

  dibujar() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.image(this.p.imgBueno, this.x, this.y, this.tam, this.tam);
    this.p.pop();
  }

  chocarCon(jugador) {
    const lim = jugador.obtenerLimites();
    const d = this.p.dist(this.x, this.y, lim.x, lim.y);
    return d < this.tam / 2 + lim.ancho / 2;
  }

  fuera() {
    return this.y > this.p.height + this.tam;
  }

  reset() {
    this.x = this.p.random(50, this.p.width - 50);
    this.y = -this.p.random(20, 100);
    this.vel = this.p.random(2, 4);
  }
}
