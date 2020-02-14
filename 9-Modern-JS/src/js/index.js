import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';

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
    console.log(e.target);
    const btn = e.target.closest('.btn-inline');
    
    console.log(btn);
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
        renderLoader(elements.recipe);

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

['hashchanged','load'].forEach(event => window.addEventListener(event, controlRecipe));