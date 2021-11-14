let idPhotographe = new URL(window.location.href).searchParams.get('id');
let currentPhotographe;
let section = document.getElementsByTagName("SECTION")[0];
let listMedia = [];

//Ici nous allons implementer une variable qui va gerer si nous sommes en Local ou sur GitHub. 
// Cette variable doit etre egale à "/Projet06_FishEye" si nous sommes sur GitHub, sinon en Local ce sera "." .
let linkHelperLocalVsGitHub = "/Projet06_FishEye"


const data = async() => {
    //lien en local = https://raw.githubusercontent.com/Pierrote52/Projet06_FishEye/master/JSON.json
    //lien sur GitHub : https://github.com/Pierrote52/Projet06_FishEye/master/JSON.json
    return await fetch('https://raw.githubusercontent.com/Pierrote52/Projet06_FishEye/master/JSON.json').then((v) => { return v.json() });
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
    photoProfil.style.backgroundImage = `url('${linkHelperLocalVsGitHub}/assets/Sample_Photos/profils/${photographe.portrait}')`;
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
    createVignette(listMedia, data.photographers);
}
//Creer une vignette. 
function createVignette(Listmedia) {
    for (media of Listmedia) {
        if (media.image != null) {
            createPhoto(media);
        } else {
            createVideo(media);
        }

    }
}

function getUrlMedia(media) {
    let fileName = currentPhotographe.name.split(' ');

    return `${linkHelperLocalVsGitHub}/assets/Sample_Photos/${fileName[0]}/${media}`;
}

function createVideo(media) {
    let urlVideo = getUrlMedia(media.video);
    let article = document.createElement("ARTICLE");
    article.innerHTML = `<video src= "${urlVideo}" width="100px"></video>` +
        "<div class = \"TitreEtLikes\">" +
        "<p>" +
        media.title +
        "</p>" +
        "<div><p>" + media.likes + `</p><img src='${linkHelperLocalVsGitHub}/assets/logos/heart-solid.svg' width='20'></div>` +
        "</div>";
    //Recupere la div des likes et logo heart. 
    let counterEtLikes = article.getElementsByTagName("DIV")[1];
    //S'Occupe de l'incrémentation des likes sur la page. 
    counterEtLikes.addEventListener("click", function() {
        let newP = counterEtLikes.getElementsByTagName("P")[0];
        let newInt = parseInt(newP.innerHTML) + 1;
        newP.innerHTML = newInt;
    })
    let video = article.getElementsByTagName("video")[0];
    video.addEventListener('click', function() {
        displayLighBoxByIndex(listMedia.indexOf(media));
    })


    section.appendChild(article);
}

function createPhoto(media) {
    let article = document.createElement("ARTICLE");
    article.innerHTML = "<div class=\"image\"></div>" +
        "<div class = \"TitreEtLikes\">" +
        "<p>" +
        media.title +
        "</p>" +
        "<div><p>" + media.likes + `</p><img src='${linkHelperLocalVsGitHub}/assets/logos/heart-solid.svg' width='20'></div>` +
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
    let url = getUrlMedia(media.image);
    let divMedia = article.getElementsByTagName("DIV")[0];
    divMedia.style.backgroundImage = `url(${url})`;
    section.appendChild(article);
}
//Display la lignBox par index.
function displayLighBoxByIndex(indexOfMedia) {
    //Affiche la LighBox
    let corpPrincipale = document.getElementById('corpsPrincipale');
    corpPrincipale.style.display = "none";
    let lightBox = document.getElementById("lightBox");
    lightBox.style.display = "block";
    let media;

    //Gere s'il s'agit d'une photo ou bien une video. 
    if (listMedia[indexOfMedia].image != null) {
        media = lightBox.getElementsByClassName("photo")[0];
        let url = getUrlMedia(listMedia[indexOfMedia].image);
        media.innerHTML = "";
        media.style.backgroundImage = `url(${url})`;
    } else if (listMedia[indexOfMedia].video != null) {
        media = lightBox.getElementsByClassName("photo")[0];
        let url = getUrlMedia(listMedia[indexOfMedia].video);
        media.style.backgroundImage = "none";
        let video = `<video controls src="${url}"></video>`;
        media.innerHTML = video;
    }
    //Gere le click sur le chevron back. 
    let back = document.getElementById("back");

    back.addEventListener('click', function() {
        if (indexOfMedia > 0) {
            indexOfMedia -= 1;
            displayLightBoxMedia(listMedia[indexOfMedia]);
        }
    });
    let next = document.getElementById("next");
    next.addEventListener('click', function() {
        if (indexOfMedia <= listMedia.length - 2) {
            indexOfMedia += 1;
            displayLightBoxMedia(listMedia[indexOfMedia]);
        }
    });

    function displayLightBoxMedia(nouveauMedia) {
        if (nouveauMedia.image != null) {
            let url = getUrlMedia(listMedia[indexOfMedia].image);
            media.innerHTML = "";
            media.style.backgroundImage = `url(${url})`;
        } else if (nouveauMedia.video != null) {
            let url = getUrlMedia(listMedia[indexOfMedia].video);
            media.style.backgroundImage = "none"
            let video = `<video controls src="${url}" width="100%"></video>`;
            media.innerHTML = video;
        }

    }

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