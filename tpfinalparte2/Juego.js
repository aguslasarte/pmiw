class Boton {
  constructor(p, x, y, ancho, alto, texto, accion) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.texto = texto;
    this.accion = accion;
  }

  dibujar() {
    const p = this.p;
    p.push();
    p.noStroke();
    p.fill(50, 100, 200);
    p.rect(this.x, this.y, this.ancho, this.alto, 10);
    p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(20);
    p.text(this.texto, this.x + this.ancho / 2, this.y + this.alto / 2);
    p.pop();
  }

  presionado(mx, my) {
    return mx > this.x && mx < this.x + this.ancho &&
      my > this.y && my < this.y + this.alto;
  }
}

class Juego {
  constructor(p) {
    this.p = p;
    this.estado = "inicio";
    this.jugador = new Jugador(p);
    this.buenos = [];
    this.malos = [];
    this.buenosAtrapados = 0;
    this.malosAtrapados = 0;
    this.frames = 0;
    this.freq = 50;

    this.musicAmbiente = null;
    this.musicaSonando = false;
    this.audioContextIniciado = false;
    
    if (p.musicAmbiente) {
      this.musicAmbiente = p.musicAmbiente;
    } else if (window.musicAmbiente) {
      this.musicAmbiente = window.musicAmbiente;
    }

    this.botonesInicio = [
      new Boton(p, p.width / 2 - 60, 350, 120, 40, "JUGAR", () => this.cambiarAJugando()),
      new Boton(p, p.width / 2 - 100, 390, 200, 40, "INSTRUCCIONES", () => this.estado = "instrucciones"),
      new Boton(p, p.width / 2 - 60, 430, 120, 40, "CRÉDITOS", () => this.estado = "creditos"),
      new Boton(p, 20, p.height - 60, 140, 40, "MUSICA OFF", () => this.toggleMusica())
    ];

    this.botonesVolver = [
      new Boton(p, p.width / 2 - 60, 400, 120, 40, "VOLVER", () => this.estado = "inicio")
    ];

    this.botonesFinal = [
      new Boton(p, p.width / 2 - 60, 350, 120, 40, "REINICIAR", () => this.cambiarAJugando(true)),
      new Boton(p, p.width / 2 - 60, 400, 120, 40, "VOLVER", () => this.estado = "inicio")
    ];

    const self = this;
    p.keyTyped = function() {
      if (self.estado === "jugando") self.controlar(p.key);
      return false;
    };
    p.mousePressed = function() {
      self.detectarClick(p.mouseX, p.mouseY);
    };
  }

  detectarClick(mx, my) {
    if (this.estado === "inicio") {
      for (let b of this.botonesInicio) if (b.presionado(mx, my)) b.accion();
    } else if (this.estado === "instrucciones" || this.estado === "creditos") {
      for (let b of this.botonesVolver) if (b.presionado(mx, my)) b.accion();
    } else if (this.estado === "ganaste" || this.estado === "perdiste") {
      for (let b of this.botonesFinal) if (b.presionado(mx, my)) b.accion();
    }
  }

  cambiarAJugando(rein = false) {
    if (rein) this.reiniciar();
    this.estado = "jugando";
    if (this.musicAmbiente && this.musicaSonando && !this.musicAmbiente.isPlaying()) {
      try {
        this.musicAmbiente.loop();
        this.musicAmbiente.setVolume(0.5);
      } catch (e) {
        console.error("Error al reproducir música:", e);
      }
    }
  }

  actualizar() {
    const p = this.p;
    if (this.estado === "jugando") {
      this.frames++;
      if (this.frames % this.freq === 0) {
        if (p.random(1) > 0.65) this.buenos.push(new ObjetoBueno(p));
        else this.malos.push(new ObjetoMalo(p));
      }

      this.jugador.actualizar();

      for (let i = this.buenos.length - 1; i >= 0; i--) {
        this.buenos[i].mover();
        if (this.buenos[i].chocarCon(this.jugador)) {
          this.buenosAtrapados++;
          this.buenos.splice(i, 1);
        } else if (this.buenos[i].fuera()) {
          this.buenos.splice(i, 1);
        }
      }

      for (let i = this.malos.length - 1; i >= 0; i--) {
        this.malos[i].mover();
        if (this.malos[i].chocarCon(this.jugador)) {
          this.malosAtrapados++;
          this.malos.splice(i, 1);
        } else if (this.malos[i].fuera()) {
          this.malos.splice(i, 1);
        }
      }

      this.chocar();
    }
  }

  dibujar() {
    const p = this.p;

    if (this.estado === "inicio") {
      p.image(p.imgInicio, 0, 0, p.width, p.height);
      this._pantallaInicio();
      for (let b of this.botonesInicio) b.dibujar();
    } else if (this.estado === "instrucciones") {
      p.image(p.imgInicio, 0, 0, p.width, p.height);
      this._pantallaInstrucciones();
      for (let b of this.botonesVolver) b.dibujar();
    } else if (this.estado === "creditos") {
      p.image(p.imgInicio, 0, 0, p.width, p.height);
      this._pantallaCreditos();
      for (let b of this.botonesVolver) b.dibujar();
    } else if (this.estado === "jugando") {
      p.image(p.imgIngame, 0, 0, p.width, p.height);
      this.jugador.dibujar();
      for (let b of this.buenos) b.dibujar();
      for (let m of this.malos) m.dibujar();
      this._mostrarHUD();
    } else if (this.estado === "ganaste") {
      p.image(p.imgVictoria, 0, 0, p.width, p.height);
      this._pantallaGanaste();
      for (let b of this.botonesFinal) b.dibujar();
    } else if (this.estado === "perdiste") {
      p.image(p.imgDerrota, 0, 0, p.width, p.height);
      this._pantallaPerdiste();
      for (let b of this.botonesFinal) b.dibujar();
    }
  }

  chocar() {
    if (this.buenosAtrapados >= 10) this.estado = "ganaste";
    else if (this.malosAtrapados >= 3) this.estado = "perdiste";
  }

  controlar(k) {
    if (k === 'a' || k === 'A') this.jugador.moverIzquierda();
    if (k === 'd' || k === 'D') this.jugador.moverDerecha();
  }

  reiniciar() {
    this.jugador.reset();
    this.buenos = [];
    this.malos = [];
    this.buenosAtrapados = 0;
    this.malosAtrapados = 0;
    this.frames = 0;
    this.estado = "jugando";
  }

  toggleMusica() {
    if (!this.musicAmbiente) {
      if (this.p.musicAmbiente) {
        this.musicAmbiente = this.p.musicAmbiente;
      } else if (window.musicAmbiente) {
        this.musicAmbiente = window.musicAmbiente;
      }
    }
    
    if (!this.musicAmbiente) return;

    if (!this.audioContextIniciado) {
      try {
        const context = this.p.getAudioContext();
        if (context.state === 'suspended') {
          context.resume();
        }
        this.audioContextIniciado = true;
      } catch (e) {}
    }

    if (!this.musicAmbiente.isLoaded()) {
      setTimeout(() => this.toggleMusica(), 500);
      return;
    }

    if (this.musicaSonando) {
      this.musicAmbiente.stop();
      this.musicaSonando = false;
      this.botonesInicio[3].texto = "MUSICA OFF";
    } else {
      try {
        this.musicAmbiente.setVolume(0.5);
        this.musicAmbiente.loop();
        this.musicaSonando = true;
        this.botonesInicio[3].texto = "MUSICA ON";
      } catch (e) {}
    }
  }

  _pantallaInicio() {
    const p = this.p;
    p.push();
    p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(48);
    p.text("DESCUBRE A KOBERMAN", p.width / 2, 100);
    p.textSize(20);
    p.text("Basado en 'El hombre del piso de arriba'", p.width / 2, 160);
    p.text("de Ray Bradbury", p.width / 2, 190);
    p.textSize(16);
    p.fill(200);
    p.text("Ayuda a descubrir la verdadera identidad de Koberman", p.width / 2, 280);
    p.text("Atrapa cristales y evita los cuchillos", p.width / 2, 305);
    p.pop();
  }

  _pantallaInstrucciones() {
    const p = this.p;
    p.push();
    p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(32);
    p.text("INSTRUCCIONES", p.width / 2, 60);
    p.textSize(18);
    p.textAlign(p.LEFT);
    p.text("• A y D para moverte", 80, 140);
    p.text("• Atrapa cristales", 80, 180);
    p.text("• Evita cuchillos", 80, 220);
    p.text("• 10 cristales para ganar", 80, 260);
    p.text("• 3 cuchillos para perder", 80, 300);
    p.pop();
  }

  _pantallaCreditos() {
    const p = this.p;
    p.push();
    p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(32);
    p.text("CRÉDITOS", p.width / 2, 80);
    p.textSize(24);
    p.text("Trabajo realizado por:", p.width / 2, 160);
    p.textSize(20);
    p.text("Agustín Lasarte", p.width / 2, 220);
    p.text("Pedro Ramella", p.width / 2, 250);
    p.textSize(16);
    p.fill(200);
    p.text("Basado en el cuento de Ray Bradbury", p.width / 2, 320);
    p.text("'El hombre del piso de arriba'", p.width / 2, 345);
    p.pop();
  }

  _pantallaGanaste() {
    const p = this.p;
    p.push();
    p.fill(100, 255, 100);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(48);
    p.text("¡GANASTE!", p.width / 2, 150);
    p.fill(255);
    p.textSize(20);
    p.text("Descubriste la verdadera identidad de Koberman", p.width / 2, 230);
    p.text("La familia está a salvo", p.width / 2, 260);
    p.pop();
  }

  _pantallaPerdiste() {
    const p = this.p;
    p.push();
    p.fill(255, 100, 100);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(48);
    p.text("PERDISTE", p.width / 2, 150);
    p.fill(255);
    p.textSize(20);
    p.text("Los cuchillos de Koberman te derrotaron", p.width / 2, 230);
    p.text("Su identidad sigue siendo un misterio", p.width / 2, 260);
    p.text("Inténtalo de nuevo", p.width / 2, 290);
    p.pop();
  }

  _mostrarHUD() {
    const p = this.p;
    p.push();
    p.fill(255);
    p.textSize(18);
    p.textAlign(p.LEFT);
    p.text("Cristales: " + this.buenosAtrapados + "/10", 20, 30);
    p.text("Cuchillos: " + this.malosAtrapados + "/3", 20, 55);
    p.pop();
  }
}
