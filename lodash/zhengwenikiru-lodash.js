var zhengwenikiru = function () {
  // 定义一个叫zw的函数，返回的是对象，对象的属性名是内部写的函数名，属性值是函数源代码。

  //iteratee  根据不同类型生成不同的断言函数
  function iteratee(arg) {
    if (isFunction(arg)) return arg
    if (isString(arg)) return function (element) { return get(element, arg) }
    if (isArray(arg)) return matchesProperty(...arg)
    if (isObject(arg)) return matches(arg)
  }
  function isFunction(value) {
    return typeof value === 'function'
  }
  function isString(value) {
    return getTag(value) === '[object String]'
  }
  function isArray(value) {
    return Array.isArray(value)
  }
  function isObject(obj) {
    return (typeof (obj) === 'object' || typeof (obj) === 'function') && obj !== null
  }
  function matchesProperty(arr) {
    return function (obj) {
      if (!(ary[0] in obj)) return false
      else if (!isEqual(ary[1], obj[ary[0]])) return false
      else return true
    }
  }
  function matches(obj) {
    return function (src) {
      for (var key in obj)
        if (obj[key] !== src[key]) return false
      return true
    }
  }

  function getTag(value) {
    if (value == null)
      return value === undefined ? '[object Undefined]' : '[object Null]'
    return toString.call(value)
  }

  function get(object, path, defaultValue) {
    if (isString(path)) {
      let reg = /\w+/g;
      path = path.match(reg);
    }

    for (let v of path) {
      if (isFunction(object[v])) {
        func = object[v];
        continue;
      }
      if (object[v]) object = object[v] // object存在
      else return defaultValue          // object为undefined
    }
    return object;
  }


  //-------------------------------------------------


  //chunk 数组分隔
  function chunk(array, size) {
    var final = []
    var start = 0
    var end = start + size
    while (start < array.length) {
      var finalitem = []
      if (end > array.length - 1) {
        for (let j = start; j < array.length; j++) {
          finalitem.push(array[j])
        }
      }
      else {
        for (let i = start; i < end; i++) {
          finalitem.push(array[i])
        }
      }
      start = end
      end = end + size
      final.push(finalitem)
    }
    return final
  }

  // compact数组清理
  function compact(a) {
    var final = []
    for (num in a) {
      if (a[num])
        final.push(a[num])
    }
    return final
  }

  //concat数组/值 拼接
  function concat(array, values) {
    for (let i = 1; i < arguments.length; i++) {
      if (Array.isArray(arguments[i])) {
        array.push(...arguments[i])
      } else {
        array.push(arguments[i])
      }
    }
    return array
  }

  //difference
  function difference(array, ...arguments) {
    var side = [].concat(...arguments)
    var res = []
    for (i = 0; i < array.length; i++) {
      if (!side.includes(array[i]))
        res.push(array[i])
    }
    return res
  }

  //differenceBy
  function differenceBy(array, ...values) {
    var res = []
    var newValues = values.slice(0, -1)
    var per = values[values.length - 1]
    if (newValues.length > 1) {
      newValues = newValues.reduce((a, b) => { a.concat(b) })
    } else {
      newValues = newValues[0]
    }
    if (typeof per == "function") {
      var valuesPer = newValues.map(per)
      var arrayPer = array.map(per)
      for (var i = 0; i < arrayPer.length; i++) {
        if (!valuesPer.includes(arrayPer[i])) {
          res.push(array[i])
        }
      }
    } else if (typeof per == 'string') {
      var valuesPer = newValues.map(it => it[per])
      var arrayPer = array.map(it => it[per])
      for (var i = 0; i < arrayPer.length; i++) {
        if (!valuesPer.includes(arrayPer[i])) {
          res.push(array[i])
        }
      }
    } else if (Array.isArray(per)) {
      newValues = newValues.concat(per)
      for (var i = 0; i < arrayPer.length; i++) {
        if (!valuesPer.includes(arrayPer[i])) {
          res.push(array[i])
        }
      }
    }
    return res
  }

  //flattenDeep
  function flattenDeep(array) {
    var result = []
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        result.push(...flattenDeep(array[i]))
      }
      else
        result.push(array[i])
    }
    return result
  }

  //flattenDepth
  function flattenDepth(array, deep) {
    if (deep == 0) return array
    var result = []
    for (let i = 0; i < array.length; i++) {
      var element = array[i]
      if (Array.isArray(element)) {
        element = flattenDepth(element, deep - 1)
        result = result.concat(element)
      }
      else
        result.push(element)
    }
    return result
  }

  //zip
  function zip(...arrays) {
    var final = []
    var max = 0
    for (i = 0; i < arrays.length; i++) {
      max = arrays[i].length > max ? arrays[i].length : max
    }//找到数组元素中最长的子元素
    for (j = 0; j < max; j++) {
      let tempt = []
      for (let k = 0; k < arrays.length; k++) {
        tempt.push(arrays[k][j])
      }
      final.push(tempt)
    }
    return final
  }

  //unzip
  function unzip(array) {
    var final = []
    var max = 0
    for (let i = 0; i < array.length; i++) {
      max = array[i].length > max ? array[i] : max
    }
    for (let j = 0; j < array.length; j++) {
      var tempt = []
      for (let k = 0; k < max; k++) {
        tempt.push(array[k][j])
      }
      final.push(tempt)
    }
    return final
  }

  //uniq
  function uniq(array) {
    var res = []
    for (k in array) {
      if (!res.includes(array[k])) {
        res.push(array[k])
      }
    }
    return res
  }

  //groupBy
  function groupBy(a, f) {
    if (!f) return a
    var keys = Object.keys(a)
    var c = dif(f)
    var obj = {}
    for (let k of keys) {
      if (!obj[c(a[k])]) {
        obj[c(a[k])] = [a[k]]
      } else {
        obj[c(a[k])].push(a[k])
      }
    }
    return obj
    function dif(f) {
      if (typeof f == 'function') return f
      if (typeof f == 'string') return k => k[f]
    }

  }

  //fill
  function fill(a, value, start = 0, end = a.length) {
    for (i = start; i < end; i++) {
      a[i] = value
    }
    return a
  }


  //parseJSON
  function parseJSON(input) {
    var str = input
    var i = 0
    return parseValue()

    function parseValue() {
      var c = str[i]
      if (c == '[') {
        return parseArray()
      }
      if (c == '{') {
        return parseObject()
      }
      if (c == '"') {
        return parseString()
      }
      if (c == 't') {
        return parseTrue()
      }
      if (c == 'f') {
        return parseFlase()
      }
      if (c == 'n') {
        return parseNull()
      }
      //走到这就只能是数字了
      return parseNumber()
    }

    //从i指向的位置解析出一个true，并将i指向true的下一个位置
    function parseTrue() {
      i += 4
      return true
    }

    function parseFalse() {
      i += 5
      return false
    }

    function parseNull() {
      i += 4
      return null
    }


    //从i指向的位置(此时是'"')解析出一个字符串，并将i移动到字符串之后
    function parseString() {
      i++//跳过当前的双引号
      var result = ''
      while (str[i] !== '"') {
        result += str[i++]
      }
      i++//跳过字符串结束的双引号
      return result
    }

    //从i指向的位置解析出一个数值，此时i已经指向的数值的第一个数字
    function parseNumber() {
      var numStr = ''
      while (str[i] >= '0' && str[0] <= '9') {
        numStr += str[i++]
      }
      return Number(numStr)
    }

    //此时i指向数组开始的[ ，解析出一个数组，移动i到数组后面，并返回数组
    function parseArray() {
      var result = []
      i++
      if (str[i] == ']') {
        i++
        return result
      }
      while (true) {
        var val = parseValue()
        result.push(val)
        if (str[i] == ']') {
          i++
          return result
        }
        if (str[i] == ',') {
          i++//跳过这个逗号 
        }
      }
    }

    //此时i指向对象开始的中括号({),解析出这个对象,移动i到对象后面，并返回这个对象
    function parseObject() {
      var result = {}
      i++
      if (str[i] == '}') {
        i++
        return result
      }
      while (true) {
        var key = parseString()
        i++//跳过冒号
        var val = parseValue()
        result[key] = val
        if (str[i] == '}') {
          i++
          return result
        } else if (str[i] == ',') {
          i++
        }
      }
    }
  }

  //indexOf
  function indexOf(ary, value, start = 0) {
    for (let i = start; i < ary.length; i++) {
      if (ary[i] == value) {
        return i
      }
    }
  }

  //drop
  function drop(ary, n = 1) {
    if (!ary) return []
    if (n == 0) return ary
    if (n > ary.length) return []
    let res = []
    for (let i = n; i < ary.length; i++) {
      res.push(ary[i])
    }
    return res
  }

  //dropRight
  function dropRight(ary, n = 1) {
    if (!ary) return []
    if (n == 0) return ary
    if (n > ary.length) return []
    for (let i = 0; i < n; i++) {
      ary.pop()
    }
    return ary
  }

  //dropRightWhile
  function dropRightWhile(ary, predicate) {
    predicate = iteratee(predicate)
    for (let i = ary.length - 1; i > 0; i--) {
      if (!predicate(ary[i], i, ary)) {
        break
      }
    }
    return ary.slice(0, i + 1)
  }

  //fromPairs
  function fromPairs(array) {
    var obj = {}
    for (let item of array) {
      obj[item[0]] = item[1]
    }
    return obj
  }

  //head
  function head(array) {
    return array[0]
  }

  //initial
  function initial(array) {
    array.pop()
    return array

  }

  //intersection
  function intersection(...arrays) {
    var head = arrays[0]
    var res = []
    for (let i = 0; i < head.length; i++) {
      var uniq = head[i]
      for (let j = 0; j < arrays.length; j++) {
        if (!arrays[j].includes(uniq)) {
          break
        }
      }
      if (j == arrays.length) {
        res.push[uniq]
      }
    }
    return res
  }

  //join
  function join(array, str) {
    var res = ''
    for (let i = 0; i < array.length - 1; i++) {
      res += array[i].toString() + str
    }
    res += array[array.length - 1]
    return res
  }

  //nth
  function nth(array, n) {
    if (n >= 0) {
      return array[n]
    } else {
      return array[array.length + n]
    }
  }

  //isEqual
  function isEqual(obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)) return obj1 === obj2    //任意一个为对象
    var obj1Keys = Object.keys(obj1), obj2Keys = Object.keys(obj2)  //都是对象或数组
    if (obj1Keys.length !== obj2Keys.length) return false
    for (let key in obj1) {
      var res = isEqual(obj1[key], obj2[key])          //递归比较
      if (!res) return false
    }
    return true
  }

  //isMatch
  function isMatch(object, source) {
    if (object === source) return true
    if (typeof object !== 'object' || typeof source !== 'object') {
      return false
    }
    for (let key in source) {
      if (source[key] && typeof source[key] !== 'object') {
        if (object[key] !== source[key]) {
          return false
        }
      } else {
        if (!isMatch(object[key], source[key]))
          return false
      }
    }
    return true
  }


  //findIndex
  function findIndex(src, pre, origin = 0) {
    if (isFunction(pre)) {
      for (let i = origin; i < src.length; i++) {
        if (pre(src[i]))
          return i
      }
      return -1
    }
    if (isArray(pre)) {
      for (let i = origin; i < src.length; i++) {
        if (pre[0] in src[i] && pre[1] == src[i][pre[0]]) {
          return i
        }
      }
      return -1
    }
    if (isObject(pre)) {
      for (let i = origin; i < src.length; i++) {
        if (src[i] == pre)
          return i
      }
      return -1
    }
    if (isString(pre)) {
      for (let i = origin; i < src.length; i++) {
        if (pre in src[i] && src[i][pre])
          return i
      }
      return -1
    }
  }

  //findLastIndex
  function findLastIndex(src, pre, origin = src.length - 1) {
    if (isFunction(pre)) {
      for (let i = origin; i >= 0; i--) {
        if (pre(src[i]))
          return i
      }
      return -1
    }
    if (isArray(pre)) {
      for (let i = origin; i >= 0; i--) {
        if (pre[0] in src[i] && pre[1] == src[i][pre[0]]) {
          return i
        }
      }
      return -1
    }
    if (isObject(pre)) {
      for (let i = origin; i >= 0; i--) {
        if (src[i] == pre)
          return i
      }
      return -1
    }
    if (isString(pre)) {
      for (let i = origin; i >= 0; i--) {
        if (pre in src[i] && src[i][pre])
          return i
      }
      return -1
    }
  }

  //flatten
  function flatten(array) {
    var result = []
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        for (let j = 0; j < array[i].length; j++) {
          result.push(array[i][j])
        }
      }
      else
        result.push(array[i])
    }
    return result
  }

  //frompairs
  function frompairs(array) {
    var obj = {}
    for (let i = 0; i < array.length; i++) {
      obj[array[i][0]] = array[i][1]
    }
    return obj
  }

  //head
  function head(ary) {
    return ary[0]
  }

  //initial
  function initial(ary) {
    ary.pop()
    return ary
  }

  //intersection
  function intersection(...arrays) {
    var sample = arrays[0]
    var res = []
    for (let i = 0; i < sample.length; i++) {
      for (let j = 1; j < arrays.length; j++) {
        if (arrays[j].includes(sample[i])) {
          res.push(sample[i])
        }
      }
    }
    return res
  }

  //intersectionBy
  function intersectionBy(...arrays, iteratee) {
    if (isFunction(iteratee)) {
      var sample = arrays[0].map(it => iteratee(it))
      for (i = 1; i < arrays.length; i++) {
        arrays[i].map(it => iteratee(it))
      }
      var res = []
      for (let i = 0; i < sample.length; i++) {
        for (let j = 1; j < arrays.length; j++) {
          if (arrays[j].includes(sample[i])) {
            res.push(sample[i])
          }
        }
      }
      return res
    }
    if (isString(iteratee)) {
      var sample = arrays[0]
      var res = []
      for (let j = 1; j < arrays.length; j++) {
        if (arrays[j][iteratee] == sample[iteratee]) {
          var obj = {}
          obj[iteratee] = sample(iteratee)
          res.push(obj)
        }
      }
      return res
    }
    
     //Gets a random element from collection.
     function sample(collection) {
      let keys = Object.keys(collection)
      let len = keys.length
      let idx = Math.random() * len | 0
      return collection[keys[idx]]
  }

  // we need n * sample
  function sampleSize(collection, n = 1) {
      let keys = Object.keys(collection)
      let len = keys.length
      if (n <= 0) {
          return []
      } else if (n > len) {
          n = len
      }
      let result = []
      while (n) {
          let idx = Math.random() * keys.length | 0
          swap(keys, idx, keys.length - 1)
          result.push(collection[keys.pop()])
          n--
      }
      return result
  }

  //Object.keys完成了for in + hasOwnProperty
  function size(collection) {
      if (collection && typeof collection == 'object') {
          if (Array.isArray(collection)) {
              return collection.length
          }
          return Object.keys(collection).length
      } else if (typeof collection == 'string') {
          return collection.length
      }
      return
  }

    //延迟 1ms执行func
    function defer(func, ...args) {
      let timerId = setTimeout(() => {
          func.apply(null, args)
      })
      return timerId - 1
  }

  //setTimeout会自动进行'1000' => 1000，里面应该是用了Number()而非parseInt
  function delay(func, wait, ...args) {
      let timerId = setTimeout(() => {
          func.apply(null, args)
      }, wait)
      return timerId - 1
  }

  // 使func只接n个参数
  function ary(func, n = func.length) {
      return function(...args) {
          return func.apply(window, args.slice(0, n))
      }
  }

  // 使func只接受1个参数
  function unary(func) {
      return function(...args) {
          return func.call(null, args[0])
      }
  }

  // 返回predicate运行的否定的结果
  function negate(predicate) {
      return function(...args) {
          if (typeof predicate != 'function') {
              throw new Error('negate只能接一个函数')
          }
          let result = predicate.call(this, ...args)
          return !result
      }
  }

  //限制func只能被调用一次，调用多次时返回第一次的调用结果
  //function a (k) { return k + 1 };var init = _.once(a);
  //init(5) //6  init(10) //6
  function once(func) {
      let n = 0
      let firstResult //把第一次结果与是否是第一次调用保存在闭包里
      return function(...args) {
          if (n == 0) {
              firstResult = func.apply(this, args)
              n++
          }
          return firstResult
      }
  }
   //空翻 希望func函数在调用时，参数是反向传递的
   function flip(func) {
    return function(...args) {
        return func.apply(this, args.reverse())
    }
}

  //函数柯里化：强制接参个数直到指定的数量，否则就不
  function curry(func, arity = func.length) {
    return _curry.call(this, func, arity)
}

function _curry(func, arity, ...args) {
    return function(...restArgs) {
        let params = args.concat(restArgs)
        if (params.length >= arity) {
            return func.call(this, ...params)
        } else {
            return _curry.call(this, func, arity, ...params)
        }
    }
}

//from xieran
function curry2(func, arity = func.length) {
    return function curried(...args) {
        if(args.length < arity) {
            return curry2(func.bind(this, ...args), arity - args.length)
        } else {
            return func.call(this, ...args)
        }
    }
}



function curryWrong(func, arity = func.length) {
    return function exec(func, ...args) {
            if (args.length >= arity) {
                func.apply(this, args)
            } else {
                return curryWrong(exec.bind(this, func, ...args), arity - (args.length))
            }
        }
        // bind(exec, bind.placeholder, func)
}


function curryWrong(func, arity = func.length) {
    return function exec(...args) {
        if (arity <= args.length) {
            return func.call(this, ...args)
        } else { //直到参数个数
            return function(...rest) {
                let params = args.concat(rest)
                if (params.length >= arity) {
                    return func.call(this, ...params)
                } else {
                    return exec(params)
                }
            }

        }
    }
}

function isGreeting(val) {
  return /^h(?:i|ello)$/.test(val)
}

//The customizer is invoked with up to six arguments: (objValue, othValue [, index|key, object, other, stack]).
function customizer(objValue, othValue, idx, obj, other, stack) {
  if (isGreeting(objValue) && isGreeting(othValue)) {
      return true
  }
  //否则返回undefined
}

    //存疑  全局isNaN(undefined)=true，Number.isNaN(undefined)=false,
    // 全局 isNaN(new Number(NaN))=true  Number.isNaN(new Number(NaN)) = false 
    //该函数只检测作为数字的NaN。NaN与new Number(NaN)
    function isNaN(val) {
      if (typeof val === 'object') {
          return val.valueOf() !== val.valueOf()
      }
      return val !== val
  }

  function isNil(val) {
      if (val === null || val === undefined) {
          return true
      }
      return false
  }

  function isUndefined(val) {
      if (val === undefined) return true
      return false
  }

  function isNull(val) {

      if (val === null) {
          return true
      }
      return false
  }

  //Checks if value is classified as a Function object.
  function isFunction(val) {
      if (typeof val == 'function') {
          return true
      }
      return false
  }

  function isArguments(val) {
      return toString.call(val) === '[object Arguments]'
  }

  function isArray(val) {
      return toString.call(val) === '[object Array]'
  }

  function isArrayBuffer(val) { //指定字节长度的ArrayBuffer对象，表示通用的、固定长度的二进制数据缓冲区
      return Object.prototype.toString.call(val) === '[object ArrayBuffer]'
  }
  //检测值是否为类数组，只要不是function且有有效length属性即可，包括字符串
  function isArrayLike(val) {
      if (typeof val == 'function') {
          return false
      }
      //val.hasOwnProperty('length') document.body.children的length属性是个继承来的getter,故document.body.children.__proto__.hasOwnProperty('length')为true
      if (val.length >= 0 && val.length <= Number.MAX_SAFE_INTEGER) { //53位
          return true
      }
      return false
  }
  //类数组对象：对象里有有效的length属性且不是函数对象
  function isArrayLikeObject(val) {
      if (val && typeof val == 'object') {
          if (val.length >= 0 && val.length <= Number.MAX_SAFE_INTEGER) {
              return true
          }
      }
      return false
  }

  function isBoolean(val) {
      return Object.prototype.toString.call(val) === '[object Boolean]'
  }

  function isDate(val) {
      return Object.prototype.toString.call(val) === '[object Date]'
  }
  //dom元素从html开始皆继承于ELement.prototype 
  function isElement(val) {
      while (val) {
          if (val.__proto__ == Element.prototype) {
              return true
          }
          val = val.__proto__
      }
      return false
  }


  //https://lodash.com/docs/4.17.15#isEmpty
  //原子类型、对象、类数组对象、Map、Set
  function isEmpty(val) {
      if (typeof val != 'object' || !val) {
          return true
      }
      if (Object.prototype.toString(val) !== '[object Object]') {
          if (('size' in val && val.size == 0) || ('length' in val && val.length == 0)) {
              return true
          }
          return false
      }
      if (typeof val == 'object') {
          for (let key in val) {
              if (val.hasOwnProperty(key)) {
                  return false
              }
          }
          return true
      }
  }
  //EvalError, RangeError, ReferenceError, SyntaxError, TypeError, or URIError object.
  function isError(val) {
      while (val) {
          if (val.__proto__ === Error.prototype) {
              return true
          }
          val = val.__proto__
      }
      return false
  }
  //写法二 不循环
  function isError2(val) {
      if (Object.prototype.toString.call(val) == '[object Error]') {
          return true
      }
      return false
  }

  //Number.MAX_VALUE + 10**(308-16) === Infinity //IEEE754规定，大于1.7976931348623158e+308的数才为Infinity.同 Number.isFinite(),不会进行强制转换
  function isFinite(val) {
      if (typeof val == 'number' && Math.abs(val) !== Infinity) {
          return true
      }
      return false
  }

  //同 Number.isInterger()
  function isInteger(val) {
      // return val === (val | 0) //没法判断64位数
      return typeof val == 'number' && val - Math.floor(val) === 0
  }

  //类数组对象可用length,范围0到4字节
  function toLength(val) {
      if (val >= 0) {
          if (val <= 4294967295) { // 2147483648 * 2 - 1   2^32
              return val | 0
          }
          return 4294967295
      }
      return 0
  }

  function isLength(val) {
      return val === toLength(val)
  }

  }










  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    differenceBy: differenceBy,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    zip: zip,
    unzip: unzip,
    uniq: uniq,
    groupBy: groupBy,
    fill: fill,
    parseJSON: parseJSON,
    indexOf: indexOf,
    drop: drop,
    dropRight: dropRight,
    dropRightWhile: dropRightWhile,
    fromPairs: fromPairs,
    head: head,
    initial: initial,
    intersection: intersection,
    join: join,
    nth: nth,
    isEqual: isEqual,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    fromPairs: fromPairs,
    head: head,
    intersection: intersection,
    intersectionBy: intersectionBy,
  }
}()