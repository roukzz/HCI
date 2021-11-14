import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstName, lastName, institution, email, password) {

    return axios.post(API_URL + "register", {
      firstName,
      lastName,
      institution,
      email,
      password
    });
  }

  forgotPassword(email){
    return axios.post(API_URL + "forgetPassword",{
      email
    });
  }

  resetPassword(resToken,newPassword){
    return axios.post(API_URL + "resetPassword",{
      resToken,
      newPassword
    });

  }

  // update(firstName,lastName, institution,email,password){
  //   return axios.post(API_URL+"")
  // }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
