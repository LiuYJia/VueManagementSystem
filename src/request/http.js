/**
 * axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import { Message } from 'element-ui';
import $router from '../main';


// 配置baseUrl
if(process.env.NODE_ENV == "development"){
    axios.defaults.baseURL = '/api';
}else{
    axios.defaults.baseURL = 'http://www';
}

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(    
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = localStorage.getItem('backendToken');        
        token && (config.headers.token = token);  
        return config;    
    },    
    error => {        
        return Promise.error(error);    
    }
)

// 响应拦截器
axios.interceptors.response.use(    
    response => {   
        if (response.status === 200) {   
            if(typeof(response.data) == 'string' && response.data.indexOf('resultCode') != -1){
                response.data = JSON.parse(response.data)    
            }
            if(String(response.data.resultCode).length == 5){
                Message.error(response.data.resultMessage || '登陆超时，请重新登陆')
                localStorage.removeItem('backendToken')
                $router.push('/')
                return Promise.reject(response);  
            }else{
                return Promise.resolve(response);        
            }
        } else {            
            return Promise.reject(response);        
        }    
    },
    // 服务器状态码不是200的情况    
    error => {    
        Message.error('请求错误，请重试')
        // $router.push('/')
        return Promise.reject(error);        
    }
);

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        })        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {   
    return new Promise((resolve, reject) => {   
        axios.post(url, QS.stringify(params))        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}