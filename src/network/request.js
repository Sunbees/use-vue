import axios from 'axios';


export function request(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:8848',
    timeout: 5000,
  })

  // 请求拦截
  instance.interceptors.request.use(config => {
    // 如果有些接口需要认证才可访问，在这统一设置

    // 放行
    return config;
  }, error => {

  });

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data ? res.data : res;
  }, error => {
    // 如果有需要授权才可以访问的接口，统一去login配置

    // 如果有错误，会处理,显示错误信息
    // console.log(error.response.data.errors[Object.keys(error.response.data.errors)][0]);
    // Notify(error.response.data.errors[Object.keys(error.response.data.errors)[0]][0]);
  });

  return instance(config);
}