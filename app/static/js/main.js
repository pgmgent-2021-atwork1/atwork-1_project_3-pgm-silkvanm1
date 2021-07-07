const ART_API = 'https://www.pgm.gent/data/arnequinze/art.json';

let artModule = (function (){
    const $artList = document.querySelector('.art');
    const $categories = document.querySelector('.filter-category')
    const $containerYear = document.querySelector('.filter-year')
    const $artPage = document.querySelector('.art-big');

    function printArt(art) {
        if ( $artList !== null ){
        const artInfo = art.filter((art)=> {
            return art.highlight;
        })

        console.log(artInfo)
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
    }

    function printYear(art) {
        if ( $containerYear !== null ){

            const yearFilter = art.map(years => years.year);
            const uniqueYears = [...new Set(yearFilter.flat())]
            console.log(uniqueYears)
    
            $containerYear.innerHTML = uniqueYears.map((event)=>{
            return `
            <ul class="year__list">
                <li class="year__list-items">
                    <a href = "#${event}">${event}</a>
                </li>
            </ul>`
        }).join('');
        }
    }

    function urlModule (parameter) {
        const url = window.location.search;
        const params = new URLSearchParams(url);
        const category = params.get("category");
        console.log(category);
        
        if (category) {
            const filter = parameter.filter((event) =>{
                return event.tags.indexOf(category) > -1
            })
            printCategories(filter)
        } else {
            printCategories(art)
        }
    }

    function printCategories(art) {
        if ( $categories !== null ){

        console.log(art)
            const category = art.map(categorie => categorie.tags);
            console.log(category)
            const uniqueCategories = [...new Set(category.flat())]
            console.log(uniqueCategories)
    
            $categories.innerHTML = uniqueCategories.map((event)=>{
            return `
            <li class="category__list-items">${event}</li>
        
            `
        }).join('');
        }   
        
    }

    function printArtPage (art) {
        if ($artPage !== null) {
        console.log(art)

        const yearFilter = art.map(years => years.year);
            const uniqueYears = [...new Set(yearFilter.flat())]
        
        $artPage.innerHTML = uniqueYears.map((year)=>{
            const artYear = art.filter((event)=>{
                return event.year.indexOf(year) > -1;
            })
            console.log(artYear)
                
            //hier mappen over images (done)

            const pieces = artYear.map(artBig => {
                const photos = artBig.images.map((event)=>{
                return `<li class="container__art__photo">
                <img class="art__photo" src="../static/images/${event}"/>
                </li>`
                }).join("");

                    return `
                        <ul class="art__list">
                            <li>
                                <a href="in-dialogue-with-calatrava/index.html">
                                    <div class="titles">
                                        <h2>${artBig.title}</h2>
                                        <h3>${artBig.subtitle}</h3>
                                        <h4>${artBig.tags} — ${artBig.location}</h4>
                                    </div>
                                    <ul class="photo__container">${photos}</ul>
                                </a>
                            </li>
                        </ul>
                    `
            }).join('');

            return `
            <h3 id = "${year}"> ${year}</h3>
            ${pieces}
            `

        }).join("")
        }
    }

    function fetchArt() {
        services.art.getArt()
        .then((art) => {
            printArt(art);
            printCategories(art);
            printYear(art);
            printArtPage(art);
            urlModule(art);
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
    const $studioList = document.querySelector('.container__studio');
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
        if ($studioList !== null){
        
        $studioList.innerHTML = studioProjects.map(projects => {
            return `
            <li class="art__list">
                <img class="art__photo" src="../static/images/${projects.thumbnail}">
                <h3>${projects.subtitle}</h3>
                <h2 class="art__title">${projects.title}</h2>
                <p>${projects.description}</p>
                <a class="learn-btn" href="visiting-mons-again/index.html">Learn more</a>
            </li>   
            `
        }).join('');
        }
    }

    function initialize () {
        fetchstudio();
    }
    return {
        initialize
    }

})();

let pressModule = (function (){

    async function fetchPress () {
        try {
            const response = await fetch ('../data/press.json');
            data = await response.json();

            printRelease(data)
            printPress(data);
        } catch (error) {
            console.log(error)
        }
    }

    function printRelease (data) {
        this.$releaseList = document.querySelector('.release__list');
        if (this.$releaseList !== null) {
            this.$releaseList.innerHTML = data.slice(0, 3).map(projects => {
                return `
                <li class="release__list-items">
                    <img class="art__photo" src="../static/images/${projects.image}">
                    <h3>${projects.subtitle}</h3>
                    <h2 class="art__title">${projects.title}</h2>
                    <p>${projects.detail}</p>
                    <a class="learn-btn" href="my-secret-garden-valencia/index.html">Open press release</a>
                </li>
                `
            }).join('');
        }
    }

    function printPress (data) {
        this.$pressList = document.querySelector('.press__list');
        console.log(data)
        if ($pressList !== null){
        this.$pressList.innerHTML = data.slice(3, 6).map(projects => {
            return `
            <li class="press__list-items">
                <img class="art__photo" src="../static/images/${projects.image}">
                <h3>${projects.subtitle}</h3>
                <h2 class="art__title">${projects.title}</h2>
                <p>${projects.detail}</p>
                <a class="learn-btn" href="my-secret-garden-valencia/index.html">download article</a>
            </li>
            `
        }).join('');
        }
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
        pressModule.initialize();
    }
    return {
        initialize,
    }
})();

app.initialize();