import { UserService } from './../user.service';
import { Role } from './../../../models/role';
import { Hobby, User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css']
})
export class CreateNewComponent implements OnInit {

  user: User;
  roles: Role[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = new User();
    this.userService.getRoles().subscribe(roles => {
      this.roles = roles;
      console.log(roles);
    });
  }

  addHobby() {
    this.user.hobbies.push(new Hobby());
  }

  createUser(): void {
    console.log(this.user);
    this.userService.createUser(this.user).subscribe(newUser => {
      console.log(newUser, 'saved success');
    });
  }
}
