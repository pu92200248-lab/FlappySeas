class Juego extends Phaser.Scene {

    constructor(){
        super("Juego");
    }

    create(){

        console.log("Juego cargado");

        // ---------------- MÚSICA ----------------
        this.musica = this.sound.get("musica");

        if(!this.musica){
            this.musica = this.sound.add("musica", {
                loop: true,
                volume: 0.2
            });
        }

        // 🔥 CLAVE: reproducir si no está sonando
        if(!this.musica.isPlaying){
            this.musica.play();
        }

        // ---------------- PANTALLA ----------------
        this.ancho = this.scale.width;
        this.alto = this.scale.height;

        // ---------------- FONDO ----------------
        this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, "fondo")
            .setOrigin(0,0);

        // ---------------- PAJARO ----------------
        this.bird = this.physics.add.sprite(100, this.alto/2, "1");
        this.bird.body.gravity.y = 900;

        this.bird.body.setSize(this.bird.width * 0.6, this.bird.height * 0.6);

        // ---------------- ANIMACION ----------------
        let frames = ["1","2","3"];
        let i = 0;

        this.time.addEvent({
            delay: 100,
            loop: true,
            callback: ()=>{
                this.bird.setTexture(frames[i]);
                i = (i + 1) % frames.length;
            }
        });

        // ---------------- TUBOS ----------------
        this.pipes = this.physics.add.group();

        // ---------------- PUNTOS ----------------
        this.puntos = 0;
        this.textoPuntos = this.add.text(20,20,"0",{
            fontSize:"40px",
            fill:"#ffffff",
            stroke:"#000000",
            strokeThickness:4
        });

        // ---------------- CONTROLES ----------------
        this.input.on("pointerdown", this.saltar, this);
        this.input.keyboard.on("keydown-SPACE", this.saltar, this);

        // ---------------- GENERADOR ----------------
        this.time.addEvent({
            delay: 2500,
            callback: this.crearTubos,
            callbackScope: this,
            loop: true
        });

        // ---------------- COLISION ----------------
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }

    update(){

        this.fondo.tilePositionX += 2;

        this.verificarCaida();
        this.verificarPuntos();

        this.bird.setAngle(this.bird.body.velocity.y < 0 ? -20 : 20);
    }

    saltar(){
        this.bird.setVelocityY(-350);
    }

    verificarCaida(){
        if(this.bird.y > this.alto){
            this.gameOver();
        }
    }

    verificarPuntos(){
        this.pipes.getChildren().forEach(pipe => {

            if(pipe.getData("tipo") === "arriba"){
                if(pipe.x < this.bird.x && !pipe.getData("pasado")){
                    pipe.setData("pasado", true);
                    this.puntos++;
                    this.textoPuntos.setText(this.puntos);
                }
            }

        });
    }

    crearTubos(){

        let espacio = 200;
        let posicion = Phaser.Math.Between(this.alto * 0.3, this.alto * 0.7);

        let arriba = this.pipes.create(this.ancho, posicion - espacio, "pipe");
        arriba.setOrigin(0,1);
        arriba.body.allowGravity = false;
        arriba.setVelocityX(-200);
        arriba.setData("tipo","arriba");
        arriba.setData("pasado",false);

        let abajo = this.pipes.create(this.ancho, posicion, "pipe");
        abajo.setOrigin(0,0);
        abajo.body.allowGravity = false;
        abajo.setVelocityX(-200);
        abajo.setData("tipo","abajo");

        this.pipes.getChildren().forEach(pipe=>{
            if(pipe.x < -100){
                pipe.destroy();
            }
        });
    }

    gameOver(){

        // 🔇 detener música
        if(this.musica){
            this.musica.stop();
        }

        this.scene.start("GameOver", { puntos: this.puntos });
    }
}
