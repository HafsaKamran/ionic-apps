/**
 * DatabaseService
 *
 * This class provides SQLite database functionality used within the application
 *
 * @author James Griffiths
 * @date 20/10/2020
 * @version 0.1
 * @export
 * @class UtilitiesService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { environment } from '../../environments/environment';


/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  /**
   * @private
   * @property databaseName
   * @type {string}
   * @memberof DatabaseService
   */
  private databaseName          = environment.database.name;


  /**
   * @private
   * @property purchases
   * @type {Array<any>}
   * @memberof DatabaseService
   */
  private purchases: Array<any> = [];


  /**
   * @private
   * @property db
   * @type {*}
   * @memberof DatabaseService
   */
  private db: any;


  /**
   * @constructor
   * Creates an instance of DatabaseService.
   * @param {UtilitiesService} utils
   * @param {SQLite} sql
   * @memberof DatabaseService
   */
  constructor(private utils: UtilitiesService,
              private sql: SQLite) { }


  /**
   * @public
   * @method createDatabase
   * @description     Creates the SQLite database for the application
   * @returns {none}
   * @memberof DatabaseService
   */
  public createDatabase(): void {
    this.sql.create({
      name : this.databaseName,
      location : 'default'
    })
    .then((db: SQLiteObject) => {
      this.db = db;
      this.createDatabaseTables();
    })
    .catch((error: any) => {
      console.dir(error);
    });
  }


  /**
   * @private
   * @method createDatabaseTables
   * @description       Executes the createPurchasesTable method
   * @returns {none}
   * @memberof DatabaseService
   */
  private createDatabaseTables(): void {
    this.createPurchasesTable();
  }


  /**
   * @private
   * @method createPurchasesTable
   * @description     Creates the appPurchases table - if it doesn't already exist
   * @returns {none}
   * @memberof DatabaseService
   */
  private createPurchasesTable(): void {
    this.db
    .executeSql(`CREATE TABLE IF NOT EXISTS appPurchases (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                          productID TEXT,
                                                          isPurchased TEXT NOT NULL,
                                                          date TEXT NOT NULL,
                                                          timestamp INTEGER NOT NULL)`, {} as any)
    .then((data: any) => {
      console.log('appPurchases TABLE CREATED: ' + JSON.stringify(data));
    })
    .catch((error: any) => {
      console.log('Error: ' + JSON.stringify(error.err));
      console.dir(error);
    });
  }


  /**
   * @public
   * @method retrievePurchases
   * @description     Retrieves the stored purchases that have been saved
   * @returns {Promise<any>}
   * @memberof DatabaseService
   */
  public retrievePurchases(): Promise<any> {
    return new Promise(resolve => {
      this.db
      .executeSql('SELECT * FROM appPurchases', {} as any)
      .then((data: any) => {
        this.purchases = [];
        if (data.rows.length > 0) {
          const rows = data.rows;
          rows.map((row: any, index: number) => {
            this.purchases.push({
              productId: row.item(index).productID
            });
          });
        }
        resolve(this.purchases);
      })
      .catch((error: any) => {
        console.log('Error retrieving purchases from retrievePurchases: ' + JSON.stringify(error));
      });
    });
  }


  /**
   * @public
   * @method doesPurchaseExistInTable
   * @param {string} productID
   * @description       Checks if product id can be found within the appPurchases table
   * @returns {none}
   * @memberof DatabaseService
   */
  public doesPurchaseExistInTable(productID: string): void {
    this.db
    .executeSql(`SELECT * FROM appPurchases WHERE productID = '${productID}'`, {} as any)
    .then((data) => {
      const isPurchased 		= 	'Y';
      const dateIs          = this.utils.generateDate();
      const timestampIs     = this.utils.generateTimestamp();

      if (data.rows.length === 0) {
        console.log(`NO record exists for ${productID} inside appPurchases DB table`);
        this.insertPurchasesToTable(productID, isPurchased, dateIs, timestampIs);
      }
      else {
        console.log(`Record DOES exist for ${productID} inside appPurchases DB table`);
      }
    })
    .catch((error: any) => {
      console.log('Error determining if purchase exists in appPurchases table: ' + JSON.stringify(error));
    });
  }


  /**
   * @public
   * @method insertPurchasesToTable
   * @param {string} productID
   * @param {string} isPurchased
   * @param {string} date
   * @param {number} timestamp
   * @description     Inserts purchased products into appPurchases table
   * @returns {none}
   * @memberof DatabaseService
   */
  public insertPurchasesToTable(productID: string,
                                isPurchased: string,
                                date: string,
                                timestamp: number): void {
    // tslint:disable-next-line:max-line-length
    const sql = `INSERT INTO appPurchases(productID, isPurchased, date, timestamp)
                 VALUES('${productID}', '${isPurchased}', '${date}', ${timestamp})`;
    this.db
    .executeSql(sql, {} as any)
    .then((data: any) => {
      console.log(`appPurchases TABLE INSERTED RECORD for product ID: ${productID}`);
    })
    .catch((error: any) => {
      console.dir(error);
      console.log(`Error inserting ${productID} record for table insertPurchasesToTable: ${JSON.stringify(error.err)}`);
    });
  }


}
