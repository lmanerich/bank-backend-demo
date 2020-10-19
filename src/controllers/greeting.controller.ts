import { Request, Response } from 'express';

export const greetingController = {
    getGreeting: (req: Request, res: Response) => {
        res.send('Hi!');
    },
};
