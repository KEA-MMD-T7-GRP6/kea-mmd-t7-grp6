const myProduct = new URLSearchParams(window.location.search);
const productId = myProduct.get("id");
// console.log("recipeId:", recipeId);

let productContainer = document.querySelector(".productContainer");
// console.log("productContainer:", productContainer);

fetch(`https://dummyjson.com/recipes/${recipeId}`)
  .then((response) => response.json())
  .then((recipe) => {
    // console.log("recipe:", recipe);
    productContainer.innerHTML = `
      <img src="https://cdn.dummyjson.com/recipe-images/${productId}.webp" alt="" class="opskrift_billede">
      <img src="billeder/klara_opskrift.png" alt="" class="gulderod">
      
      <div class="flexboks">
           
        <div class="pink_box">
          <h2 class="h2_pink">${recipe.name}</h2>
          <div class="pink_1_1">
          <div class="tid"><div class="prep">Prep time ${recipe.prepTimeMinutes} min</div>
            <div class="cook">Cook time ${recipe.cookTimeMinutes} min</div></div>
            
            <div class="personer">${recipe.servings} servings</div>
          </div>
<h3 class="ingredients">Ingredients</h3>
          <div class="pink_1_1">
                     
          <ul class="ul">
  ${recipe.ingredients.map((ingredient) => `<li class="li">${ingredients}</li>`).join("")}
</ul>
<img src="billeder/klara_spotify.png" alt="" class="spotify">
   </div>
 <h3 class="instructions">Instructions</h3>
          <ol class="ol">
            ${recipe.instructions.map((instructions) => `<li class="li">${instructions}</li>`).join("")}
          </ol>
        </div>
      </div>
    `;
  });
//   .catch((error) => console.error("Fetch error:", error));
