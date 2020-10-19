import { Account } from '@src/models/account.model';
import { databaseService } from '@src/services/database.service';

export const accountService = {
    getAccount(accountId: string): Account {
        return databaseService.getAccount(accountId);
    },

    createAccount(account: Account): Account {
        return databaseService.insertAccount(account);
    },
};
