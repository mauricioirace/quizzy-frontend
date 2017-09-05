import CrudService from './crud';
import axios from 'axios';
const REPOSITORY =  process.env.MATCH_API;

class MatchService extends CrudService{

    constructor() {
        super(REPOSITORY)
    }
    findByName(name) {
        return axios.get(`${ this.repository }/byName/${ name }`);
    }
}

const matchService = new MatchService();

export default matchService;
