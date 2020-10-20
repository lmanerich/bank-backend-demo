import app from '@src/app';
import { EventType } from '@src/models/event-type.model';
import { Event } from '@src/models/event.model';
import request from 'supertest';

afterAll(async () => {
    await request(app).post('/reset');
});

describe('reset controller test', () => {
    test('POST /reset', async () => {
        const deposit: Event = {
            type: EventType.DEPOSIT,
            amount: 10,
            destination: '100',
        };
        await request(app).post('/event').send(deposit);

        let result;

        result = await request(app).get(`/balance?account_id=${deposit.destination}`);
        expect(result.status).toEqual(200);

        result = await request(app).post('/reset');
        expect(result.status).toEqual(200);

        result = await request(app).get(`/balance?account_id=${deposit.destination}`);
        expect(result.status).toEqual(404);
    });
});
