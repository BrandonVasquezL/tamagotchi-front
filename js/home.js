const toast = document.querySelectorAll('.toast');
const button = document.querySelectorAll('.data-button');
const iniciar = document.getElementById('iniciar');
const buttonGuardar = document.getElementById('buttonGuardar');
const iniciarButton = document.getElementById('iniciarButton');
const eliminarButton = document.getElementById('eliminarButton');
const heroDialog = document.querySelector('.hero-dialog');
const heroDialogTwo = document.querySelector('.hero-dialogTwo');
const petMypet = document.querySelector('.pet-mypet');
const eliminar = document.getElementById('eliminar');
const salir = document.getElementById('salir');
const salirInicio = document.getElementById('salirInicio');

/// OBJETO DE LA MASCOTA CON SUS ATRIBUTOS
let mascota = {
    vida: 100,
    energia: 100,
    suciedad: 0,
    hambre: 0,
    nombre: '',
    dueno: '',
    pokemon: ''
};
/// FIN DEL OBJETO MASCOTA

/// INICIO DE LOS EVENT-LISTENER
buttonGuardar.addEventListener('click', ()=>{
    if(mascota.dueno != ''){
        axios.post('http://localhost:4567/actualizar', {
            vida: mascota.vida,
            energia: mascota.energia,
            suciedad: mascota.suciedad,
            hambre: mascota.hambre,
            usuario: mascota.dueno
        }).then((respuesta)=>{
            if(respuesta.data.mensaje == true){
                location.assign("../html/login.html");
            }
        }).catch((respuesta)=>{
            console.log(respuesta);
        })
    }else{
        buttonGuardar.innerHTML = 'ERROR';
        buttonGuardar.style.backgroundColor = '#D8000C';
        setTimeout(function(){
            buttonGuardar.innerHTML = 'guardar';
            buttonGuardar.style.backgroundColor = '#000';
        }, 2000);
    }
});
iniciar.addEventListener('click', ()=>{
    heroDialog.style.display = 'flex';
});
eliminar.addEventListener('click', ()=>{
    heroDialogTwo.style.display = 'flex';
});
eliminarButton.addEventListener('click', ()=>{
    let userEliminar = document.getElementById('userEliminar').value;
    let contraEliminar = document.getElementById('contraEliminar').value;
    if(userEliminar === '' || contraEliminar === ''){
        document.getElementById('campo-vacio').style.display = 'inline-block';
        setTimeout(function(){
            document.getElementById('campo-vacio').style.display = 'none';
        }, 3000);
    }else{
        axios.post('http://localhost:4567/eliminar', {
            contrasena: contraEliminar,
            usuario: userEliminar
        }).then((respuesta)=>{
            if(respuesta.data.mensaje == true){
                location.assign("../html/login.html");
            }else if(respuesta.data.mensaje == false){
                document.getElementById('campo-error').style.display = 'inline-block';
                setTimeout(function(){
                    document.getElementById('campo-error').style.display = 'none';
                }, 3000);
            }
        }).catch((respuesta)=>{
            console.log(respuesta);
        })
    }
});
iniciarButton.addEventListener('click', ()=>{
    let user = document.getElementById('user').value;
    let contra = document.getElementById('contra').value;

    if(user === '' || contra === ''){
        document.getElementById('dialog-error').style.display = 'inline-block';
        setTimeout(function(){
            document.getElementById('dialog-error').style.display = 'none';
        }, 3000);
    }else{
        axios.post('http://localhost:4567/iniciarSesion', {
            contrasena: contra,
            usuario: user
        }).then((respuesta)=>{
            if(respuesta.data.mensaje == false){
                document.getElementById('usuarioNoExiste').style.display = 'inline-block';
                setTimeout(function(){
                    document.getElementById('usuarioNoExiste').style.display = 'none';
                }, 3000);
            }else{
                obtenerDatos(respuesta);
                timer();
                iniciar.style.visibility = 'hidden';
                heroDialog.style.display = 'none';
            }
        }).catch((respuesta)=>{
            console.log(respuesta);
        })
    }
});
salir.addEventListener('click', ()=>{
    heroDialogTwo.style.display = 'none';
});
salirInicio.addEventListener('click', ()=>{
    heroDialog.style.display = 'none';
});
/// FIN DE LOS EVENT-LISTENER

/// ### INICIO DE LA TODA LA FUNCIONALIDAD ###
// INICIO DEL TIMER
const timer = function(){
    asignarValores();
    setInterval(()=>{
        // Se compara para que no pase de 100 y 0.
        if((mascota.vida = mascota.vida - 5) >= 0){
            let toastVida = document.querySelector('.toastVida');
            document.getElementById('vidaPorcentaje').innerHTML = mascota.vida + '%';
            cambiarImagen(document.getElementById('barVida'));
            if(mascota.vida < 10){
                toastVida.classList.toggle('showing');
                setTimeout(function(){
                    toastVida.classList.toggle('showing');
                }, 3000);
            }
        }else{
            mascota.vida = 0;
            document.getElementById('vidaPorcentaje').innerHTML = mascota.vida + '%';
        }
        if((mascota.energia = mascota.energia - 5) >= 0){
            let toastEnergia = document.querySelector('.toastEnergia');
            document.getElementById('energiaPorcentaje').innerHTML = mascota.energia + '%';
            cambiarImagen(document.getElementById('barEnergia'));
            if(mascota.energia < 10){
                toastEnergia.classList.toggle('showing');
                setTimeout(function(){
                    toastEnergia.classList.toggle('showing');
                }, 3000);
            }
        }else{
            mascota.energia = 0;
            document.getElementById('energiaPorcentaje').innerHTML = mascota.energia + '%';
        }
        if((mascota.suciedad = mascota.suciedad + 5) <= 100){
            let toastSucio = document.querySelector('.toastSucio');
            document.getElementById('suciedadPorcentaje').innerHTML = mascota.suciedad + '%';
            cambiarImagen(document.getElementById('barSuciedad'));
            if(mascota.suciedad >= 90){
                toastSucio.classList.toggle('showing');
                setTimeout(function(){
                    toastSucio.classList.toggle('showing');
                }, 3000);
            }
        }else{
            mascota.suciedad = 100;
            document.getElementById('suciedadPorcentaje').innerHTML = mascota.suciedad + '%';
        }
        if((mascota.hambre = mascota.hambre + 5) <= 100){
            let toastHambre = document.querySelector('.toastHambre');
            document.getElementById('hambrePorcentaje').innerHTML = mascota.hambre + '%';
            cambiarImagen(document.getElementById('barHambre'));
            if(mascota.hambre >= 90){
                toastHambre.classList.toggle('showing');
                setTimeout(function(){
                    toastHambre.classList.toggle('showing');
                }, 3000);
            }
        }else{
            mascota.hambre = 0;
            document.getElementById('hambrePorcentaje').innerHTML = mascota.hambre + '%';
        }
    }, 20000);
}

// MOSTRAR EL TOAST-ALERTA CORRESPONDIENTE
button.forEach(element =>{
    if(element.id === 'sucio'){
        element.addEventListener('click', ()=>{
            mascota.suciedad >= 5 ? (mascota.suciedad = mascota.suciedad - 5) : (mascota.suciedad = 0);
            restarPorcentajes(element.id);
            document.getElementById('suciedadPorcentaje').innerHTML = mascota.suciedad + '%';
        });
    }else if(element.id === 'comer'){
        element.addEventListener('click', ()=>{
            mascota.hambre >= 5 ? (mascota.hambre = mascota.hambre - 5) : (mascota.hambre = 0);
            restarPorcentajes(element.id);
            document.getElementById('hambrePorcentaje').innerHTML = mascota.hambre + '%';
        });
    }else if(element.id === 'dormir'){
        element.addEventListener('click', ()=>{
            mascota.energia <= 95 ? (mascota.energia = mascota.energia + 5) : (mascota.energia = 100);
            restarPorcentajes(element.id);
            document.getElementById('energiaPorcentaje').innerHTML = mascota.energia + '%';
        });
    }
});
/// FIN DEL TIMER
const cambiarImagen = (key) => {
    if(key.id === 'barVida'){
        if(mascota.vida >= 0 && mascota.vida <= 25){
            key.src = '../assets/25.png';
        }
        if(mascota.vida >= 30 && mascota.vida <= 50){
            key.src = '../assets/50.png';
        }
        if(mascota.vida >= 55 && mascota.vida <= 75){
            key.src = '../assets/75.png';
        }
        if(mascota.vida >= 80 && mascota.vida <= 100){
            key.src = '../assets/100.png';
        }
    }
    if(key.id === 'barEnergia'){
        if(mascota.energia >= 0 && mascota.energia <= 25){
            key.src = '../assets/25.png';
        }
        if(mascota.energia >= 30 && mascota.energia <= 50){
            key.src = '../assets/50.png';
        }
        if(mascota.energia >= 55 && mascota.energia <= 75){
            key.src = '../assets/75.png';
        }
        if(mascota.energia >= 80 && mascota.energia <= 100){
            key.src = '../assets/100.png';
        }
    }
    if(key.id === 'barSuciedad'){
        if(mascota.suciedad >= 0 && mascota.suciedad <= 25){
            key.src = '../assets/25.png';
        }
        if(mascota.suciedad >= 30 && mascota.suciedad <= 50){
            key.src = '../assets/50.png';
        }
        if(mascota.suciedad >= 55 && mascota.suciedad <= 75){
            key.src = '../assets/75.png';
        }
        if(mascota.suciedad >= 80 && mascota.suciedad <= 100){
            key.src = '../assets/100.png';
        }
    }
    if(key.id === 'barHambre'){
        if(mascota.hambre >= 0 && mascota.hambre <= 25){
            key.src = '../assets/100.png';
        }
        if(mascota.hambre >= 30 && mascota.hambre <= 50){
            key.src = '../assets/75.png';
        }
        if(mascota.hambre >= 55 && mascota.hambre <= 75){
            key.src = '../assets/50.png';
        }
        if(mascota.hambre >= 80 && mascota.hambre <= 100){
            key.src = '../assets/25.png';
        }
    }
};

const restarPorcentajes = (key) => {
    if(key === 'sucio'){
        mascota.vida <= 95 ? (mascota.vida = mascota.vida + 5) : (mascota.vida = 100);
    }
    if(key === 'comer'){
        mascota.vida <= 95 ? (mascota.vida = mascota.vida + 5) : (mascota.vida = 100);
        mascota.suciedad <= 95 ? (mascota.suciedad = mascota.suciedad + 5) : (mascota.suciedad = 100);
        mascota.energia <= 95 ? (mascota.energia = mascota.energia + 5) : (mascota.energia = 100);
    }
    if(key === 'dormir'){
        mascota.vida <= 95 ? (mascota.vida = mascota.vida + 5) : (mascota.vida = 100);
        mascota.hambre <= 95 ? (mascota.hambre = mascota.hambre + 5) : (mascota.hambre = 100);
        mascota.suciedad <= 95 ? (mascota.suciedad = mascota.suciedad + 5) : (mascota.suciedad = 100);
    }
    cambiarImagen(document.getElementById('barEnergia'));
    cambiarImagen(document.getElementById('barHambre'));
    cambiarImagen(document.getElementById('barSuciedad'));
    cambiarImagen(document.getElementById('barVida'));

    document.getElementById('suciedadPorcentaje').innerHTML = mascota.suciedad + '%';
    document.getElementById('hambrePorcentaje').innerHTML = mascota.hambre + '%';
    document.getElementById('vidaPorcentaje').innerHTML = mascota.vida + '%';
    document.getElementById('energiaPorcentaje').innerHTML = mascota.energia + '%';
};
/// ### FIN DE TODA LA FUNCIONALIDAD ###

/// OBTENER DATOS DE LA RESPUESTA DE JAVA-MAVEN
const obtenerDatos = (response)=>{
    mascota.dueno = response.data.dueno;
    mascota.energia = response.data.energia;
    mascota.hambre = response.data.hambre;
    mascota.nombre = response.data.nombre;
    mascota.pokemon = response.data.pokemon;
    mascota.suciedad = response.data.suciedad;
    mascota.vida = response.data.vida;
};
/// ASIGNAR VALORES A LOS CAMPOS RESPECTIVOS
const asignarValores = ()=>{
    document.getElementById('vidaPorcentaje').innerHTML = mascota.vida + '%';
    document.getElementById('energiaPorcentaje').innerHTML = mascota.energia + '%';
    document.getElementById('suciedadPorcentaje').innerHTML = mascota.suciedad + '%';
    document.getElementById('hambrePorcentaje').innerHTML = mascota.hambre + '%';
    document.getElementById('mascota').innerHTML = mascota.nombre;
    document.getElementById('owner').innerHTML = mascota.dueno;
    if(mascota.pokemon == 'Pikachu'){
        petMypet.src = '../assets/pikachuLogo.gif';
    }else if(mascota.pokemon == 'Charmander'){
        petMypet.src = '../assets/charmander.gif';
    }
};