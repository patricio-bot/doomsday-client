import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URI;
class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: `${baseUrl}`,
      withCredentials: true,
    });
  }

  signup({ firstName, lastName, gender, email, password }) {
    return this.auth
      .post("/auth/signup", { firstName, lastName, gender, email, password })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  login({ email, password }) {
    return this.auth
      .post("/auth/login", { email, password })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
    // return this.auth.post("/auth/logout", {}).then((response) => response.data);
  }

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data);
    // return this.auth.get("/auth/me").then((response) => response.data);
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
