import supertest from 'supertest';
import createApp from '../../app';

const app = createApp();





describe("Get ", () => {
  it("responds to GET /", async () => {
    await supertest(app).get("/").expect(200);
  });
});



describe("Get users",()=>{
  it("responds to Get /users", async()=>{
    await supertest(app).get("/users").expect(200);
  })
})
