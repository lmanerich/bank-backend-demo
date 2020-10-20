import app from '@src/app';
import { Account } from '@src/models/account.model';
import { accountService } from '@src/services/account.service';
import request from 'supertest';

afterAll(async () => {
    await request(app).post('/reset');
});

describe('account service test', () => {
    test('get an invalid account', async () => {
        const result: Account = accountService.getAccount('100');
        expect(result).toBeUndefined();
    });

    test('create a new account', async () => {
        const account: Account = {
            id: '100',
            balance: 10,
        };
        const result: Account = accountService.createAccount(account);

        expect(result).toEqual(result);
    });

    test('get a valid account', async () => {
        const result: Account = accountService.getAccount('100');
        expect(result.id).toBe('100');
    });
});
