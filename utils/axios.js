import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/johanelbg/nuxt-todolist/todos/'
})

export default axiosInstance
