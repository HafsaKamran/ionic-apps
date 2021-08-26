import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DetailsResolverService implements Resolve<any> {


  /**
   * @name uri
   * @type {string}
   * @private
   * @description       Defines the remote URI path for the application
   */
  // private uri = 'http://www.some-remote-url.suffix/';
  private uri = 'api/';


  constructor(private http: HttpClient,
              private route: Router) { }


  resolve(snapshot: ActivatedRouteSnapshot) {
    // Retrieve the URL parameter from the ActivatedRouteSnapshot object
    const param: string = snapshot.paramMap.get('id');
    return this.retrieveRemoteData(param);
  }


  private retrieveRemoteData(id: string): Observable<any> {
    // Retrieve the remote JSON file (whose name is formed from the supplied
    // URL parameter for this route) and use the RxJS take operator to indicate
    // which number of stream emissions for the Observable we want and then
    // use the rxJS map operator to extract the returned data
    return this.http
                .get(this.uri + id + '.json')
                .pipe(
                  take(1),
                  map((data) => {
                    if (data) {
                      return data;
                    } else {
                    // Otherwise instruct the Router to navigate back to the HomePage 
                    // component view
                    this.route.navigate(['/home']);
                    }
                  })
                );
  }



}
