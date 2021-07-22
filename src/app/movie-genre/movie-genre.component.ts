import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {
/**
 * Injects movie title and genre from movie-card component for genre component dialog
 * @param data - object 
 */
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    Title: string;
    Name: string;
    Description: String
  }) { }

  ngOnInit(): void {
  }

}
