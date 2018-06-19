import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {CourseServiceClient} from "../services/course.service.client";
import {Course} from "../models/coruse.model.client";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserServiceClient,
              private courseservice: CourseServiceClient) {
  }
  courses: Course[] = [];
  courseName = '';
  sections = [];
  sectionName = this.courseName + ' Section ' + 0;
  seats = '100';
  courseId = '0';
  idToUpdate = '';
  courseSelected(courseId){
    this.courseId=courseId;
    this.courseservice.findCourseById(this.courseId)
      .then(response => {
        this.courseName=response.title;
        this.sectionName = this.courseName + ' Section ' + this.sections.length;
        this.loadSections(this.courseId);
      });

  }
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



  ngOnInit() {


    this.courseservice.findAllCourses()
      .then(courses => {this.courses = courses;
      });
  }

}
