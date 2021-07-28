import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  // ngOnInit is a lifecycle hook called when Angular is done creating the 
  // component so getAllMovies and FavMovies will then be called
  ngOnInit(): void {
    this.getAllMovies();
    this.getFavoriteMovies();
  }

  // loads all the movies from database
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  
  // loads list of users favorites
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user')
    if (user) {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        // this returns the FavoriteMovies array from database and loads it to 
        // local storage so ngIf can be interpreted
        this.favoriteMovies = resp.FavoriteMovies;
        return this.favoriteMovies
      });
    }
  }

  /**  Adds movie to users favorites array
   @param id
   */
  addFavMovie(id: string): void {
    this.fetchApiData.addFavMovie(id).subscribe((response: any) => {
      console.log(response)
      this.getFavoriteMovies()
      this.snackBar.open("Movie has been added to favorites!", 'OK', {
        duration: 2000
      })
    });
  }

  /**  remove movie to from favorites array
   @param id
   */
  removeFavMovie(id: string): void {
    this.fetchApiData.removeFavMovie(id).subscribe((response: any) => {
      console.log(response)
      this.getFavoriteMovies()
      this.snackBar.open("Movie has been removed from favorites!", 'OK', {
        duration: 2000
      })
    });
  }

  /**  Opens dialog to display movie title and description
   @param Title
   @param Description
   */
  openSynopsisDialog(
    Title: string,
    Description: string,
  ): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title,
        Description,
      }
    })
  }

    /**  Opens dialog to display movie title and genre info
   @param Title
   @param Name
   @param Description
   */
   openGenreDialog(
    Title: string,
    Name: string,
    Description: string
  ): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Title,
        Name,
        Description
      }
    })
  }

  /**  Opens dialog to display movie title and director info
   @param Title
   @param Name
   @param Bio
  */
   openDirectorDialog(
    Title: string,
    Name: string,
    Bio: string
  ): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Title,
        Name,
        Bio
      }
    })
  }

}
