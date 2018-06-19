import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router) { }

  user = {};
  username;
  email;
  firstName;
  lastName;
  password;
  address;
  phone;
  sections = [];

  update(user) {
    this.service.updateUser({username:this.username,
    email:this.email,
    firstName:this.firstName,
    lastName:this.lastName,
    phone:this.phone,
    address:this.address}).then(response=>{
      if(response.status===500){
        alert("User Name Already Taken");
        this.service
          .profile()
          .then(user =>{
            this.username = user.username;
            this.firstName=user.firstName;
            this.lastName=user.lastName;
            this.email=user.email;
            this.phone=user.phone;
            this.address=user.address;});
      }
    })
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }
  DropClass(enrollment){
    this.sectionService
      .dropClassForStudent(enrollment)
      .then(()=>{ this.sectionService
        .findSectionsForStudent()
        .then(sections => this.sections = sections );});
  }

  ngOnInit() {
    this.service
      .profile()
      .then(user =>{
        this.username = user.username;
      this.firstName=user.firstName;
      this.lastName=user.lastName;
      this.email=user.email;
        this.phone=user.phone;
        this.address=user.address;});

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections );
  }

}
