function searchcountry() {
  const input = document
    .getElementById("countryInput")
    .value.trim()
    .toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  fetch("./travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.countries.flat();
      const temples = data.temples.flat();
      const beaches = data.beaches.flat();

      // Combine all into one list
      const allDestinations = [];

      countries.forEach((item) => {
        allDestinations.push({
          type: "Country",
          name: item.name,
          city: item.cities.name,
          imageUrl: item.cities.imageUrl,
          description: item.cities.description,
        });
      });

      temples.forEach((item) => {
        allDestinations.push({
          type: "Temple",
          name: item.name,
          city: item.name,
          imageUrl: item.imageUrl,
          description: item.description,
        });
      });

      beaches.forEach((item) => {
        allDestinations.push({
          type: "Beach",
          name: item.name,
          city: item.name,
          imageUrl: item.imageUrl,
          description: item.description,
        });
      });

      // Find all matches (case-insensitive)
      const results = allDestinations.filter((item) =>
        item.name.toLowerCase().includes(input),
      );

      if (results.length > 0) {
        results.forEach((result) => {
          const resultHTML = `
            <div class="result" style="margin-bottom: 20px;" >
              <img src="${result.imageUrl}" style="width:300px " alt="${result.city}">
              <h2 >${result.type}: ${result.name}</h2>
              <p><strong>City/Place Name:</strong> ${result.city}</p>
              <p><strong>Description:</strong> ${result.description}</p>
              <button><a href="https://www.travello.com" target="_blank">Visit</a></button>
            </div>
            <hr>
          `;
          resultDiv.innerHTML += resultHTML;
        });
      } else {
        resultDiv.innerHTML = `<p>No match found. Try another name.</p>`;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      resultDiv.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    });
}

btnSearch.addEventListener("click", searchcountry);
