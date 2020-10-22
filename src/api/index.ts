import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.baseURL = 'http://localhost:3300'

axios.interceptors.request.use((config: AxiosRequestConfig) => {


  return config
})

axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.data.err === 1) {
    return Promise.reject(response.data)
  }
  return response.data
},err => {
  return Promise.reject(err)
})

export default axios
