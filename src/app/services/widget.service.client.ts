export class WidgetServiceClient {
  findWidgetsForLesson(lessonId) {
    return fetch('https://assignment5-springboot.herokuapp.com/api/lesson/' + lessonId + '/widget')
      .then(response => response.json());
  }
}
