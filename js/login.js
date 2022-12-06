const formButton = document.querySelector('.form__button');
const closeIcon = document.querySelector('.close-icon');
const toast = document.querySelector('.toast');

// ### FORM DATA
let password = '';
let nameUser = '';

closeIcon.addEventListener('click', ()=>{
    toast.classList.toggle('showing');
});

formButton.addEventListener('click', ()=>{
    password = document.getElementById('password').value;
    nameUser = document.getElementById('nameUser').value;

    if(password === '' || nameUser === '') {
        toastShow();
    }else{
        axios.post('', {
            contrasena: password,
            usuario: nameUser
        }).then((respuesta)=>{
            console.log(respuesta);
            location.assign("../html/home.html");
        }).catch((respuesta)=>{
            console.log(respuesta);
        })
    }
});
const toastShow = () =>{
    toast.classList.toggle('showing');
        setTimeout(function(){
        if(toast.classList.toggle('showing')){
            toast.classList.toggle('showing');
        }
    }, 5000);
};