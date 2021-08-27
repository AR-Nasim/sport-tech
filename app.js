const input = document.getElementById("team-input");
const parent = document.getElementById("parent-div");

function displayDetails(data) {
    const array = data.teams;
    console.log(array);
    parent.textContent = '';
    array.forEach((element) => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card h-100">
            <img src="${element.strTeamBadge}" class="card-img-top p-4" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.strTeam}</h5>
                <p class="card-text">${element.strTeam} is a professional football club based in ${element.strCountry}. ${element.strTeam} plays in the ${element.strLeague} . This club joins football in ${element.intFormedYear}</p>
            </div>
        </div>
        `;
        parent.appendChild(div);
    });
}

function getTeamInfo() {
    const team = input.value;
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayDetails(data));
}

input.addEventListener("keyup", () => {
    // console.log(input.value);
});
