import { EventType } from '@src/models/event-type.model';
import { Event } from '@src/models/event.model';
import { ServiceError } from '@src/models/service-error.model';
import { Transfer } from '@src/models/transfer.model';
import { eventService } from '@src/services/event.service';
import { Request, Response } from 'express';

export const eventController = {
    create: (req: Request, res: Response) => {
        const event: Event = req.body as Event;
        let transfer: Transfer;

        try {
            switch (event.type) {
                case EventType.DEPOSIT:
                    transfer = eventService.processDeposit(event);
                    break;
                case EventType.WITHDRAW:
                    transfer = eventService.processWithdraw(event);
                    break;
                case EventType.TRANSFER:
                    transfer = eventService.processTransfer(event);
                    break;
                default:
                    res.status(404).send('0');
                    return;
            }

            res.status(201).json(transfer);
        } catch (err: unknown) {
            if (err instanceof ServiceError) {
                res.status(err.statusCode).send('0');
            }
        }
    },
};
