import CrudService from './crud';

const REPOSITORY =  process.env.GAMES_API;

class GameService extends CrudService{
  constructor() {
    super(REPOSITORY)
  }
}

const gameService = new GameService();

export default gameService;
