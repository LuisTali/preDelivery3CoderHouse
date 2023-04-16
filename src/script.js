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


const selectFiltrado = document.getElementById("filtrado"); //Para el filtrado por tipo de animal
const quitarFiltroBtn = document.getElementById("quitarfiltro");

const buscarNombreBtn = document.getElementById("buscarNombre");

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


const mostrarAnimal = (mascota)=>{
    let mascotasHtml = document.getElementById('mascotas');
    mascotasHtml.innerHTML = "";
    if(mascota!=undefined){
        let parrafo = document.createElement('p');
            parrafo.innerHTML = mascota.presentacion();
            mascotasHtml.appendChild(parrafo);
    }else{
        let parrafo = document.createElement('p');
            parrafo.innerHTML = 'No hay animales con ese nombre';
            mascotasHtml.appendChild(parrafo);
    }
}
// Mostrar Animal buscado y Mostrar Animales o Animales filtrados
const mostrarAnimales = (filtrado = "") =>{
    let mascotasHtml = document.getElementById('mascotas');
    mascotasHtml.innerHTML = "";
    if(filtrado==null){
        let parrafo = document.createElement('p');
        parrafo.innerHTML = 'No tiene mascotas de este tipo';
        mascotasHtml.appendChild(parrafo); 
    }else if(filtrado != ""){
        filtrado.forEach(mascota => {
            let parrafo = document.createElement('p');
            parrafo.innerHTML = mascota.presentacion();
            mascotasHtml.appendChild(parrafo);
        })
    }else{
        mascotas.forEach(mascota => {
            let parrafo = document.createElement('p');
            parrafo.innerHTML = mascota.presentacion();
            mascotasHtml.appendChild(parrafo);
        });
    }
}

const filtrarPorTipo = (tipoMascota) => {
    let filtrado = mascotas.filter(animal => animal.tipoMascota === tipoMascota);
    
    //Si filtrado esta vacio le asigno null para su posterior comparacion en mostrarAnimales()
    if(filtrado == ""){
        filtrado = null;
    }
    return filtrado;
}

//Al cambiar el select, recibe el valor y filtra el array mascotas para su posterior visualizacion
selectFiltrado.onchange = ()=>{
    let optionSelected = selectFiltrado.options[selectFiltrado.selectedIndex].value;
    let arrayFiltrado = filtrarPorTipo(optionSelected);
    mostrarAnimales(arrayFiltrado);
}

//Restablece el select y muestra todos los animales al quitar el filtro
quitarFiltroBtn.onclick = ()=>{
    mostrarAnimales();
    selectFiltrado.selectedIndex = 0;
}

//Busca animal por nombre, obteniendo el nombre desde el input y buscandolo con el metodo findPorNombre
buscarNombreBtn.onclick = ()=>{
    let inputNombre = document.getElementById("buscarNombreInput");
    let nombre = inputNombre.value;
    inputNombre.value = "";
    let mascotaBuscar = findPorNombre(nombre);
    mostrarAnimal(mascotaBuscar);
}

//Recibe un nombre como parametro y busca el animal con ese nombre
const findPorNombre = (nombre) =>{
    console.log(`Nombre a buscas: ${nombre}`);
    let mascota = mascotas.find(animal => animal.nombre === nombre);
    return mascota;
}

