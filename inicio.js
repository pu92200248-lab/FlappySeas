class Inicio extends Phaser.Scene{

constructor(){
super("Inicio");
}

preload(){

    this.load.image("fondo","fondo.png");
    this.load.image("bird","luffy.png");
    this.load.image("pipe","Torre.png");
    this.load.image("3","3.png");
    this.load.image("1","1.png");
    this.load.image("2","2.png");
    this.load.image("boton1","boton1.png");
    this.load.image("boton2","boton2.png");

    // 🔊 AUDIO (CORREGIDO)
    this.load.audio("musica","musica.mp3");
    
}

create(){

    let ancho = this.scale.width;
    let alto = this.scale.height;

    this.add.image(ancho/2, alto/2, "fondo");

    this.add.image(ancho/2, alto/2 - 120, "boton1");

    this.add.text(ancho/2, alto/2 - 120, "Flappy Seas",{
        fontFamily: "Times New Roman",
        fontSize:"30px",
        fill:"#ffffff"
    }).setOrigin(0.5);

    let botonJugar = this.add.image(ancho/2, alto/2, "boton2")
        .setInteractive();

    this.add.text(ancho/2, alto/2, "CLICK PARA JUGAR",{
        fontSize:"20px",
        fill:"#ffffff"
    }).setOrigin(0.5);

    botonJugar.on("pointerdown",()=>{
        this.scene.start("Juego");
    });
}
}