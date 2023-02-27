import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui';

const instance = axios.create({
  baseURL: '/java-image-bed',
  timeout: 5000,    // 超时
});
// 添加响应拦截器
instance.interceptors.response.use(res=>{
  return res.data;
},err=>{
  if (err && err.message && err.message.indexOf('timeout') > -1) {
    return Promise.reject("请求超时");
  }
  if(err && err.response && err.response.status == 503) {
    Message.error("服务暂时不可用，请稍后再试");
    return Promise.reject("服务暂时不可用");
  }
  // 响应拦失败拦截
  return Promise.reject(err)
})

const get = (url, data) => {
  return instance({
    method: "get",
    url: url,
    params: data,
    headers: {'code': sessionStorage.code},
    paramsSerializer: function(params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
  })
}


const post = (url, data) => {
  return instance({
    method: "post",
    url: url,
    data: data || {},
    headers: {'code': sessionStorage.code},
  })
}

const put = (url, data) => {
  return instance({
    method: "put",
    url: url,
    data: data || {},
    headers: {'code': sessionStorage.code},
  })
}

const del = (url, data) => {
  return instance({
    method: "delete",
    url: url,
    data: data || {},
    headers: {'code': sessionStorage.code},
  })
}

const upload = (url, data) => {
  return instance({
    method: "post",
    url: url,
    data: data || {},
    headers: {'Content-Type': 'multipart/form-data', 'code': sessionStorage.code},
  })
}

export default {get, post, put, del, upload}


