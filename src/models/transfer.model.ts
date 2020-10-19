import { Account } from '@src/models/account.model';

export interface Transfer {
    origin?: Account;
    destination?: Account;
}
