
/*
var section = document.getElementsByTagName("SECTION")[0];

var articleContent = "<article><div></div><h2>Mimi Keel</h2><h3>London, Uk</h3><h4>Voir de beau dans le quotidien</h4><p>400€/jour</p><nav><ul><li>#portraits</li><li>#travel</li><li>#events</li><li>#animals</li></ul></nav></article>"
var article = document.createElement("ARTICLE");
article.innerHTML = articleContent;

section.appendChild(article);

let url = "./JSON.json"
fetch(url).then((response)=>{
    console.log(response);

})
*/
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
  let i =0;
    for (product of data) {
      for(let i = 0; i<product.photographers.length; i++){

        const itemCard = document.getElementById('items');
        var articleContent = `<article><div id ="${product["photographers"][i].portrait}"></div><h2>${product["photographers"][i].name}</h2><h3>${product["photographers"][i].city}</h3><h4>${product["photographers"][i].tagline}</h4><p>${product["photographers"][i].price}€/jour</p><nav><ul></ul></nav></article>`
        
        var article = document.createElement("ARTICLE");


        article.innerHTML = articleContent;
      
        section.appendChild(article);
        var _photoDiv = document.getElementById(`${product["photographers"][i].portrait}`);
        console.log(_photoDiv);
        _photoDiv.style.backgroundImage = `url("../assets/Sample_Photos/profils/${product["photographers"][i].portrait}")`;
        // _photoDiv.style.backgroundImage = "../assets/Sample_Photos/profils/Mimi.jpg";
        //   article.innerHTML = articleContent;
        // itemCard.innerHTML +=`
      //   //   <p class="productDescription">${product["photographers"][i].name}</p>
      // `;
      
      }
      
    }
}