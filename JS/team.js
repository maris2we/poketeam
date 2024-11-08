const teamTitle = document.getElementById("team-title");
const teamContainer = document.querySelector(".team-container");

const teamName = localStorage.getItem("teamName");
const selectedTeam = JSON.parse(localStorage.getItem("selectedTeam"));

teamTitle.innerText = `Time: ${teamName}`;

const color = {
    fire: '#FDDFDF', grass: '#DEFDE0', electric: '#FCF7DE', water: '#DEF3FD',
    ground: '#f4e7da', rock: '#d5d5d4', fairy: '#fceaff', poison: '#98d7a5',
    bug: '#f8d5a3', dragon: '#97b3e6', psychic: '#eaeda1', flying: '#F5F5F5',
    fighting: '#E6E0D4', normal: '#F5F5F5'
};

selectedTeam.forEach(({ id, name, types }) => {
    const type = types[0].type.name;
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.style.backgroundColor = color[type];

    cardElement.innerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="numero">${id.toString().padStart(3, '0')}</span>
            <h3 class="nome">${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
            <small class="tipo">Tipo: <span>${type}</span></small>
        </div>
    `;
    
    teamContainer.appendChild(cardElement);
});


