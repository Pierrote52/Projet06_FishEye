let idPhotographe = new URL(window.location.href).searchParams.get('id');
let currentPhotographe;
let section = document.getElementsByTagName("SECTION")[0];
let listMedia = [];

const data = async() => {
    return await fetch('https://github.com/Pierrote52/Projet06_FishEye/master/JSON.json').then((v) => { return v.json() });
}

https: //raw.githubusercontent.com/Pierrote52/Projet06_FishEye/master/JSON.json
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
    let photoProfil = document.getElementsByTagName("DIV")[1];
    let ulFiltres = document.getElementsByTagName("UL")[0];
    //Assigner ls variables.
    name.innerHTML = photographe.name;
    localistion.innerHTML = `${photographe.city}, ${photographe.country}`;
    slogan.innerHTML = photographe.tagline;
    photoProfil.style.backgroundImage = `url('https://github.com/Pierrote52/Projet06_FishEye/master/assets/Sample_Photos/profils/${photographe.portrait}')`;
    for (tag of photographe.tags) {
        li = document.createElement("LI");
        li.innerHTML = `<p>#${tag}<p>`;
        ulFiltres.appendChild(li);
    }
}

//Cette fonction va recuperer les photos présentes dans la galerie pour les afficher. 
function filtrePhotos(data) {

    for (media of data.media) {
        if (media.photographerId == idPhotographe) {
            listMedia.push(media);
        }
    }
    createPhoto(listMedia, data.photographers);
}


//Creer une vignette. 
function createPhoto(Listmedia) {


    for (media of Listmedia) {
        //Cree la structure minimum d'un article.
        createArticle(media);
    }
}

function getUrlMedia(media) {
    let fileName = currentPhotographe.name.split(' ');

    return `../assets/Sample_Photos/${fileName[0]}/${media}`;
}

function createArticle(media) {
    let article = document.createElement("ARTICLE");
    article.innerHTML = "<div class=\"image\"></div>" +
        "<div class = \"TitreEtLikes\">" +
        "<p>" +
        media.title +
        "</p>" +
        "<div><p>" + media.likes + "</p><img src='../assets/logos/heart-solid.svg' width='20'></div>" +
        "</div>";
    //Recupere la div des likes et logo heart. 
    let counterEtLikes = article.getElementsByTagName("DIV")[2];
    //S'Occupe de l'incrémentation des likes sur la page. 
    counterEtLikes.addEventListener("click", function() {
        let newP = counterEtLikes.getElementsByTagName("P")[0];
        let newInt = parseInt(newP.innerHTML) + 1;
        newP.innerHTML = newInt;
    })
    let img = article.getElementsByTagName("DIV")[0];
    img.addEventListener("click", function() {
            displayLighBoxByIndex(listMedia.indexOf(media));
        })
        //Check s'il s'agit d'une video ou d'une image. 
    if (media.image != null) {
        //Si le media est une image
        let url = getUrlMedia(media.image);
        let divMedia = article.getElementsByTagName("DIV")[0];

        divMedia.style.backgroundImage = `url(${url})`;

        section.appendChild(article);
    } else if (media.video != null) {
        //Si le media est une Video
        console.log('UNE VIDEO');
    }
}
//Display la lignBox par index.
function displayLighBoxByIndex(indexOfMedia) {
    let corpPrincipale = document.getElementById('corpsPrincipale');
    corpPrincipale.style.display = "none";
    let lightBox = document.getElementById("lightBox");
    lightBox.style.display = "block";
    let photo = lightBox.getElementsByClassName("photo")[0];
    let url = getUrlMedia(listMedia[indexOfMedia].image);
    photo.style.backgroundImage = `url(${url})`;

    //Gere le click sur le chevron back. 
    let back = document.getElementById("back");

    back.addEventListener('click', function() {
        if (indexOfMedia > 0) {
            indexOfMedia -= 1;
            let url = getUrlMedia(listMedia[indexOfMedia].image);

            photo.style.backgroundImage = `url(${url})`;
        }

    });
    let next = document.getElementById("next");
    next.addEventListener('click', function() {
        if (indexOfMedia <= listMedia.length - 2) {
            indexOfMedia += 1;
            let url = getUrlMedia(listMedia[indexOfMedia].image);
            photo.style.backgroundImage = `url(${url})`;
        }

    });

    let close = document.getElementById('closeLogo');
    close.addEventListener('click', function() {
        //Souci cela creer trop d'elements. A refaire. 

        let corpPrincipale = document.getElementById('corpsPrincipale');
        corpPrincipale.style.display = "block";
        let lightBox = document.getElementById("lightBox");
        lightBox.style.display = "none";

    })

}

//Ouvre le formulaire. 
let oppenForm = document.getElementById('btn-ContactezMoi');
oppenForm.addEventListener('click', function() {
    displayFormContact();
});

function displayFormContact() {
    let pagePhotos = document.getElementById('corpsPrincipale');
    pagePhotos.style.display = "none";
    let form = document.getElementById('formulaire');
    form.style.display = "block";
}
//Ferme le formulaire. 
let closeForm = document.getElementById('closeForm');
closeForm.addEventListener('click', function() {
    let pagePhotos = document.getElementById('corpsPrincipale');
    pagePhotos.style.display = "block";
    let form = document.getElementById('formulaire');
    form.style.display = "none";
});

//Envoie des infos dans le formulaire. 
let btnEnvoyer = document.getElementById('envoyer');
btnEnvoyer.addEventListener('click', function(event) {
    let champs = [];
    event.preventDefault();
    let prenom = champs.push(document.getElementById('fprenom').value);
    let nom = champs.push(document.getElementById('lnom').value);
    let email = champs.push(document.getElementById('lemail').value);
    let message = champs.push(document.getElementById('lmessage'));
    console.log(champs);

})