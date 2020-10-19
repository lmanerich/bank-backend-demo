import { databaseService } from '@src/services/database.service';
import { Request, Response } from 'express';

export const resetController = {
    reset: (req: Request, res: Response) => {
        databaseService.reset();

        res.status(200).send('OK');
    },
};
