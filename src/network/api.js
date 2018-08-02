/*
 * @Author: fangguiliang 
 * @Date: 2018-07-28 11:13:14 
 * @Last Modified by: fangguiliang
 * @Last Modified time: 2018-07-31 18:30:18
 */

import {
    get,
    post,
    put,
    del,
    request
} from './http';
import * as CONFIG from '../configs/config';
const HOST = CONFIG.HOST;

function encodeUrl(api) {
    return `${HOST}/api/${api}`;
}

export function checkVersion(version, kind) {
    return get(encodeUrl('client/lastVersion'), { 'version': version, 'kind': kind });
}

export function remind(version, kind) {
    return get(encodeUrl('push/remind'));
}

/**
 * 微信code登录获取绑定信息和session，
 * 40203：用户已停用或你没有权限登陆系统
 * 80001：code已失效
 * 80002：未绑定
 * @param {string} code 
 */
export function wxCode2Session(code) {
    return get(encodeUrl('wx/login'), { 'code': code });
}