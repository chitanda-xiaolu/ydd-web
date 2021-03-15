import axios from 'axios'
import Vue from 'vue'
// import router from './router'

const http = axios.create({
    // baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    baseURL: 'http://localhost:3000/admin/api'
  })


//请求拦截器
http.interceptors.request.use(function(config) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
    return config
}, function (error) {
    return Promise.reject(error)
})

http.interceptors.response.use(res => {
    return res
  },err => {
    //如果返回报错信息，则提示报错信息
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
      })
    }
    return Promise.reject(err)
  })

  export default http