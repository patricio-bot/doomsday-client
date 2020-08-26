import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URI;

class User {
    constructor() {

        this.user = axios.create({
            baseURL: `${baseUrl}/api/user`,
            withCredentials: true
        });
    }

    getAll() {
        return this.user
            .get()
            .then(({ data }) => data);
    }

    getOne(id) {
        return this.user
            .get(`/${id}`)
            .then(({ data }) => data);
    }
    updateOne(userUpdated) {
        return this.user
            .put(`/edit`, userUpdated)
            .then(({ data }) => data);
    }
    addTasks(tasks) {
        return this.user
            .put(`/tasks`, { tasks })
            .then(({ data }) => data);
    }

}

const userService = new User();
export default userService;