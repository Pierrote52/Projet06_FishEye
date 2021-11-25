let idPhotographe = new URL(window.location.href).searchParams.get('id');
let currentPhotographe;
let section = document.getElementsByTagName("SECTION")[1];
let oppenForm = document.getElementById('btn-ContactezMoi');
let closeFormLogo = document.getElementById('closeForm');
let btnEnvoyer = document.getElementById('envoyer');
// let listDisplayed = document.getElementById("navigator");
let corpPrincipale = document.getElementById('corpsPrincipale');
let lightBox = document.getElementById("lightBox");
let close = document.getElementById('closeLogo');
let tarifJournalier = document.getElementById('tarifJournalier')
let compteur_likes_total_displayed = document.getElementById('compteur_likes_total_displayed');
let listMedia = [];
let totalLikes = 0;

//Ici nous allons implementer une variable qui va gerer si nous sommes en Local ou sur GitHub. 
// Cette variable doit etre egale à "/Projet06_FishEye" si nous sommes sur GitHub, sinon en Local ce sera "." .
let linkHelperLocalVsGitHub = "/Projet06_FishEye"


const data = async() => {
    //lien en local = https://raw.githubusercontent.com/Pierrote52/Projet06_FishEye/master/JSON.json
    //lien sur GitHub : https://github.com/Pierrote52/Projet06_FishEye/master/JSON.json
    return await fetch('https://raw.githubusercontent.com/Pierrote52/Projet06_FishEye/master/JSON.json').then((v) => { return v.json() });
}

//https: //raw.githubusercontent.com/Pierrote52/Projet06_FishEye/master/JSON.json
data().then(v => takeCurrentPhotographe(v));


function takeCurrentPhotographe(data) {
    for (let photographe of data.photographers) {
        if (photographe.id == idPhotographe) {
            currentPhotographe = photographe;
            displayPhotographeInfo(photographe);
        }
    }
    filtrePhotos(data);
}

//Cette fonction va afficher les informations du photographe.
function displayPhotographeInfo(photographe) {
    let vignettePhotographe = document.getElementById('vignettePhotographe');
    let name = vignettePhotographe.getElementsByTagName("H1")[0];
    let localistion = vignettePhotographe.getElementsByTagName("H2")[0];
    let slogan = vignettePhotographe.getElementsByTagName("H3")[0];
    let photoProfil = vignettePhotographe.getElementsByTagName("DIV")[0];
    let ulFiltres = vignettePhotographe.getElementsByTagName("UL")[0];
    //Assigner les variables.
    name.innerHTML = photographe.name;
    localistion.innerHTML = `${photographe.city}, ${photographe.country}`;
    slogan.innerHTML = photographe.tagline;
    tarifJournalier.innerHTML = `${photographe.price}€/jour`;
    photoProfil.style.backgroundImage = `url('${linkHelperLocalVsGitHub}/assets/Sample_Photos/profils/${photographe.portrait}')`;
    for (let tag of photographe.tags) {
        let li = document.createElement("LI");
        li.innerHTML = `<p>#${tag}<p>`;
        ulFiltres.appendChild(li);
    }
}

//Cette fonction va recuperer les photos présentes dans la galerie pour les afficher. 
function filtrePhotos(data) {

    for (let media of data.media) {
        if (media.photographerId == idPhotographe) {
            listMedia.push(media);
        }
    }
    // displayNavigation();
    createVignette(listMedia, data.photographers);
}
//Creer une vignette. 
function createVignette(Listmedia) {
    //ceci supprimer ce qu'il y a dans la section avant de creer les Vignettes. 
    section.innerHTML = "";
    for (let media of Listmedia) {
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
    stateLikesTotal(media.likes);
    let urlVideo = getUrlMedia(media.video);
    let article = document.createElement("ARTICLE");
    article.innerHTML = `<a href= '#'><div class= "image"><video src= "${urlVideo}" ></video></div></a>` +
        "<div class = \"TitreEtLikes\">" +
        "<p>" +
        media.title +
        "</p>" +
        "<div><p>" + media.likes + `</p><button type="button"><img src='${linkHelperLocalVsGitHub}/assets/logos/heart-solid.svg' width='20'></button></div>` +
        "</div>";
    //Recupere la div des likes et logo heart. 
    let counterEtLikes = article.getElementsByTagName("DIV")[2];
    //S'Occupe de l'incrémentation des likes sur la page. 
    counterEtLikes.addEventListener("click", function() {
        let newP = counterEtLikes.getElementsByTagName("P")[0];
        let newInt = parseInt(newP.innerHTML) + 1;
        newP.innerHTML = newInt;
    })
    let video = article.getElementsByTagName("a")[0];
    video.addEventListener('click', (e) => {
        e.preventDefault
        displayLighBoxByIndex(listMedia.indexOf(media));
    })


    section.appendChild(article);
}
//Crée une photo avec un objet media.
function createPhoto(media) {
    stateLikesTotal(media.likes)

    let article = document.createElement("ARTICLE");
    article.innerHTML = "<a href=\"#\"><div class=\"image\"></div></a>" +
        "<div class = \"TitreEtLikes\">" +
        "<p>" +
        media.title +
        "</p>" +
        "<div><p class='likes'>" + media.likes + `</p><button type="button"><img src='${linkHelperLocalVsGitHub}/assets/logos/heart-solid.svg' width='20'></button></div>` +
        "</div>";
    //Recupere la div des likes et logo heart. 
    let counterEtLikes = article.getElementsByTagName("DIV")[2];
    //S'occupe de l'incrémentation des likes sur la page, et d'envoye l'information au state générale. 
    counterEtLikes.addEventListener("click", function() {
        let newP = counterEtLikes.getElementsByTagName("P")[0];
        let newInt = parseInt(newP.innerHTML) + 1;
        stateLikesTotal(1);
        newP.innerHTML = newInt;
    })
    let img = article.getElementsByTagName("a")[0];
    img.addEventListener("click", (e) => {
        e.preventDefault;
        displayLighBoxByIndex(listMedia.indexOf(media));
    })
    let url = getUrlMedia(media.image);
    let divMedia = article.getElementsByTagName("DIV")[0];
    divMedia.style.backgroundImage = `url(${url})`;
    section.appendChild(article);
}
//Display la lightBox par index.
function displayLighBoxByIndex(indexOfMedia) {
    window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    if (indexOfMedia > 0) {
                        indexOfMedia -= 1;
                        displayLightBoxMedia(listMedia[indexOfMedia]);
                    }
                    break;
                case 'ArrowRight':
                    if (indexOfMedia <= listMedia.length - 2) {
                        indexOfMedia += 1;
                        displayLightBoxMedia(listMedia[indexOfMedia]);
                    }
                    break;
                case 'Escape':
                    corpPrincipale.style.display = "block";
                    lightBox.style.display = "none";
                    window.removeEventListener('keyup', true);
            }


        })
        //Affiche la LighBox
    corpPrincipale.style.display = "none";

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
    //Navigation quand on veut aller au media précédent. 
    back.addEventListener('click', function() {
        if (indexOfMedia > 0) {
            indexOfMedia -= 1;
            displayLightBoxMedia(listMedia[indexOfMedia]);
        }
    });
    back.addEventListener('keyup', function() {
            if (indexOfMedia > 0) {
                indexOfMedia -= 1;
                displayLightBoxMedia(listMedia[indexOfMedia]);
            }

        })
        //Navigation quand on veut aller au media suivant. 
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


    close.addEventListener('click', function() {
        corpPrincipale.style.display = "block";
        lightBox.style.display = "none";
    })

}
//Ouvre le formulaire. 
oppenForm.addEventListener('click', function() {
    displayFormContact();
});


//Cette fonction affiche le formulaire de Contact.
function displayFormContact() {
    let pagePhotos = document.getElementById('corpsPrincipale');
    pagePhotos.ariaHidden = true;
    pagePhotos.style.opacity = "0.3";
    let form = document.getElementById('formulaire');
    form.ariaHidden = false;
    let premierInput = document.getElementById('fprenom');
    form.style.display = "block";
    window.addEventListener('keyup', (event) => {
        if (event.key == 'Escape') {
            closeForm();
        }
    });

    premierInput.focus();

}
//Ferme le formulaire. 
closeFormLogo.addEventListener('click', function() {
    // window.removeEventListener('onkeyup', true);
    closeForm();

});

function closeForm() {
    let pagePhotos = document.getElementById('corpsPrincipale');
    pagePhotos.ariaHidden = false;
    pagePhotos.style.opacity = "1";
    let form = document.getElementById('formulaire');
    form.ariaHidden = true;
    form.style.display = "none";
}
//Envoie des infos dans le formulaire. 
btnEnvoyer.addEventListener('click', function(event) {
        let champs = [];
        event.preventDefault();
        champs.push(document.getElementById('fprenom').value);
        champs.push(document.getElementById('lnom').value);
        champs.push(document.getElementById('lemail').value);
        champs.push(document.getElementById('lmessage').value);


    })
    //Gere les likes de compteur Likes Total. 
function stateLikesTotal(likes) {
    totalLikes += likes;
    compteur_likes_total_displayed.innerHTML = totalLikes;

}

let filtreSelected;
let select = document.getElementsByTagName('SELECT')[0];
select.addEventListener('change', function(selected) {

    filtreSelected = selected.target.value;
    totalLikes = 0;
    if (filtreSelected == "Popularité") {
        trierMediaParPopularite();
    } else if (filtreSelected == "Date") {
        trierMediaParDate();
    } else if (filtreSelected == "Titre") {
        trierMediaParTitre();
    }
    createVignette(listMedia);
})




function trierMediaParPopularite() {
    listMedia.sort(function(a, b) {
        return b.likes - a.likes;
    });

}

function trierMediaParTitre() {
    function SortArray(x, y) {
        return x.title.localeCompare(y.title);
    }
    listMedia.sort(SortArray);
}

function trierMediaParDate() {
    function SortArray(x, y) {
        return x.date.localeCompare(y.date);
    }
    listMedia.sort(SortArray);



}