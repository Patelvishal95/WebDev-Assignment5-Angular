export class LessonServiceClient {
  findLessonsForModule(moduleId) {
    return fetch('https://assignment5-springboot.herokuapp.com/api/module/' + moduleId + '/lesson')
      .then(response => response.json());
  }
}
