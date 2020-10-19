import { Account } from '@src/models/account.model';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

class DatabaseSchema {
    accounts: Account[] = [];
}

const adapter = new FileSync<DatabaseSchema>('app-db.json');
const db = lowdb(adapter);
db.defaults(new DatabaseSchema()).write();

export const databaseService = {
    accounts() {
        return db.get<'accounts'>('accounts');
    },

    reset(): void {
        this.accounts().remove().write();
    },

    insertAccount(account: Account): Account {
        this.accounts().push(account).write();
        return account;
    },

    updateAccount(account: Account): Account {
        this.accounts().find({ id: account.id }).assign(account).write();
        return account;
    },

    getAccount(accountId: string): Account {
        return this.accounts().find({ id: accountId }).value();
    },
};
