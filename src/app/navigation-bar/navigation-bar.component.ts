import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  logoutUser(): void {
    localStorage.clear();
    this.snackBar.open("See you later!", 'OK', {
      duration: 2000
    })
  }

}
