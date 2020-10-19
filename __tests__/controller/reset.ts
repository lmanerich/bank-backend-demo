import app from '@src/app';
import request from 'supertest';

describe('reset controller test', () => {
    test('POST /reset', async () => {
        const result = await request(app).post('/reset');
        expect(result.status).toEqual(200);
    });
});
