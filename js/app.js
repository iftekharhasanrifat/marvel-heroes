const offset = (Math.random() * 1000 + '').split('.')[0];
const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.toggle('d-none');
}
document.getElementById('input-field').addEventListener('keypress', function(event) {
    if (event.key == "Enter") {
        document.getElementById('search-btn').click();
    }
})
const loadHeroes = offset => {
    toggleSpinner();
    fetch(`https://gateway.marvel.com/v1/public/characters?limit=100&offset=${offset}&&ts=1&&apikey=06671c0c4533871470fe946f79309f05&&hash=dc2c42da0e3ad1a847d549527d323d7c`)
        .then(res => res.json())
        .then(data => {
            data.data.results.forEach(hero => {
                const thumbnail = hero.thumbnail.path.split('ttp')[0] + 'ttps' + hero.thumbnail.path.split('ttp')[1];
                const extension = hero.thumbnail.extension;
                const imgUrl = thumbnail + '.' + extension;
                // document.getElementById('hero').src = imgUrl;
                const heroDiv = document.getElementById('heroDiv');
                const singleHero = document.createElement('div');
                singleHero.innerHTML =
                    `<div onclick="searchHeroById(${hero.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  class="card" style="width: 18rem;border-radius: 15px; overflow: hidden; box-shadow: 10px 10px 30px lightgray;cursor: pointer;">
                        <img id="hero" src="${imgUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h4 class="card-title">${hero.name}</h4>
                        </div>
                </div>`
                heroDiv.appendChild(singleHero);
            });
            toggleSpinner();
            document.getElementById('provider').innerText = `${data.attributionText}`
        })
        .catch(error => alert('Something went wrong!please try again later'));
}
loadHeroes(offset);
const searchHero = () => {
    const searchText = document.getElementById('input-field').value;
    if (searchText == '') {
        alert('please give your superheroes name');
    } else {
        const url = `https://gateway.marvel.com/v1/public/characters?name=${searchText}&&ts=1&&apikey=06671c0c4533871470fe946f79309f05&&hash=dc2c42da0e3ad1a847d549527d323d7c`;
        console.log(url);
        toggleSpinner();
        fetch(url)
            .then(res => res.json())
            .then(data => showHero(data.data.results))
    }
}
const searchHeroById = heroId => {
    const url = `https://gateway.marvel.com/v1/public/characters/${heroId}?ts=1&&apikey=06671c0c4533871470fe946f79309f05&&hash=dc2c42da0e3ad1a847d549527d323d7c`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayHeroInfo(data.data.results))
}
const displayHeroInfo = heroes => {
    const heroInfoDiv = document.getElementById('hero-info');
    heroInfoDiv.innerHTML = '';
    heroes.forEach(hero => {
        const thumbnail = hero.thumbnail.path.split('ttp')[0] + 'ttps' + hero.thumbnail.path.split('ttp')[1];
        const extension = hero.thumbnail.extension;
        const imgUrl = thumbnail + '.' + extension;
        // document.getElementById('hero').src = imgUrl;

        const heroInfo = document.createElement('div');
        heroInfo.innerHTML =
            `
        <div class="card" style="width: 18rem;">
            <img src="${imgUrl}">
             <div class="card-body">
                <h2>${hero.name}</h2>
                <p>${hero.description}</p>
             </div>
        </div> 
        `
        heroInfoDiv.appendChild(heroInfo);
    });
}
const showHero = heroes => {
    if (heroes.length == 0) {
        alert("Data not found.Please search your superhero by proper name.");
        const searchText = document.getElementById('input-field');
        searchText.value = '';
        toggleSpinner();
    } else {
        const heroDiv = document.getElementById('heroDiv');
        const character = document.getElementById('single-hero');
        character.innerHTML = '';
        heroDiv.innerHTML = '';
        heroes.forEach(hero => {
            const thumbnail = hero.thumbnail.path.split('ttp')[0] + 'ttps' + hero.thumbnail.path.split('ttp')[1];
            const extension = hero.thumbnail.extension;
            const imgUrl = thumbnail + '.' + extension;
            // document.getElementById('hero').src = imgUrl;

            const singleHero = document.createElement('div');
            singleHero.innerHTML =
                `<div onclick="searchHeroById(${hero.id})" class="card" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  style="width: 18rem;border-radius: 15px; overflow: hidden; box-shadow: 10px 10px 30px lightgray;cursor: pointer;">
                    <img id="hero" src="${imgUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">${hero.name}</h4>
                    </div>
            </div>`
            character.appendChild(singleHero);
        });
        toggleSpinner();
    }
}