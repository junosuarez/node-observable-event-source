/* globals describe, it */
'use strict'

var expect = require('mochi').expect
var Observable = require('rx').Observable

describe('observable-event-source', function () {
  var observableEventSource = require('../')

  it('returns observable', function () {
    var x = observableEventSource({url: 'fsd'})
    expect(x).to.be.instanceof(Observable)
  })
})
