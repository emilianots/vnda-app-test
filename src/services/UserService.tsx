import Axios from 'axios';

import User from '../models/UserModel'

const baseURL = "http://localhost:3002/users";


export default class UserService {

    static getAllUsers() {
        return Axios.get(baseURL + '/list').then(response => response.data)
    }

    static getUser(id: number) {
        return Axios.get(baseURL + "/retrieve/" + id).then(res => res.data).catch(e => {
            console.log(e)
        })
    }

    static newUser(user: User) {
        return Axios.post(baseURL + '/register', user).then(res => res.data);
    }

    static updateUser(user: User) {
        return Axios.patch(baseURL + '/update/' + user.id).then(res => res.data);
    }

    static deleteUser(id: number) {
        return Axios.delete(baseURL + '/delete/' + id).then(res => res.data);
    }



}