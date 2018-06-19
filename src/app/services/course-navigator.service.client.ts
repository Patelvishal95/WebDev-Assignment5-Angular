export class CourseNavigatorServiceClient {
  findAllCourses() {
    return fetch('https://assignment5-springboot.herokuapp.com/api/course')
      .then(response => response.json());
  }
  findAllModulesForCourses(courseId) {
    return fetch('https://assignment5-springboot.herokuapp.com/api/course/' + courseId + '/module')
      .then(response => response.json());
  }
}
