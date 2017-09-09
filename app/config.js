import axios from 'axios';
// Axios
const HOST = process.env.API_HOST;
const PORT = process.env.API_PORT;
const URL  = `http://${ HOST }:${ PORT }`;

const configAxios = () => {
  axios.defaults.baseURL = URL;
  // axios.defaults.withCredentials = true;
};

const setupConfig = () => {
  configAxios();
};

export default setupConfig;
