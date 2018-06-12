import * as request from 'supertest'
import { expect } from 'chai'
import * as faker from 'faker'
import * as cheerio from 'cheerio'

import server from '../src/index'
import beforeAll from './utilities/beforeAll'
import afterAll from './utilities/afterAll'
import MailDevService from './utilities/maildev'

describe('Feathers application tests', () => {
  before(beforeAll)
  after(afterAll)

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
    let verifyToken
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      displayName: faker.name.firstName(),
    }
    let createdUser: any = newUser

    it('should let users register', done => {
      request(server)
        .post('/users')
        .send(newUser)
        .expect(201)
        .expect(response => (createdUser = response.body))
        .expect(async response => {
          const subscription = await MailDevService.newMail.subscribe(mail => {
            expect(mail.subject).to.equal('Confirm Signup')
            const $ = cheerio.load(mail.html)
            verifyToken = $('#hashLink')
              .attr('href')
              .split('/')
              .pop()
            subscription.unsubscribe()
            done()
          })
        })
        .then(response => expect(response.body.email).to.equal(newUser.email))
    })

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

    it('should let users verify', () =>
      request(server)
        .get(`/verify/${verifyToken}`)
        .expect(200)
        .then(response =>
          request(server)
            .get(`/users/${createdUser._id}`)
            .set('Authorization', accessToken)
            .expect(200)
            .then(
              userResponse => expect(userResponse.body.isVerified).to.be.true,
            ),
        ))

    it('authenticated users should be able to patch themselves', () =>
      request(server)
        .patch(`/users/${createdUser._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', accessToken)
        .send({
          displayName: 'New Name',
        })
        .expect(200)
        .then(response => expect(response.body.displayName).to.eql('New Name')))

    it('authenticated users should be able to delete users', () =>
      request(server)
        .delete(`/users/${createdUser._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', accessToken)
        .expect(200)
        .then(response =>
          request(server)
            .get(`/users/${createdUser._id}`)
            .set('Authorization', accessToken)
            .expect(404),
        ))
  })
})
