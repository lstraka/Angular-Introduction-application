import { User } from './../../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private _userId: number;

  @Input() set userId(userId: number) {
    this._userId = userId;
    this.getUser();
  }
  get userId(): number {
    return this._userId;
  }

  editMode = false;
  user: User;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getUser(): void {
    if (this.userId) {
      this.userService.getUserByID(this.userId).subscribe(user => {
        this.user = user;
      });
    }
  }
}
