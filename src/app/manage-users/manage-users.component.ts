import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersApiService } from '../Services/users-api.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  constructor(public userService: UsersApiService, private router: Router) {}

  userList: any = [];

  getUserList() {
    this.userService.getUsers().subscribe((res) => {
      this.userList = res.data;
      console.log(this.userList);
    });
  }

  clickUpdate(userId: any) {
    this.router.navigate(['/assign-users'], {
      state: userId,
    });
  }

  clickDelete(userId: any) {
    this.userService
      .deleteUserId(userId)
      .subscribe((data: {}) => this.getUserList());
  }

  ngOnInit(): void {
    this.getUserList();
  }
}