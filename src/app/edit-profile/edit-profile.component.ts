import { Component, OnInit, Input, Inject } from '@angular/core';

// import to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() userData = { 
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  hide = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void},
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close(); //closes modal on update
      localStorage.setItem('user', result.Username);
      this.snackBar.open("Profile Updated!", 'OK', {
        duration: 2000
      })
      this.data.onSuccess();
    }, () => {
      this.snackBar.open("Please enter required information", 'OK', {
        duration: 2000
      })
    })
  }

}
