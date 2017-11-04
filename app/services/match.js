import CrudService from './crud';
import axios from 'axios';

const REPOSITORY =  process.env.MATCHES_API;

class MatchService extends CrudService {
  constructor() {
    super(REPOSITORY)
  }

  findByName(name) {
    return axios.get(`${ this.repository }/byName/${ name }`);
  }

  rankingInsert(id, user, points) {
    return axios.put(`${ this.repository }/${ id }`, { user: user, points: points });
  }

  getRanking(id) {
    return axios.get(`${ this.repository }/${ id }?v=ranking`);
  }
  
  update(match) {
    return super.update({ match: match }, match.id);
  }

  create(match) {
    return super.create({ match: match });
  }
}

const matchService = new MatchService();

export default matchService;
