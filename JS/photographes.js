let idPhotographe = new URL(window.location.href).searchParams.get('id');
let currentPhotographe;
let section = document.getElementsByTagName("SECTION")[0];
let listMedia = [];


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

    for (media of data.media) {
        if (media.photographerId == idPhotographe) {
            listMedia.push(media);
        }
    }
    createPhoto(listMedia, data.photographers);
}

function createPhoto(Listmedia) {


    for (media of Listmedia) {
        //Cree la structure minimum d'un article
        let article = document.createElement("ARTICLE");
        article.innerHTML = "<div class=\"image\"></div>" +
            "<div class = \"TitreEtLikes\">" +
            "<p>" +
            media.title +
            "</p>" +

            "</div>" +
            "</article>";


        //Met en place la barre pour les likes 
        divTitreEtLikes = article.getElementsByClassName("TitreEtLikes")[0];
        let newP = document.createElement("P");
        newP.innerHTML = media.likes;
        //Sur click cela incremente le nombre de Likes
        newP.addEventListener("click", function() {
            let newInt = parseInt(newP.innerHTML) + 1;
            newP.innerHTML = newInt;
        })
        divTitreEtLikes.appendChild(newP);

        if (media.image != null) {
            //Si le media est une image
            let url = getUrlMedia(media.image);
            let divMedia = article.getElementsByTagName("DIV")[0];

            divMedia.style.backgroundImage = `url(${url})`;

            section.appendChild(article);
        } else if (media.video != null) {
            //Si le media est une Video
            console.log('UNE VIDEO');
            let divMedia = article.getElementsByTagName("DIV")[0];
            let video = document.createElement("VIDEO");
            let source = document.createElement("SOURCE");
            let url = getUrlMedia(media.video);
            source.src = url;
            source.type = '/video/mp4';
            video.width = "250";
            video.controle = true;
            video.appendChild(source);


            divMedia.appendChild(video);
            console.log(video);
            section.appendChild(article);

        }

    }
}

function getUrlMedia(media) {
    let fileName = currentPhotographe.name.split(' ');

    return `../assets/Sample_Photos/${fileName[0]}/${media}`;
}