const API_KEY="79c8151661fb41628eeace5b22831f6f";
const  url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load", ()=> fetchNews("India"));

async function fetchNews(query){
    const res= await  fetch(`${url}${query}&apikey=${API_KEY}` );
    const data= await res.json();
    console.log(data);
    bindData(data.articles);
}


function bindData(articles){
    const cardsContainer=  document.getElementById('card-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardsContainer.innerHTML='';
    

    articles.forEach(article=> {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle =cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-soure');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML= article.title;
    newsSource.innerHTML=article.source;
    newsDesc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    // Create a new variable to hold the date and update the content of the source element
    const sourceWithDate = `${article.source.name} - ${date}`;
    newsSource.innerHTML = sourceWithDate;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })

}

// let curSelectedNav=Null;

function onNavItemClick(id){
fetchNews(id);
const  navItem=document.getElementById(id);
curSelectedNav?.classList.remove("active");
curSelectedNav=navItem;
curSelectedNav?.classList.add("active");


}

const searchButton= document.getElementById("search-button");
const searchText= document.getElementById("search-text");
searchButton.addEventListener("click", ()=>{
    const query= searchText.value;
    if(!query)return;
    fetchNews(query);
    
});


const toggleButton=document.querySelector('.toggle-button');
const toggleButtonIcon=document.querySelector('.toggle-button i');
const dropDownMenu=document.querySelector('.dropdown_menu');
toggleButton.onclick=function(){
        dropDownMenu.classList.toggle('open');
        const isopen  = dropDownMenu.classList.contains('open');
        toggleButtonIcon.classList = isopen
        ?'fa-solid fa-xmark':'fa-solid fa-bars'
}