import Gato from './Class/Gato.js'
import Perro from './Class/Perro.js'
import Oveja from './Class/Oveja.js'
let mascotas = [];  
const submitBtn = document.getElementById('buttonSubmit');
const nameInput =document.getElementById('nameInput');
const colorInput = document.getElementById('colorInput');
const edadInput = document.getElementById('edadInput');
const radioInputs = document.getElementsByName("tipoAnimal");
const checkRadioBtn = document.getElementById("checkRadio");
const inputExtraP = document.getElementById(`extraInputPerro`);
const inputExtraG = document.getElementById(`extraInputGato`);    
const inputExtraO = document.getElementById(`extraInputOveja`);
const labelAnimalElegido = document.getElementById('animalElegido');
let statusTipoElegido = 0;

const inactiveExtraInputs = ()=>{
    (!inputExtraP.classList.contains('inactive') ? inputExtraP.classList.add('inactive') : null);
    (!inputExtraG.classList.contains('inactive') ? inputExtraG.classList.add('inactive') : null);
    (!inputExtraO.classList.contains('inactive') ? inputExtraO.classList.add('inactive') : null);
}

const checkRadio = (e) =>{
    e.preventDefault();
    const tipoAnimal =document.querySelector('input[name="tipoAnimal"]:checked').value;
    inactiveExtraInputs();
    statusTipoElegido = 1; //Comprueba que se eligio una especie y clickeo el boton
    switch(tipoAnimal){
        case "perro": 
            console.log('Perro seleccionado'); 
            labelAnimalElegido.textContent = 'Perro seleccionado'; 
            inputExtraP.classList.remove('inactive');
            break;
        case "gato": 
            console.log('Gato seleccionado'); 
            labelAnimalElegido.textContent = 'Gato seleccionado'; 
            inputExtraG.classList.remove('inactive');
            break;
        case "oveja": 
            console.log('Oveja seleccionado'); 
            labelAnimalElegido.textContent = 'Oveja seleccionado'; 
            inputExtraO.classList.remove('inactive')
            break;
    }
}

checkRadioBtn.onclick = ((e) => checkRadio(e));

const cargarMascota = (e) =>{
    e.preventDefault();
    if(statusTipoElegido == 1){
        const tipoAnimal =document.querySelector('input[name="tipoAnimal"]:checked').value;
        const nombre = nameInput.value;
        const color = colorInput.value;
        let edad = edadInput.value;
        switch(tipoAnimal){
            case "perro": 
                if(nombre=="" || color=="" || edad==""){
                    alert('Llene todos los campos antes de cargar el animal');
                    break;
                }
                edad = Number(edad);
                let raza = document.getElementById('raza').value;
                if (raza == ""){
                    alert('Llene el campo Raza'); 
                    break;
                }
                console.log('Ingreso todos los datos',raza);

                let perro = new Perro(nombre,edad,color,tipoAnimal,raza);

                mascotas.push(perro);

                break;
            case "gato": 
                if(nombre=="" || color=="" || edad==""){
                    alert('Llene todos los campos antes de cargar el animal');
                    break;
                }
                edad = Number(edad);
                let garrasCm = document.getElementById('garrasCm').value;
                if (garrasCm == ""){
                    alert('Llene el campo cm_Garras'); 
                    break;
                }
                garrasCm = Number(garrasCm);
                console.log('Ingreso todos los datos', garrasCm);

                let gato = new Gato(nombre,edad,color,tipoAnimal,garrasCm);

                mascotas.push(gato);
                break;
            case "oveja": 
                if(nombre=="" || color=="" || edad==""){
                    alert('Llene todos los campos antes de cargar el animal');
                    break;
                }
                edad = Number(edad);
                let esquilada = document.getElementById('esquilada').value;
                if (esquilada == ""){
                    alert('Llene el campo Esquilada'); 
                    break;
                }
                console.log('Ingreso todos los datos', esquilada);

                document.getElementById('esquilada').value = "";

                let oveja = new Oveja(nombre,edad,color,tipoAnimal,esquilada);
                
                mascotas.push(oveja);

                break;
        }
        statusTipoElegido = 0;
        nameInput.value = "";
        edadInput.value = "";
        colorInput.value = "";
        document.querySelector('input[name="tipoAnimal"]:checked').checked = false;
        labelAnimalElegido.textContent = "";
        inactiveExtraInputs();
        mostrarAnimales();
    }else{
        alert('Elija un tipo de animal, chequee la opcion elegida con el boton y rellene todos los campos');
    }
    
}

submitBtn.onclick = ((e) => cargarMascota(e));

const mostrarAnimales = () =>{
    let mascotasHtml = document.getElementById('mascotas');
    mascotasHtml.innerHTML = "";
    mascotas.forEach(mascota => {
        let parrafo = document.createElement('p');
        parrafo.innerHTML = mascota.presentacion();
        mascotasHtml.appendChild(parrafo);
    });
}

const filtrarPorTipo = (tipoMascota) => {
    
    let filtrado = mascotas.filter(animal => animal.tipoMascota === tipoMascota);

    if(filtrado == ""){
        alert('Filtrado vacio, elija G(gato), P(perro) o E(elefante) si es que tiene una de esas mascotas');
    }
    return filtrado;
}

const findPorNombre = (nombre) =>{
    console.log(`Nombre a buscas: ${nombre}`);
    
    let mascota = mascotas.find(animal => animal.nombre === nombre);

    return mascota;
}

const presentacionArreglo = (arreglo) =>{
    arreglo.forEach(mascota => {
        alert(mascota.presentacion());
    });
} 

/*let opcion = prompt('Ingrese funcion a realizar \n -F filtrarPorTipo \n -N filtrarPorNombre').toUpperCase();
do{
    switch(opcion){
        case 'F':{
            console.log('Eligio F');

            let filtrados = filtrarPorTipo((prompt('Ingrese letra de tipo mascota para filtrar ').charAt(0).toUpperCase()));

            presentacionArreglo(filtrados);
            break;
        }
        case 'N':{
            console.log('Eligio N');
            console.log('Animal buscado');
            let animalBuscado = (findPorNombre(prompt('Ingrese nombre del animal a buscar')));

            if(animalBuscado != undefined){
                alert(animalBuscado.presentacion());
            }else{
                alert('Animal con ese nombre no existe')
            }
            break;
        }
            
    }
    opcion = prompt('Ingrese funcion a realizar \n -F filtrarPorTipo \n -N filtrarPorNombre \n -ESC salir').toUpperCase();
}while(opcion.toUpperCase() != 'ESC')*/