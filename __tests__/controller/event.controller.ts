import app from '@src/app';
import { EventType } from '@src/models/event-type.model';
import { Event } from '@src/models/event.model';
import request from 'supertest';

afterAll(async () => {
    await request(app).post('/reset');
});

describe('event controller test', () => {
    test('POST /event invalid type', async () => {
        const deposit: Event = {
            //@ts-ignore
            type: 'invalid',
            amount: 10,
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(400);
    });

    test('POST /event deposit without destination', async () => {
        const deposit: Event = {
            type: EventType.DEPOSIT,
            amount: 10,
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(400);
    });

    test('POST /event deposit with invalid amount', async () => {
        const deposit: Event = {
            type: EventType.DEPOSIT,
            amount: -10,
            destination: '100',
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(400);
    });

    test('POST /event withdraw without origin', async () => {
        const deposit: Event = {
            type: EventType.WITHDRAW,
            amount: 10,
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(400);
    });

    test('POST /event withdraw with invalid origin', async () => {
        const deposit: Event = {
            type: EventType.WITHDRAW,
            amount: 10,
            origin: '100',
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(404);
    });

    test('POST /event withdraw with invalid amount', async () => {
        const deposit: Event = {
            type: EventType.WITHDRAW,
            amount: -10,
            origin: '100',
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(400);
    });

    test('POST /event deposit with destination and amount', async () => {
        const deposit: Event = {
            type: EventType.DEPOSIT,
            amount: 10,
            destination: '100',
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(201);
        expect(result.text).toEqual('{"destination":{"id":"100","balance":10}}');
    });

    test('POST /event deposit to an existing account', async () => {
        const deposit: Event = {
            type: EventType.DEPOSIT,
            amount: 10,
            destination: '100',
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(201);
        expect(result.text).toEqual('{"destination":{"id":"100","balance":20}}');
    });

    test('POST /event withdraw with valid origin', async () => {
        const deposit: Event = {
            type: EventType.WITHDRAW,
            amount: 10,
            origin: '100',
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(201);
        expect(result.text).toEqual('{"origin":{"id":"100","balance":10}}');
    });

    test('POST /event transfer without origin and destination', async () => {
        const deposit: Event = {
            type: EventType.TRANSFER,
            amount: 10,
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(400);
    });

    test('POST /event transfer with invalid origin', async () => {
        const deposit: Event = {
            type: EventType.TRANSFER,
            amount: 10,
            origin: '200',
            destination: '300',
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(404);
    });

    test('POST /event transfer with invalid amount', async () => {
        const deposit: Event = {
            type: EventType.TRANSFER,
            amount: -10,
            origin: '200',
            destination: '300',
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(400);
    });

    test('POST /event transfer with origin, destination and amount', async () => {
        const deposit: Event = {
            type: EventType.TRANSFER,
            amount: 10,
            origin: '100',
            destination: '300',
        };
        const result = await request(app).post('/event').send(deposit);
        expect(result.status).toEqual(201);
        expect(result.text).toEqual('{"origin":{"id":"100","balance":0},"destination":{"id":"300","balance":10}}');
    });
});
