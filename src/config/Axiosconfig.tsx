import axios from 'axios'

// Ben sürekli olarak url vermek istemiyorm axiosun create fonk. ile axios ile her istek attığım da aynı url'ye atmasını sağlarım.
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3005',

});
export default axiosInstance