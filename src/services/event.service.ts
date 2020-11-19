import { Account } from '@src/models/account.model';
import { Event } from '@src/models/event.model';
import { AccountNotFoundError, InsuficientFundsError, InvalidAccountError, InvalidAmountError } from '@src/models/service-error.model';
import { Transfer } from '@src/models/transfer.model';
import { accountService } from '@src/services/account.service';
import { databaseService } from '@src/services/database.service';

function calculateBalance(account: Account, amount: number): number {
    const newBalance: number = account.balance - amount;
    if (newBalance < account.creditLimit * -1) {
        throw new InsuficientFundsError();
    }

    return newBalance;
}

export const eventService = {
    processDeposit(event: Event): Transfer {
        if (!event.destination) {
            throw new InvalidAccountError();
        }

        if (event.amount <= 0) {
            throw new InvalidAmountError();
        }

        let destination: Account = accountService.getAccount(event.destination);
        if (!destination) {
            destination = accountService.createAccount({
                id: event.destination,
                balance: event.amount,
                creditLimit: 100,
            });
        } else {
            destination.balance += event.amount;
            databaseService.updateAccount(destination);
        }

        const transfer: Transfer = {
            destination,
        };
        return transfer;
    },
    processWithdraw(event: Event): Transfer {
        if (!event.origin) {
            throw new InvalidAccountError();
        }

        if (event.amount <= 0) {
            throw new InvalidAmountError();
        }

        let origin: Account = accountService.getAccount(event.origin);
        if (!origin) {
            throw new AccountNotFoundError(event.origin);
        }

        origin.balance = calculateBalance(origin, event.amount);
        databaseService.updateAccount(origin);

        const transfer: Transfer = {
            origin,
        };
        return transfer;
    },
    processTransfer(event: Event): Transfer {
        if (!event.origin || !event.destination) {
            throw new InvalidAccountError();
        }

        if (event.amount <= 0) {
            throw new InvalidAmountError();
        }

        let origin: Account = accountService.getAccount(event.origin);
        if (!origin) {
            throw new AccountNotFoundError(event.origin);
        }

        let destination: Account = accountService.getAccount(event.destination);
        if (!destination) {
            destination = accountService.createAccount({
                id: event.destination,
                balance: 0,
                creditLimit: 100,
            });
        }

        origin.balance = calculateBalance(origin, event.amount);
        databaseService.updateAccount(origin);

        destination.balance += event.amount;
        databaseService.updateAccount(destination);

        const transfer: Transfer = {
            origin,
            destination,
        };
        return transfer;
    },
};
