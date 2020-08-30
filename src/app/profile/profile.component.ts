import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userEmail: string;
  userName: string;
  userLastName: string;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.getUserData()
  }

  private getUserData(): void{
    const user = JSON.parse(localStorage.getItem('user'));
    this.userEmail = user.email;
    this.userName = user.firstName;
    this.userLastName = user.lastName;
  }

  singOut(): void{
    this.authService.signOut();
  }

}
