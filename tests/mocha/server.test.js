import { beforeEach, describe, afterEach, it, before, after } from 'mocha'
import axios from 'axios'
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import helpers from '../../server/helpers'

import server from '../../server/server'

let should = chai.should()

// const serverTest = server.listen(3333)
chai.use(chaiHttp)
// let server

describe('Helpers', () => {})

describe('Settings', () => {
  /*
   * Тест для /GET
   */
  describe('/GET settings', () => {
    it('it should GET settings', (done) => {
      chai
        .request(server)
        .get('/api/settings')
        .end((err, res) => {
          res.should.have.status(200)
        })
      done()
    })
  })
  describe('/POST settings', () => {
    it('it should POST settings', (done) => {
      const settings = {
        repoName: 'playhardgopro/dz-1-verstka',
        buildCommand: 'test',
        mainBranch: 'test',
        period: '10',
      }
      chai
        .request(server)
        .post('/api/settings')
        .send(settings)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          // res.body.length.should.be.eql(0)
          done()
        })
    })
  })
})
