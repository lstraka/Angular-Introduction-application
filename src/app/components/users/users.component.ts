import { UserService } from './user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  selectedUserID: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = [];

    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  public chooseUser(user: User): void {
    this.selectedUserID = user.id;
  }

}
