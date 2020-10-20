import app from '@src/app';
import { EventType } from '@src/models/event-type.model';
import { Event } from '@src/models/event.model';
import request from 'supertest';

beforeAll(async () => {
    await request(app).post('/reset');
});

describe('balance controller test', () => {
    test('GET /balance without account_id', async () => {
        const result = await request(app).get('/balance');
        expect(result.status).toEqual(404);
    });

    test('GET /balance with invalid account_id', async () => {
        const result = await request(app).get('/balance?account_id=100');
        expect(result.status).toEqual(404);
    });

    test('GET /balance with valid account_id', async () => {
        const deposit: Event = {
            type: EventType.DEPOSIT,
            amount: 10,
            destination: '100',
        };
        await request(app).post('/event').send(deposit);

        const result = await request(app).get('/balance?account_id=100');
        expect(result.status).toEqual(200);
        expect(result.text).toEqual('10');
    });
});
