import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
import {DataStoregeService} from '../shared/data-storege.service';

@Injectable()
export class RecipeService {
  recipesChanges = new Subject<Recipe[]>()


  constructor(private shoppingListService: ShoppingListService){}

 private recipes: Recipe[] = [
    new Recipe('Zsíros Bödön',
      'Ez egy csodás Zsíros Bödön recept',
      'http://carnedevanat.ro/130-thickbox_default/mangalitza-lard-with-garlic.jpg',
        [
          new Ingredient('Meat',1),
          new Ingredient('French Fries',20)
        ]),
    new Recipe('Sonkás Tészta',
      'Nagyon Finom Sonkás Tészta',
      'https://fthmb.tqn.com/gDZSRoM_iQVKFus25BJiOQAGpjk=/960x0/filters:no_upscale()/pizza-pasta-casserole-18-56a8c3783df78cf772a0686d.jpg',
      [
        new Ingredient('Bacon',1),
        new Ingredient('Pasta',20)
      ])
  ];


    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanges.next(recipes);
    }

   getRecipes() {
     return this.recipes.slice(); //új tömbel tér vissza nem az eredeti tömbre mutató referenciával
   }

   getRecipe(id: number){
     return this.recipes[id];
   }

   addToShoppingList(ingredients: Ingredient[]){
      this.shoppingListService.addIngredients(ingredients);
   }

   addRecipe(recipe: Recipe){
     this.recipes.push(recipe);
     this.recipesChanges.next(this.recipes.slice());
   }

   updateRecipe(index: number, recipe: Recipe){
     this.recipes[index] = recipe;
     this.recipesChanges.next(this.recipes.slice());
   }

   deleteRecipe(index: number){
     this.recipes.splice(index,1);
     this.recipesChanges.next(this.recipes.slice());
   }


}
