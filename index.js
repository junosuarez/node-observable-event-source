'use strict'
const Observable = require('rx').Observable
const request = require('request')
const LineStream = require('byline').LineStream

function observableEventSource (obj) {
  obj = obj || {}
  var url = obj.url
  if (!url) { throw new TypeError('Missing required parameter: obj.url') }

  const observable = Observable.create((o) => {
    var parseState = {}

    request({
      url: url,
      headers: {
        Accept: 'text/eventsource'
      }
    }).on('error', function (err) {
      o.onError(err)
    })
    .pipe(new LineStream())
    .on('data', function (x) {
      var parsed = parseLine(x.toString(), parseState)
      if (parsed) {
        if (obj.json) {
          parsed = JSON.parse(parsed)
        }
        o.onNext(parsed)
        // console.log('x', parseState, parsed)
      } else {
        // console.log('X', parseState)
      }
    })
    // reconnect login with retry from parseState.lastId

    return () => {
      console.log('disposing oes')
    }
  })
  return observable
}

function parseLine (str, state) {
  if (str.substr(0, 3) === 'id:') {
    state.lastId = str.substr(3).trim()
  } else if (str.substr(0, 5) === 'data:') {
    var line = str.substr(5).trim()
    return line
  }
}

module.exports = observableEventSource
