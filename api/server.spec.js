const request = require('supertest');
const server = require('./server');

describe('server.js', () => {

 describe('Get /api/games', () => {

    it('should return 200 OK', async () => {
      const res = await request(server).get('/api/games')

      expect(res.status).toBe(200);
    });

    it('should return an array of games', async () => {
      const res = await request(server).get('/api/games')

      expect(res.type).toBe('application/json');
    });

    it('should return a game I add', async () => {
      const res = await request(server).get('/api/games/1')

      expect(res.text).toContain("halo");
    });
  });
 });