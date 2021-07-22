import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

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
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  // Sends form inputs to backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // logic for a successful login
      this.dialogRef.close(); //closes modal on success
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
      this.snackBar.open("Welcome!", 'OK', {
        duration: 2000
      })
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    })
  }
}
