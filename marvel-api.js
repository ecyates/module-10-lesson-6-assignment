async function fetchCharacters(callback, characterId) {
    const apiUrl = `https://www.superheroapi.com/api.php/e386918c503290dfe1d29bd293b77e11/${characterId}`;

    try {
        const response = await fetch(apiUrl);
        const characterData = await response.json();
        callback(null, characterData);
    }catch(error){
        callback(error, null);
    }
}

const handleCharacters = (error, characterData) => {
    const characterContainer = document.getElementById('marvelCharacters');
    characterContainer.className = "row row-cols-1 row-cols-md-3 g-4 text-center";
    try {
        const characterElement = document.createElement('div');
        characterElement.className = "border border-dark p-3";
        characterElement.style = "background-color: #ccc;"
        characterElement.innerHTML = `
        <img src="${characterData.image.url}" alt="${characterData.name} Image" width="200px" class="img-fluid rounded">
        <h3>${characterData.name}</h3>
        <p onclick="clickCharacter(${characterData.id})" class="btn btn-outline-dark m-0">Learn More</a>
        `;
        characterContainer.appendChild(characterElement);
    }catch(error){
        console.log('Error handling characters: ', error);
    }
};

const learnCharacterInfo = (error, characterData) => {
    const characterContainer = document.getElementById('marvelCharacters');
    characterContainer.className = "row";
    try {
        console.log(characterData.name);
        const characterElement = document.createElement('div');
        characterElement.className = "border border-dark";
        characterElement.style = "background-color: #ccc; padding: 20px 70px 20px 70px;"
        characterElement.innerHTML = `
        <center><img src="${characterData.image.url}" alt="${characterData.name} Image" class="img-fluid rounded">
        <h3>${characterData.name}</h3></center>
        <p><strong>Publisher</strong>: ${characterData.biography.publisher}</p>
        <p><strong>Full Name</strong>: ${characterData.biography["full-name"]}</p>
        <p><strong>Aliases</strong>: ${characterData.biography.aliases.join(', ')}</p>
        <p><strong>Place of Birth</strong>: ${characterData.biography["place-of-birth"]}</p>
        <p><strong>Gender</strong>: ${characterData.appearance["gender"]}</p>
        <p><strong>Race</strong>: ${characterData.appearance["race"]}</p>
        <p><strong>Height</strong>: ${characterData.appearance["height"][0]}</p>
        <p><strong>Weight</strong>: ${characterData.appearance["weight"][0]}</p>
        <p><strong>Eye Color</strong>: ${characterData.appearance["eye-color"]}</p>
        <p><strong>Hair Color</strong>: ${characterData.appearance["hair-color"]}</p>
        <p><strong>Work/Occupation</strong>: ${characterData.work.occupation}</p>
        <p><strong>Base</strong>: ${characterData.work.base}</p>
        <p><strong>Power Stats</strong>: <ul>
        <li><em>Intelligence</em>: ${characterData.powerstats.intelligence}</li></p>
        <li><em>Strength</em>: ${characterData.powerstats.strength}</li></p>
        <li><em>Speed</em>: ${characterData.powerstats.speed}</li></p>
        <li><em>Durability</em>: ${characterData.powerstats.durability}</li></p>
        <li><em>Power</em>: ${characterData.powerstats.power}</li></p>
        <li><em>Combat</em>: ${characterData.powerstats.combat}</li></p>
        <center><p onclick="updateCharacters()" class="btn btn-outline-dark m-0">Back</p></center>`;
        characterContainer.appendChild(characterElement);
    }catch(error){
        console.log('Error handling character: ', error);
    }
}

const clickCharacter = (characterID) => {
    const characterContainer = document.getElementById('marvelCharacters');
    characterContainer.innerHTML = "";
    fetchCharacters(learnCharacterInfo, characterID);
}

const updateCharacters = () => {
    const characterContainer = document.getElementById('marvelCharacters');
    characterContainer.innerHTML = "";
    const faveCharacters = [70, 620, 644, 346, 265, 720, 332, 149, 643];
    //let faveCharacters = [];
    //for(let i=1; i<=731; i++){
    //    faveCharacters.push(i);
    //}
    faveCharacters.forEach(character => fetchCharacters(handleCharacters, character)); 
};


updateCharacters();