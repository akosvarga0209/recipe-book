import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import 'rxjs/add/operator/map';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';


@Injectable()
export class DataStoregeService {
  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes(){
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-1eb16.firebaseio.com/recipes.json?auth=' + token ,this.recipeService.getRecipes());
  }


  getRecipes(){
    const token = this.authService.getToken();
    console.log(token);
    return this.http.get('https://ng-recipe-book-1eb16.firebaseio.com/recipes.json?auth=' + token)
      .map (
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']){
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
