import CrudService from './crud'

const REPOSITORY =  process.env.MATCH_API;

class MatchService extends CrudService{

    constructor() {
        super(REPOSITORY)
    }

}

const matchService = new MatchService();

export default matchService;
