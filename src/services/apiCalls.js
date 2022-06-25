import axios from 'axios';
import ApiUrls from '../apiUrls/apiConstants';

export default class Api {
    constructor() {
      this.api_token = null;
      this.client = null;
      this.api_url = 'https://jsonplaceholder.typicode.com/';
    }
    init = () => {
      let headers = {
        Accept: "application/json"
      };
      this.client = axios.create({baseURL: this.api_url, timeout: 31000, headers: headers});
      return this.client;
    };
    getPhotosList = (params) => {
      return this.init().get(ApiUrls.photos, {params: params});
    };
  }