import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import {User} from './../../shared/user';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  currentUser: Object = {};
  currentUser1:User
user:User;
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    this.currentUser1 = this.authService.currentUserValue;
    console.log(this.currentUser1);
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
    this.currentUser = res.msg;
    })
  }

  ngOnInit() { }
}