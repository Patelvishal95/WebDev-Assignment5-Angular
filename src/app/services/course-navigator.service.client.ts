export class CourseNavigatorServiceClient {
  findAllCourses() {
    return fetch('http://assignment5-springboot.herokuapp.com/api/course')
      .then(response => response.json());
  }
  findAllModulesForCourses(courseId) {
    return fetch('http://assignment5-springboot.herokuapp.com/api/course/' + courseId + '/module')
      .then(response => response.json());
  }
}
