import Animal from "./Animal.js";

export default class Gato extends Animal{
    constructor (nombre, edad, color,tipoMascota, largoGarras){
        super(nombre,edad,color,tipoMascota);
        this.largoGarras = largoGarras;
    }
    presentacion(){
        return super.presentacion() + ` y mi largo de garras es de : ${this.largoGarras} cm`;
    }
}