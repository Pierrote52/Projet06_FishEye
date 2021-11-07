let idPhotographe = new URL(window.location.href).searchParams.get('id');

console.log(idPhotographe);


const data = async() => {
    return await fetch('https://raw.githubusercontent.com/Pierrote52/Projet06_FishEye/master/JSON.json').then((v) => { return v.json() });
}
data().then(v => displayPhotographeInfo(v));

function displayPhotographeInfo(data) {
    for (photographe of data.photographers) {
        if (photographe.id == idPhotographe) {
            let name = document.getElementsByTagName("H1")[0];
            let localistion = document.getElementsByTagName("H2")[0];
            let slogan = document.getElementsByTagName("H3")[0];
            let photoProfil = document.getElementsByTagName("DIV")[0];
            //Assigner ls variables.
            name.innerHTML = photographe.name;
            localistion.innerHTML = `${photographe.city}, ${photographe.country}`;
            slogan.innerHTML = photographe.tagline;
            photoProfil.style.backgroundImage = `url('../assets/Sample_Photos/profils/${photographe.portrait}')`;
        }
    }


}