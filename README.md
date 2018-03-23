# xe-ajax

[![npm version](https://img.shields.io/npm/v/xe-ajax.svg?style=flat-square)](https://www.npmjs.org/package/xe-ajax)
[![npm downloads](https://img.shields.io/npm/dm/xe-ajax.svg?style=flat-square)](http://npm-stat.com/charts.html?package=xe-ajax)

The asynchronous request function based on Promise, Support xhr、fetch、jsonp and Mock，Simple API, lightweight encapsulation, high expansion.

## Browser Support
xe-ajax depends on a native ES6 Promise implementation to be supported. If your environment doesn't support ES6 Promises, you can polyfill.

![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_7-8/internet-explorer_7-8_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- | --- |
8+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 6.1+ ✔ |

## Installation
### npm
``` shell
npm install xe-ajax --save
```
### CDN
[All cdnjs package](https://cdn.jsdelivr.net/npm/xe-ajax/)
``` shell
<script src="https://cdn.jsdelivr.net/npm/xe-ajax/dist/xe-ajax.js"></script>
```
[All unpkg package](https://unpkg.com/xe-ajax/)
``` shell
<script src="https://unpkg.com/xe-ajax/dist/xe-ajax.js"></script>
```
### AMD
``` shell
require.config({
  paths: {
    // ...,
    'xe-ajax': './dist/xe-ajax.min'
  }
})
```

## API:
* doAll ( iterable )
* ajax ( options )
* 
* fetch ( url, options )
* fetchHead ( url, options )
* fetchDelete ( url, options )
* fetchJsonp ( url, params, options )
* fetchGet ( url, params, options )
* fetchPost ( url, body, options )
* fetchPut ( url, body, options )
* fetchPatch ( url, body, options )
* 
* headJSON ( url, options )
* deleteJSON ( url, options )
* jsonp ( url, params, options )
* getJSON ( url, params, options )
* postJSON ( url, body, options )
* putJSON ( url, body, options )
* patchJSON ( url, body, options )

### Arguments
* **url** is the url to fetch
* **params/body** The data to be sent.
* **options** is an optional options object

### Options
| Name | Type | Description | default value |
|------|------|-----|----|
| url | String | is the url to fetch |  |
| baseURL | String | base URL | defaults to context path |
| method | String | request method | defaults to 'GET' |
| params | Object/Array | request params |  |
| body | Object/Array | request body |  |
| bodyType | String | submit type, You can set [**json-data**,**form-data**] | defaults to 'json-data' |
| cache | String | handling cache mode, You can set [**default**,**no-store**,**no-cache**,**reload**,**force-cache**,**only-if-cached**] | defaults to 'default' |
| credentials | String | set the cookie to be sent along with the request, You can set [**omit**,**same-origin**,**include**] | defaults to 'same-origin' |
| jsonp | String | set jsonp callback parameter name | defaults to 'callback' |
| jsonpCallback | String | set jsonp callback function name | default is a random number with json_xeajax_ prefix |
| timeout | Number | set a timeout in ms |  |
| headers | Object | optional header fields |  |
| transformParams | Function ( params, request ) | Change the URL parameter before sending the request. |  |
| paramsSerializer | Function ( params, request ) | The custom URL serialization function is finally spliced in the URL. |  |
| transformBody | Function ( body, request ) | Change the commit body before sending the request. |  |
| stringifyBody | Function ( body, request ) | Customize the body stringify function. |  |
| validateStatus | Function ( response ) | Verify that the request is successful. | response.status >= 200 && response.status < 300 |

### Headers
| Name | Type | Description |
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

### Response
| Name | Type | Description |
|------|------|-----|
| body | ReadableStream | 数据流 |
| bodyUsed | Boolean | 内容是否已被读取 |
| headers | Headers | 响应头 |
| status | Number | HTTP status code |
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

## Default global settings
``` shell
import XEAjax from 'xe-ajax'

XEAjax.setup({
  baseURL: 'http://xuliangzhan.com',
  bodyType: 'json-data',
  credentials: 'include',
  log: false,
  headers: {
    'Accept': 'application/json, text/plain, \*/\*;'
  },
  transformParams (params, request) {
    // Change the URL parameter before sending the request.
    params.id = 123
    return params
  },
  paramsSerializer (params, request) {
    // The custom URL serialization function is finally spliced in the URL.
    return 'id=123&name=2'
  }，
  transformBody (body, request) {
    // Change the commit body before sending the request.
    body.startTime = body.startDate.getTime()
    return body
  },
  stringifyBody (body, request) {
    // Customize the body stringify function.
    return JSON.stringify(body)
  }
})
```

## Example
### ajax
``` shell
import XEAjax from 'xe-ajax'

XEAjax.ajax({
  url: '/api/user/list',
  method: 'GET',
  params: {id: 1}
}).then(response => {
  // finish
}).catch(e => {
  // error
})

```
### fetch to Response
``` shell
import XEAjax from 'xe-ajax'

XEAjax.fetch('/api/user/list', {
  method: 'POST',
  body: {name: 'test'}
}).then(response => {
  // finish
}).catch(e => {
  // error
})

// Response Text
XEAjax.fetchGet('/api/user/list').then(response => {
  response.text().then(text => {
    // get text
  })
})

// Response JSON
XEAjax.fetchGet('/api/user/list').then(response => {
  response.json().then(data => {
    // get data
  })
})

// Response Blob
XEAjax.fetchGet('/api/user/list').then(response => {
  response.blob().then(blob => {
    // get blob
  })
})

// Response ArrayBuffer
XEAjax.fetchGet('/api/user/list').then(response => {
  response.arrayBuffer().then(arrayBuffer => {
    // get arrayBuffer
  })
})

// Response FormData
XEAjax.fetchGet('/api/user/list').then(response => {
  response.formData().then(formData => {
    // get formData
  })
})

// Submit application/json, default uses JSON.stringify(request.body)
XEAjax.fetchPost('/api/user/save', {name: 'test', password: '123456'}, {bodyType: 'json-data'})

// Submit application/x-www-form-urlencoded, default uses XEAjax.serialize(request.body)
XEAjax.fetchPost('/api/user/save', {name: 'test', password: '123456'}, {bodyType: 'form-data'})

// Submit FormData
const file = document.querySelector('#myFile').files[0]
const formBody = new FormData()
formBody.append('file', file)
XEAjax.fetchPost('/api/user/save', formBody)
```
### fetch to JSON
``` shell
import XEAjax from 'xe-ajax'

// The completion or failure is based on state check.
XEAjax.getJSON('/api/user/list').then(data => {
  // success
}).catch(data => {
  // failed
})

XEAjax.postJSON('/api/user/save', {name: 'test'})

XEAjax.postJSON('/api/user/save', {name: 'test', password: '123456'}, {bodyType: 'json-data'})

XEAjax.postJSON('/api/user/save', {name: 'test', password: '123456'}, {bodyType: 'form-data'})

const file = document.querySelector('#myFile').files[0]
const formBody = new FormData()
formBody.append('file', file)
XEAjax.postJSON('/api/user/save', formBody)
```
### jsonp
``` shell
import XEAjax from 'xe-ajax'

// Case 1:
// Set JSONP callback parameter name, default is 'callback'
// http://xuliangzhan.com/jsonp/user/message?callback=jsonp_xeajax_1521272815608_1
// jsonp_xeajax_1521272815608_1({message: 'success'})
XEAjax.fetchJsonp('http://xuliangzhan.com/jsonp/user/message').then(response => {
  response.json().then(data => {
    // {message: 'success'}
  })
})-

// Case 2:
// Set jsonp callback function name, default is a random number with jsonp_xeajax_ prefix
// http://xuliangzhan.com/jsonp/user/message?id=123&cb=jsonp_xeajax_1521272815608_2
// jsonp_xeajax_1521272815608_2({message: 'success'})
XEAjax.fetchJsonp('http://xuliangzhan.com/jsonp/user/message', {id: 123}, {
  jsonp: 'cb'
}).then(response => {
  response.json().then(data => {
    // {message: 'success'}
  })
})

// Case 3:
// Set JSONP callback parameter name and callback function name
// http://xuliangzhan.com/jsonp/user/message?id=123&cb=customCallback
// customCallback({message: 'success'})
XEAjax.fetchJsonp('http://xuliangzhan.com/jsonp/user/message', {id: 123}, {
  jsonp: 'cb', 
  jsonpCallback: 'customCallback'
}).then(response => {
  response.json().then(data => {
    // {message: 'success'}
  })
})
```
### Multiple requests
``` shell
import XEAjax from 'xe-ajax'

const iterable1 = []
iterable1.push(XEAjax.fetchGet('/api/user/list'))
iterable1.push(XEAjax.fetchGet('/api/user/message'), {id: 1})
Promise.all(iterable1).then(datas => {
  // all finish
}).catch(e => {
  // error
})

// doAll Use object parameters, The use is consistent with that of Promise.
const iterable2 = []
iterable2.push({url: '/api/user/list'})
iterable2.push({url: '/api/user/message', body: {id: 1}, method: 'POST'})
XEAjax.doAll(iterable2)
```
### Nested requests
``` shell
import XEAjax from 'xe-ajax'

// This should be avoided in the project.
XEAjax.fetchGet('/api/user/info').then(response => response.json()).then(data => {
  return fetchGet('/api/user/details', {id: data.id})
}).then(response => {
  // finish
})
```
### AMD
``` shell
define([
  'xe-ajax'
], function (XEAjax) {

  XEAjax.fetchGet('/api/user/list').then(response => {
    // finish
  })

  XEAjax.fetchPost('/api/user/save', {name: 'test'}, {bodyType: 'json-data'})
  XEAjax.fetchPost('/api/user/save', {name: 'test'}, {bodyType: 'form-data'})

  var file = document.querySelector('#myFile').files[0]
  var formBody = new FormData()
  formBody.append('file', file)
  XEAjax.fetchPost('/api/user/save', formBody)
})
```

## Cancel request
### AbortController
Allows control of one or more cancellation requests.
``` shell
import XEAjax from 'xe-ajax'

// Create a controller.
const controller = new XEAjax.AbortController()
// get signal
const signal = controller.signal
// Associate the signal and controller with the fetch request.
XEAjax.fetchGet('/api/user/list', {id: 1}, {signal}).then(response => {
  // finish
}).catch(function (e) {
  // error
})
setTimeout(() => {
  controller.abort()
}, 100)
```

## Interceptor
### Request interceptor
Function ( request, next )
``` shell
import XEAjax from 'xe-ajax'

// Trigger before the request is sent.
XEAjax.interceptors.request.use((request, next) => {
  // 可以用于统一的权限拦截、设置请求头、Token 验证、参数等处理...

  // 设置参数
  request.params.version = 1
  // 设置 Token 验证，预防 XSRF/CSRF 攻击
  request.headers.set('X-Token', cookie('x-id'))

  // 调用 next(),继续执行下一个拦截器
  next()
})
```
### Response interceptor
Function ( response, next, request )
``` shell
import XEAjax from 'xe-ajax'

// Intercept when the request is complete.
XEAjax.interceptors.response.use((response, next) => {
  // 请求完成之后统一处理，例如校验登录是否失效、消息提示，特殊场景处理等...

  // 例子: 判断登录失效跳转
  if (response.status === 403) {
    router.replace({path: '/login'}) 
  } else {
    // 调用 next(),继续执行下一个拦截器
    next()
  }
})

// Intercept and reset the response data after the request is complete.
XEAjax.interceptors.response.use((response, next) => {
  // 请求完成之后对返回的数据进行统一的处理...
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

## Functions of mixing
### ./customs.js
``` shell
import XEAjax from 'xe-ajax'

export function doGet () {
  return XEAjax.fetchGet.apply(this, arguments)
  .then(response => response.json())
  .then(body => {
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
### ./main.js
``` shell
import XEAjax from 'xe-ajax'
import customs from './customs'

XEAjax.mixin(customs)

XEAjax.doGet('/api/user/list')
XEAjax.getText('/api/user/message')
```

## Plugin
### Mock services
MockJS、[XEAjaxMock](https://github.com/xuliangzhan/xe-ajax-mock)

## Project Demos
[project examples.](https://github.com/xuliangzhan/examples)  

## License
Copyright (c) 2017-present, Xu Liangzhan