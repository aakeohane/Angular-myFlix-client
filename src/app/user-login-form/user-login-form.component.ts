import { Component, OnInit, Input } from '@angular/core';
import { UserLoginService } from '../fetch-api-data.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = {
    Username: '',
    Password: '',
  }

  // hides password 
  hide = true;

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // Sends form inputs to backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // logic for a successful login
      this.dialogRef.close(); //closes modal on success
      this.snackBar.open("Welcome!", 'OK', {
        duration: 2000
      })
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    })
  }
}
