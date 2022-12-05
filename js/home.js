const toast = document.querySelectorAll('.toast');
const button = document.querySelectorAll('.data-button');
const buttonIniciar = document.getElementById('buttonIniciar');
const iniciarButton = document.getElementById('iniciarButton');
const heroDialog = document.querySelector('.hero-dialog');

let mascota = {
    vida: 100,
    energia: 75,
    suciedad: 50,
    hambre: 25,
    nombre: 'chanchito feliz',
    dueno: 'brandon',
    pokemon: ''
};
iniciarButton.addEventListener('click', ()=>{
    heroDialog.style.display = 'none';
});
buttonIniciar.addEventListener('click', ()=>{
    heroDialog.style.display = 'flex';
});
// Inicio del timer
const timer = function(){
    // Asignar los valores al html
    document.getElementById('vidaPorcentaje').innerHTML = mascota.vida + '%';
    document.getElementById('energiaPorcentaje').innerHTML = mascota.energia + '%';
    document.getElementById('suciedadPorcentaje').innerHTML = mascota.suciedad + '%';
    document.getElementById('hambrePorcentaje').innerHTML = mascota.hambre + '%';
    document.getElementById('mascota').innerHTML = mascota.nombre;
    document.getElementById('owner').innerHTML = mascota.dueno;

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
    }, 10000);

    document.removeEventListener('click', timer);
}
document.addEventListener('click', timer);

// Mostrar el toast correcto
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