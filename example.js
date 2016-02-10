const observableEventSource = require('./')
const o = observableEventSource({
  url: 'https://skimdb.npmjs.com/registry/_changes?since=742000&feed=eventsource',
  json: true
})

console.log('recently changed npm packages...')
o.map(function (update) {
  return update.id
}).subscribe(console.log)
