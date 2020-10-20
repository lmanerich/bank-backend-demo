import app from '@src/app';
import { EventType } from '@src/models/event-type.model';
import { Event } from '@src/models/event.model';
import { AccountNotFoundError, InvalidAccountError, InvalidAmountError } from '@src/models/service-error.model';
import { Transfer } from '@src/models/transfer.model';
import { eventService } from '@src/services/event.service';
import request from 'supertest';

afterAll(async () => {
    await request(app).post('/reset');
});

describe('event service test', () => {
    test('deposit without a destination', async () => {
        const t = () => {
            const event: Event = {
                type: EventType.DEPOSIT,
                amount: 10,
            };
            eventService.processDeposit(event);
        };
        expect(t).toThrow(InvalidAccountError);
    });

    test('deposit with an invalid amount', async () => {
        const t = () => {
            const event: Event = {
                type: EventType.DEPOSIT,
                amount: -10,
                destination: '100',
            };
            eventService.processDeposit(event);
        };
        expect(t).toThrow(InvalidAmountError);
    });

    test('deposit into a new account', async () => {
        const event: Event = {
            type: EventType.DEPOSIT,
            amount: 10,
            destination: '100',
        };
        const result: Transfer = eventService.processDeposit(event);
        expect(result.destination?.balance).toEqual(10);
    });

    test('deposit into an already existing account', async () => {
        const event: Event = {
            type: EventType.DEPOSIT,
            amount: 10,
            destination: '100',
        };
        const result: Transfer = eventService.processDeposit(event);
        expect(result.destination?.balance).toEqual(20);
    });

    test('withdraw without an origin', async () => {
        const t = () => {
            const event: Event = {
                type: EventType.WITHDRAW,
                amount: 10,
            };
            eventService.processWithdraw(event);
        };
        expect(t).toThrow(InvalidAccountError);
    });

    test('withdraw with an invalid amount', async () => {
        const t = () => {
            const event: Event = {
                type: EventType.WITHDRAW,
                amount: -10,
                origin: '200',
            };
            eventService.processWithdraw(event);
        };
        expect(t).toThrow(InvalidAmountError);
    });

    test('withdraw from a non-existing account', async () => {
        const t = () => {
            const event: Event = {
                type: EventType.WITHDRAW,
                amount: 10,
                origin: '200',
            };
            eventService.processWithdraw(event);
        };
        expect(t).toThrow(AccountNotFoundError);
    });

    test('withdraw from an already existing account', async () => {
        const event: Event = {
            type: EventType.WITHDRAW,
            amount: 10,
            origin: '100',
        };
        const result: Transfer = eventService.processWithdraw(event);
        expect(result.origin?.balance).toEqual(10);
    });

    test('transfer without an origin/destination', async () => {
        const t = () => {
            const event: Event = {
                type: EventType.TRANSFER,
                amount: 10,
            };
            eventService.processTransfer(event);
        };
        expect(t).toThrow(InvalidAccountError);
    });

    test('transfer with an invalid amount', async () => {
        const t = () => {
            const event: Event = {
                type: EventType.TRANSFER,
                amount: -10,
                origin: '100',
                destination: '300',
            };
            eventService.processTransfer(event);
        };
        expect(t).toThrow(InvalidAmountError);
    });

    test('transfer from a non-existing account', async () => {
        const t = () => {
            const event: Event = {
                type: EventType.TRANSFER,
                amount: 10,
                origin: '200',
                destination: '300',
            };
            eventService.processTransfer(event);
        };
        expect(t).toThrow(AccountNotFoundError);
    });

    test('transfer from an already existing account', async () => {
        const event: Event = {
            type: EventType.TRANSFER,
            amount: 10,
            origin: '100',
            destination: '300',
        };
        const result: Transfer = eventService.processTransfer(event);
        expect(result.origin?.balance).toEqual(0);
        expect(result.destination?.balance).toEqual(10);
    });

    test('transfer from an already existing account to an existing account', async () => {
        const event: Event = {
            type: EventType.TRANSFER,
            amount: 10,
            origin: '300',
            destination: '100',
        };
        const result: Transfer = eventService.processTransfer(event);
        expect(result.origin?.balance).toEqual(0);
        expect(result.destination?.balance).toEqual(10);
    });
});
