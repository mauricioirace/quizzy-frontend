import CrudService from './crud';
import axios from 'axios';
const REPOSITORY =  process.env.USERS_API;

class UserService extends CrudService{
  constructor() {
    super(REPOSITORY)
  }

  findByName(name) {
    return axios.get(`${ this.repository }/exists/${ name }`);
  }
}

const userService = new UserService();

export default userService;
