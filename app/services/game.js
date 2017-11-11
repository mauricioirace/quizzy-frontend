import CrudService from './crud';
import axios from 'axios';

const REPOSITORY =  process.env.GAMES_API;

class GameService extends CrudService{
  constructor() {
    super(REPOSITORY)
  }

  create(game){
    return super.create({ game: game });
  }

  checkNameExist(name) {
    return axios.get(`${ this.repository }/${ name }`);
  }

}

const gameService = new GameService();

export default gameService;
