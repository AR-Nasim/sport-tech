const input = document.getElementById("team-input");
const parent = document.getElementById("parent-div");
const lists = document.getElementById("lists");

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

function displaySearch(data){
    const array = data.teams;
    lists.textContent = '';
    for (let i = 0; i < Math.min(array.length,7); i++) {
        const element = array[i].strTeam;
        const list = document.createElement("li");
        list.innerText = element;
        lists.appendChild(list);
    }
}

function getTeamInfo() {
    const team = input.value;
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayDetails(data));
}

input.addEventListener("keyup", () => {
    const team = input.value;
    if(team != ""){
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => displaySearch(data));
    }
    else{
        lists.textContent = "";
    }
});

document.getElementById("container").addEventListener("click", (event) => {
    if(event.target.id != lists){
        lists.textContent = '';
    }
});

lists.addEventListener("click", (event) => {
    const team = event.target.innerText;
    input.value = team;
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayDetails(data));
})
