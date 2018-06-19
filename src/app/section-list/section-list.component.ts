import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {CourseServiceClient} from "../services/course.service.client";

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserServiceClient,
              private courseservice: CourseServiceClient) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']))
  }
  isAdmin =false;
  courseName = '';
  sections = [];
  isAnonymous=true;
  sectionName = this.courseName + ' Section ' + 0;
  seats = '100';
  courseId = '';
  idToUpdate = '';
  loadSections(courseId) {
    this.courseId = courseId;
    this
      .service
      .findSectionsForCourse(courseId)
      .then(sections => {
        this.sections = sections;
        this.sectionName = this.courseName + ' Section ' + this.sections.length;});
  }
  clicked(section){
    this.sectionName=section.name;
    this.seats=section.seats;
    this.idToUpdate=section._id;
  }
  delete(sectionId){
    this.sectionName='';
    this.seats='';
    this.idToUpdate='';
    this.service.deleteSection(sectionId)
      .then( ()=>{
          this
            .service
            .findSectionsForCourse(this.courseId)
            .then(sections => this.sections = sections);
        this.sectionName = this.courseName + ' Section ' + (this.sections.length);
        }
      )
  }
  update(section){
    this.service.updateSection(section._id,{name:this.sectionName,seats:this.seats})
      .then( ()=>{
          this
            .service
            .findSectionsForCourse(this.courseId)
            .then(sections => this.sections = sections);
          this.sectionName='';
          this.seats='';
        }
      )
  }
  createSection(sectionName, seats) {
    this.sectionName = this.courseName + ' Section ' + (this.sections.length+1);
    this
      .service
      .createSection(this.courseId, this.sectionName, this.seats)
      .then(() =>
        this.loadSections(this.courseId)
      );
  }

  enroll(section) {
    // alert(section._id);
    this.service
      .enrollStudentInSection(section._id)
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

  ngOnInit() {
    this.userService.isUserAdmin()
      .then(response =>{
        if(response.status===200){
          this.isAdmin=true;
          this.isAnonymous=true;
        }
        else if(response.status===501){
          this.isAnonymous=true;
        }
        else{
          this.isAdmin=false;
          this.isAnonymous=false;
        }
      });
    this.courseservice.findCourseById(this.courseId)
      .then(response => {
        this.courseName=response.title;
        this.sectionName = this.courseName + ' Section ' + this.sections.length;
      });
  }

}
