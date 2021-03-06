'use strict'

var http = require('http')
var https = require('https')
var url = require('url')
var utils = require('../core/utils')
var XEResponse = require('../handle/response')
var handleExports = require('../handle')

/* eslint-disable node/no-deprecated-api */

/**
 * nodejs
 * @param { XERequest } request
 * @param { Function } finish
 * @param { Function } failed
 */
function httpRequest (request, finish, failed) {
  var timer
  var isTimeout = false
  var reqAgent = request.agent
  var reqTimeout = request.timeout
  var body = request.getBody()
  var urlLocat = url.parse(request.getUrl())
  var clearTimeoutFn = clearTimeout
  var headers = {}
  var options = {
    hostname: urlLocat.hostname,
    port: urlLocat.port,
    path: urlLocat.path,
    method: request.method,
    headers: headers
  }

  if (reqAgent) {
    options.agent = reqAgent
  }

  if (body) {
    headers['Content-Length'] = Buffer.byteLength(body)
  }

  utils.headersEach(request.headers, function (value, name) {
    headers[name] = value
  })

  var req = getHttp(urlLocat).request(options, function (res) {
    var chunks = []
    var chunkSize = 0

    res.on('data', function (chunk) {
      var buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
      chunks.push(buf)
      chunkSize += buf.length
    })

    res.on('end', function () {
      if (!isTimeout) {
        clearTimeoutFn(timer)
        var responseData = Buffer.concat(chunks, chunkSize)
        finish(new XEResponse(responseData.toString('utf8'), {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers
        }, request))
      }
    })

    res.on('error', function (e) {
      clearTimeoutFn(timer)
      if (!req.aborted && !isTimeout) {
        failed()
      }
    })
  })

  req.on('error', function (e) {
    if (!isTimeout) {
      clearTimeoutFn(timer)
      failed()
    }
  })

  if (body) {
    req.write(body)
  }

  if (reqTimeout) {
    timer = setTimeout(function () {
      isTimeout = true
      req.abort()
      finish({ status: 0, body: null })
    }, reqTimeout)
  }

  req.end()
}

function getHttp (urlLocat) {
  return urlLocat.protocol === 'https:' ? https : http
}

function sendHttp (request, finish, failed) {
  if (utils.isFn(request.$http)) {
    return request.$http(request, function () {
      return httpRequest(request, finish, failed)
    }, function (resp) {
      handleExports.toResponse(resp, request).then(finish)
    }, function (e) {
      failed()
    })
  }
  return httpRequest(request, finish, failed)
}

module.exports = sendHttp
