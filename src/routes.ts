import { accountController } from '@src/controllers/account.controller';
import { eventController } from '@src/controllers/event.controller';
import { resetController } from '@src/controllers/reset.controller.';
import express from 'express';

export default (app: express.Application) => {
    // TODO it would be better a GET request to /balance/:accountId
    //app.route('/balance/:accountId').get(accountController.getBalance);
    app.route('/balance').get(accountController.getBalance);

    app.route('/event').post(eventController.create);

    // TODO it would be better a DELETE request to /data
    //app.route('/data').delete(resetController.reset);
    app.route('/reset').post(resetController.reset);
};
