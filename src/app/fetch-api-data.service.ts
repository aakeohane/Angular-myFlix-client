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
export class UserRegistrationService {
  // Inject HttpClient module to constructor params so that HttpClient is available to entire class via this.http
  constructor(private http: HttpClient) { }

  // api call for user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
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

// User login
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http: HttpClient) { }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
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

// get all movies information
@Injectable({
  providedIn: 'root'
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) { }

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

// get one movie
@Injectable({
  providedIn: 'root'
})
export class GetMovieService {
  constructor(private http: HttpClient) { }

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

// get director bio/information
@Injectable({
  providedIn: 'root'
})
export class GetDirectorService {
  constructor(private http: HttpClient) { }

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

// get genre information
@Injectable({
  providedIn: 'root'
})
export class GetGenreService {
  constructor(private http: HttpClient) { }

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

// get user information
@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  constructor(private http: HttpClient) { }

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

// get users favorite movies information
@Injectable({
  providedIn: 'root'
})
export class GetFavoriteMoviesService {
  constructor(private http: HttpClient) { }

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

// add a users favorite movie to their list using the
// @params = id => id of favorite movie
@Injectable({
  providedIn: 'root'
})
export class AddFavoriteMovieService {
  constructor(private http: HttpClient) { }

  public addFavMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return this.http.post(apiUrl + 'users/' + user + '/movies/' + id, {headers: new HttpHeaders(
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

// delete a users favorite movie to their list using the
// @params = id => id of favorite movie
@Injectable({
  providedIn: 'root'
})
export class DeleteFavoriteMovieService {
  constructor(private http: HttpClient) { }

  public deleteFavMovie(id: string): Observable<any> {
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

// edit a users information
@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  constructor(private http: HttpClient) { }

  public editUser(): Observable<any> {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return this.http.put(apiUrl + 'users/' + user, {headers: new HttpHeaders(
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

// delete a user
@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  constructor(private http: HttpClient) { }

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
