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
            const response = await fetch ('../data/atelier.json');
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

/*let categoryModule = (function () {
    // const categorie = events.map(event => event.categorie);
    // const filteredCategories = [...new Set(category)];
    // console.log(filteredCategories);
    const $filterCategories = document.querySelector('.filter-category');
    let categorieFilter= [];

    async function fetchCategories () {
        try {
            const response = await fetch (ART_API);
            categorieFilter = await response.json();

            printCategories();
        } catch (error) {
            console.log(error);
        }
    }

    function printCategories () {

        $filterCategories.innerHTML = categorieFilter.map(artBig => {
            return `
            <li>${artBig.tags}</li>
            `
        }).join('');
    }
    function initialize () {
        fetchCategories();
    }

    return {
        initialize
    }
})();
*/

let artPageModule = (function () {
    const $artPage = document.querySelector('.art-big');
    let artPage = [];

    async function fetchArtPage () {
        try {
            const response = await fetch (ART_API);
            artPage = await response.json ();

            printArtPage ();
        } catch (error) {
            console.log(error);
        }
    }

    function printArtPage () {
        $artPage.innerHTML = artPage.map(artBig => {
            return `
            <li>
                <h2>${artBig.title}</h2>
                <h3>${artBig.subtitle}</h3>
                <h4>${artBig.tags} — ${artBig.location}</h4>
                <img class="art__photo" src="../static/images/${artBig.images}">
            </li>
            `
        }).join('');
    }
    function initialize () {
        fetchArtPage();
    }

    return {
        initialize
    }

})();

let pressModule =(function (){
    const $pressList = document.querySelector('.container__press');
    let pressList = [];

    async function fetchPress () {
        try {
            const response = await fetch ('../data/press.json');
            pressList = await response.json();

            printPress();
        } catch (error) {
            console.log(error)
        }
    }

    function printPress () {
        $pressList.innerHTML = pressList.map(projects => {
            return `
            <li class="press__list">
                <img class="art__photo" src="../static/images/${projects.image}">
                <h3>${projects.subtitle}</h3>
                <h2 class="art__title">${projects.title}</h2>
                <p>${projects.detail}</p>
                <a class="learn-btn" href="#">Learn more</a>
            </li>
            `
        }).join('');
    }
    function initialize () {
        fetchPress();
    }
    return {
        initialize
    }
})();

let app = (function (){

    function initialize(){
        artModule.initialize();
        studioModule.initialize();
        //categoryModule.initialize();
        artPageModule.initialize();
        pressModule.initialize();
    }

    return {
        initialize,
    }
})();

app.initialize();