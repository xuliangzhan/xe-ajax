# 异步请求函数

[![npm version](https://img.shields.io/npm/v/xe-ajax.svg?style=flat-square)](https://www.npmjs.org/package/xe-ajax)
[![npm downloads](https://img.shields.io/npm/dm/xe-ajax.svg?style=flat-square)](http://npm-stat.com/charts.html?package=xe-ajax)

基于 Promise 的异步请求函数；支持 xhr、fetch、jsonp 以及 mock，更简洁的 API、轻封装、高扩展。

## 兼容性
使用原生 Promise 实现，低版本浏览器使用 polyfill es6-promise.js  
支持 IE8+、Edge、Chrome、Firefox、Opera、Safari等...

## CDN 安装
使用 script 方式安装，XEAjax 会定义为全局变量  
生产环境请使用 xe-ajax.min.js，更小的压缩版本，可以带来更快的速度体验。
### cdnjs 获取最新版本
[点击浏览](https://cdn.jsdelivr.net/npm/xe-ajax/)已发布的所有 npm 包源码
``` shell
<script src="https://cdn.jsdelivr.net/npm/xe-ajax/dist/xe-ajax.js"></script>
```
### unpkg 获取最新版本
[点击浏览](https://unpkg.com/xe-ajax/)已发布的所有 npm 包源码
``` shell
<script src="https://unpkg.com/xe-ajax/dist/xe-ajax.js"></script>
```

## AMD 安装
### require.js 安装示例
``` shell
// require 配置
require.config({
  paths: {
    // ...,
    'xe-ajax': './dist/xe-ajax.min'
  }
})
```

## ES6 Module 安装（推荐）
``` shell
npm install xe-ajax --save
```
### import 部分导入
``` shell
import { fetchGet, fetchPost } from 'xe-ajax'

fetchGet('/api/user/list', {id: 1})
fetchPost('/api/user/save', {id: 1})
```
### import 导入所有
``` shell
import XEAjax from 'xe-ajax'

XEAjax.fetchGet('/api/user/list', {id: 1})
XEAjax.fetchPost ('/api/user/save', {id: 1})
```

## API:
### 提供常用便捷方法:
* doAll ( iterable )
* ajax ( options )
* 
* fetch ( url, options )
* fetchJsonp ( url, params, options )
* fetchHead ( url, params, options )
* fetchGet ( url, params, options )
* fetchPost ( url, body, options )
* fetchPut ( url, body, options )
* fetchDelete ( url, body, options )
* fetchPatch ( url, body, options )
* 
* jsonp ( url, params, options )
* headJSON ( url, params, options )
* getJSON ( url, params, options )
* postJSON ( url, body, options )
* putJSON ( url, body, options )
* deleteJSON ( url, body, options )
* patchJSON ( url, body, options )

### 入参说明
* url（字符串） 请求地址，可被自定义 options 属性覆盖
* params/body（可选，对象/数组） 要发送的数据，可被自定义 options 属性覆盖
* options （可选，对象） 参数

### options 参数说明
| 参数 | 类型 | 描述 | 默认值 |
|------|------|-----|----|
| url | String | 请求地址 |  |
| baseURL | String | 基础路径 | 默认上下文路径 |
| method | String | 请求方法 | 默认GET |
| params | Object/Array | 请求参数 |  |
| body | Object/Array | 提交参数 |  |
| bodyType | String | 提交参数方式，可以设置json-data,form-data | 默认json-data |
| cache | String | 处理缓存方式,可以设置default,no-store,no-cache,reload,force-cache,only-if-cached | 默认default |
| credentials | String |  设置 cookie 是否随请求一起发送,可以设置: omit,same-origin,include | 默认same-origin |
| jsonp | String | jsonp入参属性名 | 默认callback |
| jsonpCallback | String | jsonp响应结果的回调函数名 | 默认自动生成函数名 |
| timeout | Number | 设置超时 |  |
| headers | Object | 请求头 | {Accept: 'application/json, text/plain, \*/\*;'} |
| transformParams | Function ( params, request ) | 用于改变URL参数 |  |
| paramsSerializer | Function ( params, request ) | 自定义URL序列化函数 |  |
| transformBody | Function ( body, request ) | 用于改变提交数据 |  |
| stringifyBody | Function ( body, request ) | 自定义转换提交数据的函数 |  |
| validateStatus | Function ( response ) | 自定义校验请求是否成功 | response.status >= 200 && response.status < 300 |

### Headers 对象说明
| 属性 | 类型 | 描述 |
|------|------|-----|
| set | Function ( name, value ) | 添加 |
| append | Function ( name, value ) | 追加 |
| get | Function ( name ) | 根据 name 获取 |
| has | Function ( name ) | 检查 name 是否存在 |
| delete | Function ( name ) | 根据 name 删除 |
| keys | Function | 以迭代器的形式返回所有 name |
| values | Function | 以迭代器的形式返回所有 value |
| entries | Function | 以迭代器的形式返回所有 [name, value] |
| forEach | Function ( callback, context ) | 迭代器 |

### Response 对象说明
| 属性 | 类型 | 描述 |
|------|------|-----|
| body | ReadableStream | 数据流 |
| bodyUsed | Boolean | 内容是否已被读取 |
| headers | Headers | 响应头 |
| status | Number | 状态码 |
| statusText | String | 状态信息 |
| url | String | 返回请求路径 |
| ok | Boolean | 请求完成还是失败 |
| redirected | Boolean | 是否重定向了 |
| type | String | 类型 |
| clone | Function | 返回一个新的 Response 对象 |
| json | Function | 获取 json 数据 |
| test | Function | 获取 text 数据 |
| blob | Function | 获取 Blob 对象 |
| arrayBuffer | Function | 获取 ArrayBuffer 对象 |
| formData | Function | 获取 FormData 对象 |

## 全局参数设置
``` shell
import XEAjax from 'xe-ajax'

// 示例
XEAjax.setup({
  baseURL: 'http://xuliangzhan.com',
  bodyType: 'json-data',
  credentials: 'include',
  headers: {
    'Accept': 'application/json, text/plain, \*/\*;'
  },
  transformParams (params, request) {
    // 用于在请求发送之前改变URL参数
    params.id = 123
    return params
  },
  paramsSerializer (params, request) {
    // 自定义URL序列化函数,最终拼接在url
    return 'id=123&name=2'
  }，
  transformBody (body, request) {
    // 用于在请求发送之前改变提交数据
    body.startTime = body.startDate.getTime()
    return body
  },
  stringifyBody (body, request) {
    // 自定义格式化提交数据函数
    return JSON.stringify(body)
  }
})
```

## 示例
### 完整调用
``` shell
import XEAjax from 'xe-ajax'

XEAjax.fetch('/api/user/list').then(response => {
  // response
}).catch(e => {
  // 发生错误
})

XEAjax.fetch('/api/user/save', {method: 'POST', body: {id: 1}}).then(response => {
  // response
}).catch(e => {
  // 发生错误
})
```
### 便捷调用
``` shell
import { fetchGet, fetchPost } from 'xe-ajax'

// Response Text
fetchGet('/api/user/list').then(response => {
  response.text().then(text => {
    // 获取 text
  })
})

// Response JSON
fetchGet('/api/user/list').then(response => {
  response.json().then(data => {
    // 获取 data
  })
})

// Response Blob
fetchGet('/api/user/list').then(response => {
  response.blob().then(blob => {
    // 获取 blob
  })
})

// Response ArrayBuffer
fetchGet('/api/user/list').then(response => {
  response.arrayBuffer().then(arrayBuffer => {
    // 获取 arrayBuffer
  })
})

// Response FormData
fetchGet('/api/user/list').then(response => {
  response.formData().then(formData => {
    // 获取 formData
  })
})

// 提交 application/json（默认方式）
fetchPost('/api/user/save', {name: 'test', password: '123456'})

// 提交 application/x-www-form-urlencoded
fetchPost('/api/user/save', {name: 'test', password: '123456'}, {bodyType: 'form-data'})

// 提交 FormData
const file = document.querySelector('#myFile').files[0]
const formBody = new FormData()
formBody.append('file', file)
fetchPost('/api/user/save', formBody)

// 查询参数和数据同时提交
fetchPost('/api/user/save', {name: 'test', password: '123456'}, {params: {id: 1}})
```
### 根据状态完成或失败直接响应 json 数据
``` shell
import { getJSON, postJSON, jsonp } from 'xe-ajax'

getJSON('/api/user/list').then(data => {
  // 请求成功
}).catch(data => {
  // 请求失败
})

postJSON('/api/user/save', {name: 'test'})

// 提交 application/json（默认方式）
postJSON('/api/user/save', {name: 'test', password: '123456'}, {bodyType: 'json-data'})

// 提交 application/x-www-form-urlencoded
postJSON('/api/user/save', {name: 'test', password: '123456'}, {bodyType: 'form-data'})

// 提交 FormData
const file = document.querySelector('#myFile').files[0]
const formBody = new FormData()
formBody.append('file', file)
postJSON('/api/user/save', formBody)

// 查询参数和数据同时提交
postJSON('/api/user/save', {name: 'test', password: '123456'}, {params: {id: 1}})
```
### jsonp 调用
``` shell
import { fetchJsonp } from 'xe-ajax'

// http://xuliangzhan.com/jsonp/user/message?callback=jsonp_xeajax_1
// jsonp_xeajax_1({message: 'success'})
fetchJsonp('http://xuliangzhan.com/jsonp/user/message', {id: 1}).then(response => {
  response.json().then(data => {
    // {message: 'success'}
  })
})

// http://xuliangzhan.com/jsonp/user/message?cb=jsonp_xeajax_2
// jsonp_xeajax_2({message: 'success'})
fetchJsonp('http://xuliangzhan.com/jsonp/user/message', {id: 1}, {jsonp: 'cb'}).then(response => {
  response.json().then(data => {
    // {message: 'success'}
  })
})

// http://xuliangzhan.com/jsonp/user/message?cb=custom3
// custom3({message: 'success'})
fetchJsonp('http://xuliangzhan.com/jsonp/user/message', {id: 1}, {jsonp: 'cb', jsonpCallback: 'custom3'}).then(response => {
  response.json().then(data => {
    // {message: 'success'}
  })
})
```
### 并发多个请求
``` shell
import { doAll, fetchGet } from 'xe-ajax'

const iterable1 = []
iterable1.push(fetchGet('/api/user/list'))
iterable1.push(fetchGet('/api/user/message'), {id: 1})
Promise.all(iterable1).then(datas => {
  // 所有异步完成之后执行
}).catch(data => {
  // 请求失败时执行
})

// doAll 使用对象参数, 用法和 Promise.all 一致
const iterable2 = []
iterable2.push({url: '/api/user/list', method: 'GET'})
iterable2.push({url: '/api/user/message', body: {id: 1}, method: 'POST'})
doAll(iterable2)
```
### 嵌套请求
``` shell
import { fetchGet } from 'xe-ajax'

// 相互依赖的嵌套请求(项目中应该避免这种情况)
fetchGet('/api/user/info').then(response => response.json()).then(data => {
  return fetchGet('/api/user/details', {id: data.id})
}).then(response => {
  // response
})
```
### AMD 使用方式
``` shell
define([
  'xe-ajax'
], function (XEAjax) {

  XEAjax.fetchGet('/api/user/list').then(response => {
    response.json().then(data => {
      // 获取 data
    })
  })

  // 提交 application/json
  XEAjax.fetchPost('/api/user/save', {name: 'test', password: '123456'})

  // 提交 application/x-www-form-urlencoded
  XEAjax.fetchPost('/api/user/save', {name: 'test', password: '123456'}, {bodyType: 'form-data'})

  // 提交 FormData
  var file = document.querySelector('#myFile').files[0]
  var formBody = new FormData()
  formBody.append('file', file)
  XEAjax.fetchPost('/api/user/save', formBody)

  // 查询参数和数据同时提交
  XEAjax.fetchPost('/api/user/save', {name: 'test', password: '123456'}, {params: {id: 1}})
})
```

## 取消请求
### AbortController 控制器对象
允许控制一个或多个取消指令请求
``` shell
import { AbortController, fetchGet } from 'xe-ajax'

// 创建一个控制器对象
const controller = new AbortController()
// 获取signal
const signal = controller.signal
// 给请求加入控制器 signal
fetchGet('/api/user/list', {id: 1}, {signal}).catch(function (e) {
  console.error(e)
})
setTimeout(() => {
  // 终止请求
  controller.abort()
}, 10)
```

## 拦截器
### Request 拦截器
interceptors.request ( request, next )
``` shell
import XEAjax from 'xe-ajax'

// 请求之前拦截器
XEAjax.interceptors.request.use((request, next) => {
  // 请求之前拦截器,可以用于统一的权限拦截、设置头、参数等处理...

  // request.method = 'POST' // 修改 method
  // request.params.id = 1 // 修改参数
  // request.headers.set('X-Token', 123) // 设置请求头

  // 调用 next(),继续执行下一个拦截器
  next()
})
```
### Response 拦截器
interceptors.response ( response, next, request )
``` shell
import XEAjax from 'xe-ajax'

// 响应之后拦截器
XEAjax.interceptors.response.use((response, next) => {
  // 响应之后拦截器,可以用于响应之后校验session是否失效做处理、统一的错误消息提示处理等...

  // 例子: 判断登录失效跳转
  if (response.status === 403) {
    router.replace({path: '/login'}) 
  } else {
    // 调用 next(),继续执行下一个拦截器
    next()
  }
})

// 重置响应数据
XEAjax.interceptors.response.use((response, next) => {
  // 响应之后拦截器,可以用于响应之后对所有返回的数据进行统一的处理...
  // 格式: {status: 200, statusText: 'OK', body: {}, headers: {}}

  // 例如，对所有请求结果进行处理，返回统一的结构
  response.json().then(data => {
    const body = {
      status: response.status === 200 ? 'success' : 'error', 
      result: data
    }
    // 重置响应数据并继续执行下一个拦截器
    next({status: response.status, body: body})
  })
})
```

## 混合函数
### 文件 ./customs.js
``` shell
import XEAjax from 'xe-ajax'

export function doGet () {
  return XEAjax.fetchGet.apply(this, arguments).then(response => response.json()).then(body => {
    return {
      body: body, 
      status: response.status, 
      headers: response.headers
    }
  })
} 
export function getText () {
  return XEAjax.fetchGet.apply(this, arguments).then(response => response.text())
} 
```
### 示例 ./main.js
``` shell
import XEAjax from 'xe-ajax'
import customs from './customs'

XEAjax.mixin(customs)

// 调用自定义扩展函数
XEAjax.doGet('/api/user/list')
XEAjax.getText('/api/user/message')
```

## 安装插件
### Mock 虚拟服务
支持 MockJS、[XEAjaxMock](https://github.com/xuliangzhan/xe-ajax-mock) 等。

ES6 + Vue + VXEAjax + Mock 项目 [点击查看](https://github.com/xuliangzhan/examples/tree/master/vue-mock1)  
ES6 + Vue + XEAjax + Mock 项目 [点击查看](https://github.com/xuliangzhan/examples/tree/master/vue-mock2)  
ES6 + React + XEAjax + Mock 项目 [点击查看](https://github.com/xuliangzhan/examples/tree/master/react-mock1)  
RequireJS + Vue + XEAjax + Mock 项目 [点击查看](https://github.com/xuliangzhan/examples/tree/master/vue-mock3)  
RequireJS + Vue + VXEAjax + Mock 项目 [点击查看](https://github.com/xuliangzhan/examples/tree/master/vue-mock4)  

## License
Copyright (c) 2017-present, Xu Liangzhan