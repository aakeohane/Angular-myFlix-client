import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declares api URL from my hosted database to snatch data for app
const apiUrl = 'https://aarons-myflix-db.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

/**
 * Enables communication with the movie database
 */
export class FetchApiDataService {
  /**
   * The constructor Injects the HttpClient module to the constructor params.
   * This will provide HttpClient to the entire class, making it available via this.http.
   */
  constructor(private http: HttpClient) { }

  /**
   * Makes the api call to the user registration endpoint.
   * @param userDetails User name, password, email and date of birth.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Makes the API call to login
   * @param userDetails
   * @returns
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Makes call to get all movies information
   * @returns
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes call to get one movie
   * @returns
   */
  public getMovie(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(apiUrl + 'movies/:Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  /**
   * Makes call to get director bio/information
   * @returns
   */ 
  public getDirector(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(apiUrl + 'directors/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes call to get genre information
   * @returns
   */ 
  public getGenre(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(apiUrl + 'movies/:Title/genre', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes call to get user information
   * @returns
   */ 
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return this.http.get(apiUrl + 'users/' + user, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes call to get a favorite movie from a users favorites
   * @param id => id of favorite movie
   * @returns
   */
  public getFavMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return this.http.get(apiUrl + 'users/' + user + '/movies/', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * add a users favorite movie to their list using the
   * @params id => id of favorite movie 
   * @returns
   */
  public addFavMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return this.http.post(apiUrl + 'users/' + user + '/movies/' + id, id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** delete a users favorite movie from their list of favorites
   * @params = id => id of favorite movie
   * @returns
   */
  public removeFavMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return this.http.delete(apiUrl + 'users/' + user + '/movies/' + id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes call to edit a users information
   * @returns
   */ 
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return this.http.put(apiUrl + 'users/' + user, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes call to delete a user from the database
   * @returns
   */ 
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return this.http.delete(apiUrl + 'users/' + user, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || Object;
    }

  /**
   * Handles errors within the method used
   * @param error
   * @returns
   */    
  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent) {
      console.error('Some error ocurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Yikes, something bad happened; please try again later.'
    );
  }
}
