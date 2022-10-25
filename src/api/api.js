import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1',
});

export default {
  getRoversImages(rover, querys) {
    return instance.get(`/rovers/${rover}/photos?&api_key=${apiKey}${querys}`);
  },
};
