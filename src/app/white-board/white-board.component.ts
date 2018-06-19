import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

  constructor(private service: UserServiceClient, private router: Router) { }
  loggedIn=true;
  isAdmin=false;
  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }
  ngOnInit() {
    this.service.isLoggedIn()
      .then(response=>{
        if(response.status===500){
          this.loggedIn=true;
        }
        else{
          this.loggedIn=false;
        }
      });
    this.service.isUserAdmin()
      .then(response =>{
        if(response.status===200){
          this.isAdmin=true;
        }
      });
  }

}
