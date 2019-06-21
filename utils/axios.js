import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/johanelbg/nuxt-todolist/'
})

export default axiosInstance
