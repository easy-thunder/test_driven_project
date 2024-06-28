import supertest from 'supertest';
import createApp from '../../app';

const app = createApp();





describe("Get reports", () => {
  it("responds to GET /reports", async () => {
    await supertest(app).get("/").expect(200);
  });
});
