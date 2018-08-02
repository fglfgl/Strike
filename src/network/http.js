/*
 * @Author: fangguiliang 
 * @Date: 2018-07-30 15:40:19 
 * @Last Modified by: fangguiliang
 * @Last Modified time: 2018-08-01 09:40:25
 */
import wepy from 'wepy';
import 'wepy-async-function';
import {
    USER_CODE,
    isUndefined
} from '../utils/global';
import * as API from './api';
/**
 * 请求方法
 */
const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

/**
 * 封装小程序网络请求类
 * wepy.request 执行后返回 requestTask,调用abort()可以取消请求
 * 参数可以参考：https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html?t=20161122
 */

/**
 * HTTP状态码处理
 * @param {Number} statusCode 
 * @return 状态码描述
 */
function _serverRequestError(statusCode) {
    let errorDesc = '';
    return `${statusCode} ${errorDesc}`;
};
/**
 * 通用参数
 */
function _datas() {
    return {};
}
/**
 * 通用请求头
 */
function _headers() {
    return {};
}
/**
 * 微信无需用户授权的登录
 */
async function _wxLogin() {
    return await wepy.login()
        .then((res) => {
            if (res.errMsg == 'login:ok' && res.code != 'undefined') {
                wepy.setStorageSync(USER_CODE, res.code);
                return res.code;
            } else {
                throw new Error('login获取code错误', res.errMsg);
            }
        });
}

export function get(url = '', data = {}, headers = {}) {
    return request(url, headers, METHOD.GET, data);
}

export function post(url = '', data = {}, headers = {}) {
    return request(url, headers, METHOD.POST, data);
}

export function put(url = '', data = {}, headers = {}) {
    return request(url, headers, METHOD.PUT, data);
}

export function del(url = '', data = {}, headers = {}) {
    return request(url, headers, METHOD.DELETE, data);
}

/**
 * 授权后重新发送请求
 * @param {object} req  
 */
export async function authorizeAndRequest(req) {
    let code = wepy.getStorageSync(USER_CODE);
    console.log('code:', code)
    let codePromise;
    // 获取缓存code
    if (code == 'undefined' && code.length > 0) {
        codePromise = await wepy.checkSession()
            .then((res) => {
                if (res.errMsg != 'checkSession:ok' || isUndefined(res.code)) {
                    return _wxLogin();
                }
                return code;
            })
    } else {
        codePromise = await _wxLogin();
    }

    return await API.wxCode2Session(code)
        .then((res => {
            console.log('authorize success 重新请求');
            return request(req.url, req.header, req.method, req.data, false);
        }));

    // 模拟授权
    // return await API.checkVersion('android.store.client', '2.30.0')
    //     .then((res => {
    //         console.log('authorize:success', res);
    //         return request(req.url, req.header, req.method, req.data, false);
    //     }));
};


/**
 * 带重新授权的请求
 */
export async function request(url = '', headers = {}, method = METHOD.GET, data = {}, autoAuthorize = true) {
    // 请求体
    const request = {
        url,
        method: method in METHOD ? method : METHOD.GET,
        header: Object.assign(_headers(), headers),
        data: Object.assign(_datas(), data)
    };

    console.table(request);

    let response = await wepy.request(request)
        .then((res) => {
            // 处理HTTPcode
            let code = res.statusCode;
            if (code === 200) {
                return res.data;
            } else if (code === 455 && autoAuthorize) {
                return authorizeAndRequest(request);
            } else {
                throw new Error("http 错误:" + res);
            }
        })
        .then((res) => {
            if (isUndefined(res) || isUndefined(res.data)) {
                throw new Error('res错误');
            }
            if (isUndefined(res.data.code) || res.data.code !== 200) {
                // 处理业务code
                throw new Error('res code 错误');
            }
            return res.data;
        })
        .catch((error) => {
            console.log('[Fail]', error);
            throw error;
        });
    return response;
}
