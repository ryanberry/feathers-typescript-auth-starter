import * as request from 'supertest'
import { should, expect, assert } from 'chai'
import * as faker from 'faker'

import app from '../src/app'
import server from '../src/index'

describe('Feathers application tests', () => {
  after(() => {
    server.close()
  })

  it('starts and shows the index page', () =>
    request(server)
      .get('/')
      .expect(200)
      .expect(/<html>/))

  describe('404', () => {
    it('shows a 404 HTML page', () =>
      request(server)
        .get('/path/to/nowhere')
        .set('Accept', 'application/html')
        .expect(404)
        .expect(/<html>/))

    it('shows a 404 JSON error without stack trace', () =>
      request(server)
        .get('/path/to/nowhere')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/))
  })

  describe('authentication', () => {
    let accessToken
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    let createdUser: any = newUser

    it('should let users register', () =>
      request(server)
        .post('/users')
        .send(newUser)
        .expect(201)
        .expect(response => (createdUser = response.body))
        .then(response => expect(response.body.email).to.equal(newUser.email)))

    it('should let users authenticate', () =>
      request(server)
        .post('/authentication')
        .send({
          email: newUser.email,
          password: newUser.password,
        })
        .expect(201)
        .expect(body => body.accessToken)
        .then(response => (accessToken = response.body.accessToken)))

    it('authenticated users should be able to list users', () =>
      request(server)
        .get('/users')
        .set('Accept', 'application/json')
        .set('Authorization', accessToken)
        .expect(200)
        .then(response => expect(response.body).to.haveOwnProperty('data')))

    it('authenticated users should be able find users', () =>
      request(server)
        .get(`/users/${createdUser._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', accessToken)
        .expect(200)
        .then(response => expect(response.body).to.eql(createdUser)))
  })
})
