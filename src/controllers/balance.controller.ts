import { Account } from '@src/models/account.model';
import { accountService } from '@src/services/account.service';
import { Request, Response } from 'express';

export const balanceController = {
    getBalance: async (req: Request, res: Response) => {
        if (req.query.account_id) {
            const accountId: string = req.query.account_id.toString();
            const account: Account = accountService.getAccount(accountId);

            if (account) {
                res.send(account.balance.toString());
                return;
            }
        }

        res.status(404).send('0');
    },
};
