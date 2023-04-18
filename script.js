import Gato from './Class/Gato.js'
import Perro from './Class/Perro.js'
import Oveja from './Class/Oveja.js'
let mascotas = [];  

const mainContainer = document.getElementById("maincontainer");

const submitBtn = document.getElementById('buttonSubmit'); //Boton para enviar los datos de mi mascota 
const nameInput =document.getElementById('nameInput'); //Input para el nombre de mi mascota
const colorInput = document.getElementById('colorInput'); //Input para el color de mi mascota
const edadInput = document.getElementById('edadInput'); //Input para la edad de mi mascota
const radioInputs = document.getElementsByName("tipoAnimal"); //Inputs para elegir tipo de mascota
const checkRadioBtn = document.getElementById("checkRadio"); //Boton para chequear el tipo elegido
const inputExtraP = document.getElementById(`extraInputPerro`); //Input extra si elegi Perro 
const inputExtraG = document.getElementById(`extraInputGato`); //Input extra si elegi Gato   
const inputExtraO = document.getElementById(`extraInputOveja`); //Input extra si elegi Oveja
const labelAnimalElegido = document.getElementById('animalElegido'); //Label que indica el tipo elegido
let statusTipoElegido = 0; //Flag que sirve para chequear si se definio el tipo de mascota

const registerBtn = document.getElementById("registerBtn"); //Boton para mostrar el register-form
const loginBtn = document.getElementById("loginBtn"); //Boton para mostrar el login-form

const registerDiv = document.getElementById("register");
const loginDiv = document.getElementById("login");

const registerUserInput = document.getElementById("usernameInputRegister");
const registerEmailInput = document.getElementById("emailInputRegister")
const registerSubmitButton = document.getElementById("registerSubmitBtn");

const loginUserInput = document.getElementById("usernameInputLogin");
const loginEmailInput = document.getElementById("emailInputLogin")
const loginSubmitButton = document.getElementById("loginSubmitBtn");

const selectFiltrado = document.getElementById("filtrado"); //Para el filtrado por tipo de animal
const quitarFiltroBtn = document.getElementById("quitarfiltro"); //Boton para quitar el filtro por Tipo

const buscarNombreBtn = document.getElementById("buscarNombre"); //Boton para buscar por nombre

let usuarioLogueado = null; //Al loguearse, se guarda aqui el username

const inactiveExtraInputs = ()=>{
    (!inputExtraP.classList.contains('inactive') ? inputExtraP.classList.add('inactive') : null);
    (!inputExtraG.classList.contains('inactive') ? inputExtraG.classList.add('inactive') : null);
    (!inputExtraO.classList.contains('inactive') ? inputExtraO.classList.add('inactive') : null);
}

const crearPerro = (nombre,edad,color,tipoMascota,raza)=>{
    let perro = new Perro(nombre,edad,color,tipoMascota,raza);
    return perro;
}
const crearGato = (nombre,edad,color,tipoMascota,largoGarras)=>{
    let gato = new Perro(nombre,edad,color,tipoMascota,largoGarras);
    return gato;
}
const crearOveja = (nombre,edad,color,tipoMascota,despelada)=>{
    let oveja = new Perro(nombre,edad,color,tipoMascota,despelada);
    return oveja;
}

registerBtn.onclick = ()=>{
    (loginDiv.classList.contains("inactive") ? "" : loginDiv.classList.add("inactive"))
    registerDiv.classList.remove("inactive");
    loginUserInput.value = "";
    loginEmailInput.value = "";
}

registerSubmitButton.onclick = ()=>{
    let username = registerUserInput.value;
    let email = registerEmailInput.value;
    if(username!="" && email!=""){
        console.log(username, email);
        localStorage.setItem("user",JSON.stringify({username:username,email:email}));
        registerUserInput.value = "";
        registerEmailInput.value = "";
        loginDiv.classList.toggle("inactive");
        registerDiv.classList.toggle("inactive");
        mascotas = [];
        localStorage.removeItem("mascotas");
        mostrarAnimales()
    }else{
        alert("Llene todos los campos")
    }
}

loginBtn.onclick = ()=>{
    (registerDiv.classList.contains("inactive") ? "" : registerDiv.classList.add("inactive"))
    loginDiv.classList.remove("inactive");
    registerUserInput.value = "";
    registerEmailInput.value = "";
}

loginSubmitButton.onclick = ()=>{
    let username = loginUserInput.value;
    let email = loginEmailInput.value;
    const alertMsg = document.getElementById("alert");
    if(username != "" && email != ""){
        console.log(username, email);
        let userValidation = JSON.parse(localStorage.getItem("user"));
        console.log(userValidation);
        if(userValidation != null && userValidation!=undefined && userValidation!=""){
            if(username == userValidation.username && email == userValidation.email){
                usuarioLogueado = username;
                
                mainContainer.classList.remove("inactive");
                loginDiv.classList.toggle("inactive");
    
                mascotas = []; //Para que si el usuario loguea dos veces, no se duplique el arreglo
    
                alertMsg.innerHTML = `Bienvenido de nuevo ${username}!`
                let mascotasParseadas = (JSON.parse(localStorage.getItem("mascotas"))).mascotas;
                console.log(mascotasParseadas);
                mascotasParseadas.forEach(mascota =>{
                    if(mascota.tipoMascota == "perro"){
                        let perro = crearPerro(mascota.nombre,mascota.edad,mascota.color,mascota.tipoMascota,mascota.raza);
                        mascotas.push(perro);
                    }else if(mascota.tipoMascota == "gato"){
                        let gato = new Gato(mascota.nombre,mascota.edad,mascota.color,mascota.tipoMascota,mascota.largoGarras);
                        mascotas.push(gato);
                    }else{
                        let oveja = new Oveja(mascota.nombre,mascota.edad,mascota.color,mascota.tipoMascota,mascota.despelada);
                        mascotas.push(oveja);
                    }
                })
                mostrarAnimales();
            }else{
                alertMsg.innerHTML = "Compruebe si los datos ingresados son correctos, tenga en cuenta mayusculas";
            }
        }else{
            alertMsg.innerHTML = "No hay usuarios registrados en la base de datos, cree una cuenta antes"
        }   
    }else{
        alert("Llene todos los campos")
    }
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
        localStorage.setItem("mascotas",JSON.stringify({usuario:usuarioLogueado,mascotas:mascotas}));
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
        if(mascotas.length == 0){
            mascotasHtml.innerHTML = "";
        }else{
            mascotas.forEach(mascota => {
                let parrafo = document.createElement('p');
                parrafo.innerHTML = mascota.presentacion();
                mascotasHtml.appendChild(parrafo);
            });
        }
        
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

