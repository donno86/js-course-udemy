import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the app
* - Search object
* - Current recipe object 
* - Shopping list object 
* - Liked recipes */

const state =  {}

const controlSearch = async () => {
    // 1) get query from view
    const query = searchView.getInput();
    //const query = 'pizza';


    console.log(query);

    if(query) {
        //2) New search object and add to state
        state.search = new Search(query);
        
        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4) Get searchResults
            await state.search.getResults();

            //5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch {
            console.log('something went wrong with searching');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// TESTING
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
// });

elements.searchResPages.addEventListener('click', e => {
    //console.log('test2');
    //console.log(e.target);
    const btn = e.target.closest('.btn-inline');
    
    //console.log(btn);
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
    }
});


//RECIPE CONTROLLER
// const r = new Recipe(46956);
// r.getRecipe();

// console.log(r);


const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id) {
        //Prepare UI
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected search item
        if (state.search) {
            searchView.highlightedSelected(id);
        }
        // Create recipe object
        state.recipe = new Recipe(id);

        //TESTING
        //window.r = state.recipe;

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            //console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);


        } catch {
            alert('Error processing recipe!~');
        }
        

    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


//Handling recipe btn clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
      if (state.recipe.servings > 1) {
        state.recipe.updateServings('dec'); 
        recipeView.updateServingsIngredients(state.recipe);
      }
    } 
    else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc'); 
        recipeView.updateServingsIngredients(state.recipe);
    }
  
});