/*
 * @Author: fangguiliang 
 * @Date: 2018-07-31 15:29:15 
 * @Last Modified by: fangguiliang
 * @Last Modified time: 2018-07-31 17:54:27
 */


// 微信登录code
export const USER_CODE = "user_code";

export function  isUndefined(item) {
    return typeof item === 'undefined';
}

export function  isDefined(item) {
    return !this.isUndefined(item);
}

export function  isString(item) {
    return typeof item === 'string';
}

export function  isNumber(item) {
    return typeof item === 'number';
}

export function  isArray(item) {
    return Object.prototype.toString.apply(item) === '[object Array]';
}

export function isObject(item) {
    return typeof item === 'object' && !this.isArray(item);
}

export function isFunction(item) {
    return typeof item === 'function';
}