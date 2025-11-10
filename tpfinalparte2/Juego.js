class Juego {
  constructor() {
    this.douglas = new Douglas();
    this.cristales = [];
    this.cuchillos = [];
    this.cristalesAtrapados = 0;
    this.cuchillosAtrapados = 0;
    this.frameCount = 0;
    this.velocidadGeneracion = 50;
  }
  
  actualizar() {
    this.frameCount++;
    
    if (this.frameCount % this.velocidadGeneracion === 0) {
      if (random(1) >  0.65) {
        this.cristales.push(new Cristal());
      } else {
        this.cuchillos.push(new Cuchillo());
      }
    }
    
    this.douglas.actualizar();
    
    for (let i = this.cristales.length - 1; i >= 0; i--) {
      this.cristales[i].actualizar();
      
      if (this.cristales[i].colisionaCon(this.douglas)) {
        this.cristalesAtrapados++;
        this.cristales.splice(i, 1);                      // SPLICE: elimina los cristales que ya no estan en el canvas o que Douglas agarro
      } else if (this.cristales[i].fueraDePantalla()) {
        this.cristales.splice(i, 1);
      }
    }
    
    for (let i = this.cuchillos.length - 1; i >= 0; i--) {
      this.cuchillos[i].actualizar();
      
      if (this.cuchillos[i].colisionaCon(this.douglas)) {
        this.cuchillosAtrapados++;
        this.cuchillos.splice(i, 1);
      } else if (this.cuchillos[i].fueraDePantalla()) {
        this.cuchillos.splice(i, 1);
      }
    }
    
    verificarEstado();
  }
  
  mostrar() {
    image(imgIngame, 0, 0, width, height);
    
    this.douglas.mostrar();
    
    for (let cristal of this.cristales) {
      cristal.mostrar();
    }
    
    for (let cuchillo of this.cuchillos) {
      cuchillo.mostrar();
    }
  }
  
  controlarJugador(tecla) {
    if (tecla === 'a' || tecla === 'A') {
      this.douglas.moverIzquierda();
    } else if (tecla === 'd' || tecla === 'D') {
      this.douglas.moverDerecha();
    }
  }
  
  reiniciar() {
    this.douglas = new Douglas();
    this.cristales = [];
    this.cuchillos = [];
    this.cristalesAtrapados = 0;
    this.cuchillosAtrapados = 0;
    this.frameCount = 0;
  }
}
