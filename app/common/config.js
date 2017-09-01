import axios from 'axios';

// Axios
const HOST = process.env.API_HOST;
const PORT = process.env.API_PORT;
const URL  = `${ HOST }:${ PORT }`;

const configAxios = () => {
    axios.defaults.baseURL = URL;
};

const setupConfig = () => {
    configAxios();
};

export default setupConfig;