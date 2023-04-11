import Animal from "./Animal.js";

export default class Perro extends Animal{
    
    constructor(nombre,edad,color,tipoMascota,raza){
        super(nombre,edad,color,tipoMascota);
        this.raza = raza;
    }
    presentacion(){
        return super.presentacion() + ` y raza ${this.raza}`
    }
}