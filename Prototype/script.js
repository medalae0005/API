const container = document.getElementById("cardContainer");
const continentSelect = document.getElementById("my-select");
let countriesData = [];

// Load data
fetch("https://countries-api-hsak.onrender.com/api/countries")
  .then(res => res.json())
  .then(data => {
    countriesData = data;
    displayCountries(data);
  })
  .catch(err => console.error("Erreur lors du chargement des pays :", err));

// Display countries
function displayCountries(countries) {
  container.innerHTML = "";

  countries.forEach(country => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${country.name}</h3>
      <p>Capital: ${country.capital}</p>
      <p>Language: ${country.language}</p>
      <p>Continent: ${country.continent}</p>
      <img src="${country.flag}" alt="Flag of ${country.name}" class="flag-img">
    `;

    card.onclick = () => {
      localStorage.setItem("selectedCountry", JSON.stringify(country));
      window.location.href = "country-details.html";
    };

    container.appendChild(card);
  });
}

// Filter by continent
continentSelect.addEventListener("change", () => {
  const selected = continentSelect.value;

  const filtered = selected === "continent"
    ? countriesData
    : countriesData.filter(c => c.continent === selected);

  displayCountries(filtered);
});