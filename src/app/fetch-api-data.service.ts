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
export class FetchApiDataService {
  // Inject HttpClient module to constructor params so that HttpClient is available to entire class via this.http
  constructor(private http: HttpClient) { }

  // api call for user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // get all movies information
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

  // get one movie
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
  
  // get director bio/information
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

  // get genre information
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

  // get user information
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

  // get users favorite movies information
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

  // add a users favorite movie to their list using the
  // @params = id => id of favorite movie
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

  // delete a users favorite movie to their list using the
  // @params = id => id of favorite movie
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

  // edit a users information
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

  // delete a user
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
