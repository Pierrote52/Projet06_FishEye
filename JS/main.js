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
    for (product of data) {
        for (let i = 0; i < product.photographers.length; i++) {
            var article = document.createElement("ARTICLE");
            var articleContent = `<a href = "${linkHelperLocalVsGitHub}/photographe.html?id=${product["photographers"][i].id}"><div id ="${product["photographers"][i].portrait}"></div><h2>${product["photographers"][i].name}</h2><h3>${product["photographers"][i].city}</h3><h4>${product["photographers"][i].tagline}</h4><p>${product["photographers"][i].price}€/jour</p><ul></ul></a>`
            article.innerHTML = articleContent;
            let ul = article.getElementsByTagName("UL")[0];
            //Je vais creer les Tags pour mes Photographes.
            for (tag of product["photographers"][i].tags) {
                let li = document.createElement("LI");

                li.innerHTML = `#${tag}`;
                ul.appendChild(li);
            }
            section.appendChild(article);
            var _photoDiv = document.getElementById(`${product["photographers"][i].portrait}`);
            _photoDiv.style.backgroundImage = `url("${linkHelperLocalVsGitHub}/assets/Sample_Photos/profils/${product["photographers"][i].portrait}")`;
            let Ul = article.getElementsByTagName("UL");
        }
        // _photoDiv.style.backgroundImage = "../assets/Sample_Photos/profils/Mimi.jpg";
        //   article.innerHTML = articleContent;
        // itemCard.innerHTML +=`
        //   //   <p class="productDescription">${product["photographers"][i].name}</p>
        // `;

    }

}
//#################ICI on recupere les li de la nav pour manager la navigation#####################
let LiDeLaNavPrincipale = document.getElementsByTagName("header")[0].getElementsByTagName("nav")[0].getElementsByTagName("UL")[0].getElementsByTagName("LI");
let listFiltres = [];


for (li of LiDeLaNavPrincipale) {
    let content = li.innerHTML.substr(1).toLowerCase();
    li.addEventListener('click', function() {

        /*Cette commande permet de filtrer seulement pour un seul TAg */
        if (listFiltres[0] == content) {
            let lesArticles = document.getElementsByTagName("ARTICLE");
            for (article of lesArticles) {
                article.style.display = "block";
            }
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
    for (presentFiltre of listFiltres) {
        if (filtre == presentFiltre) {
            supprimer = true;
        }
    }

    if (supprimer == true) {
        let _index = listFiltres.indexOf(filtre);
        listFiltres.splice(_index, 1);
        /*_________SUpprime l'element par index________*/
    } else { listFiltres.push(filtre); }
    if (listFiltres.length != 0) {
        displayPhotographes();
    } else {
        /*Vas afficher toutes les vignettes de photographe quand les filtres sont à Zero */
        let articles = document.getElementsByTagName("ARTICLE");
        for (article of articles) {
            article.style.display = 'block';
        }

    }
}

/*Cette fonction va regarder si les filtres correspondent ou pas et vas s'occuper de masquer ou non les elements articles.*/
function displayPhotographes() {
    let listArticles = document.getElementsByTagName("ARTICLE");
    for (article of listArticles) {
        let display = false;

        /* POur chaque article */
        let lisArticle = article.getElementsByTagName('LI');
        for (li of lisArticle) {
            for (filtre of listFiltres) {
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
    if (listFiltres.length >= 1) {
        for (li of LiDeLaNavPrincipale) {
            let content = li.innerHTML.substr(1).toLowerCase();
            content == listFiltres[0] ? li.className = "clicked" :
                li.className = "";
        }
    } else {

        for (li of LiDeLaNavPrincipale) {
            li.className = ""
        }
    }
}