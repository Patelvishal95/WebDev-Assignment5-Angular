export class LessonServiceClient {
  findLessonsForModule(moduleId) {
    return fetch('http://assignment5-springboot.herokuapp.com/api/module/' + moduleId + '/lesson')
      .then(response => response.json());
  }
}
