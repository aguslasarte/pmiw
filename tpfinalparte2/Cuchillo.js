class ObjetoMalo {
  constructor(p) {
    this.p = p;
    this.x = p.random(50, p.width - 50);
    this.y = -p.random(20, 100);
    this.ancho = 30;
    this.alto = 50;
    this.vel = p.random(3, 5);
  }

  mover() {
    this.y += this.vel;
  }

  dibujar() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.image(this.p.imgMalo, this.x, this.y, this.ancho, this.alto);
    this.p.pop();
  }

  chocarCon(jugador) {
    const lim = jugador.obtenerLimites();
    const d = this.p.dist(this.x, this.y, lim.x, lim.y);
    return d < this.alto / 2 + lim.ancho / 2;
  }

  fuera() {
    return this.y > this.p.height + this.alto;
  }

  reset() {
    this.x = this.p.random(50, this.p.width - 50);
    this.y = -this.p.random(20, 100);
    this.vel = this.p.random(3, 5);
  }
}
