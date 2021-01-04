const ART_API = 'https://www.pgm.gent/data/arnequinze/art.json';

let artModule = (function (){
    const $artList = document.querySelector('.art');

    function printArt(art) {
        const artInfo = art.filter((art)=> {
            return art.highlight;
        })
        $artList.innerHTML = artInfo.map((artexhib) => {
            return `
            <li class="art__list">
                <img class="art__photo" src="../app/static/images/${artexhib.cover}">
                <h3>${artexhib.tags[0]} - ${artexhib.location}</h3>
                <h2 class="art__title">${artexhib.title}</h2>
                <p>${artexhib.description}</p>
                <a class="learn-btn" href="#">Learn more</a>
            </li>
            `
        })
        .join('');
   
    }

    async function fetchArt() {
        await services.art.getArt()
        .then((art) => {
            printArt(art);
        })
        .catch((error) => console.error(error));
    }

    function initialize () {
        fetchArt();
    }

    return {
        initialize,
    }
})();

let studioModule = (function(){
    const $studioList = document.querySelector('.studio');
    let studioProjects = [];

    async function fetchstudio () {
        try {
            const response = await fetch ('../app/data/atelier.json');
            studioProjects = await response.json();

            printStudio();
        } catch (error) {
            console.log(error);
        }
    }

    function printStudio () {
        
        $studioList.innerHTML = studioProjects.slice(0, 3).map(projects => {
            return `
            <li class="art__list">
                <img class="art__photo" src="../app/static/images/${projects.thumbnail}">
                <h3>${projects.subtitle}</h3>
                <h2 class="art__title">${projects.title}</h2>
                <p>${projects.description}</p>
                <a class="learn-btn" href="#">Learn more</a>
            </li>   
            `
        }).join('');
    }

    function initialize () {
        fetchstudio();
    }

    return {
        initialize
    }
})();

let app = (function (){

    function initialize(){
        artModule.initialize();
        studioModule.initialize();
    }

    return {
        initialize,
    }
})();

app.initialize();