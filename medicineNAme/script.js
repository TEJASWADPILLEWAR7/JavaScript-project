const searchInput = document.getElementById("search");
const suggestionsList = document.getElementById("suggestions");

const fetchDrugNames = async (query) => {
  if (query.trim() === "") {
    suggestionsList.innerHTML = "";
    return;
  }

  const baseUrl = "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search";
  try {
    const response = await fetch(
      `${baseUrl}?terms=${encodeURIComponent(query)}&maxList=10`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displaySuggestions(data[1]);
  } catch (error) {
    console.error("Error fetching drug names:", error);
  }
};

const displaySuggestions = (suggestions) => {
  suggestionsList.innerHTML = "";
  if (suggestions.length === 0) {
    suggestionsList.innerHTML = "<li>No results found</li>";
    return;
  }

  suggestions.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    li.addEventListener("click", () => {
      searchInput.value = name;
      suggestionsList.innerHTML = "";
    });
    suggestionsList.appendChild(li);
  });
};

searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  fetchDrugNames(query);
});
