
var section = document.getElementsByTagName("SECTION")[0];
fetch('http://localhost:3000/api/datas')
  .then(res => res.json())
  .then(data => { 
    showProducts(data);
  })
  .catch(_error => {
    alert('Oops ! Le serveur ne répond pas.');
  });

  //---------J'AFFICHE TOUS LES PRODUITS---------

function showProducts(data) {
    for (product of data) {
      for(let i = 0; i<product.photographers.length; i++){

        const itemCard = document.getElementById('items');
        var articleContent = `<div id ="${product["photographers"][i].portrait}"></div><h2>${product["photographers"][i].name}</h2><h3>${product["photographers"][i].city}</h3><h4>${product["photographers"][i].tagline}</h4><p>${product["photographers"][i].price}€/jour</p><ul></ul>`
        
        var article = document.createElement("ARTICLE");
        article.innerHTML = articleContent;
        let ul = article.getElementsByTagName("UL")[0];
        //Je vais creer les Tags pour mes Photographes.
        for(tag of product["photographers"][i].tags){
          let li = document.createElement("LI");
          li.innerHTML = `#${tag}`;
          ul.appendChild(li);
        }
        section.appendChild(article);
        var _photoDiv = document.getElementById(`${product["photographers"][i].portrait}`);
        _photoDiv.style.backgroundImage = `url("../assets/Sample_Photos/profils/${product["photographers"][i].portrait}")`;
        let Ul = article.getElementsByTagName("UL");
        }
        // _photoDiv.style.backgroundImage = "../assets/Sample_Photos/profils/Mimi.jpg";
        //   article.innerHTML = articleContent;
        // itemCard.innerHTML +=`
      //   //   <p class="productDescription">${product["photographers"][i].name}</p>
      // `;
      
      }
      
    }
    

    function Filtre(){
      console.log('Cliked');
    }