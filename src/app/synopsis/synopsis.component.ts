import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent {
/**
 * Injects movie title and description from movie-card component for use in synopsis component dialog
 * @param data - object 
 */

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    Title: string;
    Description: string;
  }) { }
}
