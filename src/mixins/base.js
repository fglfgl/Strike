/*
 * @Author: fangguiliang 
 * @Date: 2018-07-28 11:58:42 
 * @Last Modified by: fangguiliang
 * @Last Modified time: 2018-08-01 17:07:01
 * 基础混合类，方便在在Page、Component 等中使用，可以在使用类中重新定义
 * data数据，components组件，events事件是默认值模式
 * Page页面、methods方法是执行兼容默认，先触发使用者本身，再触发混合类
 */

import wepy from 'wepy'

export default class baseMixin extends wepy.mixin {
  /**
   * [isXXX 基础方法]
   * @param  {[type]}  item [object]
   * @return {Boolean}      [result]
   */
  isUndefined(item) {
    return typeof item === 'undefined';
  }
  isDefined(item) {
    return !this.isUndefined(item);
  }
  isString(item) {
    return typeof item === 'string';
  }
  isNumber(item) {
    return typeof item === 'number';
  }
  isArray(item) {
    return Object.prototype.toString.apply(item) === '[object Array]';
  }
  isObject(item) {
    return typeof item === 'object' && !this.isArray(item);
  }
  isFunction(item) {
    return typeof item === 'function';
  }

  /**
   * [JSON方法]
   * @param  {[type]}  item 
   * @return {Boolean}
   */
  $json(item) {
    let str = {type: Object.prototype.toString.call(item)};
    try {
      str = JSON.stringify(item);
    } catch (e) {
      str.error = e && e.stack || '';
    }
    return this.isString(str) ? str : this.$json(str);
  }
  $parse(item) {
    let obj = {type: Object.prototype.toString.call(item)};
    try {
      obj = JSON.parse(item);
    } catch (e) {
      obj.error = e && e.stack || '';
    }
    return this.isObject(obj) ? obj : this.$parse(obj);
  }
}
