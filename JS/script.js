const card = document.querySelector(".poke-container");
const pokemonCount = 151;
const colors = {
    fire: '#FDDFDF', grass: '#DEFDE0', electric: '#FCF7DE', water: '#DEF3FD',
    ground: '#f4e7da', rock: '#d5d5d4', fairy: '#fceaff', poison: '#98d7a5',
    bug: '#f8d5a3', dragon: '#97b3e6', psychic: '#eaeda1', flying: '#F5F5F5',
    fighting: '#E6E0D4', normal: '#F5F5F5'
};

let pokemons = [];
let selectedTeam = [];

function fetchPokemons() {
    let promises = [];
    for (let i = 1; i <= pokemonCount; i++) {
        let pokemonPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(response => response.json());
        promises.push(pokemonPromise);
    }
    Promise.all(promises)
        .then(function(results) {
            pokemons = results;
            displayPokemons(pokemons);
        });
}

function createPokeCard(pokemon) {
    const { id, name, types } = pokemon;
    const type = types[0].type.name;
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.style.backgroundColor = colors[type];
    cardElement.innerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="numero">${id.toString().padStart(3, '0')}</span>
            <h3 class="nome">${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
            <small class="tipo">Tipo: <span>${type}</span></small>
        </div>
        <div class="overlay"></div>
    `;
    cardElement.addEventListener("click", function() {
        selectPokemon(pokemon, cardElement);
    });
    return cardElement;
}

function displayPokemons(pokemonsList) {
    card.innerHTML = '';
    for (let i = 0; i < pokemonsList.length; i++) {
        const poke = pokemonsList[i];
        const pokeCard = createPokeCard(poke);
        card.appendChild(pokeCard);
    }
}

function filterPokemons() {
    const searchInput = document.getElementById("busca").value.toLowerCase().trim();
    const isNumber = !isNaN(searchInput);
    let filteredPokemons = [];
    for (let i = 0; i < pokemons.length; i++) {
        const poke = pokemons[i];
        if (isNumber) {
            if (poke.id === parseInt(searchInput)) {
                filteredPokemons.push(poke);
            }
        } else {
            if (poke.name.toLowerCase().includes(searchInput)) {
                filteredPokemons.push(poke);
            }
        }
    }
    displayPokemons(filteredPokemons);
}

document.getElementById("busca").addEventListener("input", filterPokemons);

function selectPokemon(pokemon, cardElement) {
    if (selectedTeam.length < 6 && !selectedTeam.find(p => p.id === pokemon.id)) {
        selectedTeam.push(pokemon);
        cardElement.classList.add("selected");
        updateSelectedCount();
    } else {
        if (selectedTeam.find(p => p.id === pokemon.id)) {
            alert(`Pokémon ${pokemon.name} já está no time!`);
        } else {
            alert("Você já selecionou 6 pokémons para o time!");
        }
    }
}

function updateSelectedCount() {
    const selectedCountElement = document.getElementById("selected-count");
    selectedCountElement.textContent = `Pokémons Selecionados: ${selectedTeam.length}/6`;
}

document.getElementById("enviar").addEventListener("click", function() {
    const teamName = document.getElementById("team-name").value.trim();
    if (!teamName) {
        alert("Por favor, digite um nome para o time.");
        return;
    }
    localStorage.setItem("teamName", teamName);
    localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
    window.location.href = "team.html";
});

fetchPokemons();

