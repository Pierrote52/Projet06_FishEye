var section = document.getElementsByTagName("SECTION")[0];

let mediaQueryList = window.matchMedia('(min-width: 450px')
let passer = document.getElementById('passerAuContenu');

document.onload = scrollCheck();

function scrollCheck() {
    if (mediaQueryList.matches) {
        window.onscroll = function() {
            if (document.documentElement.scrollTop > 50) {
                passer.style.display = "block";
            } else if (document.documentElement.scrollTop == 0) {
                passer.style.display = "none";
            }

        }

    }
}
let aPass = document.getElementById('passerAuContenu');
aPass.addEventListener('click', function() {
    document.documentElement.scrollTop = 0;
    passer.style.display = "none";
})



//Ici nous allons implementer une variable qui va gerer si nous sommes en Local ou sur GitHub. 
// Cette variable doit etre egale à "/Projet06_FishEye" si nous sommes sur GitHub, sinon en Local ce sera "." un champVide.
let linkHelperLocalVsGitHub = "."

const data = async() => {

    //lien en local = https://raw.githubusercontent.com/Pierrote52/Projet06_FishEye/master/JSON.json
    //lien sur GitHub : https://github.com/Pierrote52/Projet06_FishEye/master/JSON.json
    return await fetch('https://raw.githubusercontent.com/Pierrote52/Projet06_FishEye/master/JSON.json').then((v) => { return v.json() }).then(v => { return [v] });
}
data().then(v => showProducts(v))
    //---------J'AFFICHE TOUS LES PRODUITS---------

function showProducts(data) {
    for (let product of data) {
        for (let i = 0; i < product.photographers.length; i++) {
            var article = document.createElement("ARTICLE");
            var articleContent = `<a href = "${linkHelperLocalVsGitHub}/photographe.html?id=${product["photographers"][i].id}"><div id ="${product["photographers"][i].portrait}"></div><h2>${product["photographers"][i].name}</h2><h3>${product["photographers"][i].city}</h3><h4>${product["photographers"][i].tagline}</h4><p>${product["photographers"][i].price}€/jour</p><ul></ul></a>`
            article.innerHTML = articleContent;
            let ul = article.getElementsByTagName("UL")[0];
            //Je vais creer les Tags pour mes Photographes.
            for (let tag of product["photographers"][i].tags) {
                let li = document.createElement("LI");

                li.innerHTML = `#${tag}`;
                ul.appendChild(li);
            }
            section.appendChild(article);
            var _photoDiv = document.getElementById(`${product["photographers"][i].portrait}`);
            _photoDiv.style.backgroundImage = `url("${linkHelperLocalVsGitHub}/assets/Sample_Photos/profils/${product["photographers"][i].portrait}")`;

        }
        // _photoDiv.style.backgroundImage = "../assets/Sample_Photos/profils/Mimi.jpg";
        //   article.innerHTML = articleContent;
        // itemCard.innerHTML +=`
        //   //   <p class="productDescription">${product["photographers"][i].name}</p>
        // `;

    }

}
//#################ICI on recupere les li de la nav pour manager la navigation#####################
let buttonDeLaNavPrincipale = document.getElementsByTagName("header")[0].getElementsByTagName("nav")[0].getElementsByTagName("UL")[0].getElementsByTagName("BUTTON");
let listFiltres = [];


for (let button of buttonDeLaNavPrincipale) {
    let content = button.innerHTML.substr(1).toLowerCase();
    button.addEventListener('click', function() {

        //Cette fonction va etre appelé quand on voudra afficher tous les photographes. 
        function displayAllVignettes() {
            let lesArticles = document.getElementsByTagName("ARTICLE");
            for (let article of lesArticles) {
                article.style.display = "block";
            }
        }



        /*Cette commande permet de filtrer seulement pour un seul TAg à la fois*/
        if (listFiltres[0] == content) {
            displayAllVignettes();
            listFiltres = [];
        } else {
            listFiltres.length >= 1 ? listFiltres = [] : null;
            manageList(content);
        }
        manageNavBar();
    })

}

function manageList(filtre) {
    let supprimer = false;
    //Ceci n'a pas de sens s'il y a seulement tri un filtre aprés l'autre, mais pourrat prendre son sens si le client a besoin de plusieurs. filtres à la fois. 
    for (let presentFiltre of listFiltres) {
        if (filtre == presentFiltre) {
            supprimer = true;
        }
    }

    if (supprimer == true) {
        let _index = listFiltres.indexOf(filtre);
        listFiltres.splice(_index, 1);
        /*_________Supprime l'element par index________*/
    } else { listFiltres.push(filtre); }
    if (listFiltres.length != 0) {
        displayPhotographes();
    } else {
        /*Vas afficher toutes les vignettes de photographe quand les filtres sont à Zero */
        this.displayAllVignettes();
    }
}

/*Cette fonction va regarder si les filtres correspondent ou pas et vas s'occuper de masquer ou non les elements articles.*/
function displayPhotographes() {
    let listArticles = document.getElementsByTagName("ARTICLE");
    for (let article of listArticles) {
        let display = false;

        /* POur chaque article */
        let lisArticle = article.getElementsByTagName('LI');
        for (let li of lisArticle) {
            for (let filtre of listFiltres) {
                if (filtre == li.innerHTML.substr(1)) {
                    display = true;
                }
            }

        }
        if (display == true) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';

        }

    }

}

function manageNavBar() {
    let buttonDeLaNavPrincipale = document.getElementsByTagName("header")[0].getElementsByTagName("nav")[0].getElementsByTagName("UL")[0].getElementsByTagName("BUTTON");
    if (listFiltres.length >= 1) {
        for (let li of buttonDeLaNavPrincipale) {
            console.log(buttonDeLaNavPrincipale.length);
            let content = li.innerHTML.substr(1).toLowerCase();
            content == listFiltres[0] ? li.className = "clicked" :
                li.className = "";
        }
    } else {
        for (let li of buttonDeLaNavPrincipale) {
            li.className = ""
        }
    }
}