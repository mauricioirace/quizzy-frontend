import axios from 'axios';
import AbstractCrudService from './crud-service'

const REPOSITORY =  process.env.GAMES_API;

class GameService extends AbstractCrudService{

    constructor() {
        super(REPOSITORY)
    }

}

const gameService = new GameService();

export default gameService;