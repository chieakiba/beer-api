var chai = require('chai');
var chaiHttp = require('chai-http');
var page = require('../public/index.html');

var should = chai.should();
var app = page.app;

describe('Find beer or brewery', function() {
  it('should show the landing page', function(done) {
    chai.request(app)
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
});
