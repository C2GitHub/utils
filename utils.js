/* eslint-disable */
/*!
 * utilsjs v1.0.0   Provides a simple API
 *
 * Licensed under the MIT license.
 */


//
// 是否是Json格式
/**
 * @return {object | undefined | any}
 */
function isJSON(obj) {
  obj = JSON.stringify(obj);

  if (!/^\{[\s\S]*\}$/.test(obj)) {
      return false;
  }

  return true;
}

//
// 字符串化
/**
 * @return {string | any}
 */
function stringify(val) {
  return val === undefined || typeof val === "function" ? val + '' : JSON.stringify(val);
}


//
// 对象反序列化
/**
 * @return {object | undefined | any}
 */
function parse(value) {
  if (typeof value !== 'string') {
      return undefined;
  }

  try {
      return JSON.parse(value);
  } catch (e) {
      return value;
  }
}

//
// 是否是函数
/**
 * @return {boolean}
 */
function isFunction(value) {
  return {}.toString.call(value) === "[object Function]";
}

//
// 是否是数组
/**
 * @return {boolean}
 */
function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}

//
// 获取URL参数
/**
 * @return {string}
 */
function GetUrlKey(name) {
    let reg;
    reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//
// 格式时间
/**
 * @return {string}
 */
function TimeFormat(datetime) {
    let newd = datetime;
    if ((datetime + '').indexOf('-') !== -1) {
        newd = datetime.toString().replace(/-/g, '/');
    }
    const time = new Date(newd);
    const timestr = time.getTime();
    const now = new Date().getTime();
    const dif = now - timestr;
    if (dif < 60) return '刚刚';
    if (dif < 60 * 1000) {
        // return `${Math.floor(dif / (1000))}秒前`;
        return '刚刚';
    }
    if (dif < 60 * 60 * 1000) {
        return `${Math.floor(dif / (1000 * 60))}分钟前`;
    }
    if (dif < 24 * 60 * 60 * 1000) {
        return `${Math.floor(dif / (1000 * 60 * 60))}小时前`;
    }
    if (dif < 7 * 24 * 60 * 60 * 1000) {
        return `${Math.floor(dif / (1000 * 60 * 60 * 24))}天前`;
    }
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
}

// 精确到时间到秒的格式化
function TimeFormatSeconds(datatime) {
    const date = new Date(datatime);
    const Y = `${date.getFullYear()}-`;
    const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
    const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
    const h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
    const m = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:`;
    const s = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds());
    return `${Y}${M}${D}${h}${m}${s}`;
}
//
// 函数节流 减少代码执行频率
function throttle(fn, interval = 500) {
    let run = true;
    return function() {
        if (!run) return;
        run = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            run = true;
        }, interval);
    };
}

//
// hasClass
function hasClass(ele, cls) {
    return (new RegExp(`(\\s|^)${cls}(\\s|$)`)).test(ele.className);
}

//
// addClass
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }
}

//
// removeClass
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
        ele.className = ele.className.replace(reg, ' ');
    }
}

export {
    GetUrlKey,
    TimeFormat,
    throttle,
    hasClass,
    addClass,
    removeClass,
    TimeFormatSeconds,
};