// ### BACKGROUND SOUND FOR LOG IN

const playSound = function(){
    document.getElementById('hero__music').play();
    document.removeEventListener('click', playSound);
}
document.addEventListener('click', playSound);
