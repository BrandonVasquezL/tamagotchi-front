// ### GET NODES
const nextButton = document.querySelector('.btn-next');
const prevButton = document.querySelector('.btn-prev');
const submitButton = document.querySelector('.btn-submit');
const steps = document.querySelectorAll('.step');
const formSteps = document.querySelectorAll('.form-step');
const selectedPoke = document.getElementById('country');
const confirmCheckBox = document.getElementById('confirm');
const toast = document.querySelector('.toast');
const closeIcon = document.querySelector('.close-icon');
const toastTwo = document.querySelector('.toastTwo');
const closeIconTwo = document.querySelector('.close-iconTwo');
const visionButton = document.querySelector('.visionButton');

// ### VARIABLE DECLARATION 
let active = 1;
let progressStart = 0;
let progressEnd = 100;
let squadProgress = document.querySelector('.squad');
// -- FORM DATA
let nameUser = '';
let password = '';
let namePet = '';
let pokemonSelected = '';

/*
    ### PARA ACCEDER A OTRA PÁGINA DESDE JS ES:
    location.assign("continue.html")
*/
closeIcon.addEventListener('click', ()=>{
    toast.classList.toggle('showing');
});
closeIconTwo.addEventListener('click', ()=>{
    toastTwo.classList.toggle('showing');
});

visionButton.addEventListener('click',()=>{
    let confirmPassword = document.getElementById('confirmPassword');
    confirmPassword.type == 'password' ? (
        confirmPassword.type = 'text'
    ) : (
        confirmPassword.type = 'password'
    );
});

selectedPoke.addEventListener('change', ()=>{
    pokemonSelected = selectedPoke.options[selectedPoke.selectedIndex].text;
});

nextButton.addEventListener('click', ()=>{
    active++;
    if(active > steps.length){
        active = steps.length;
    }
    updateProgress();
});

prevButton.addEventListener('click', ()=>{
    active--;
    if(active < 1){
        active = 1;
    }
    updateProgress();
});

confirmCheckBox.addEventListener('change', ()=>{
    confirmCheckBox.checked ? (
        submitButton.style.visibility = 'visible'
    ) : (
        submitButton.style.visibility = 'hidden'
    );
});

submitButton.addEventListener('click', ()=>{
    if(!emptyInputs()){
        toast.classList.toggle('showing');
        setTimeout(function(){
            if(toast.classList.toggle('showing')){
                toast.classList.toggle('showing');
            }
        }, 5000);
    }else{
        console.log('aaaa')
        toastTwo.classList.toggle('showing');
        setTimeout(function(){
            if(toastTwo.classList.toggle('showing')){
                toastTwo.classList.toggle('showing');
            }
        }, 5000);
    }
});

const emptyInputs = () =>{
    if(nameUser == ''){
        return false;
    }
    if(password == ''){
        return false;
    }
    if(namePet == ''){
        return false;
    }
    if(pokemonSelected == ''){
        return false;
    }
    return true;
};
const updateProgress = () =>{
    steps.forEach((step, i) =>{
        if(i == (active-1)){
            step.classList.add('active');
            formSteps[i].classList.add('active');
        }else{
            step.classList.remove('active');
            formSteps[i].classList.remove('active');
        }
    });
    if(active === 1){
        prevButton.disabled = true;
    }else if(active === steps.length){
        //GET DATA FORM
        nameUser = document.getElementById('nameUser').value;
        password = document.getElementById('password').value;
        namePet = document.getElementById('namePet').value;

        //SET DATA FORM
        document.getElementById('confirmNameUser').value = nameUser;
        document.getElementById('confirmPassword').value = password;
        document.getElementById('confirmNamePet').value = namePet;
        document.getElementById('confirmSelectedPet').value = pokemonSelected;

        nextButton.disabled = true;
        
    }else{
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
};