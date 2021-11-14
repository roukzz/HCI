import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8000/api/user/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  
  editProfil(firstName,lastName,institution,email,password){
    return axios
    .post(API_URL + "updateUser", {
      institution,
      lastName,
      firstName,
      email,
      password
    })
    .then(response => {
      console.log("this is the response.data: "+JSON.stringify(response.data));
      const {lastName,firstName,institution} = response.data; 
      if (lastName && firstName && institution) {
        let currentUser = AuthService.getCurrentUser();
        //console.log("CURRENT USER : "+ JSON.stringfy(currentUser));
        currentUser = {...currentUser,lastName,firstName,institution};
        localStorage.setItem("user", JSON.stringify(currentUser));
        console.log("edit profile successfull");
      }
      
      return response.data;
    });

  }
}

export default new UserService();