class GameOver extends Phaser.Scene{

    constructor(){
        super("GameOver");
    }

create(data){

let ancho = this.scale.width;
let alto = this.scale.height;

// FONDO
this.add.image(ancho / 2, alto / 2,"fondo");

// 🔹 BOTÓN DETRÁS DE "GAME OVER"
this.add.image(ancho / 2, alto * 0.35, "boton1");

// TEXTO GAME OVER
this.add.text(ancho / 2, alto * 0.35,"GAME OVER",{
    fontFamily: "IMPACT",
    fontSize:"30px",
    fill:"#940e0e"
}).setOrigin(0.5);

// 🔹 BOTÓN DETRÁS DE LOS PUNTOS
this.add.image(ancho / 2, alto * 0.50, "boton1");

// TEXTO PUNTOS
this.add.text(ancho / 2, alto * 0.50,"Puntos: " + data.puntos,{ 
    fontSize:"30px",
    fill:"#ffffff"
}).setOrigin(0.5);

// 🔹 BOTÓN DETRÁS DE REINTENTAR
let botonReintentar = this.add.image(ancho / 2, alto * 0.65, "boton2")
    .setInteractive();

this.add.text(ancho / 2, alto * 0.65,"TOCA\nPARA\nREINTENTAR",{
    fontSize:"20px",
    fill:"#ffffff",
    align:"center"
}).setOrigin(0.5);

// CLICK SOLO EN EL BOTÓN
botonReintentar.on("pointerdown",()=>{   
    this.scene.start("Juego");
});

}
}