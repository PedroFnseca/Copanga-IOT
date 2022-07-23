import axios from 'axios';

const api = axios.create({
  baseURL:'https://api-irrigacao.herokuapp.com'
})

export default api;