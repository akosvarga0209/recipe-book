import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {
  // ingredientAdded = new EventEmitter<Ingredient>();
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>()

  private ingredients: Ingredient [] = [
    new Ingredient('Apples',5 ),
    new Ingredient('Tomatoes',10)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
  /*  for (let ingredient of ingredients){
      this.ingredients.push(ingredient);
    }*/
  this.ingredients.push(...ingredients); //... listát csinál a tömbből, így már pushal hozátudjuk adni
    this.ingredientChanged.next(ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  clearIngredients(){
    this.ingredients = [];
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
