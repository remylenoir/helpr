import axios from 'axios';

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

export default service;
