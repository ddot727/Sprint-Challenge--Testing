const request = require('supertest');
const server = require('./server');

describe('/games', () => {

  describe('GET /games', () => {
    it('should return 200 OK', async () => {
      await request(server).get('/games-db-reset');
      const res = await request(server).get('/games');
      expect(res.status).toBe(200);
    });

    it('should be an array', async () => {
      await request(server).get('/games-db-reset');
      const res = await request(server).get('/games');
      expect(res.body).toHaveLength(0);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should respond with JSON", () => {
      return request(server)
        .get("/games")
        .expect("Content-Type", /json/);
    });
  
    it('should an array with a length of one', async () => {
      await request(server).get('/games-db-reset');
      await request(server)
        .post('/games')
        .send({ title: 'Mario Kart', genre: 'Racing' });
      const res = await request(server).get('/games');
      expect(res.body).toHaveLength(1);
   });
  });


  describe('POST /games', () => {
    it('should return 201', async () => {
      await request(server).get('/games-db-reset');
      const res = await request(server)
        .post('/games')
        .send({ title: 'Pac-Man', genre: 'Arcade' });
      expect(res.status).toBe(201);
    });

    it('should have res.type JSON', async () => {
      await request(server).get('/games-db-reset');
      const res = await request(server)
        .post('/games')
        .send({ title: 'Sim City', genre: 'Simulation' });
      expect(res.type).toBe('application/json');
    });

    it("should equal { title: 'Smash', genre: 'Fighting' }", async () => {
      await request(server).get('/games-db-reset');
      const res = await request(server)
        .post('/games')
        .send({ title: 'Smash', genre: 'Fighting' });
      expect(res.body).toEqual({ title: 'Smash', genre: 'Fighting' });
    });

    it('should add a game to array', async () => {
      await request(server).get('/games-db-reset');
      let games = await request(server).get('/games');
      expect(games.body).toHaveLength(0);
      const res = await request(server)
        .post('/games')
        .send({ title: 'MegaMan', genre: 'Sidescroller' });
      games = await request(server).get('/games');
      expect(games.body).toHaveLength(1);
    });

    it('should return 422 if properties are missing', async () => {
      const res = await request(server).post('/games');
      expect(res.status).toBe(422);
    });

    it('should return 405 if title already exists in games db', async () => {
      await request(server).get('/games-db-reset');
      let res = await request(server)
        .post('/games')
        .send({ title: 'Black Ops', genre: 'Shooting' });
      res = await request(server)
        .post('/games')
        .send({ title: 'Black Ops', genre: 'Shooting' });
      expect(res.status).toBe(405);
    });
  });

});
