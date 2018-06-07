import * as request from 'supertest'
import * as assert from 'assert'

import app from '../src/app'

describe('Feathers application tests', () => {
  it('starts and shows the index page', () =>
    request(app)
      .get('/')
      .expect(200)
      .expect(/<html>/))

  describe('404', () => {
    it('shows a 404 HTML page', () =>
      request(app)
        .get('/path/to/nowhere')
        .set('Accept', 'application/html')
        .expect(404)
        .expect(/<html>/))

    it('shows a 404 JSON error without stack trace', () =>
      request(app)
        .get('/path/to/nowhere')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/))
  })
})
