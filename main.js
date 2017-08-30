'use strict';

const STORE = [];
const api_url = 'https://www.googleapis.com/youtube/v3/search'; 
const api_key = 'AIzaSyBFSTdHGhgwD7sUXEQ0UlXSKkro4SP3EnA'; 

function handleFormSubmit(){
    $(".js-form").on("submit", function(event){
        event.preventDefault(); 
        const userinput = $(this).find(".js-input"); 
        const searchterm = userinput.val(); 
        userinput.val(""); 
        getDataFromApi(searchterm, displayData)
    }); 
}

function handleRenderLightbox() {
    $(".js-search-results").on("click", ".list-item", function(event) {
        console.log('hello');
        $(".lightbox").removeClass("hidden");
        $(".js-video").removeClass("hidden");
        const videoUrl = $(event.currentTarget).find('img').attr('data-index');
        console.log(event.currentTarget); 
        console.log(videoUrl);
        $(".js-iframe").attr("src",videoUrl);
    });
}

function handleRemoveLightbox() {
    $("body").on("click", ".lightbox", function(event) {
        console.log('test');
        $(".js-iframe").attr("src", "");
        render();
    });
}

function getDataFromApi(searchterm, callback){
    const request = {
        part: 'snippet',
        key: api_key,
        q: searchterm
    }
    $.getJSON(api_url, request, callback); 
}

function displayData(data){
    console.log(data); 
    const results = data.items.map((item, index) => {
        STORE.push(renderString(item, index));
     }); 
     render(); 
}

            // <a href="https://www.youtube.com/watch?v=${item.id.videoId}">
            //     <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.description}" class="">
            // </a>

function renderString(item){
    return `
        <div class="list-item">
            <h3>${item.snippet.title}</h3>
            <img src="${item.snippet.thumbnails.medium.url}" data-index="https://www.youtube.com/embed/${item.id.videoId}?autoplay=1" alt="${item.snippet.description}" class="">
        </div>
    `
}

function render(){ 
    $(".js-search-results").html(STORE);
    $(".lightbox").addClass("hidden");
    $(".js-video").addClass("hidden");
}

function main(){
    handleFormSubmit();
    handleRenderLightbox();
    handleRemoveLightbox(); 
}

$(main);