import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

            console.log(res);
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngrediets() {
        const newIngredients = this.ingredients.map(el => {
        
            const unitsLong = ['tablespoons', 'tablespoon', 'ounce','ounces', 'teapsoon', 'teaspoons', 'cups', 'pounds'];
            const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound' ];
           
            // Uniform units 
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // Removed ()
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');


            // Parse ingredients into CountQueuingStrategy, unit and ingredient
            return ingredient;
            
        });
        this.ingredients = newIngredients;
    }
}
