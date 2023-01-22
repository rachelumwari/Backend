import app from '../server';
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';

chai.use(chaiHttp);

var token,id,a
describe("Blog API test", () => {
    // var token,id
    before((done) => {
        chai.request(app)
        .post('/User/Login/')
        .send({
            'email':'rachel@admin.com',
            'password':'password'
        })
        .end((err, res) => {
            // console.log(res)
            token = res.body.token
            // console.log(token)
            done();
        });       
        });


        describe('Create Blog', () => {
            it('it should create a new blog', (done) => {
              chai.request(app)
                .post('/Blog/addblog/')
                .set({ "Authorization": `Bearer ${token}` })
                .send({
                  'title':'Songs Fav',
                  'content':'content of content'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.status).to.equal(200);
                    expect(res.body.message).to.equal("blogs created successfully");
                    id = res.body.data.id
                    done();
                });
            });
          });


        //   it('Create a negative Test', (done) => {
        //     chai.request(app)
        //       .post('/Blog/addblog/')
        //     //   .set({ "Authorization": `Bearer ${token}` })
        //       .send({
        //         'title':'Songs Fav',
        //         'content':'content of content'
        //       })
        //       .end((err, res) => {
        //         console.log(res)
        //           expect(res.statusCode).to.equal(403);
        //           expect(res.body.status).to.equal(403);
        //           expect(res.body.error).to.equal("Token not provided");
        //           id = res.body.data.id
        //           done();
        //       });
        //   });

        it('it should not create a new blog if title not provided', (done) => {
            chai.request(app)
            .post('/Blog/addblog/')
            .set({ "Authorization": `Bearer ${token}` })
            .send({
                'title':'',
                'content':'content of content'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.status).to.equal(400);
                expect(res.body.error).to.equal(`"title" is not allowed to be empty`);
                done();
            });
        });
          

        
        it('it should not create a new blog if title not provided', (done) => {
            chai.request(app)
            .post('/Blog/addblog/')
            .set({ "Authorization": `Bearer ${token}` })
            .send({
                'title':'Song Fav',
                'content':''
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.status).to.equal(400);
                expect(res.body.error).to.equal(`"content" is not allowed to be empty`);
                done();
            });
        });
          
       
        describe('/GET', () => {
            it('it should GET all Blogs', (done) => {
            chai.request(app)
                .get('/Blog/getblog')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
            });
        });

         // ============

  it('should create like count', (done) => {
    chai.request(app)
    .post(`/User/like/61`)
    .end((err, res) => {
    //   console.log(res)/
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal("like and update complent");
      // expect(res.body.data.like).to.be.a('number');
      done();
    });
  });
  
  it('Blog not found', (done) => {
    chai.request(app)
    .post(`/User/like/222`)
    .end((err, res) => {
    //   console.log(res)
      expect(res.statusCode).to.equal(404);
      expect(res.body.message).to.equal("Blog not found");
      done();
    });
  });

  it('should be server error', (done) => {
    chai.request(app)
    .post(`/User/like/${a}`)
    .end((err, res) => {
    //   console.log(res)
      expect(res.statusCode).to.equal(500);
    //   expect(res.body.message).to.include("");
      done();
    });
  });
  
// =============================
  
        describe('update blog info', () => {
            it('it should update blog info', (done) => {
            chai.request(app)
                .put(`/Blog/updateblog/${id}`)
                .set({ "Authorization": `Bearer ${token}` })
                .send({
                'title':'head of blog',
                'content':'When I first started,'
                })
                .end((err, res) => {
                console.log(token)
                expect(res.statusCode).to.equal(200);
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Blog update");
                done();
                });
            });
        });
        
  
        describe('/deleteblog', () => {
            it('Delete the blog', (done) => {
            chai.request(app)
                .delete(`/Blog/deleteblog/${id}`)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                // console.log(res)
                expect(res.statusCode).to.equal(200);
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.equal("Blog Deleted Successful");
                done();
                });
            });
        });


        it('Blog  not found', (done) => {
    chai.request(app)
        .delete('/Blog/deleteblog/123')
        .set({ "Authorization": `Bearer ${token}` })
        .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.message).to.equal("Bad request");
            done();
        });
});

})
