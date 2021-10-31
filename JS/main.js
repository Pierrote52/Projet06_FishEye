

var section = document.getElementsByTagName("SECTION")[0];

var articleContent = "<article><div></div><h2>Mimi Keel</h2><h3>London, Uk</h3><h4>Voir de beau dans le quotidien</h4><p>400€/jour</p><nav><ul><li>#portraits</li><li>#travel</li><li>#events</li><li>#animals</li></ul></nav></article>"
var article = document.createElement("ARTICLE");
article.innerHTML = articleContent;

section.appendChild(article);

let url = "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json"
fetch(url).then((response)=>{
    console.log(response);

})