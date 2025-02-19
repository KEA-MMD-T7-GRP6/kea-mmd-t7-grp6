const mymealtype = new URLSearchParams(window.location.search).get("category");
const recipeContainer = document.querySelector(".galleri_container");
const selectDifficulty = document.querySelector("#selectDifficulty");
const selectCuisine = document.querySelector("#selectCuisine");

const overskrift = document.querySelector("h2");
overskrift.innerHTML = mymealtype || "All Recipes"; // Vis 'mealtype' i overskriften, eller en standardtekst hvis det er null

console.log(mymealtype);

function showRecipes() {
  fetch(`https://dummyjson.com/recipes`)
    .then((response) => response.json())
    .then((data) => {
      const selectedDifficulty = selectDifficulty.value;
      const selectedCuisine = selectCuisine.value;
      showList(data.recipes, selectedDifficulty, selectedCuisine);
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      recipeContainer.innerHTML = "<p>Error loading recipes. Please try again.</p>";
    });
}

function getDifficultyColor(difficulty) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return { backgroundColor: "#B1D6BE", color: "#2E5B3B" };
    case "medium":
      return { backgroundColor: "#8C3929", color: "#FFFFED" };
    case "hard":
      return { backgroundColor: "#F44336", color: "#FFFFED" };
    default:
      return { backgroundColor: "#BDBDBD", color: "#000000" };
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const h2 = document.querySelector("h2");
  if (h2) {
    let text = h2.textContent;
    let lastTwo = text.slice(-2);
    h2.innerHTML = text.slice(0, -2) + '<span class="italic">' + lastTwo + "</span>";
  }
});

function showList(recipes, selectedDifficulty, selectedCuisine) {
  const filteredRecipes = recipes.filter((recipe) => {
    // Filtrér på sværhedsgrad
    if (selectedDifficulty !== "all" && selectedDifficulty) {
      if (recipe.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }
    }

    // Filtrér på cuisine
    if (selectedCuisine !== "all" && selectedCuisine) {
      if (!recipe.cuisine || recipe.cuisine.toLowerCase() !== selectedCuisine.toLowerCase()) {
        return false;
      }
    }

    // Filtrér på mealType
    if (mymealtype && !recipe.mealType.includes(mymealtype)) {
      return false;
    }

    return true;
  });

  const markup = filteredRecipes
    .map((recipe) => {
      const { backgroundColor, color } = getDifficultyColor(recipe.difficulty);
      const totalTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

      return `<a href="opskrit.html?category=${recipe.id}" class="card">
                <div class="image_container">
                    <img src="${recipe.image || "default-image.jpg"}" alt="${recipe.name || "Recipe Image"}">
                    <div class="difficulty" style="background-color: ${backgroundColor}; color: ${color};">
                      ${recipe.difficulty || "medium"}
                    </div>
                </div>
                <div class="card-header">
                    <h3>${recipe.name || "Recipe Name"}</h3>
                    <p class="rating"> <img src="svg/stjerne.svg" alt="">${recipe.rating || "N/A"}</p>
                </div>
                <div class="card-footer">
                    <p class="time"> <img src="svg/ur.svg" alt="">${totalTime || "Time unknown"} min</p>
                    <p class="servings"> <img src="svg/person.svg" alt="">${recipe.servings || "N/A"} persons</p>
                </div>
            </a>`;
    })
    .join("");

  recipeContainer.innerHTML = markup;
}

selectDifficulty.addEventListener("change", showRecipes);
selectCuisine.addEventListener("change", showRecipes);

showRecipes();
