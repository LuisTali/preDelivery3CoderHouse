export default class Animal{
    constructor(nombre,edad,color,tipoMascota){
        this.nombre = nombre,
        this.edad = edad,
        this.color = color,
        this.tipoMascota = tipoMascota;
    }

    presentacion(){
        return 'Soy ' + this.nombre + ' tengo ' + this.edad + ((this.edad > 1) ? ' años' : ' año') + ' y soy de color ' + this.color;
    }
}