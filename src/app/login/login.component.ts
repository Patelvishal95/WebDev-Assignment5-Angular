import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;
  login(username, password) {
    if(this.username===undefined){
      alert("Please enter username")
    }
    else if(this.password===undefined){
      alert("Please enter password")
    }
    else {
      this.service
        .login(username, password)
        .then((response) => {
          if (response.status === 500) {
            alert("Invalid login")
          }
          else {
            this.router.navigate(['profile']);
          }

        });
    }
  }

  constructor(private router: Router,
              private service: UserServiceClient) { }

  ngOnInit() {
  }

}
