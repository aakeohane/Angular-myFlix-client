import { Component, OnInit, Input } from '@angular/core';

// import to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { 
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  // hides password in form
  hide = true;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // logic for a successful user registration
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
