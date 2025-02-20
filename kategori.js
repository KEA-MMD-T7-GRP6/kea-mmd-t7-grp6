const listContainer = document.querySelector(".category_list_container");
const myProduct = new URLSearchParams(window.location.search);
const productId = myProduct.get("id");

fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((data) => showCategory(data.recipes));

function showCategory(recipes) {
  // Opret et objekt til at holde styr på hvilke mealTypes vi allerede har set
  const uniqueMeals = {};

  // Filtrer arrayet så kun den første forekomst af hver mealType medtages
  // Filtrer ud fra opskrifter, der kun har ét element i mealType-arrayet
  const filteredRecipes = recipes.filter((recipe) => {
    // Tjek at mealType er et array, og at der kun er ét element
    if (Array.isArray(recipe.mealType) && recipe.mealType.length === 1) {
      const meal = recipe.mealType[0];
      // Tjek for unikke kategorier
      if (!uniqueMeals[meal]) {
        uniqueMeals[meal] = true;
        return true;
      }
    }
    return false;
  });

  // Map de filtrerede opskrifter til HTML markup
  const markup = filteredRecipes
    .map(
      (recipe) => `
        <a href="kategoriside.html?category=${recipe.mealType}" class="card">
          <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp" alt="${recipe.mealType}" class="kategori_billede">
          <h3 class="h3_card">${recipe.mealType}</h3>
        </a>`
    )
    .join("");

  listContainer.innerHTML = markup;
}
