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

  getIsRealTime(id) {
    return axios.get(`${ this.repository }/${ id }?v=isReal`);
  }

  update(match) {
    return super.update({ match: match }, match.id);
  }

  create(match) {
    return super.create({ match: match });
  }

  decrypt(question) {
     const lengthAnswers = question.answers.length;
     let numberDifficulty;
     if (question.difficulty === 'Easy') {
       numberDifficulty = 20;
     } else if (question.difficulty === 'Medium') {
       numberDifficulty = 40;
     } else {
       numberDifficulty = 60;
     };
     const lengthText = question.text.length;
     return question.correctAnswer / lengthText + lengthAnswers - numberDifficulty;
   }

  landingMatches() {
    return axios.get(`${ this.repository }/landing`);
  }
}

const matchService = new MatchService();

export default matchService;
