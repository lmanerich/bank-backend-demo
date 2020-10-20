import { Account } from '@src/models/account.model';
import { Event } from '@src/models/event.model';
import { AccountNotFoundError, InvalidAccountError, InvalidAmountError } from '@src/models/service-error.model';
import { Transfer } from '@src/models/transfer.model';
import { accountService } from '@src/services/account.service';
import { databaseService } from '@src/services/database.service';

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

        origin.balance -= event.amount;
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

        console.log(origin);
        let destination: Account = accountService.getAccount(event.destination);
        if (!destination) {
            destination = accountService.createAccount({
                id: event.destination,
                balance: 0,
            });
        }

        origin.balance -= event.amount;
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
