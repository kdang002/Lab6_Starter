// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() 
{
	// A9. TODO - Complete the functionality as described in this function
	//           header. It is possible in only a single line, but should
	//           be no more than a few lines.

	let r = localStorage.getItem('recipes');
	if(r)
	{
		return JSON.parse(r);
	}
	return [];

}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) 
{
	// A10. TODO - Get a reference to the <main> element
	let main = document.querySelector('main');

	// A11. TODO - Loop through each of the recipes in the passed in array,
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...
	//            Append each element to <main>
	for (let i = 0; i < recipes.length; i++)
	{
		let card = document.createElement('recipe-card');
		card.data = recipes[i];
		main.appendChild(card);
	}

}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. TODO - Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.
	let recipeStr = JSON.stringify(recipes);
	localStorage.setItem('recipes', recipeStr);
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. TODO - Get a reference to the <form> element
	let form = document.querySelector('form');
	
	// B3. TODO - Add an event listener for the 'submit' event, which fires when the
	//            submit button is clicked
	form.addEventListener('submit', function(event)
	{
		// Steps B4-B9 will occur inside the event listener from step B3
		// B4. TODO - Create a new FormData object from the <form> element reference above
		let formData = new FormData(form);

		// B5. TODO - Create an empty object (we'll refer to this object as recipeObject to
		//            make this easier to read), and then extract the keys and corresponding
		//            values from the FormData object and insert them into recipeObject
		let recipeObject = {};
		recipeObject.imgSrc = formData.get('imgSrc');
		recipeObject.imgAlt = formData.get('imgAlt');
		recipeObject.titleLnk = formData.get('titleLnk');
		recipeObject.titleTxt = formData.get('titleTxt');
		recipeObject.organization = formData.get('organization');
		recipeObject.rating = parseInt(formData.get('rating'));
		recipeObject.numRatings = parseInt(formData.get('numRatings'));
		recipeObject.lengthTime = formData.get('lengthTime');
		recipeObject.ingredients = formData.get('ingredients');


		// B6. TODO - Create a new <recipe-card> element
		let recipeCardEl = document.createElement('recipe-card');

		// B7. TODO - Add the recipeObject data to <recipe-card> using element.data
		recipeCardEl.data = recipeObject;
		
		// B8. TODO - Append this new <recipe-card> to <main>
		let main = document.querySelector('main');
		main.appendChild(recipeCardEl);
		
		// B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
		//            then save the recipes array back to localStorage
		let recipeArr = getRecipesFromStorage();
		recipeArr.push(recipeObject);
		saveRecipesToStorage(recipeArr);

	})


	// B10. TODO - Get a reference to the "Clear Local Storage" button
	// from index.html: 			
	// <button type="button" class="danger">Clear Local Storage</button>
	let clearBtn = document.querySelector('button.danger');

	// B11. TODO - Add a click event listener to clear local storage button
	clearBtn.addEventListener('click', function(event)
	{
		// Steps B12 & B13 will occur inside the event listener from step B11
		// B12. TODO - Clear the local storage
		localStorage.clear();
		
		// B13. TODO - Delete the contents of <main>
		let main = document.querySelector('main');
		main.innerHTML = "";
	});
		
}
