export class WidgetServiceClient {
  findWidgetsForLesson(lessonId) {
    return fetch('http://assignment5-springboot.herokuapp.com/api/lesson/' + lessonId + '/widget')
      .then(response => response.json());
  }
}
