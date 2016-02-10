# observable-event-source
RxJS Observable from server sent event stream

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

*this is not production quality software and is supported only on a best-effort basis through github, use at your own risk*

## usage
```js
const observableEventSource = require('observable-event-source')
const o = observableEventSource({
  url: 'https://skimdb.npmjs.com/registry/_changes?since=742000&feed=eventsource',
  json: true
})

console.log('recently changed npm packages...')
o.map(function (update) {
  return update.id
}).subscribe(console.log)
```


## api
### `observableEventSource(options: Object) => Observable<String|Object>`
Options:
- `url`:String, required - location of the [Server-Sent Events](https://www.w3.org/TR/2011/WD-eventsource-20111020/) feed
- `json`:Boolean, default `false` - if `true`, event data is parsed as JSON

Returns an instance of [`Observable`](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md), which has all kinds of features that are beyond the scope of this readme.

Each SSE `data:` item is returned as en element of the observable sequence. Event names are ignored in this version.


## installation

    $ npm install observable-event-source


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXVI jden <jason@denizac.org>. See LICENSE.md
