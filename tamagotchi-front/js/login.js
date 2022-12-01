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

    password === '' || nameUser === '' ? (
        toastShow()
    ) : (
        location.assign("../html/home.html")
    );
});
const toastShow = () =>{
    toast.classList.toggle('showing');
        setTimeout(function(){
        if(toast.classList.toggle('showing')){
            toast.classList.toggle('showing');
        }
    }, 5000);
};