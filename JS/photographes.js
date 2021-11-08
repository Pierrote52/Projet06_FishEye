let idPhotographe = new URL(window.location.href).searchParams.get('id');
let currentPhotographe;


console.log(idPhotographe);


const data = async() => {
    return await fetch('https://raw.githubusercontent.com/Pierrote52/Projet06_FishEye/master/JSON.json').then((v) => { return v.json() });
}
data().then(v => takeCurrentPhotographe(v));


function takeCurrentPhotographe(data) {
    for (photographe of data.photographers) {
        if (photographe.id == idPhotographe) {
            currentPhotographe = photographe;
            displayPhotographeInfo(photographe);

        }

    }
    filtrePhotos(data);
}

//Cette fonction va afficher les informations du photographe.
function displayPhotographeInfo(photographe) {
    let name = document.getElementsByTagName("H1")[0];
    let localistion = document.getElementsByTagName("H2")[0];
    let slogan = document.getElementsByTagName("H3")[0];
    let photoProfil = document.getElementsByTagName("DIV")[0];
    let ulFiltres = document.getElementsByTagName("UL")[0];
    //Assigner ls variables.
    name.innerHTML = photographe.name;
    localistion.innerHTML = `${photographe.city}, ${photographe.country}`;
    slogan.innerHTML = photographe.tagline;
    photoProfil.style.backgroundImage = `url('../assets/Sample_Photos/profils/${photographe.portrait}')`;
    for (tag of photographe.tags) {
        li = document.createElement("LI");
        li.innerHTML = `<p>#${tag}<p>`;
        ulFiltres.appendChild(li);
    }
}

//Cette fonction va recuperer les photos présentes dans la galerie pour les afficher. 
function filtrePhotos(data) {
    let listMedia = [];
    for (media of data.media) {
        if (media.photographerId == idPhotographe) {
            listMedia.push(media);

        }
    }
    createPhoto(listMedia, data.photographers);
}

function createPhoto(Listmedia) {
    let section = document.getElementsByTagName("SECTION")[0];

    for (media of Listmedia) {
        let article = document.createElement("ARTICLE");
        article.innerHTML = "<div class=\"image\"></div>" +
            "<div class = \"TitreEtLikes\">" +
            "<p>" +
            media.title +
            "</p>" +

            "</div>" +
            "</article>";
        let url = getUrlImage(media);
        let divImg = article.getElementsByTagName("DIV")[0];
        divTitreEtLikes = article.getElementsByClassName("TitreEtLikes")[0];
        let newP = document.createElement("P");
        newP.innerHTML = media.likes;
        newP.addEventListener("click", function() {
            console.log(parseInt(newP.innerHTML));
            let newInt = parseInt(newP.innerHTML) + 1;
            newP.innerHTML = newInt;
        })
        divTitreEtLikes.appendChild(newP);

        divImg.style.backgroundImage = url;

        section.appendChild(article);
    }
}

function getUrlImage(media) {
    let fileName = currentPhotographe.name.split(' ');
    return ` url("../assets/Sample_Photos/${fileName[0]}/${media.image}")`;


}