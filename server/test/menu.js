process.env.NODE_ENV = 'dev';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiHttp);
//Our parent block
describe('Menu', () => {

  /*
    * Test the /GET route testing notes
    it.skip() you can skipe a test
    */
  describe('1./GET all menu/get-menu/1', () => {
    it('it should GET all the menu or by id', (done) => {
      chai.request(server)
        .get('/menu/get-menu/1')
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a('array');
          res.body.should.be.a('object');
          assert.equal(typeof res.body, 'object'),
            assert.isNotNull(res.body, 'body should not be null'),
            done();
        });
    });
  });

  /*
   * Test the /GET menu by idroute
   */
  describe('2./GET menu by id /api/menus', () => {
    // it('it should GET by menu id', (done) => {
    //   chai.request(server)
    //       .get('/api/menus')
    //       .query({menuID:'2'})
    //       .end((err, res) => {
    //           res.should.have.status(200);
    //           res.body.should.be.a('array');
    //           assert.isNotNull(res.body ,'body should not be null'),
    //           // res.body.length.should.be.eql(0);
    //         done();
    //       });
    // });

    /* 
    Test for updating the menu by /PUT
    */
    it('3.it should update menu by PUT method', (done) => {
      chai.request(server)
        .put('/menu/update-menu')
        .send({
          "name": "name",
          "type": "type",
          "icon_img": "asdada",
          "isVisibility": "1",
          "id": "3"
        })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).to.have.status(200);
          assert.isNotNull(res.body, 'body should not be null'),
            done();
        })
    })
    /* 
     Test for add menu by /POST using Promises
     */
    it('4.it should add menu by POST method Promises', (done) => {
      chai.request(server)
        .post('/menu/add-menu')
        .type('form')
        .send({
          "name": "name",
          "type": "type",
          "icon_img": "asdada",
          "isVisibility": "1",
          "brand_id": "1"
        })
        .then((res) => {
            expect(res).to.have.status(200)
          },
          done()
        )
        .catch((err) => {
          throw err;
        })
    })

    /* 
      Test for delete menu by /delete using Promises
      it.skip() or kit you can skipe a test
 
      */
    it.skip('4.it should delete menu by delete method', (done) => {
      chai.request(server)
        .delete('/menu/delete-menu/8,9')
        .then((res) => {
            expect(res).to.have.status(200),
              assert.equal(typeof res.body, 'object'),
              assert.isNotNull(res.body, 'body should not be null'),
              assert.deepEqual(res.body, {
                "message": "Menu deleted successfull"
              }),

              assert.include(res.body, {
                "message": "Menu deleted successfull"
              })
          },
          done()
        )
        .catch((err) => {
          throw err;
        })
    })

    /* Testing end here */

  });

});
