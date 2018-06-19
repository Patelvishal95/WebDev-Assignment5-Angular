import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {Course} from "../models/coruse.model.client";
import { SectionServiceClient} from  '../services/section.service.client';
@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private userService:UserServiceClient,
              private sectionService:SectionServiceClient) { }
  isStudent=false;
  courses: Course[] = [];
  sections= [];
  courseRegistered;
  loadSections() {
    this.sectionService
      .findSectionsForStudent()
      .then(sections => {this.sections = sections;
        this.generateCourseRegisteredList();} );
  }
  generateCourseRegisteredList(){
    this.courseRegistered=new Array(this.sections.length);
    for(var sec in this.sections){
      for(var cor in this.courses){
        if(this.sections[sec].section.courseId===this.courses[cor].id){
          this.courseRegistered[sec]={section:this.sections[sec].section,course:this.courses[cor]};
        }
      }
    }
  }
  ngOnInit() {


    this.service.findAllCourses()
      .then(courses => {this.courses = courses;
        this.loadSections();
      });
    this.userService.isUserAdmin()
      .then(response =>{
        if(response.status===500){
          this.isStudent=true;
        }
      })

  }

}
