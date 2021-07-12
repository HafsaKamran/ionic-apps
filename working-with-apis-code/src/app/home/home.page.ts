/**
 * HomePage
 *
 * This class manages the following functionality for the application:
 * 
 * 1. Defines FormBuilder object and validation rules
 * 2. Calls to spoonacular API via NutrientsService method calls
 *
 * @author James Griffiths
 * @date 06/06/2020
 * @version 0.1
 * @export
 * @class HomePage
 * @packageDocumentation
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NutrientsService } from '../services/nutrients.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

/**
 * @ignore
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  /**
   * @public
   * @property form
   * @type {FormGroup}
   * @memberof HomePage
   */
  public form: FormGroup;


  /**
   * @public
   * @property items
   * @type {Observable<Array<any>>}
   * @memberof HomePage
   */
  public items$: Observable<Array<any>>;


  /**
   * Creates an instance of HomePage.
   * @param {NutrientsService} nutrients
   * @param {FormBuilder} fb
   * @memberof HomePage
   */
  constructor(private nutrients: NutrientsService,
              public fb: FormBuilder) {
    this.form = fb.group({
      nutrient: ['', Validators.required],
      value: ['', Validators.required],
      results: ['', Validators.required]
    });
  }


  /**
   * @method ngOnInit
   * @description   Angular lifeecycle hook that is triggered on component initialisation (only fired once).
   *                Calls the getRandomRecipes method to load spoonacular recipe data 
   * @memberof HomePage
   */
  ngOnInit() {
    this.getRandomRecipes();
  }


  /**
   * @public
   * @method getRandomRecipes
   * @description     Calls the NutrientsService getRandomRecipes method, parses with rxJS utility methods and assigns
   *                  the returned data to an Observable named items (which will be managed within the component view)
   * @returns {none}
   * @memberof HomePage
   */
  public getRandomRecipes(): void {
    this.items$ = this.nutrients
    .getRandomRecipes()
    .pipe(
      map(items => items.recipes),
      tap((data: any) => {
        console.log('We have received data from API');
        console.dir(data);
      })
    );
  }


  /**
   * @public
   * @method searchRecipes
   * @param {*} val
   * @description     Calls the NutrientsService getRecipesBySpecifiedNutrients method, parses with rxJS utility methods and 
   *                  assigns the returned data to an Observable named items (which will be managed within the component view)
   * @returns {none}
   * @memberof HomePage
   */
  public searchRecipes(val: any): void {
    const nutrient = this.form.get('nutrient').value;
    const minValue = this.form.get('value').value;
    const numResults = this.form.get('results').value;
    const query    = `${nutrient}=${minValue}&number=${numResults}`;

    this.items$ = this.nutrients
    .getRecipesBySpecifiedNutrients(query)
    .pipe(
      map(items => items),
      tap((data: Array<any>) => {
        console.log('We have received data from API');
        console.dir(data);
      })
    );
  }

}
