import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private service: UserServiceClient) { }

  username;
  password;
  password2;
  register(username, password, password2) {
    if(username===undefined || password===undefined||password2===undefined
      ||username===null || password===null||password2===null){
      alert("Enter credentials");
    }
    else if(password2!==password){alert("Passwords dont match");}
    else {
      this.service
        .createUser(username, password)
        .then((response) => {
          console.log(response);
          if (response.status === 500) {
            alert("Username already Exists")
          }
          else {
            this.router.navigate(['profile']);
          }
        });
    }
        // this.router.navigate(['profile']));
  }

  ngOnInit() {
  }

}
