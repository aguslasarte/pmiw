class Cuchillo {
  constructor() {
    this.x = random(50, width - 50);
    this.y = 0;
    this.ancho = 30;
    this.alto = 50;
    this.velocidad = random(3, 5);
  }
  
  actualizar() {
    this.y += this.velocidad;
  }
  
  mostrar() {
    push();
    imageMode(CENTER);
    image(imgCuchillo, this.x, this.y, this.ancho, this.alto);
    pop();
  }
  
  colisionaCon(douglas) {
    let limites = douglas.obtenerLimites();
    let distancia = dist(this.x, this.y, limites.x, limites.y);
    return distancia < this.alto/2 + limites.ancho/2;
  }
  
  fueraDePantalla() {
    return this.y > height + this.alto;
  }
}
