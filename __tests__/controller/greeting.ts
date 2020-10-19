import app from '@src/app';
import request from 'supertest';

describe('greeting controller test', () => {
    test('GET /greeting', async () => {
        const result = await request(app).get('/greeting');
        expect(result.text).toEqual('Hi!');
        expect(result.status).toEqual(200);
    });
});
