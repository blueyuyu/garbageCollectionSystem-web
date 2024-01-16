import axios from 'axios'

// process.env.VUE_APP_BASE_API
const service = axios.create({
  baseURL: 'http://localhost:9091',
  timeout: 5000
})

const showDebug = true

function printRequestInfo(config) {
  if (showDebug) {
    console.groupCollapsed(
      "%c%s %c请求参数",
      "color: blue;",
      config.url,
      "color:black",
    );
    // console.info("请求全量地址:%s%s", config.baseURL, config.url)
    const requestMethod = config.method;
    const requestHeader = config.headers;
    console.info("请求方法:%s", requestMethod);
    console.info("请求头:%o", requestHeader);
    let data = null;
    if ("get" === requestMethod) {
      data = config.params;
    }
    if ("post" === requestMethod) {
      data = config.data;
    }
    console.info("请求参数:%o", data);
    console.groupEnd();
  }
}
function printResponseInfo(response) {
  if (showDebug) {
    console.groupCollapsed(
      "%c%s %c返回参数",
      "color: blue;",
      response.config.url,
      "color:black",
    );
    console.info("请求真实地址:%s", response.headers["x-req-proxyurl"]);
    console.info("状态码:%c%s", "color: blue;", response.status);
    console.info("返回值:%o", response.data);
    console.groupEnd();
  }
}

service.interceptors.request.use(
  config => {
    //这里得加个判空条件
    // const admin = JSON.parse(window.localStorage.getItem('access-admin'))
    // if(admin != null) {  config.headers.Authorization = admin.data.token;
    // }
    printRequestInfo(config)
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    console.log('config', config);
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
// 响应拦截器，配置了之后，需要把响应结果return出去
service.interceptors.response.use(
  (response) => {
    printResponseInfo(response);
    return response;
  },
  (error) => {
    console.log('error', error);
  }

)

export default service
