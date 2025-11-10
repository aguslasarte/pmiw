class Cristal {
  constructor() {
    this.x = random(50, width - 50);
    this.y = 0;
    this.tam = random(30, 40);
    this.velocidad = random(2, 4);
  }
  
  actualizar() {
    this.y += this.velocidad;
  }
  
  mostrar() {
    push();
    imageMode(CENTER);
    image(imgCristal, this.x, this.y, this.tam, this.tam);
    pop();
  }
  
  colisionaCon(douglas) {
    let limites = douglas.obtenerLimites();
    let distancia = dist(this.x, this.y, limites.x, limites.y);
    return distancia < this.tam/2 + limites.ancho/2;
  }
  
  fueraDePantalla() {
    return this.y > height + this.tam;
  }
}
