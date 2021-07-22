import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {
/**
 * Injects movie title and director info from movie-card component for director component dialog
 * @param data - object 
 */
 constructor(@Inject(MAT_DIALOG_DATA) public data: {
  Title: string;
  Name: string;
  Bio: String
}) { }

ngOnInit(): void {
}

}
