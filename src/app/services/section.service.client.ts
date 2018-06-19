export class SectionServiceClient {

  SECTION_URL = 'https://assignment5-nodejs.herokuapp.com/api/course/COURSEID/section';

  findSectionsForStudent() {
    const url = 'https://assignment5-nodejs.herokuapp.com/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  updateSection(sectionId,section){
    console.log(section);
    const url = 'https://assignment5-nodejs.herokuapp.com/api/section/' + sectionId ;
    return fetch(url, {
      method: 'put',
      body: JSON.stringify({name:section.name,seats:section.seats}),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
  deleteSection(sectionId){
    const url = 'https://assignment5-nodejs.herokuapp.com/api/section/' + sectionId ;
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }
  enrollStudentInSection(sectionId) {
    const url = 'https://assignment5-nodejs.herokuapp.com/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }
  dropClassForStudent(enrollment){
    const url = 'https://assignment5-nodejs.herokuapp.com/api/section/' + enrollment.section._id + '/enrollment/'+enrollment._id;
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }
  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  createSection(courseId, name, seats) {
    const section = {courseId, name, seats};
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
