export class UserServiceClient {

  findUserById(userId) {
    return fetch('https://assignment5-nodejs.herokuapp.com/api/user/' + userId)
      .then(response => response.json());
  }
  isUserAdmin() {
    return fetch('https://assignment5-nodejs.herokuapp.com/api/login/isAdmin', {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
  updateUser(user){
    return fetch('https://assignment5-nodejs.herokuapp.com/api/profile', {
      method: 'put',
      body: JSON.stringify(user),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return fetch('https://assignment5-nodejs.herokuapp.com/api/login', {
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
  isLoggedIn(){
    return fetch('https://assignment5-nodejs.herokuapp.com/api/login', {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  logout() {
    return fetch('https://assignment5-nodejs.herokuapp.com/api/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  profile() {
    return fetch('https://assignment5-nodejs.herokuapp.com/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      })
      .then(response => response.json());
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch('https://assignment5-nodejs.herokuapp.com/api/user', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
