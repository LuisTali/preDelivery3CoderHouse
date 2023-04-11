import Animal from "./Animal.js";

export default class Oveja extends Animal{
    constructor(nombre,edad, color,tipoMascota, despelada){
        super(nombre,edad,color,tipoMascota);
        this.despelada = despelada;
    }

    presentacion (){
        return `${super.presentacion()} y actualmente me encuentro ${(this.despelada > 0) ? 'pelada' : 'peluca'}`;
    }
}