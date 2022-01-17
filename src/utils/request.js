import axios from "axios";
import { MessageBox } from 'element-ui';

// 创建axios实例
const request = axios.create({
  baseURL: "", //请求默认前缀
  timeout: 30000, //请求超时时间
  //请求头配置
  headers: {},
});
//请求拦截器
request.interceptors.request.use(
  (config) => {
    // config处理
    config = configTools(config);
    //加密处理
    config = encryption(config);
  },
  (error) => {
    console.error(error, "请求配置有误，请检查");
    return Promise.reject(error);
  }
);

//响应拦截器
request.interceptors.response.use(
  (config) => {
    //数据解密
    config = decrypt(config);
    //响应请求处理
    config = responseTools(config);
    //文件流处理
    if (config.responseType && config.responseType === 'blob') {
        return Promise.resolve({ data, headers })
      }
      return Promise.resolve(config.data)
  },
  (error) => {
    //对于响应code非200处处理
    responseError(error)

  }
);

//请求头处理
function configTools(config) {
  return config;
}
//加密处理
function encryption(config) {
  return config;
}
//解密处理
function decrypt(config) {
  return config;
}
//响应头处理
function responseTools(config){
    return config
}

function responseError(error){
    return error
}
