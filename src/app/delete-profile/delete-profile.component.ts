import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss']
})
export class DeleteProfileComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DeleteProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  deleteProfile(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      localStorage.clear();
      this.dialogRef.close(); //closes modal on success
      this.snackBar.open("Goodbye!", 'OK', {
        duration: 2000
      })
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.snackBar.open("Great choice!", 'OK', {
      duration: 2000
    })
  }
}
