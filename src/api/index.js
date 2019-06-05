import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui';

//设置全局axios默认值
axios.defaults.timeout = 5000; //5秒的超时验证
axios.defaults.withCredentials = true;//跨域带cookie


function http(type, url, params, contentType) {
  let contentTypeUse = contentType === 'json' ? 'application/json' : 'application/x-www-form-urlencoded';
  let paramsUse = contentType === 'json' ? params : Qs.stringify(params);

  let obj = {
    url,
  };
  if (type === 'get') {
    obj.method = 'get';
    obj.params = params;

  } else {
    obj.method = 'post';
    obj.headers = { 'Content-Type': contentTypeUse };
    obj.data = paramsUse;
  }

  return new Promise((resolve, reject) => {
    axios(obj).then((res) => {
      var result = res.data;
      if (result.code == 200) {
          resolve(res)
      } else {
          reject(res)
      }
    }).catch((err) => {
      var errorData = {
          message: '系统出错'
      }
      err.data = errorData
      reject(err)
    })
  })
}

export default {
  http
}
