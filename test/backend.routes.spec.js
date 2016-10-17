import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const expect = chai.expect;
import request from 'supertest';
import express from 'express';
const testApp = express();
import http from 'http';
import {launchRoutes} from '../backend/routes';
import sinon from 'sinon';

describe('loading express', function () {
  let testApp;
  let testServer;
  beforeEach(function () {
    testApp = express();
    testServer = http.Server(testApp);
    launchRoutes(testServer, testApp);
  });
  afterEach(function (done) {
    testServer.close(done);
  });
  it('responds to /', function (done) {
    request(testServer)
      .get('/')
      .expect(200, done);
  });
  it('should note 301 moved perm for /dist', function (done) {
    request(testServer)
      .get('/dist')
      .expect(301, done);
  });
  it('should note 301 moved perm for  /pdf', function (done) {
    request(testServer)
      .get('/pdf')
      .expect(301, done);
  });
  it('should note 301 moved perm for  /img', function (done) {
    request(testServer)
      .get('/img')
      .expect(301, done);
  });
  it('responds to /favicon.ico', function (done) {
    request(testServer)
      .get('/favicon.ico')
      .expect(200, done);
  });
  it('404 everything else', function (done) {
    request(testServer)
      .get('/foo/bar')
      .expect(404, done);
  });
  it('serves the homepage', function(done){
    this.timeout(10000);
    const getHomePage = () => new Promise((resolve, reject) => {
      request(testServer)
      .get('/')
      .end((err, res) => {
        if(err){
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
    expect(getHomePage().then((response) => response.text.substring(0, 15))).to.eventually.equal("<!DOCTYPE html>").notify(done);
  });
  it('serves the homepage', function(done){
    this.timeout(10000);
    const getHomePage = () => new Promise((resolve, reject) => {
      request(testServer)
      .get('/')
      .end((err, res) => {
        if(err){
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
    expect(getHomePage().then((response) => response.text.substring(0, 15))).to.eventually.equal("<!DOCTYPE html>").notify(done);
  });
});
