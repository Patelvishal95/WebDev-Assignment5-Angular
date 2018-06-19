export class SectionServiceClient {

  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section';

  findSectionsForStudent() {
    const url = 'http://localhost:4000/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  updateSection(sectionId,section){
    console.log(section);
    const url = 'http://localhost:4000/api/section/' + sectionId ;
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
    const url = 'http://localhost:4000/api/section/' + sectionId ;
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }
  enrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }
  dropClassForStudent(enrollment){
    const url = 'http://localhost:4000/api/section/' + enrollment.section._id + '/enrollment/'+enrollment._id;
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
