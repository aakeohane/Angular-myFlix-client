import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  favoriteMovies: any[] = [];
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getAllMovies();
  }
  
  /**
   * Function fetching all movie data to populate user's FavoriteMovies array
   * @returns {array} movies - array of movie objects
   */
   getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.getFavoriteMovies();
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      // this returns the FavoriteMovies array from users database and loads it to 
      // local storage so ngFor can be interpreted
      this.user = resp;
      this.favoriteMovies = this.movies.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
      return this.user, this.favoriteMovies
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

  openEditProfile(): void {
    this.dialog.open(EditProfileComponent, {
      width: '280px',
      data: {
        // uploads new info when editing profile to the Profile Card
        onSuccess: () => this.getAllMovies()
      }
    })
  }

  openDeleteProfile(): void {
    this.dialog.open(DeleteProfileComponent, {
      width: '280px',
    })
  }
}
