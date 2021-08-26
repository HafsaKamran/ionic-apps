import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  async createDb() {
    const comics = {
      "us-comics" : {
        "list" : [
          {
            "id": 1,
            "title": "The further adventures of Indiana Jones",
            "strips": [
              { "title": "Indiana Jones" }
            ],
            "published":"weekly",
            "active": "true"
          },
          {
            "id": 2,
            "title": "Transformers",
            "strips": [
              { "title": "Transformers" }
            ],
            "published":"weekly",
            "active": "false"
          },
          {
            "id": 3,
            "title": "GI Joe",
            "strips": [
              { "title": "GI Joe" }
            ],
            "published":"weekly",
            "active": "false"
          }
        ]
      },
      "uk-comics": {
        "list" : [
          {
            "id": 1,
            "title": "2000AD",
            "strips": [
              { "title": "Judge Dredd" },
              { "title": "Rogue Trooper" },
              { "title": "Strontium Dogs" },
              { "title": "ABC Warriors" },
              { "title": "Savage" },
              { "title": "Future Shocks" },
              { "title": "Slaine" },
              { "title": "Robo Hunter" },
              { "title": "Button Man" }
            ],
            "published":"weekly",
            "active": "true"
          },
          {
            "id": 2,
            "title": "Battle",
            "strips": [
              { "title": "Charley's War" },
              { "title": "Nightmare" },
              { "title": "HMS Nightshade" },
              { "title": "D-Day Dawson" },
              { "title": "Johnny Red" },
              { "title": "Death Squad" },
              { "title": "The Hunters" },
              { "title": "Joe Two Beans" },
              { "title": "Panzer G-Man" }
            ],
            "published":"weekly",
            "active": "false"
          },
          {
            "id": 3,
            "title": "Lion",
            "strips": [
              { "title": "The Spider" },
              { "title": "Turville's Touchstone" },
              { "title": "Mowser the Priceless Puss" },
              { "title": "Adam Eterno" },
              { "title": "Robot Archie" },
              { "title": "Texas Jack" },
              { "title": "Zip Nolan" },
              { "title": "Phantom Viking" },
              { "title": "The Sludge" }
            ],
            "published":"weekly",
            "active": "false"
          }
        ]
      }
    };
    return comics;
  }

  constructor() { }
}
