import axios from 'axios';

class CrudService {
    /**
     * Path in the REST API that represents some kind of entity
     * e.g. /game is game's repository
     */
    repository;

    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Attempts to creates an element and return the
     * corresponding promise.
     *
     * @param elem
     * @returns {AxiosPromise}
     */
    create(elem) {
        return axios.post(this.repository,elem);
    }


    /**
     * Retrieve the element whiches id is 'id' and return the
     * corresponding promise.
     * If no id is provided, then the repository list all its elements.
     *
     * @param id (OPTIONAL) The id of the element to get,
     *  or nothing to get all the elements in the repository
     * @returns {AxiosPromise}
     */
    retrieve(id) {
        const id = id === undefined ? '' : id;
        return axios.get(`${ this.repository }/${ id }`);
    }

    /**
     * Attempts to update an elemenst info, and return
     * the corresponding promise.
     *
     * @param elem
     * @returns {AxiosPromise}
     */
    update(elem) {
        return axios.put(this.repository,elem);
    }

    /**
     * Delete the element from the repository whiches id is 'id'
     *
     * @param id
     * @returns {AxiosPromise}
     */
    destroy(id) {
        return axios.delete(`${ this.repository }/${ id }`);
    }
}
export default CrudService;