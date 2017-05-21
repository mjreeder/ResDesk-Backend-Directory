'use strict'
var chai = require('chai');
let should = chai.should();
var chaiHttp = require('chai-http');
var request = require('request');

chai.use(chaiHttp);


describe('Student Controller', function() {

  describe('/GET students', function() {

    var host = 'http://localhost:10011';
    var path = '/students';

    this.timeout(0);

    it('returns status 200', function(done) {
      chai.request(host).get(path).send().end(function(error, response, body) {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('description')
        response.body.should.have.property('error').eql(false);
        response.body.should.have.property('data');
        response.body.data[0].should.have.property('bsu_id');
        done();
        return;
      });
    });

  });

  describe('/GET students/{id}', function() {

    var host = 'http://localhost:10011';
    var path = '/students/900856452';

    this.timeout(0);

    it('returns status 200', function(done) {
      chai.request(host).get(path).send().end(function(error, response, body) {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('description')
        response.body.should.have.property('error').eql(false);
        done();
        return;
      });
    });

  });

  describe('/GET students/search', function() {

    var host = 'http://localhost:10011';
    var path = '/students/search?position_date_start=2016-08-14';

    this.timeout(0);

    it('returns status 200', function(done) {
      chai.request(host).get(path).send().end(function(error, response, body) {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('description')
        response.body.should.have.property('error').eql(false);
        done();
        return;
      });
    });

  });

  describe('/POST students/map', function() {

    var host = 'http://localhost:10011';
    var path = '/students/map';

    var postData = {
      "idArray":[
        "000000000",
        "000000001"
      ]
    };

    this.timeout(0);

    it('returns status 200', function(done) {
      chai.request(host).post(path).send(postData).end(function(error, response, body) {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('description')
        response.body.should.have.property('error').eql(false);
        response.body.should.have.property('data');
        done();
        return;
      });
    });

  });

});
