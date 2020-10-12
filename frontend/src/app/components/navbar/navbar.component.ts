import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.doLogout()
  }

  ngOnInit() {
  }

}
