import app from '../server';
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';

chai.use(chaiHttp);

describe('/signup', () => {
  it('it should create a user', (done) => {
    chai.request(app)
      .post('/User/signup/')
      .send({
        'Fullname':'Gloria Kaii',
        'email':'kaigloria@gmail.com',
        'password':'kai123'
      })
      .end((err, res) => {
        // console.log(res)
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal("account created successfully");
        id = res.body.data.id
        done();
      });
  });
});


it('it should not signup when password is not equal to six character', (done) => {
  chai.request(app)
    .post('/User/signup/')
    .send({
      'Fullname':'Gloria Kaii',
      'email':'kaigloria@gmail.com',
      'password':''
    })
    .end((err, res) => {
      // console.log(res)
      expect(res.statusCode).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal(`"password" is not allowed to be empty`);
      done();
    });
});

it('it should not signup when email is empty', (done) => {
  chai.request(app)
    .post('/User/signup/')
    .send({
      'Fullname':'Gloria Kaii',
      'email':'',
      'password':'123456'
    })
    .end((err, res) => {
      // console.log(res)
      expect(res.statusCode).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal(`"email" is not allowed to be empty`);
      done();
    });
});

it('it should not signup when password is not equal to six character', (done) => {
  chai.request(app)
    .post('/User/signup/')
    .send({
      'Fullname':'',
      'email':'kaigloria@gmail.com',
      'password':'123456'
    })
    .end((err, res) => {
      // console.log(res)
      expect(res.statusCode).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.equal(`"Fullname" is not allowed to be empty`);
      done();
    });
});


let token,id
describe("USER API test", () => {
  before((done) => {
    chai.request(app)
      .post('/User/Login/')
      .send({
        'email':'rachel@admin.com',
        'password':'password'
      })
      .end((err, res) => {
        // console.log(res)
        token=res.body.token
        done();
      });       
});

  describe('/GET', () => {
    it('it should GET all users', (done) => {
      chai.request(app)
        .get('/User/getUsers')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('/GET', () => {
    it('it should GET a single  user', (done) => {
      chai.request(app)
        .get(`/User/findUserById/${1}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('update user info', () => {
    it('it should update user info', (done) => {
      chai.request(app)
        .put(`/User/UpdateUser/${id}`)
        // .set({ "Authorization": `Bearer ${token}` })
        .send({
          'Fullname':'Gloria Kai'
        })
        .end((err, res) => {
          // console.log(res)
          expect(res.statusCode).to.equal(200);
          // expect(res.body.status).to.equal(200);
          // expect(res.body.message).to.equal("User Account Deleted");
          done();
        });
    });
  });

  describe('/deleteUser', () => {
    it('it should delete a user', (done) => {
      chai.request(app)
        .delete(`/User/deleteUser/${id}`)
        .set({ "Authorization": `Bearer ${token}` })
        .end((err, res) => {
          // console.log(res)
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(200);
          expect(res.body.message).to.equal("User Account Deleted");
          done();
        });
    });
  });

});

// describe('/like', () => {
//   it('it should add liketo blog', (done) => {
//     chai.request(app)
//       .post('/User/signup/')
//       .end((err, res) => {
//         // console.log(res)
//         expect(res.statusCode).to.equal(200);
//         expect(res.body.status).to.equal(200);
//         expect(res.body.message).to.equal("account created successfully");
//         id = res.body.data.id
//         done();
//       });
//   });
// });


