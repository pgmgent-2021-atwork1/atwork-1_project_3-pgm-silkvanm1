services = {};
services.art = (function(){

    async function getArt() {
        let response = await fetch(ART_API, {});
        return response.json();
    }

    return {
        getArt
    }
})();